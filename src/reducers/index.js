import authedUser from "./authedUser";
import users from "./users";
// import {loadingBarReducer} from "react-redux-loading-bar";
import {combineReducers} from "@reduxjs/toolkit";

export default combineReducers({
  authedUser,
  users,
});
// loadingBar: loadingBarReducer,
