import React from 'react';
import ReactModal from 'react-modal';
import Signup from '../../../../imports/ui/components/auth/Signup.jsx';

const ProfileEditor = ({ showEditProfile, callback }) => (
    <ReactModal
        isOpen={showEditProfile}
        contentLabel="onRequestClose Example"
        className="popup-profile"
        overlayClassName="popup-overlay"
    >
        <Signup
            callback={callback}
        />
    </ReactModal>
);

export default ProfileEditor;