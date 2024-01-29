import {setLoading} from "./loading";
import {_saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";

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

export const handleAddQuestion = ({optionOneText, optionTwoText}) => {
  return (dispatch, getState) => {
    // const navigate = useNavigate();
    const {authedUser, loading} = getState();
    const allOk = optionOneText.length > 0 && optionTwoText.length > 0 && !loading;
    if (!allOk) {
      alert('Please fill all the fields');
      dispatch(setLoading(false));
      return;
    }
    if (loading) return;
    const question = {
      optionOneText: optionOneText,
      optionTwoText: optionTwoText,
      author: authedUser,
    }
    if (!optionOneText || !optionTwoText) return alert('Please fill in both options');
    dispatch(setLoading(true));
    // Save question and update store
    return _saveQuestion(question).then((formattedQuestion) => {
      dispatch(addQuestion(formattedQuestion));
      dispatch(setLoading(false));
      // navigate('/');
    }).catch((error) => {
      alert('Error creating question', error.message);
      dispatch(setLoading(false));
    });
  }
};
