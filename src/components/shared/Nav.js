import {useLocation} from "react-router-dom";
import NavTab from "./NavTab";
import UserSwitcher from "./UserSwitcher";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authedUser";

const Nav = ({dispatch}) => {
  const location = useLocation();
  const path = location.pathname;
  let activeSection;
  if (path === '/') {
    activeSection = 'dashboard';
  } else if (path === '/leaderboard') {
    activeSection = 'leaderboard';
  } else if (path === '/new') {
    activeSection = 'new';
  }
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };
  return (
    <div>
      <header className="mdc-top-app-bar mdc-top-app-bar--prominent-fixed-adjust">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <div className="mdc-tab-bar" role="tablist">
              <div className="mdc-tab-scroller">
                <div className="mdc-tab-scroller__scroll-area">
                  <div className="mdc-tab-scroller__scroll-content">
                    <NavTab label="Home" icon="home" path="/" active={activeSection === 'dashboard'}/>
                    <NavTab label="Leaderboard" icon="leaderboard" path="/leaderboard"
                            active={activeSection === 'leaderboard'}/>
                    <NavTab label="New" icon="create" path="/new" active={activeSection === 'new'}/>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            <UserSwitcher/>
            <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Download"
                    title="Sign out" onClick={handleSignOut}>exit_to_app
            </button>
          </section>
        </div>
      </header>
    </div>
  );
};

export default connect()(Nav);


