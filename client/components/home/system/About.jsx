import React from 'react';
import ReactModal from 'react-modal';

const About = ({ showAbout, closeAbout }) => (
    <ReactModal
        isOpen={showAbout}
        contentLabel="onRequestClose Example"
        className="popup-modal"
        overlayClassName="popup-overlay"
    >
        <p className="about">Copyright c FondUS.Inc. All rights reserved.</p>
        <p style={{ textAlign: 'center' }}>
            <button className="confirmBtn" onClick={closeAbout}>OK</button>
        </p>

    </ReactModal>
);

export default About;