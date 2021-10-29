import { combineReducers } from "redux";
import authReducer from "./auth";
import homedataReducer from "./homedata";
import profileReducer from "./profile";
// import notificationReducer from "./notification";
// import officerReducer from "./officer";

export default combineReducers({
  authReducer,
  homedataReducer,
  profileReducer,
  //   notificationReducer,
  //   officerReducer,
});
