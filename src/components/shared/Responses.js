import PropTypes from "prop-types";

const Responses = ({pool, authedUser}) => {
  const totalVotesOptionOne = pool.optionOne.votes.length;
  const totalVotesOptionTwo = pool.optionTwo.votes.length;
  const totalVotes = pool.optionOne.votes.length + pool.optionTwo.votes.length;
  const optionOnePercentage = totalVotesOptionOne > 0 ? Math.round((totalVotesOptionOne / totalVotes) * 100) : 0;
  const optionTwoPercentage = totalVotesOptionTwo > 0 ? Math.round((totalVotesOptionTwo / totalVotes) * 100) : 0;
  return (
    <div id='responses-preview'>
      <p className="mdc-typography--caption option">
        <span
          className="mdc-typography--body2 votes">{totalVotesOptionOne} votes</span>
        <span className="mdc-typography--body2 percentage">{optionOnePercentage}%</span>
        <span className={
          pool.optionOne.votes.includes(authedUser) ? 'mdc-typography--body2 voted' : 'mdc-typography--body2'
        }>{pool.optionOne.text}</span>
      </p>
      <p className="mdc-typography--caption option">
        <span
          className="mdc-typography--body2 votes">{totalVotesOptionTwo} votes</span>
        <span className="mdc-typography--body2 percentage">{optionTwoPercentage}%</span>
        <span className={
          pool.optionTwo.votes.includes(authedUser) ? 'mdc-typography--body2 voted' : 'mdc-typography--body2'
        }>{pool.optionTwo.text}</span>
      </p>
    </div>
  );
}

Responses.propTypes = {
  pool: PropTypes.object.isRequired,
  authedUser: PropTypes.string.isRequired
};
export default Responses;
