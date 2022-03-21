const BASE_URL = "http://houseplantapi.ikaart.org";

export const API = {
  LOGIN_API: BASE_URL + "/token",
  REGISTRATION_API: BASE_URL + "/token",
  FORGOT_PASSWORD: BASE_URL + "/api/Houseplant/ForGotPassword",
  RESET_PASSWORD: BASE_URL + "/api/Houseplant/ChangePasswordByEmail",
  GET_HOUSE_PLANT: BASE_URL + "/api/Houseplant/GetHousePlant",
  STORE_IMAGE_API: BASE_URL + "/api/Houseplant/AddUserMasterData",
  UPDTAE_USER_DETAIL: BASE_URL + "/api/Houseplant/AddUserMasterData",
  GET_USER_DATA: BASE_URL + "/api/Houseplant/GetUserMasterData",
  GET_QUIZ_MASTER: BASE_URL + "/api/Houseplant/GetQuizMaster",
  GET_QUESTION_MASTER: BASE_URL + "/api/Houseplant/GetQuestionMaster",
  USER_QUIZ_MASTER_DATA:
    BASE_URL + "/api/Houseplant/CreateUpdateUserQuizMaster",
  CREATE_UPDATE_QUESTION_MASTER:
    BASE_URL + "/api/Houseplant/CreateUpdateQuestionMaster",
  CREATE_STRIPE_CUSTOMER: BASE_URL + "/api/Houseplant/CreateStripeCustomer",
  ADD_USER_MASTER_DATA: BASE_URL + "/api/Houseplant/AddUserMasterData",
  CANCLE_STRIPE_SUBSCRIPTION:
    BASE_URL + "/api/Houseplant/CancelStripeSubscription",
  STORE_PLANT_IMAGE_API: BASE_URL + "/api/Houseplant/UploadImages",
};
// AIzaSyA00WU0wtU_OzHF8C0yUmShOinN0kOXYgs
