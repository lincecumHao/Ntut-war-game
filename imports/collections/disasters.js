import { Mongo } from 'meteor/mongo';

export const Disasters = new Mongo.Collection('disasters');

Meteor.startup(function() {
    if (Disasters.find({}).count() === 0 && Meteor.isServer) {
        [{
                name: '地震'
            }, {
                name: '颱風'
            }, {
                name: '淹水'
            }
        ]
        .forEach(function(unit) {
            Disasters.insert(unit);
        });
    }
});