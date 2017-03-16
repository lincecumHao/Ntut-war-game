import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const getLastIndex = function() {
    return Stages.findOne({}, { sort: { index: -1 } }).index;
}

Meteor.methods({
    'stage.create': function() {
        let stageObj = {
            index: getLastIndex() + 1,
            situations: []
        }
        Stages.insert(stageObj);
    },
    'stage.delete': function() {
        Stages.remove({ index: getLastIndex() })
    },
    'situation.create': function(stageId) {
        check(stageId, String);
        let stage = Stages.findOne({_id: stageId});
        if(stage) {
            let nextIndex = stage.situations.length;
            Stages.update({_id: stageId}, { $push: { situations: {index: nextIndex} } });
        }
    },
    'situation.delete': function(stageId) {
        check(stageId, String);
        Stages.update( { _id: stageId }, { $pop: { situations: 1 } } )
    }
});

export const Stages = new Mongo.Collection('stages');

Meteor.startup(function() {
    if (Stages.find({}).count() === 0 && Meteor.isServer) {
        [{
                index: 0,
                situations: [{
                    index: 0,
                    time: new Date(),
                    type: 'earth quace',
                    location: [23, 123],
                    common: 'some common text'
                }]
            },
            {
                index: 1,
                situations: [{
                        index: 0,
                        time: new Date(),
                        type: 'earth quace',
                        location: [23, 123],
                        common: 'some common text'
                    },
                    {
                        index: 1,
                        time: new Date(),
                        type: 'earth quace',
                        location: [23.2, 123.2],
                        common: 'some common text-2'
                    }
                ]
            }
        ]
        .forEach(function(unit) {
            Stages.insert(unit);
        });
    }
});