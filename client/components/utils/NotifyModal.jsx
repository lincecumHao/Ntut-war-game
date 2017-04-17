import React, { PropTypes } from 'react';
import ReactModal from 'react-modal';

const props = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
}

const defaultProps = {
    title: '',
    content: '',
    onConfirm: () => { },
    onCancel: () => { }
}

const NotifyModal = ({ isOpen, title, content, onConfirm, onCancel }) => (
    <ReactModal
        isOpen={isOpen}
        className="popup-profile-black"
        overlayClassName="popup-overlay-black"
        contentLabel=""
    >
        <div className="popup-modal-black">
            <div className="title"><h1>{title}</h1></div>
            <div className="content"><h3>{content}</h3></div>
            <div className="btns">
                <button onClick={onConfirm}>確認</button>
                <div className="divider" />
                <button onClick={onCancel}>取消</button>
            </div>
        </div>
    </ReactModal>
);

NotifyModal.PropTypes = props;

NotifyModal.defaultProps = defaultProps;

export default NotifyModal;