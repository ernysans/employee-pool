import PropTypes from "prop-types";
import {connect} from "react-redux";
import Avatar from "./Avatar";

const UserPreview = ({user, featured = false}) => {
  return (
    <div className={
      featured ? `user-preview user-preview-featured` : "user-preview"
    }>
      <Avatar url={user.avatarURL} alt={user.name}></Avatar>
      <span className={
        featured ? "mdc-typography--headline4" : "mdc-typography--body1"
      }>{user.name}</span>
    </div>
  );
};

UserPreview.propTypes = {
  uid: PropTypes.string.isRequired,
  featured: PropTypes.bool,
};

const mapStateToProps = ({users}, ownProps) => {
  const {uid} = ownProps;
  const user = users[uid];
  return {
    user,
  };
};

export default connect(mapStateToProps)(UserPreview);
