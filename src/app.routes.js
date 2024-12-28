const {Router} = require("express")
const { AuthRouter } = require("./modules/auth/auth.routes")
const { UserRouter } = require("./modules/user/user.routes")
const { CategoryRouter } = require("./modules/category/category.routes")
const { OptionRoutes } = require("./modules/option/option.routes")
const { PostRouter } = require("./modules/post/post.routes")
const postController = require("./modules/post/post.controller")
const { Authorization } = require("./common/guard/authorization.guard")
const {SurveyRoutes} = require("./modules/survey/survey.routes")
const { ResponseRoutes } = require("./modules/survey/response.routes")
const { QuestionRoutes } = require("./modules/survey/question.routes")
const { UnitRoutes } = require("./modules/survey/units.routes")
const { DriverRoutes } = require("./modules/survey/driver.routes")
const { AllowedNumberRouter } = require("./modules/user/AllowedNumber.routes")


const mainRouter = Router()
mainRouter.use("/auth", AuthRouter)
mainRouter.use("/user",Authorization, UserRouter) 
mainRouter.use("/category", CategoryRouter)
mainRouter.use("/option", OptionRoutes)
mainRouter.use("/post", PostRouter);
mainRouter.get("/", postController.postList);
mainRouter.use("/survey", SurveyRoutes);
mainRouter.use("/questions",QuestionRoutes);
mainRouter.use("/response", ResponseRoutes);
mainRouter.use("/units", UnitRoutes);
mainRouter.use("/driver", DriverRoutes)
mainRouter.use("/AllowedNumber", AllowedNumberRouter)

module.exports= mainRouter
