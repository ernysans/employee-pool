import PropTypes from "prop-types";

const Avatar = ({url = "https://via.placeholder.com/150", alt = "avatar"}) => {
  return (
    <img
      src={url}
      alt={alt}
      className="avatar"
    />
  );
};

Avatar.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
};
export default Avatar;
