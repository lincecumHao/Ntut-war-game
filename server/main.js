import './methods/users/UserMethod.js';
import { Messages } from '../imports/collections/messages.js';
import { check, Match } from 'meteor/check';

Meteor.startup(() => {

    Meteor.publish('messages', function(limit) {
        check(limit, Match.Integer);
        return Messages.find({}, { sort: { createdAt: 1 }, limit });
    });
})