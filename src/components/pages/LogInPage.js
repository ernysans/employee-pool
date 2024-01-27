import {connect} from "react-redux";
import {useState} from "react";
import {setAuthedUser} from "../../actions/authedUser";
import "../../styles/LoginPage.css";
import Avatar from "../shared/Avatar";

const LogInPage = ({users, dispatch}) => {
  const [username, setUsername] = useState("");
  const userExist = username && username.length && users.hasOwnProperty(username);
  const [password, setPassword] = useState("");
  const user = users[username];
  const handleUsernameChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value ?? "");
  }

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value ?? "");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userExist) return;
    const user = users[username];
    const uid = user.id;
    if (user.password !== password) {
      setPassword("");
      alert("Wrong password, please try again");
      return;
    }
    dispatch(setAuthedUser(uid));
    setPassword("");
    setUsername("");
  }

  // Material 2 form for user, password and submit sign in
  return (<div id="login-page">
    <div className="container">
      <div className="content-container">
        <h1 className="mdc-typography--headline4">Employee Pools</h1>
        {userExist && <Avatar url={user.avatarURL} alt={user.name} />}
        <form onSubmit={handleSubmit}>
          <div className="mdc-text-field mdc-text-field--filled">
            <input type="text" id="username" className="mdc-text-field__input" value={username}
                   onChange={handleUsernameChange}/>
            <div className="mdc-notched-outline">
              <div className="mdc-notched-outline__leading"></div>
              <div className="mdc-notched-outline__notch">
                <label htmlFor="username"
                       className="mdc-floating-label mdc-floating-label--float-above	mdc-floating-label--required">Username</label>
              </div>
              <div className="mdc-notched-outline__trailing"></div>
            </div>
          </div>
          {userExist && (<div className="mdc-text-field mdc-text-field--filled">
            <input type="password" autoComplete="off" id="password" className="mdc-text-field__input" value={password}
                   onChange={handlePasswordChange}/>
            <div className="mdc-notched-outline">
              <div className="mdc-notched-outline__leading"></div>
              <div className="mdc-notched-outline__notch">
                <label htmlFor="password"
                       className="mdc-floating-label mdc-floating-label--float-above	mdc-floating-label--required mdc-floating-label--shake	">Password</label>
              </div>
              <div className="mdc-notched-outline__trailing"></div>
            </div>
          </div>)}
          {userExist && (<button className="mdc-button mdc-button--raised">
            <span className="mdc-button__label">Login</span>
          </button>)}
        </form>
      </div>
    </div>
  </div>);
}

const mapStateToProps = ({users}) => ({
  users,
});
export default connect(mapStateToProps)(LogInPage);
