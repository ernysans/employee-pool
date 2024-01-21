import authedUser from "./authedUser";
import users from "./users";
import {combineReducers} from "@reduxjs/toolkit";
import questions from "./questions";
import loading from "./loading";

export default combineReducers({
  loading,
  authedUser,
  users,
  questions,
});
