import PropTypes from "prop-types";
import UserPreview from "./UserPreview";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Responses from "./Responses";

const QuestionsList = ({title, questions, authedUser}) => {
  return (
    <div className="questions-list-container container">
      <div className="content-container">
        <h2 className="mdc-typography--headline4">{title}</h2>
        {questions.length === 0 && (
          <p className="mdc-typography--body1">No questions yet</p>
        )}
        <div className="question-list">
          {questions.map((pool) => (
            <div className="question-list-item" key={pool.id}>
              <div className="mdc-card">
                <div className="content-container">
                  <UserPreview uid={pool.author}></UserPreview>
                  <p className="mdc-typography--body2">
                    {new Date(pool.timestamp).toLocaleString()}
                    {authedUser === pool.author && (
                      <strong> - Your question</strong>
                    )}
                  </p>
                  <hr/>
                  <Responses pool={pool} authedUser={authedUser}></Responses>
                </div>
                <div className="mdc-card__actions">
                  <div className="mdc-card__action-buttons">
                    <Link className="mdc-button mdc-card__action mdc-card__action--button" to={`/questions/${pool.id}`}>
                      <div className="mdc-button__ripple"></div>
                      <span className="mdc-button__label">SHOW</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

QuestionsList.propTypes = {
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
};

const mapStateToProps = ({authedUser}) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(QuestionsList);
