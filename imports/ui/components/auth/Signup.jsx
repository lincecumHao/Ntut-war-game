import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from 'react-router';
import FileBase64 from '../../../../client/components/utils/react-file-base64';
import { createContainer } from 'meteor/react-meteor-data';
import { Units } from '../../../../imports/collections/units.js';
import classnames from 'classnames';
import axios from 'axios';
import Alert from 'react-s-alert';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.onUpload = this.onUpload.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
        this.validatePwd = this.validatePwd.bind(this);
        this.state = {
            avatar: 'https://dummyimage.com/180/fff/000',
            username: '',
            email: '',
            password: '',
            pwdConfirm: '',
            gender: '',
            age: '',
            seniority: '',
            position: '',
            err: ''
        }
    }

    componentWillMount() {
        // If user exist, let user fill up the profile.
        let user = Meteor.user();
        if (user) {
            if (user.services.google) {
                let {name, email, gender, picture} = user.services.google;
                this.setState({
                    username: name,
                    avatar: picture,
                    gender,
                    email
                });
            } else if (user.services.facebook) {
                axios.get('https://graph.facebook.com/' + user.services.facebook.id + '/picture?type=large')
                    .then(res => {
                        this.setState({
                            avatar: res.request.responseURL
                        });
                    });
                this.setState({
                    gender: user.services.facebook.gender,
                    email: user.services.facebook.email,
                    username: user.services.facebook.name
                });
            }
        }
    }

    onInputChange(e) {
        if (e.target.name == 'pwdConfirm' || e.target.name == 'password') {
            this.setState({ [e.target.name]: e.target.value }, this.validatePwd);
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    onUpload(files) {
        if (files[0]) {
            this.setState({
                avatar: files[0].base64
            });
        }
    }

    handleSumbit(e) {
        e.preventDefault();
        let { username, email, password, gender, age, seniority, position, avatar } = this.state;
        let account = {
            username,
            email,
            password,
            profile: {
                name: username,
                gender,
                age,
                seniority,
                position,
                avatar
            }
        };
        if (Meteor.user()) {
            Meteor.call('users.update', account.profile, err => {
                if (err) {
                    Alert.error(err, {
                        position: 'bottom',
                        effect: 'scale',
                        beep: false,
                        offset: 100
                    });
                } else {
                    this.props.router.push('/');
                    if(this.props.callback){
                        this.props.callback();
                    }
                }
            });
        } else {
            this.validatePwd();
            if (!this.state.err) {
                Accounts.createUser(account, (error) => {
                    if (error) {
                        this.setState({ err: error.reason });
                    } else {
                        this.props.router.push('/');
                    }
                });
            }
        }
    }

    validatePwd() {
        if (this.state.password != this.state.pwdConfirm) {
            this.setState({
                err: 'Password and password confirm are NOT same.'
            })
        } else {
            this.setState({
                err: ''
            })
        }
    }

    render() {
        let {username, email, password, pwdConfirm, err} = this.state;
        let isUpdate = (Meteor.user() ? true : false);
        return (
            <div className="login-container">
                <form onSubmit={this.handleSumbit}>
                    <Row className="signup-container">
                        <Col xs={12} md={4}>
                            <div className="avatar">
                                <img width="180" height="180" src={this.state.avatar} />
                                <label style={{ display: (isUpdate ? 'none' : '') }} htmlFor="upload-photo" className="upload-text">&#xf030; Upload avatar</label>
                                <FileBase64
                                    id="upload-photo"
                                    multiple={true}
                                    onDone={this.onUpload} />
                            </div>
                        </Col>
                        <Col xs={12} md={4} className="profiles">
                            <input type="text" name="username" placeholder="&#xf2c0;  Name" required value={username} onChange={this.onInputChange} />
                            <input type="email" disabled={isUpdate} name="email" placeholder="&#xf003;  Email" required value={email} onChange={this.onInputChange} />
                            <input type="password" disabled={isUpdate} name="password" placeholder="&#xf084;  Password" required value={password} onChange={this.onInputChange} />
                            <input type="password" disabled={isUpdate} name="pwdConfirm" placeholder="&#xf084;  Confirm Password" value={pwdConfirm} required onChange={this.onInputChange} />
                        </Col>
                        <Col xs={12} md={4} className="profiles">
                            <select name="gender" disabled={isUpdate} value={this.state.gender} onChange={this.onInputChange} className={classnames({ active: this.state.gender.length })} >
                                <option value="" disabled hidden>&#xf2c0;  Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <select name="age" value={this.state.age} onChange={this.onInputChange} className={classnames({ active: this.state.age.length })} >
                                <option value="" disabled hidden>&#xf2c0;  Range of age</option>
                                <option value="under-20">Under 20</option>
                                <option value="from-20-to-30">From 20 to 30</option>
                                <option value="from-30-to-40">From 30 to 40</option>
                                <option value="from-40-to-50">From 40 to 50</option>
                                <option value="from-50-to-60">From 50 to 60</option>
                                <option value="upper-60">Upper 60</option>
                            </select>
                            <select name="seniority" value={this.state.seniority} onChange={this.onInputChange} className={classnames({ active: this.state.seniority.length })} >
                                <option value="" disabled hidden>&#xf2c0;  Seniority</option>
                                <option value="under-5">Under 5 years</option>
                                <option value="from-5-to-10">From 5 to 10 years</option>
                                <option value="from-10-to-15">From 10 to 15 years</option>
                                <option value="from-15-to-20">From 15 to 20 years</option>
                                <option value="from-20-to-25">From 20 to 25 years</option>
                                <option value="upper-25">Upper 25 years</option>
                            </select>
                            <select name="position" value={this.state.position} required onChange={this.onInputChange} className={classnames({ active: this.state.position.length })} >
                                <option value="" disabled hidden>&#xf041;  Position</option>
                                {
                                    this.props.units.map((unit, index) => {
                                        return(<option key={index} value={unit._id}>{unit.name}</option>)
                                    })
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row className="submit-container">
                        <Col xs={12} md={12}>
                            <input type="submit" value={(isUpdate ? 'Update' : 'Submit')} className="default-font login-btn submit-btn" />
                            <p className="default-font s14pt err">{err}</p>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

export default withRouter(createContainer(() => {
    const units = Meteor.subscribe('units', null);
    const loading = !units.ready();
    return {
        units: Units.find({parent: null}).fetch(),
        loading
    }
}, Signup));