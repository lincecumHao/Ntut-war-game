import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const IntroModel = ({ isOpen, onOk, onNo }) => (
    <ReactModal
        isOpen={isOpen}
        contentLabel="onRequestClose Example"
        className="popup-modal-black"
        overlayClassName="popup-overlay"
    >
        <h1 className="title">提醒</h1>
        <div className="content" style={{ textAlign: 'center' }}>
            <h3>需要新手教學嗎?</h3>
        </div>
        <div className="btns">
            <button className="confirmBtn" onClick={onOk}>是</button>
            <button className="confirmBtn" onClick={onNo}>否</button>
        </div>
        <div className="divider">
            <input type="checkbox" />永遠不在顯示
        </div>
    </ReactModal>
);

IntroModel.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onNo: PropTypes.func.isRequired
};

export default IntroModel;