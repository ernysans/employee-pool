import {getInitialData} from "../utils/api";
import {receiveUsers} from "./users";
import {receiveQuestions} from "./questions";
import {setLoading} from "./loading";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(setLoading(true));
    return getInitialData().then(({users, questions}) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setLoading(false));
    });
  };
}
