import { Mongo } from 'meteor/mongo';

export const Script = new Mongo.Collection('script');

const template = {
    stage: 0,
    situation: 0,
    sended: [{
        depId: 'id',
        res: [{
            id: '1001',
            count: 2
        }]
    }]
}

Meteor.startup(function () {
    if (Script.find({}).count() === 0 && Meteor.isServer) {
        [{
            curStage: '',
            curSituation: '',

        }]
            .forEach(function (script) {
                Script.insert(script);
            });
    }
});