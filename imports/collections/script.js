import { Mongo } from 'meteor/mongo';

export const Script = new Mongo.Collection('script');

Meteor.startup(function() {
    if (Script.find({}).count() === 0 && Meteor.isServer) {
        [{
            curStage: '',
            curSituation: ''
        }]
        .forEach(function(script) {
            Script.insert(script);
        });
    }
});