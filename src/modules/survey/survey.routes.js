const { Router } = require("express");

const { Authorization } = require("../../common/guard/authorization.guard");
const surveyController = require("./surveyController");


const router = Router();

router.post("/create", Authorization, surveyController.create);
router.get("/",surveyController.getSurveys);
router.get("/:id", surveyController.getSurvey);
router.delete("/:id", Authorization, surveyController.deleteSurvey);
router.get("/drivers/:driverName/routes/:route", surveyController.getSurveysByDriverAndRoute);
router.get("/units", surveyController.getUnits);

module.exports = {
    SurveyRoutes: router
}
