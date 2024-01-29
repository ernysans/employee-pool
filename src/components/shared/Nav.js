import {useLocation, useNavigate} from "react-router-dom";
import NavTab from "./NavTab";
import UserSwitcher from "./UserSwitcher";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authedUser";

const Nav = ({dispatch}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  let activeSection;
  if (path === '/') {
    activeSection = 'dashboard';
  } else if (path === '/leaderboard') {
    activeSection = 'leaderboard';
  } else if (path === '/add') {
    activeSection = 'new';
  }
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/');
  };
  return (
    <header className="mdc-top-app-bar" id="header">
      <div className="mdc-top-app-bar__row">
        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <nav className="mdc-tab-bar" role="tablist">
            <div className="mdc-tab-scroller">
              <div className="mdc-tab-scroller__scroll-area">
                <div className="mdc-tab-scroller__scroll-content">
                  <NavTab label="Home" icon="home" path="/" active={activeSection === 'dashboard'}/>
                  <NavTab label="Leaderboard" icon="leaderboard" path="/leaderboard"
                          active={activeSection === 'leaderboard'}/>
                  <NavTab label="New" icon="create" path="/add" active={activeSection === 'new'}/>
                </div>
              </div>
            </div>
          </nav>
        </section>
        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
          <UserSwitcher/>
          <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Sign out"
                  title="Sign out" onClick={handleSignOut} data-testid="sign-out-button">exit_to_app
          </button>
        </section>
      </div>
    </header>
  );
};

export default connect()(Nav);


