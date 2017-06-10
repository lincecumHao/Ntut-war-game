import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from './nav/Nav.jsx';
import NotifyModal from '../utils/NotifyModal.jsx';
import { browserHistory } from 'react-router';

class Backend extends Component {
    constructor(props) {
        super(props);
        this.switchPopUp = this.switchPopUp.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            showInfo: false
        }
    }

    switchPopUp() {
        this.setState({
            showInfo: !this.state.showInfo
        });
    }

    onConfirm() {
        this.switchPopUp();
        browserHistory.push('/');
    }

    onCancel() {
        this.switchPopUp();
    }

    render() {
        let { children } = this.props;
        return (
            <div className="backend_wrapper">
                <Nav />
                <NotifyModal
                    isOpen={this.state.showInfo}
                    title={'提醒'}
                    content={'檢查過每項設定，開始演練?'}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                />
                <button onClick={this.switchPopUp} style={{ top: '10px', right: 0, position: 'absolute' }} className="btn btn-sm btn-black">演練開始&nbsp;<span className="glyphicon glyphicon-share-alt"></span></button>
                {children}
            </div>
        );
    }
}

Backend.propTypes = {
    children: PropTypes.node
};

export default Backend;