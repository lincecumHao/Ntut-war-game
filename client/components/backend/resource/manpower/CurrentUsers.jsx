import React from 'react';

const CurrentUsers = ({ count }) => (
    <div className="Cur-users">
        登入總人數
        <span className="badge">{count}</span>人 &nbsp;
    </div>
);

CurrentUsers.propTypes = {
    count: React.PropTypes.number
};

CurrentUsers.defaultProps = {
    count: 0
};

export default CurrentUsers;
