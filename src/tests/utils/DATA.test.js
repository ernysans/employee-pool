import {_saveQuestion, _saveQuestionAnswer} from "../../utils/_DATA";

describe('_saveQuestion function', () => {
  it('the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.', async () => {
    const question = {
      optionOneText: 'Option 1',
      optionTwoText: 'Option 2',
      author: 'tester'
    };
    const response = await _saveQuestion(question);
    expect(response).toBeTruthy();
  });

  it('error is returned if incorrect data is passed to the function.', async () => {
    const errrorMessage = "Please provide optionOneText, optionTwoText, and author";
    await expect(_saveQuestion({
      optionTwoText: 'Option 2',
      author: 'tester'
    })).rejects.toMatch(errrorMessage);
    await expect(_saveQuestion({
      optionOneText: 'Option 1',
      author: 'tester'
    })).rejects.toMatch(errrorMessage);
    await expect(_saveQuestion({
      optionOneText: 'Option 1',
      optionTwoText: 'Option 2',
    })).rejects.toMatch(errrorMessage);
  });
});


describe('_saveQuestionAnswer function', () => {
  it('true is returned when correctly formatted data is passed to the function.', async () => {
    const answer = {
      authedUser: 'tester',
      qid: '6ni6ok3ym7mf1p33lnez',
      answer: 'optionOne'
    };
    const result = await _saveQuestionAnswer(answer);
    expect(result).toBe(true);
  });
  it('an error is returned if incorrect data is passed to the function.', async () => {
    const errrorMessage = "Please provide authedUser, qid, and answer";
    await expect(_saveQuestionAnswer({
      qid: '6ni6ok3ym7mf1p33lnez',
      answer: 'optionOne'
    })).rejects.toMatch(errrorMessage);
    await expect(_saveQuestionAnswer({
      authedUser: 'tester',
      answer: 'optionOne'
    })).rejects.toMatch(errrorMessage);
    await expect(_saveQuestionAnswer({
      authedUser: 'tester',
      qid: '6ni6ok3ym7mf1p33lnez',
    })).rejects.toMatch(errrorMessage);
  });
});

