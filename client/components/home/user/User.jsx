import React, {PropTypes} from 'react';

const User = ({ avatar, username, position }) => (
    <div className="user">
        <div className="user_img ">
            <img src={avatar} width="73px" height="73px" />
        </div>
        <div className="user_info">
            <span className="badge"> {username}</span>
            <p>{position}</p>
        </div>
    </div>
);

User.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    position: PropTypes.string
};

User.defaultProps = {
  avatar: '/images/user_img.png',
  username: '',
  position: ''
};

export default User;