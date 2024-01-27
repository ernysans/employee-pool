import Nav from "../shared/Nav";
import {connect} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import UserPreview from "../shared/UserPreview";
import {_saveQuestionAnswer} from "../../utils/_DATA";
import {addAnswer} from "../../actions/questions";
import {setLoading} from "../../actions/loading";
import Responses from "../shared/Responses";

const withRouter = (Component) => {
  return (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{location, navigate, params}}/>;
  };
};

const PoolPage = ({pool, authedUser, dispatch, loading}) => {
  if (!pool) return NotFoundPage();
  const votedOptionOne = pool.optionOne.votes.includes(authedUser);
  const votedOptionTwo = pool.optionTwo.votes.includes(authedUser);
  const hasVoted = votedOptionOne || votedOptionTwo;

  /**
   * Handle vote
   * @param option
   */
  const handleVote = (option) => {
    if (loading) return;
    if (!option) return alert('Please select an option');
    dispatch(setLoading(true));
    // Save answer and update store
    _saveQuestionAnswer({
      authedUser,
      qid: pool.id,
      answer: option,
    }).then(() => {
      dispatch(addAnswer({
        authedUser,
        qid: pool.id,
        answer: option,
      }));
      dispatch(setLoading(false));
    }).catch((e) => {
      dispatch(setLoading(false));
      alert('Something went wrong, please try again later:' + e.message);
    })
  };
  return (
    <div>
      <Nav/>
      <main className="mdc-top-app-bar--fixed-adjust">
        <div className="container">
          <div className="content-container">
            <div className="mdc-card" id="pool-page">
              <div className="content-container">
                <h2 className="mdc-typography--headline4">Would You Rather?</h2>
                <br/>
                {!hasVoted && (<div className="answers">
                  <div className="mdc-card answer" data-voted={votedOptionOne}>
                    <div className="content-container">
                      <p className="mdc-typography--body1">{pool.optionOne.text}</p>
                      <button className="mdc-button mdc-button--raised" disabled={loading} onClick={(e) => {
                        e.preventDefault();
                        handleVote('optionOne');
                      }}>
                        <span className="mdc-button__label">{votedOptionOne ? `VOTED` : 'VOTE'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="mdc-card answer" data-voted={votedOptionTwo}>
                    <div className="content-container">
                      <p className="mdc-typography--body1">{pool.optionTwo.text}</p>
                      <button className="mdc-button mdc-button--raised" disabled={loading} onClick={(e) => {
                        e.preventDefault();
                        handleVote('optionTwo');
                      }}>
                        <span className="mdc-button__label">{votedOptionTwo ? `VOTED` : 'VOTE'}</span>
                      </button>
                    </div>
                  </div>
                </div>)}
                {hasVoted && (<Responses pool={pool} authedUser={authedUser}></Responses>)}
                {hasVoted && (<p className="mdc-typography--caption">* Your answer is marked in purple</p>)}
                {!hasVoted && (
                  <p className="mdc-typography--caption">* You can't change your answer after you choose one</p>)}
                <br/>
                <hr/>
                <br/>
                <h1 className="mdc-typography--headline6">Pool By:</h1>
                <UserPreview uid={pool.author} featured></UserPreview>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = ({questions, authedUser, users, loading}, props) => {
  const {question_id} = props.router.params;
  const pool = questions && questions[question_id] ? questions[question_id] : null;
  return {
    pool: pool,
    authedUser,
    users,
    loading,
  }
}
export default withRouter(connect(mapStateToProps)(PoolPage));
