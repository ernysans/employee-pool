import PropTypes from "prop-types";

const Avatar = ({url}) => {
  return (
    <img
      src={url}
      alt="avatar"
      className="w-10 h-10 rounded-full cursor-pointer transition duration-150 transform hover:scale-110"
    />
  );
};

Avatar.propTypes = {
  url: PropTypes.string,
};
export default Avatar;
