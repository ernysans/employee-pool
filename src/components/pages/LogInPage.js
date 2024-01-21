import {connect} from "react-redux";

const LogInPage = ({users}) => {
  return (<div>
    <h1>Log In Page</h1>
    {Object.keys(users).length}
  </div>);
}

const mapStateToProps = ({users}) => ({users});
export default connect(mapStateToProps)(LogInPage);
