import { Mongo } from 'meteor/mongo';

export const Resources = new Mongo.Collection('resources');

Meteor.startup(function() {
    if (Resources.find({}).count() === 0 && Meteor.isServer) {
        [
            { type: 'manpower', id: '1001', name: '搜救人員', avaliable: 100, used: 0 },
            { type: 'manpower', id: '1002', name: '消防人員', avaliable: 100, used: 1 },
            { type: 'manpower', id: '1003', name: '義消人員', avaliable: 100, used: 2 },
            { type: 'manpower', id: '1004', name: '志工', avaliable: 100, used: 3 },
            { type: 'manpower', id: '1005', name: '搜救犬', avaliable: 100, used: 4 },
            { type: 'manpower', id: '1006', name: '工程人員', avaliable: 100, used: 5 },
            { type: 'materials', id: '2001', name: '大型太空包', avaliable: 100, used: 0 },
            { type: 'materials', id: '2002', name: '屍袋', avaliable: 100, used: 1 },
            { type: 'materials', id: '2003', name: '冰櫃', avaliable: 100, used: 2 },
            { type: 'materials', id: '2004', name: '沙包', avaliable: 100, used: 3 },
            { type: 'materials', id: '2005', name: '臨時廁所', avaliable: 100, used: 4 },
            { type: 'equipment', id: '3001', name: '防護衣帽組', avaliable: 100, used: 0 },
            { type: 'equipment', id: '3002', name: '氣體偵測器', avaliable: 100, used: 1 },
            { type: 'equipment', id: '3003', name: '耐熱手套', avaliable: 100, used: 2 },
            { type: 'equipment', id: '3004', name: '救命器', avaliable: 100, used: 3 },
            { type: 'equipment', id: '3005', name: '無線電對講機', avaliable: 100, used: 4 },
            { type: 'equipment', id: '3006', name: '衛星電話', avaliable: 100, used: 5 },
            { type: 'equipment', id: '3007', name: '抽水機', avaliable: 100, used: 6 },
            { type: 'equipment', id: '3008', name: '發電機', avaliable: 100, used: 7 },
            { type: 'equipment', id: '3009', name: '消防衣帽組', avaliable: 100, used: 8 },
            { type: 'equipment', id: '3010', name: '泡沫原液（公升）', avaliable: 100, used: 9 },
            { type: 'equipment', id: '3011', name: '排煙機', avaliable: 100, used: 10 },
            { type: 'equipment', id: '3012', name: '照明燈', avaliable: 100, used: 11 },
            { type: 'equipment', id: '3013', name: '口罩', avaliable: 100, used: 12 },
            { type: 'equipment', id: '3014', name: '電鋸', avaliable: 100, used: 13 },
            { type: 'equipment', id: '3015', name: '圓盤切割器', avaliable: 100, used: 14 },
            { type: 'equipment', id: '3016', name: '救生氣墊', avaliable: 100, used: 15 },
            { type: 'equipment', id: '3017', name: '魚雷浮標', avaliable: 100, used: 16 },
            { type: 'equipment', id: '3018', name: '救生圈', avaliable: 100, used: 17 },
            { type: 'equipment', id: '3019', name: '救生衣', avaliable: 100, used: 18 },
            { type: 'equipment', id: '3020', name: '擔架', avaliable: 100, used: 19 },
            { type: 'equipment', id: '3021', name: '掛梯', avaliable: 100, used: 20 },
            { type: 'equipment', id: '3022', name: '救生繩', avaliable: 100, used: 21 },
            { type: 'equipment', id: '3023', name: '防寒衣帽組', avaliable: 100, used: 22 },
            { type: 'equipment', id: '3024', name: '錨子', avaliable: 100, used: 23 },
            { type: 'equipment', id: '3025', name: '呼吸器組', avaliable: 100, used: 24 },
            { type: 'equipment', id: '3026', name: '護目鏡', avaliable: 100, used: 25 },
            { type: 'vehicle', id: '4001', name: '堆高機', avaliable: 100, used: 0 },
            { type: 'vehicle', id: '4002', name: '推土機', avaliable: 100, used: 1 },
            { type: 'vehicle', id: '4003', name: '鏟裝機', avaliable: 100, used: 2 },
            { type: 'vehicle', id: '4004', name: '一般水箱消防車', avaliable: 100, used: 3 },
            { type: 'vehicle', id: '4005', name: '小型水箱消防車', avaliable: 100, used: 4 },
            { type: 'vehicle', id: '4006', name: '雲梯消防車', avaliable: 100, used: 5 },
            { type: 'vehicle', id: '4007', name: '救災指揮車', avaliable: 100, used: 6 },
            { type: 'vehicle', id: '4008', name: '救護車', avaliable: 100, used: 7 },
            { type: 'vehicle', id: '4009', name: '大客車（20座以下）', avaliable: 100, used: 8 },
            { type: 'vehicle', id: '4010', name: '大貨車', avaliable: 100, used: 9 },
            { type: 'vehicle', id: '4011', name: '工程救險車', avaliable: 100, used: 10 },
            { type: 'vehicle', id: '4012', name: '警車', avaliable: 100, used: 11 },
            { type: 'vehicle', id: '4013', name: '垃圾車', avaliable: 100, used: 12 },
            { type: 'vehicle', id: '4014', name: '資源回收車', avaliable: 100, used: 13 },
            { type: 'vehicle', id: '4015', name: '照明車', avaliable: 100, used: 14 },
            { type: 'vehicle', id: '4016', name: '灑水車', avaliable: 100, used: 15 },
            { type: 'vehicle', id: '4017', name: '救生艇', avaliable: 100, used: 16 },
            { type: 'vehicle', id: '4018', name: '機車', avaliable: 100, used: 17 },
            { type: 'vehicle', id: '4019', name: '供水車', avaliable: 100, used: 18 }
        ]
        .forEach(function(unit) {
            Resources.insert(unit);
        });
    }
});