const autoBind = require("auto-bind");
const userService = require("./user.service");
const UserModel = require("./user.model");
const UserMessage = require("./user.message");
const createHttpError = require("http-errors");

class UserController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = userService;
    }
    
    async whoami(req, res, next) {
        try {
            const user = req.user;
            console.log(req.user);
            
            if (!user) {
                return res.status(404).json({ message: UserMessage.UserNotFound });
            }
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            const userId = req.user._id; 
            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(404).json({ message: UserMessage.UserNotFound });
            }

            if (user.isProfileCompleted && user.role !== 'ADMIN') {
                return res.status(403).json({ message: UserMessage.NoAccess });
            }

            const { fullName, personnelCode, organization } = req.body;
            user.fullName = fullName;
            user.personnelCode = personnelCode;
            user.organization = organization; 
            user.isProfileCompleted = true;

            await user.save();

            return res.status(200).json({ message: UserMessage.UpdateProfile, user });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async  checkProfile(req, res, next) {
        try {
            const user = await UserModel.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: UserMessage.UserNotFound });
            }
            // اگر پروفایل تکمیل شده باشد
            if (user.isProfileCompleted) {
                return res.status(200).json({ isProfileCompleted: true });
            }
            return res.status(200).json({ isProfileCompleted: false });
        } catch (error) {
            next(error);
        }
    }
    

    async getAllUser(req, res, next) {
        try {
            const users = await UserModel.find({});
            if (!users || users.length === 0) {
                return res.status(404).json({ message: UserMessage.NotFoundUser });
            }
            
            return res.status(200).json({ 
                message: UserMessage.receive, 
                users 
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserModel.findById(id);
            if (!user) {
                throw new createHttpError.NotFound(UserMessage.NotFoundUserId);
            }
            return res.status(200).json({
                 message: UserMessage.receiveId,
                  user 
                });
        } catch (error) {
            next(error);
        }
    }

    async updateUserProfileByAdmin(req, res, next) {
        try {
            const { id } = req.params;
            const { fullName, personnelCode, workLocation,organization, role } = req.body;
            const user = await UserModel.findById(id);
            if (!user) {
                throw new createHttpError.NotFound(UserMessage.NotFoundUserId);
            }
            user.fullName = fullName;
            user.personnelCode = personnelCode;
            user.organization = organization;
            user.role = role;
            await user.save();
            return res.status(200).json({
                 message: UserMessage.UpdateProfile,
                  user });
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new UserController();
