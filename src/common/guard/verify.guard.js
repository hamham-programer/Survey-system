const { VerifyMessage } = require("../messages/verify.message")
const verifyAdmin = (req, res, next)=>{
    if(req.user.role !=="ADMIN"){
        return res.status(403).json({
            message:VerifyMessageMessage.NotAccess
        })

    }
    next()
}
module.exports = verifyAdmin