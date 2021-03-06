import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Units } from './units';
const ADD = 1;
const MINUS = -1;

const getLastIndex = function () {
    const lastStage = Stages.findOne({}, { sort: { index: -1 } })
    return lastStage ? lastStage.index : 0;
}

const updResUse = function (stageId, situationIndex, resId, flag) {
    situationIndex = parseInt(situationIndex);
    var updRes = {}; // create an empty object
    updRes['situations.$.resources.' + resId] = flag;
    Stages.update({
        _id: stageId,
        'situations.index': situationIndex
    }, {
            $inc: updRes
        },
        false,
        true);
}

Meteor.methods({
    'stage.create': function () {
        let stageObj = {
            index: getLastIndex(),
            situations: []
        }
        Stages.insert(stageObj);
    },
    'stage.delete': function () {
        Stages.remove({ index: getLastIndex() })
    },
    'situation.create': function (stageId) {
        check(stageId, String);
        let stage = Stages.findOne({ _id: stageId });
        if (stage) {
            let nextIndex = stage.situations.length;
            Stages.update({ _id: stageId }, { $push: { situations: { index: nextIndex, pass: false, sended: [], resources: {} } } });
        }
    },
    'situation.delete': function (stageId) {
        check(stageId, String);
        Stages.update({ _id: stageId }, { $pop: { situations: 1 } })
    },
    'situation.addResUse': function (stageId, situationIndex, resId) {
        check(stageId, String);
        check(situationIndex, String);
        check(resId, String);
        updResUse(stageId, situationIndex, resId, ADD);
    },
    'situation.minusResUse': function (stageId, situationIndex, resId) {
        check(stageId, String);
        check(situationIndex, String);
        check(resId, String);
        updResUse(stageId, situationIndex, resId, MINUS);
    },
    'situation.update': function (stageId, situationIndex, situation) {
        check(stageId, String);
        check(situationIndex, String);
        check(situation, Object);
        let updType = {};
        updType['situations.$'] = situation;
        Stages.update({
            _id: stageId,
            'situations.index': parseInt(situationIndex)
        }, {
                $set: updType
            },
            false,
            true);
    },
    'situation.changeType': function (stageId, situationIndex, typeId) {
        check(stageId, String);
        check(situationIndex, String);
        check(typeId, String);
        let updType = {};
        updType['situations.$.type'] = typeId;
        Stages.update({
            _id: stageId,
            'situations.index': parseInt(situationIndex)
        }, {
                $set: updType
            },
            false,
            true);
    },
    'situation.setTime': function (stageId, situationIndex, time) {
        check(stageId, String);
        check(situationIndex, String);
        check(time, Date);
        let updType = {};
        updType['situations.$.time'] = time;
        Stages.update({
            _id: stageId,
            'situations.index': parseInt(situationIndex)
        }, {
                $set: updType
            },
            false,
            true);
    },
    'situation.addSendUnits': function (sendRes, situationIndex, stageId) {
        check(sendRes, Array);
        check(situationIndex, Number);
        check(stageId, String);
        let updType = {};
        sendRes.forEach(send => {
            updType['situations.$.sended'] = send;
            Stages.update({
                _id: stageId,
                'situations.index': parseInt(situationIndex)
            }, {
                    $push: updType
                },
                false,
                true
            );

            // Reset resources used to zero.
            const { _id, res } = send;
            Object.keys(res).forEach(() => {
                Units.update({
                    _id,
                    'resources.used': { $gt: 0 }
                }, {
                        $set: { 'resources.$.used': 0 }
                    },
                    { multi: true }
                );
            })
        });

        // Check if all required resources are arrival.
        const stage = Stages.findOne({ _id: stageId });
        const curSituation = stage.situations.filter(situation => (situation.index === situationIndex))[0];
        const { resources, sended } = curSituation;
        const requireRes = {};
        // Make required resources become global variable.
        Object.keys(resources).forEach(key => {
            requireRes[key] = {};
            requireRes[key].need = resources[key];
        });

        // Render all sended resources, if any of them shows in required resource, sum.
        sended.forEach(({ res }) => {
            Object.keys(res).forEach(key => {
                if (!requireRes[key]) return;
                const { need } = requireRes[key];
                requireRes[key].need = need - res[key];
            });
        });

        let passed = true;
        Object.keys(requireRes).some(key => {
            if(requireRes[key].need > 0){
                passed = false;
                return;
            }
        });
        
        if(passed) {
            let pssedObj = {};
            pssedObj['situations.$.pass'] = passed;
            Stages.update({
                _id: stageId,
                'situations.index': parseInt(situationIndex)
            }, {
                    $set: pssedObj
                },
                false,
                true
            );
        }
    }
});

export const Stages = new Mongo.Collection('stages');

// Meteor.startup(function () {
//     if (Stages.find({}).count() === 0 && Meteor.isServer) {
//         [{
//             index: 0,
//             situations: [{
//                 index: 0,
//                 pass: false,
//                 time: new Date(),
//                 type: 'earth quace',
//                 location: [23, 123],
//                 common: 'some common text'
//             }]
//         },
//         {
//             index: 1,
//             situations: [{
//                 index: 0,
//                 pass: false,
//                 time: new Date(),
//                 type: 'earth quace',
//                 location: [23, 123],
//                 common: 'some common text'
//             },
//             {
//                 index: 1,
//                 pass: false,
//                 time: new Date(),
//                 type: 'earth quace',
//                 location: [23.2, 123.2],
//                 common: 'some common text-2'
//             }
//             ]
//         }
//         ]
//             .forEach(function (unit) {
//                 Stages.insert(unit);
//             });
//     }
// });