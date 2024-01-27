import {setLoading} from "./loading";
import {_saveQuestionAnswer} from "../utils/_DATA";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function addAnswer({authedUser, answer, qid}) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  };
}


/**
 * Handle vote
 * @param option
 * @param qid
 */
export const handleVote = ({option, qid}) => {
  return (dispatch, getState) => {
    const {authedUser, loading} = getState();
    if (loading) return;
    if (!option) return alert('Please select an option');
    dispatch(setLoading(true));
    // Save answer and update store
    return _saveQuestionAnswer({
      authedUser,
      qid: qid,
      answer: option,
    }).then(() => {
      dispatch(addAnswer({
        authedUser,
        qid: qid,
        answer: option,
      }));
      dispatch(setLoading(false));
    }).catch((e) => {
      dispatch(setLoading(false));
      alert('Something went wrong, please try again later:' + e.message);
    })
  }
};
