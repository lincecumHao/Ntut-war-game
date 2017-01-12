import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Meteor.methods({
    'messages.insert': function(msg) {
        check(msg, Object);
        let obj = Object.assign({}, msg, {
            createdAt: new Date(),
            ownerId: this.userId
        });
        Messages.insert(obj);
    }
});

export const Messages = new Mongo.Collection('messages');