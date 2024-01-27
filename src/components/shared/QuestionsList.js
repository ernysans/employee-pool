import PropTypes from "prop-types";
import UserPreview from "./UserPreview";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const QuestionsList = ({title, questions, authedUser}) => {
  return (
    <div className="questions-list-container container">
      <div className="content-container">
        <h2 className="mdc-typography--headline4">{title}</h2>
        <div className="question-list">
          {questions.map((pool) => (
            <div className="question-list-item" key={pool.id}>
              <div className="mdc-card">
                <div className="content-container">
                  <UserPreview uid={pool.author}></UserPreview>
                  {authedUser === pool.author && (
                    <span className="mdc-typography--caption">Your question</span>
                  )}
                  <p className="mdc-typography--body2">{new Date(pool.timestamp).toLocaleString()}</p>
                  <hr/>
                  <p className="mdc-typography--caption option">
                    <span
                      className="mdc-typography--body2 votes">{pool.optionOne.votes.length} votes</span>
                    <span className={
                      pool.optionOne.votes.includes(authedUser) ? 'mdc-typography--body2 voted' : 'mdc-typography--body2'
                    }>{pool.optionOne.text}</span>
                  </p>
                  <p className="mdc-typography--caption option">
                    <span
                      className="mdc-typography--body2 votes">{pool.optionTwo.votes.length} votes</span>
                    <span className={
                      pool.optionTwo.votes.includes(authedUser) ? 'mdc-typography--body2 voted' : 'mdc-typography--body2'
                    }>{pool.optionTwo.text}</span>
                  </p>
                </div>
                <div className="mdc-card__actions">
                  <div className="mdc-card__action-buttons">
                    <Link className="mdc-button mdc-card__action mdc-card__action--button" to={`/pool/${pool.id}`}>
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
