const api = require('../services/kavenegarService');

// تابع برای اعتبارسنجی شماره
const verifyPhoneNumber = (req, res) => {
    const { receptor, token } = req.body;

    api.VerifyLookup({
        receptor,
        token
    }, (response, status) => {
        if (status === 200) {
            res.json({
                status: 'success',
                data: response
            });
        } else {
            res.status(status).json({
                status: 'error',
                message: response
            });
        }
    });
};

module.exports = {
    verifyPhoneNumber
};
