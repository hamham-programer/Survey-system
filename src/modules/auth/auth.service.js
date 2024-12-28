const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const AuthMessage = require("./auth.message");
const jwt = require("jsonwebtoken");
const {randomInt} = require("crypto")
const Kavenegar = require('kavenegar');
const api = require("../../common/services/kavenegarService");


class AuthService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }

    async sendOTP(mobile) {
        const user = await this.#model.findOne({ mobile });

        const now = new Date().getTime();
        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + (1000 * 60 * 2) // 2 دقیقه اعتبار
        };

        if (!user) {
            // کاربر جدید ایجاد شده و کد OTP ارسال می‌شود
            const newUser = await this.#model.create({ mobile, otp });
            await this.sendOtpMessage(mobile, otp.code);
            return newUser;
        }

        if (user.otp && user.otp.expiresIn > now) {
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);
        }

        // به‌روزرسانی کد OTP و ارسال آن
        user.otp = otp;
        await user.save();
        await this.sendOtpMessage(mobile, otp.code);
        return user;
    }

    async sendOtpMessage(mobile, code) {
        try {
            await api.VerifyLookup({
                receptor: mobile,
                token: code,
                template: "verify" // نام الگو در پنل کاوه‌نگار
            }, function(response, status) {
                console.log("Response:", response);
                console.log("Status:", status);
            });
        } catch (error) {
            console.error('Error sending OTP:', error);
            throw new createHttpError.InternalServerError('Failed to send OTP');
        }
    }

    async checkOTP(mobile, code) {
        const user = await this.checkExistByMobile(mobile);
        const now = new Date().getTime();

        if (user?.otp?.expiresIn < now) {
            throw new createHttpError.Unauthorized(AuthMessage.OtpCodeExpired);
        }

        if (user?.otp?.code !== code) {
            throw new createHttpError.Unauthorized(AuthMessage.otpCodeIsIncorrect);
        }

        if (!user.verifiedMobile) {
            user.verifiedMobile = true;
        }

        const accessToken = this.signToken({ mobile, id: user._id });
        const refreshToken = this.signToken({ mobile, id: user._id }, "1y");

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        await user.save();
        return { accessToken, refreshToken };
    }

    async checkExistByMobile(mobile) {
        const user = await this.#model.findOne({ mobile });
        if (!user) {
            throw new createHttpError.NotFound(AuthMessage.NotFound);
        }
        return user;
    }

    async checkRefreshToken(refreshToken) {
        if (!refreshToken) throw new createHttpError.Unauthorized(AuthMessage.Login);

        const data = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

        if (typeof data === "object" && "id" in data) {
            const user = await UserModel.findById(data.id).lean();
            if (!user) throw new createHttpError.Unauthorized(AuthMessage.NotFoundAccount);

            const accessToken = this.signToken({ mobile: user.mobile, id: user._id });
            const refreshToken = this.signToken({ mobile: user.mobile, id: user._id });

            await UserModel.updateOne(
                { _id: user._id },
                {
                    $set: { accessToken, refreshToken }
                }
            );

            return { accessToken, refreshToken };
        }

        throw new createHttpError.Unauthorized();
    }

    signToken(payload, expiresIn = '1d') {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
    }
}

module.exports = new AuthService();
