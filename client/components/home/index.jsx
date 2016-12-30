// import React, { Component} from 'react';
// import { createContainer} from 'meteor/react-meteor-data';
// import { Meteor } from 'meteor/meteor';
// import { Session } from 'meteor/session';
// import axios from 'axios';

// class HelloWorld extends Component {

//   constructor(props) {
//     super(props);
//     this.loginWithFB = this.loginWithFB.bind(this);
//     this.getAvatar = this.getAvatar.bind(this);
//     this.addProfile = this.addProfile.bind(this);
//     this.state = {
//       avatarURL: ''
//     }
//   }

//   getAvatar() {
//     if(this.props.userInfo[0]){
//       axios.get('https://graph.facebook.com/' + this.props.userInfo[0].services.facebook.id + '/picture?type=small')
//       .then(res => {
//         this.setState({
//           avatarURL: res.request.responseURL
//         });
//       });
//     }
//   }
  
//   addProfile() {
//     console.log(Math.random());
//     Meteor.call('users.update', Math.random());
//   }  
  
//   loginWithFB() {
//     Meteor.loginWithFacebook({
//       requestPermissions: ['public_profile', 'email']
//     }, function (err) {
//       if (err)
//         Session.set('errorMessage', err.reason || 'Unknown error');
//     });
//   }

//   render() {
//     let randomNum;
//     if(this.props.userInfo.length > 0){
//       console.log(this.props.userInfo);
//       randomNum = this.props.userInfo[0].profile.randomNUM;
//     }
//     return (
//       <div>
//         <button onClick={this.loginWithFB}> TEST </button>
//         <button onClick={this.addProfile}> TEST2 </button>
//         {randomNum}
//         <img src={ this.state.avatarURL } />
//       </div>
//     );
//   }
// }

// export default createContainer(() => {
//   Meteor.subscribe('userData');

//   return {userInfo: Meteor.users.find({}).fetch()};
// }, HelloWorld);

import React from 'react';

const Home = () => (
    <div>
        HOME HOME HOME
    </div>
);

export default Home;