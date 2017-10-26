import './methods/users/UserMethod.js';
import { Messages } from '../imports/collections/messages.js';
import { Units } from '../imports/collections/units.js';
import { Characters } from '../imports/collections/characters.js';
import { Stages } from '../imports/collections/stages.js';
import { Script } from '../imports/collections/script.js';
import { Disasters } from '../imports/collections/disasters';
import { Resources } from '../imports/collections/resources';
import { check, Match } from 'meteor/check';

Meteor.startup(() => {
    Meteor.publishComposite('messages', function(limit) {
        check(limit, Match.Integer);
        return {
            find: function() {
                const options = { sort: { createdAt: 1 }, limit };
                return Messages.find({}, options);
            },
            children: [{
                find: function(post) {
                    return Meteor.users.find({ _id: post.ownerId }, { limit: 1, fields: { profile: 1 } });
                }
            }]
        }
    });

    Meteor.publish('units', function() {
        return Units.find({});
    });

    Meteor.publish('stages', function() {
        return Stages.find({});
    });

    Meteor.publish('disasters', function() {
        return Disasters.find({});
    });
    
    Meteor.publish('resources', function() {
        return Resources.find({});
    });

    Meteor.publish('script', function() {
        return Script.find({});
    });

    Meteor.publish('characters', function() {
        var self = this;

        var subHandle = Characters.find({}).observeChanges({
            added: function(id, fields) {
                self.added('characters', id, fields);
            },
            changed: function(id, fields) {
                self.changed('characters', id, fields);
            },
            removed: function(id) {
                self.removed('characters', id);
            }
        });

        self.ready();

        self.onStop(function() {
            subHandle.stop();
        });
    });
})