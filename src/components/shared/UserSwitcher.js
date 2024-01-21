import {connect} from "react-redux";
import {useEffect} from "react";
import {setAuthedUser} from "../../actions/authedUser";

const UserSwitcher = ({users, dispatch, authedUser}) => {
  useEffect(() => {
    // start mdc-select
    const select = document.querySelector('.mdc-select');
    const selectComponent = new window.mdc.select.MDCSelect(select);
    selectComponent.listen('MDCSelect:change', () => {
      const uid = selectComponent.value;
      if (!uid) return;
      dispatch(setAuthedUser(uid));
    });
  }, [dispatch]);

  const selected = users[authedUser];
  return (<div className="mdc-select mdc-select--filled demo-width-class">
    <div className="mdc-select__anchor">
      <span className="mdc-select__ripple"></span>
      <span className="mdc-floating-label"></span>
      <span className="mdc-select__selected-text-container">
            <img src={selected.avatarURL} alt="Avatar" className="mdc-list-item__graphic"/>
        <span className="mdc-select__selected-text">{selected.name}</span>
      </span>
      <span className="mdc-select__dropdown-icon">
      <svg
        className="mdc-select__dropdown-icon-graphic"
        viewBox="7 10 10 5" focusable="false">
        <polygon
          className="mdc-select__dropdown-icon-inactive"
          stroke="none"
          points="7 10 12 15 17 10">
        </polygon>
        <polygon
          className="mdc-select__dropdown-icon-active"
          stroke="none"
          points="7 15 12 10 17 15">
        </polygon>
      </svg>
    </span>
      <span className="mdc-line-ripple"></span>
    </div>

    <div className="mdc-select__menu demo-width-class mdc-menu mdc-menu-surface">
      <ul className="mdc-list mdc-list--avatar-list">
        {Object.keys(users).map((userId) => {
          const user = users[userId];
          return (<li className={
            `mdc-list-item ${authedUser === userId ? 'mdc-list-item--selected' : ''}`
          } data-value={userId} key={userId}>
            <span className="mdc-list-item__ripple"></span>
            <img src={user.avatarURL} alt="Avatar" className="mdc-list-item__graphic"/>
            <span className="mdc-list-item__text">{user.name}</span>
          </li>);
        })}
      </ul>
    </div>
  </div>);
};

const mapStateToProps = ({users, authedUser}) => ({
  users,
  authedUser,
});
export default connect(mapStateToProps)(UserSwitcher);
