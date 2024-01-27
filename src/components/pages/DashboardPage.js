import Nav from "../shared/Nav";
import QuestionsList from "../shared/QuestionsList";
import {connect} from "react-redux";

const DashboardPage = ({newQuestions, doneQuestions}) => {
  return (
    <div>
      <Nav/>
      <main className="mdc-top-app-bar--fixed-adjust">
        <QuestionsList questions={newQuestions} title="Unanswered"></QuestionsList>
        <QuestionsList questions={doneQuestions} title="Answered"></QuestionsList>
      </main>
    </div>
  );
}

const mapStateToProps = ({questions, authedUser}) => {
  const allQuestions = Object.values(questions ?? {});
  return ({
    newQuestions: allQuestions.filter(question => !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))
      .sort((a, b) => b.timestamp - a.timestamp),
    doneQuestions: allQuestions.filter(question => question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
      .sort((a, b) => b.timestamp - a.timestamp),
  });
};

export default connect(mapStateToProps)(DashboardPage);
