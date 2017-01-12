import {
    Meteor
} from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(() => {
    // Publish full user data.
    Meteor.publish('userData', function() {
        if (this.userId) {
            return Meteor.users.find({ _id: this.userId });
        } else {
            this.ready();
        }
    });

    // For get all online user.
    Meteor.publish('userStatus', function() {
        return Meteor.users.find({ 'status.online': true }, { fields: { profile: 1 } });
    });

    // Get users via ids.
    Meteor.publish('users', function(ids) {
        check(ids, [String]);
        return Meteor.users.find({ _id: { $in: ids } }, { fields: { profile: 1 } });
    });

    // Prevent client write any code.
    Meteor.users.deny({
        update: function() {
            return true;
        }
    });

    // Update user profile, oAuth indeed.
    Meteor.methods({
        'users.update': function(extraProps) {
            check(extraProps, Object);
            Meteor.users.update(Meteor.userId(), {
                $set: {
                    profile: Object.assign({}, Meteor.user().profile, extraProps)
                }
            });
        }
    });
});