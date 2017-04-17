import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Meteor.methods({
    'characters.update': function(characterMap) {
        check(characterMap, {
            userId: String,
            act: [String]
        });
        let obj = Object.assign({}, characterMap, {
            createdAt: new Date()
        });
        let doc = Characters.findOne({ userId: characterMap.userId });

        // Insert or Update.
        doc ? Characters.update({ userId: characterMap.userId }, { $set: obj }) : Characters.insert(obj);;
    },
    'characters.delete': function(userIds) {
        check(userIds, [String]);
        Characters.remove({ userId: { $in: userIds } })
    }
});

export const Characters = new Mongo.Collection('characters');