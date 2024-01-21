import PropTypes from "prop-types";

const Avatar = ({url}) => {
  return (
    <img
      src={url}
      alt="avatar"
      className="avatar"
    />
  );
};

Avatar.propTypes = {
  url: PropTypes.string,
};
export default Avatar;
