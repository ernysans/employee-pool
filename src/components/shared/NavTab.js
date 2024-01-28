import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const NavTab = ({label, icon, path, active}) => {
  return (<Link className={
    active ? "mdc-tab mdc-tab--active" : "mdc-tab"
  } role="tab" aria-selected={active ? "true" : "false"} tabIndex="0" to={path} aria-label={label}
                data-testid={'nav-button-' + path}>
    <span className="mdc-tab__content">
      <span className="mdc-tab__icon material-icons" aria-hidden="true">{icon}</span>
      <span className="mdc-tab__text-label">{label}</span>
    </span>
    <span className={
      active ? "mdc-tab-indicator mdc-tab-indicator--active" : "mdc-tab-indicator"
    }>
      <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
    </span>
    <span className="mdc-tab__ripple"></span>
  </Link>);
}
NavTab.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
export default NavTab;
