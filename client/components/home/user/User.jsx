import React from 'react';
import PropTypes from 'prop-types';

const User = ({ avatar, username, position, onClick }) => (
    <div className="user" data-step="1" data-position="right" data-intro='點擊頭像，更多使用者設定與資訊選項'>
        <div className="user_img ">
            <img src={avatar} width="73px" height="73px" onClick={onClick}/>
        </div>
        <div className="user_info">
            <span className="badge"> {username}</span>
            <p>{position}</p>
        </div>
    </div>
);

User.propTypes = {
    onClick: PropTypes.func,
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