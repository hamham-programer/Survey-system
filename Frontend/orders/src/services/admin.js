import api from "../configs/api";

const addCategory = (data) => api.post("category", data , {withCredentials: true});
const getParentCategories = () => api.get("category", { withCredentials: true });
const deleteCategory = (id) => api.delete(`category/${id}`, { withCredentials: true });

const createSurvey = (data) => api.post("survey/create", data, { withCredentials: true });
const getAllSurveys = () => api.get("survey", { withCredentials: true });
const getSurveyById = (id) => api.get(`survey/${id}`, { withCredentials: true });
const deleteSurvey = (id) => api.delete(`survey/${id}`, { withCredentials: true });

const createQuestion = (data) => api.post("questions/create", data, { withCredentials: true });
const getQuestionsBySurvey = (surveyId) => api.get(`questions/surveys/${surveyId}/questions`, { withCredentials: true });
const getQuestionById = (id) => api.get(`questions/${id}`, { withCredentials: true });
const updateQuestion = (id, data) => api.put(`questions/${id}`, data, { withCredentials: true });
const deleteQuestion = (id) => api.delete(`questions/${id}`, { withCredentials: true });
const getOptionsByQuestionId = (questionId) => 
  
  api.get(`questions/${questionId}/options`, { withCredentials: true });

const submitResponse = (data) => api.post("response/submit", data, { withCredentials: true });
/* const getResponses = (surveyId) => api.get(`response?surveyId=${surveyId}`, { withCredentials: true }); */

const getResponses = async (surveyId) => {
  try {
    const response = await api.get(`response?surveyId=${surveyId}`, { withCredentials: true });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching responses:", error);
    throw error;
  }

};
const getSurveyAnalysis = async (surveyId) => {
  try {
    const response = await api.get(`response/analysis/${surveyId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching survey analysis:", error);
    throw error;
  }
};

const createUnit = async (data) => {
  try {
    const response = await api.post("units", data, { withCredentials: true });
    console.log("واحد جدید با موفقیت ایجاد شد:", response.data);
  } catch (error) {
    console.error("خطا در ایجاد واحد:", error);
  }
};

const getUnits = () => api.get("units", { withCredentials: true }); // دریافت تمام واحدها
const getUnitById = (id) => api.get(`units/${id}`, { withCredentials: true }); // دریافت یک واحد خاص
const updateUnit = (id, data) => api.put(`units/${id}`, data, { withCredentials: true }); // به‌روزرسانی واحد
const deleteUnit = (id) => api.delete(`units/${id}`, { withCredentials: true }); // حذف واحد

const createDriver = (data) => api.post("driver", data, { withCredentials: true });
const createOutgoingRoute = (driverId, data) => api.post(`driver/${driverId}/outgoing-route`, data, { withCredentials: true });
const createReturnRoute = (driverId, data) => api.post(`driver/${driverId}/return-route`, data, { withCredentials: true });
const getDrivers = () => api.get("driver", { withCredentials: true });
const getOutgoingRoutes = (driverId) => api.get(`driver/${driverId}/outgoing-route`, { withCredentials: true });
const getReturnRoutes = (driverId) => api.get(`driver/${driverId}/return-route`, { withCredentials: true });

const deleteDriver = (id) => api.delete(`driver/${id}`, { withCredentials: true });
const deleteOutgoingRoute = (id) => api.delete(`driver/${id}/outgoing-route`, { withCredentials: true });
const deleteReturnRoute = (id) => api.delete(`driver/${id}/return-route`, { withCredentials: true });

export {
  addCategory,
  getParentCategories,
  deleteCategory,
  createSurvey,
  getAllSurveys,
  getSurveyById,
  deleteSurvey,
  createQuestion,
  getQuestionsBySurvey,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  submitResponse,
  getResponses,
  getOptionsByQuestionId,
  getSurveyAnalysis,
  createUnit,     
  getUnits,        
  getUnitById,    
  updateUnit,     
  deleteUnit,
  createDriver,         
  createOutgoingRoute,  
  createReturnRoute,    
  getDrivers,
  getOutgoingRoutes,
  getReturnRoutes,
  deleteDriver,
  deleteOutgoingRoute,
  deleteReturnRoute,

};
