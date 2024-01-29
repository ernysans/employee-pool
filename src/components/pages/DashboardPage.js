import Nav from "../shared/Nav";
import QuestionsList from "../shared/QuestionsList";
import {connect} from "react-redux";
import Footer from "../shared/Footer";
import {useState} from "react";

const DashboardPage = ({newQuestions, doneQuestions}) => {
  const SECTION_UNANSWERED = 'unanswered';
  const SECTION_ANSWERED = 'answered';
  const [section, setSection] = useState(SECTION_UNANSWERED);
  return (
    <div id="dashboard-page">
      <Nav/>
      <main className="mdc-top-app-bar--fixed-adjust">
        <nav className="mdc-tab-bar container" role="tablist" id="tab-bar">
          <div className="mdc-tab-scroller">
            <div className="mdc-tab-scroller__scroll-area">
              <div className="mdc-tab-scroller__scroll-content">
                <button className={`mdc-tab ${section === SECTION_UNANSWERED ? 'mdc-tab--active' : ''}`} role="tab"
                        aria-selected={section === SECTION_UNANSWERED ? 'true' : 'false'} tabIndex="0"
                        onClick={() => setSection(SECTION_UNANSWERED)}>
                  <span className="mdc-tab__content">
                    <span className="mdc-tab__text-label">Unanswered</span>
                  </span>
                  <span className="mdc-tab-indicator">
                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span className="mdc-tab__ripple"></span>
                </button>
                <button className={`mdc-tab ${section === SECTION_ANSWERED ? 'mdc-tab--active' : ''}`} role="tab"
                        aria-selected={section === SECTION_ANSWERED ? 'true' : 'false'} tabIndex="-1"
                        onClick={() => setSection(SECTION_ANSWERED)}>
                  <span className="mdc-tab__content">
                    <span className="mdc-tab__text-label">Answered</span>
                  </span>
                  <span className="mdc-tab-indicator">
                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span className="mdc-tab__ripple"></span>
                </button>
              </div>
            </div>
          </div>
        </nav>
        {section === SECTION_UNANSWERED && (
          <QuestionsList questions={newQuestions} title="Unanswered"></QuestionsList>)}
        {section === SECTION_ANSWERED && (<QuestionsList questions={doneQuestions} title="Answered"></QuestionsList>)}
      </main>
      <Footer/>
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
