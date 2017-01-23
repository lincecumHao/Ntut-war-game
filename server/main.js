import './methods/users/UserMethod.js';
import { Messages } from '../imports/collections/messages.js';
import { check, Match } from 'meteor/check';

Meteor.startup(() => {

    Meteor.publishComposite('messages', function(limit) {
        check(limit, Match.Integer);
        return {
            find: function () {
                const options = { sort: { createdAt: 1 }, limit };
                return Messages.find({}, options);
            },
            children: [
                {
                    find: function(post) {
                        return Meteor.users.find({ _id: post.ownerId },{ limit: 1, fields: { profile: 1 } });
                    }
                }
            ]
        }
        // return {
        //     find() {
        //         // We only need the _id field in this query, since it's only
        //         // used to drive the child queries to get the todos
        //         const options = { sort: { createdAt: 1 }, limit };

        //         return Messages.find({}, options);
        //     },

        //     children: [{
        //         find: function(post) {
        //             // Find post author. Even though we only want to return
        //             // one record here, we use "find" instead of "findOne"
        //             // since this function should return a cursor.
        //             return Meteor.users.find({ _id: post.ownerId },{ limit: 1, fields: { profile: 1 } });
        //         }
        //     }]
        // };
    });

    // Meteor.publish('messages', function(limit) {
    //     check(limit, Match.Integer);
    //     return Messages.find({}, { sort: { createdAt: 1 }, limit });
    // });
})