import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const getUnitName = function (unitId) {
  let unit = Units.findOne({ _id: unitId });
  return (unit ? unit.name : unitId);
}

export const Units = new Mongo.Collection('units');

Meteor.startup(function () {
  if (Units.find().count() === 0 && Meteor.isServer) {
    [
      {
        name: '消防局',
        parent: null
      }, {
        name: '警察局',
        parent: null
      }, {
        name: '工務局',
        parent: null
      }, {
        name: '環保局',
        parent: null
      },
      {
        name: '忠孝分隊',
        parent: '消防局',
        resources: [
          { type: '人員', id: '1001', name: '搜救人員', avaliable: 180 },
          { type: '人員', id: '1002', name: '消防人員', avaliable: 220 },
          { type: '人員', id: '1003', name: '義消人員', avaliable: 100 },
          { type: '人員', id: '1004', name: '志工', avaliable: 80 },
          { type: '人員', id: '1005', name: '搜救犬', avaliable: 100 },
          { type: '物資', id: '2001', name: '大型太空包', avaliable: 250 },
          { type: '物資', id: '2002', name: '屍袋', avaliable: 150 },
          { type: '物資', id: '2003', name: '冰櫃', avaliable: 160 },
          { type: '物資', id: '2004', name: '沙包', avaliable: 300 },
          { type: '物資', id: '2005', name: '臨時廁所', avaliable: 150 },
          { type: '裝備機具', id: '3001', name: '防護衣帽組', avaliable: 300 },
          { type: '裝備機具', id: '3002', name: '氣體偵測器', avaliable: 100 },
          { type: '裝備機具', id: '3003', name: '耐熱手套', avaliable: 300 },
          { type: '裝備機具', id: '3004', name: '救命器', avaliable: 100 },
          { type: '裝備機具', id: '3005', name: '無線電對講機', avaliable: 100 },
          { type: '裝備機具', id: '3006', name: '衛星電話', avaliable: 50 },
          { type: '裝備機具', id: '3009', name: '消防衣帽組', avaliable: 500 },
          { type: '裝備機具', id: '3010', name: '泡沫原液', avaliable: 1000 },
          { type: '裝備機具', id: '3011', name: '排煙機', avaliable: 100 },
          { type: '裝備機具', id: '3012', name: '照明燈', avaliable: 100 },
          { type: '裝備機具', id: '3013', name: '口罩', avaliable: 300 },
          { type: '裝備機具', id: '3014', name: '電鋸', avaliable: 100 },
          { type: '裝備機具', id: '3015', name: '圓盤切割器', avaliable: 100 },
          { type: '裝備機具', id: '3016', name: '救生氣墊', avaliable: 120 },
          { type: '裝備機具', id: '3017', name: '魚雷浮標', avaliable: 100 },
          { type: '裝備機具', id: '3018', name: '救生圈', avaliable: 150 },
          { type: '裝備機具', id: '3019', name: '救生衣', avaliable: 150 },
          { type: '裝備機具', id: '3020', name: '擔架', avaliable: 120 },
          { type: '裝備機具', id: '3021', name: '掛梯', avaliable: 80 },
          { type: '裝備機具', id: '3022', name: '救生繩', avaliable: 80 },
          { type: '裝備機具', id: '3023', name: '防寒衣帽組', avaliable: 80 },
          { type: '裝備機具', id: '3024', name: '錨子', avaliable: 150 },
          { type: '裝備機具', id: '3025', name: '呼吸器組', avaliable: 80 },
          { type: '裝備機具', id: '3026', name: '護目鏡', avaliable: 80 },
          { type: '車輛', id: '4004', name: '一般水箱消防車', avaliable: 200 },
          { type: '車輛', id: '4005', name: '小型水箱消防車', avaliable: 220 },
          { type: '車輛', id: '4006', name: '雲梯消防車', avaliable: 80 },
          { type: '車輛', id: '4007', name: '救災指揮車', avaliable: 200 },
          { type: '車輛', id: '4008', name: '救護車', avaliable: 300 },
          { type: '車輛', id: '4009', name: '大客車（20座以下）', avaliable: 100 },
          { type: '車輛', id: '4015', name: '照明車', avaliable: 50 },
          { type: '車輛', id: '4017', name: '救生艇', avaliable: 50 },
          { type: '車輛', id: '4018', name: '機車', avaliable: 80 },
          { type: '車輛', id: '4019', name: '供水車', avaliable: 300 }
        ]
      }, {
        name: '華山分隊',
        parent: '消防局',
        resources: [
          { type: '人員', id: '1001', name: '搜救人員', avaliable: 150 },
          { type: '人員', id: '1002', name: '消防人員', avaliable: 200 },
          { type: '人員', id: '1003', name: '義消人員', avaliable: 80 },
          { type: '人員', id: '1004', name: '志工', avaliable: 60 },
          { type: '人員', id: '1005', name: '搜救犬', avaliable: 70 },
          { type: '物資', id: '2001', name: '大型太空包', avaliable: 200 },
          { type: '物資', id: '2002', name: '屍袋', avaliable: 130 },
          { type: '物資', id: '2003', name: '冰櫃', avaliable: 120 },
          { type: '物資', id: '2004', name: '沙包', avaliable: 250 },
          { type: '物資', id: '2005', name: '臨時廁所', avaliable: 130 },
          { type: '裝備機具', id: '3001', name: '防護衣帽組', avaliable: 280 },
          { type: '裝備機具', id: '3002', name: '氣體偵測器', avaliable: 90 },
          { type: '裝備機具', id: '3003', name: '耐熱手套', avaliable: 280 },
          { type: '裝備機具', id: '3004', name: '救命器', avaliable: 90 },
          { type: '裝備機具', id: '3005', name: '無線電對講機', avaliable: 90 },
          { type: '裝備機具', id: '3006', name: '衛星電話', avaliable: 30 },
          { type: '裝備機具', id: '3009', name: '消防衣帽組', avaliable: 450 },
          { type: '裝備機具', id: '3010', name: '泡沫原液', avaliable: 900 },
          { type: '裝備機具', id: '3011', name: '排煙機', avaliable: 90 },
          { type: '裝備機具', id: '3012', name: '照明燈', avaliable: 90 },
          { type: '裝備機具', id: '3013', name: '口罩', avaliable: 280 },
          { type: '裝備機具', id: '3014', name: '電鋸', avaliable: 90 },
          { type: '裝備機具', id: '3015', name: '圓盤切割器', avaliable: 90 },
          { type: '裝備機具', id: '3016', name: '救生氣墊', avaliable: 90 },
          { type: '裝備機具', id: '3017', name: '魚雷浮標', avaliable: 90 },
          { type: '裝備機具', id: '3018', name: '救生圈', avaliable: 120 },
          { type: '裝備機具', id: '3019', name: '救生衣', avaliable: 120 },
          { type: '裝備機具', id: '3020', name: '擔架', avaliable: 90 },
          { type: '裝備機具', id: '3021', name: '掛梯', avaliable: 70 },
          { type: '裝備機具', id: '3022', name: '救生繩', avaliable: 70 },
          { type: '裝備機具', id: '3023', name: '防寒衣帽組', avaliable: 70 },
          { type: '裝備機具', id: '3024', name: '錨子', avaliable: 120 },
          { type: '裝備機具', id: '3025', name: '呼吸器組', avaliable: 60 },
          { type: '裝備機具', id: '3026', name: '護目鏡', avaliable: 70 },
          { type: '車輛', id: '4004', name: '一般水箱消防車', avaliable: 190 },
          { type: '車輛', id: '4005', name: '小型水箱消防車', avaliable: 200 },
          { type: '車輛', id: '4006', name: '雲梯消防車', avaliable: 80 },
          { type: '車輛', id: '4007', name: '救災指揮車', avaliable: 200 },
          { type: '車輛', id: '4008', name: '救護車', avaliable: 300 },
          { type: '車輛', id: '4009', name: '大客車（20座以下）', avaliable: 80 },
          { type: '車輛', id: '4015', name: '照明車', avaliable: 40 },
          { type: '車輛', id: '4017', name: '救生艇', avaliable: 50 },
          { type: '車輛', id: '4018', name: '機車', avaliable: 70 },
          { type: '車輛', id: '4019', name: '供水車', avaliable: 300 }
        ]
      }, {
        name: '城中分隊',
        parent: '消防局',
        resources: [
          { type: '人員', id: '1001', name: '搜救人員', avaliable: 120 },
          { type: '人員', id: '1002', name: '消防人員', avaliable: 180 },
          { type: '人員', id: '1003', name: '義消人員', avaliable: 90 },
          { type: '人員', id: '1004', name: '志工', avaliable: 100 },
          { type: '人員', id: '1005', name: '搜救犬', avaliable: 50 },
          { type: '物資', id: '2001', name: '大型太空包', avaliable: 180 },
          { type: '物資', id: '2002', name: '屍袋', avaliable: 120 },
          { type: '物資', id: '2003', name: '冰櫃', avaliable: 100 },
          { type: '物資', id: '2004', name: '沙包', avaliable: 230 },
          { type: '物資', id: '2005', name: '臨時廁所', avaliable: 120 },
          { type: '裝備機具', id: '3001', name: '防護衣帽組', avaliable: 270 },
          { type: '裝備機具', id: '3002', name: '氣體偵測器', avaliable: 70 },
          { type: '裝備機具', id: '3003', name: '耐熱手套', avaliable: 270 },
          { type: '裝備機具', id: '3004', name: '救命器', avaliable: 70 },
          { type: '裝備機具', id: '3005', name: '無線電對講機', avaliable: 70 },
          { type: '裝備機具', id: '3006', name: '衛星電話', avaliable: 30 },
          { type: '裝備機具', id: '3009', name: '消防衣帽組', avaliable: 430 },
          { type: '裝備機具', id: '3010', name: '泡沫原液', avaliable: 880 },
          { type: '裝備機具', id: '3011', name: '排煙機', avaliable: 70 },
          { type: '裝備機具', id: '3012', name: '照明燈', avaliable: 70 },
          { type: '裝備機具', id: '3013', name: '口罩', avaliable: 270 },
          { type: '裝備機具', id: '3014', name: '電鋸', avaliable: 70 },
          { type: '裝備機具', id: '3015', name: '圓盤切割器', avaliable: 70 },
          { type: '裝備機具', id: '3016', name: '救生氣墊', avaliable: 70 },
          { type: '裝備機具', id: '3017', name: '魚雷浮標', avaliable: 70 },
          { type: '裝備機具', id: '3018', name: '救生圈', avaliable: 110 },
          { type: '裝備機具', id: '3019', name: '救生衣', avaliable: 110 },
          { type: '裝備機具', id: '3020', name: '擔架', avaliable: 70 },
          { type: '裝備機具', id: '3021', name: '掛梯', avaliable: 60 },
          { type: '裝備機具', id: '3022', name: '救生繩', avaliable: 60 },
          { type: '裝備機具', id: '3023', name: '防寒衣帽組', avaliable: 60 },
          { type: '裝備機具', id: '3024', name: '錨子', avaliable: 110 },
          { type: '裝備機具', id: '3025', name: '呼吸器組', avaliable: 50 },
          { type: '裝備機具', id: '3026', name: '護目鏡', avaliable: 60 },
          { type: '車輛', id: '4004', name: '一般水箱消防車', avaliable: 180 },
          { type: '車輛', id: '4005', name: '小型水箱消防車', avaliable: 180 },
          { type: '車輛', id: '4006', name: '雲梯消防車', avaliable: 70 },
          { type: '車輛', id: '4007', name: '救災指揮車', avaliable: 190 },
          { type: '車輛', id: '4008', name: '救護車', avaliable: 320 },
          { type: '車輛', id: '4009', name: '大客車（20座以下）', avaliable: 60 },
          { type: '車輛', id: '4015', name: '照明車', avaliable: 20 },
          { type: '車輛', id: '4017', name: '救生艇', avaliable: 30 },
          { type: '車輛', id: '4018', name: '機車', avaliable: 70 },
          { type: '車輛', id: '4019', name: '供水車', avaliable: 300 }
        ]
      }, {
        name: '中正第一分局',
        parent: '警察局',
        resources: [
          { type: '人員', id: '1001', name: '搜救人員', avaliable: 100 },
          { type: '人員', id: '1004', name: '志工', avaliable: 50 },
          { type: '物資', id: '2001', name: '大型太空包', avaliable: 120 },
          { type: '物資', id: '2004', name: '沙包', avaliable: 100 },
          { type: '裝備機具', id: '3005', name: '無線電對講機', avaliable: 100 },
          { type: '車輛', id: '4012', name: '警車', avaliable: 320 },
          { type: '車輛', id: '4018', name: '機車', avaliable: 120 }
        ]
      }, {
        name: '大安分局',
        parent: '警察局',
        resources: [
          { type: '人員', id: '1001', name: '搜救人員', avaliable: 120 },
          { type: '人員', id: '1004', name: '志工', avaliable: 40 },
          { type: '物資', id: '2001', name: '大型太空包', avaliable: 100 },
          { type: '物資', id: '2004', name: '沙包', avaliable: 90 },
          { type: '裝備機具', id: '3005', name: '無線電對講機', avaliable: 90 },
          { type: '車輛', id: '4012', name: '警車', avaliable: 320 },
          { type: '車輛', id: '4018', name: '機車', avaliable: 100 }
        ]
      }, {
        name: '信義分局',
        parent: '警察局',
        resources: [
          { type: '人員', id: '1001', name: '搜救人員', avaliable: 100 },
          { type: '人員', id: '1004', name: '志工', avaliable: 50 },
          { type: '物資', id: '2001', name: '大型太空包', avaliable: 100 },
          { type: '物資', id: '2004', name: '沙包', avaliable: 80 },
          { type: '裝備機具', id: '3005', name: '無線電對講機', avaliable: 80 },
          { type: '車輛', id: '4012', name: '警車', avaliable: 300 },
          { type: '車輛', id: '4018', name: '機車', avaliable: 100 }
        ]
      }, {
        name: '公園路燈工程管理處',
        parent: '工務局',
        resources: [
          { type: '人員', id: '1006', name: '工程人員', avaliable: 300 },
          { type: '物資', id: '2001', name: '大型太空包', avaliable: 200 },
          { type: '物資', id: '2004', name: '沙包', avaliable: 200 },
          { type: '物資', id: '2005', name: '臨時廁所', avaliable: 90 },
          { type: '裝備機具', id: '3007', name: '抽水機', avaliable: 80 },
          { type: '裝備機具', id: '3008', name: '發電機', avaliable: 100 },
          { type: '裝備機具', id: '3012', name: '照明燈', avaliable: 50 },
          { type: '裝備機具', id: '3014', name: '電鋸', avaliable: 60 },
          { type: '裝備機具', id: '3021', name: '掛梯', avaliable: 80 },
          { type: '裝備機具', id: '3026', name: '護目鏡', avaliable: 80 },
          { type: '車輛', id: '4001', name: '堆高機', avaliable: 40 },
          { type: '車輛', id: '4002', name: '推土機', avaliable: 30 },
          { type: '車輛', id: '4003', name: '鏟裝機', avaliable: 30 },
          { type: '車輛', id: '4009', name: '大客車（20座以下）', avaliable: 80 },
          { type: '車輛', id: '4010', name: '大貨車', avaliable: 100 },
          { type: '車輛', id: '4011', name: '工程救險車', avaliable: 300 },
          { type: '車輛', id: '4015', name: '照明車', avaliable: 120 },
          { type: '車輛', id: '4016', name: '灑水車', avaliable: 300 },
          { type: '車輛', id: '4019', name: '供水車', avaliable: 300 }
        ]
      }, {
        name: '新建工程處第一分隊',
        parent: '工務局',
        resources: [
          { type: '人員', id: '1006', name: '工程人員', avaliable: 200 },
          { type: '物資', id: '2001', name: '大型太空包', avaliable: 220 },
          { type: '物資', id: '2004', name: '沙包', avaliable: 220 },
          { type: '物資', id: '2005', name: '臨時廁所', avaliable: 70 },
          { type: '裝備機具', id: '3007', name: '抽水機', avaliable: 70 },
          { type: '裝備機具', id: '3008', name: '發電機', avaliable: 100 },
          { type: '裝備機具', id: '3012', name: '照明燈', avaliable: 30 },
          { type: '裝備機具', id: '3014', name: '電鋸', avaliable: 50 },
          { type: '裝備機具', id: '3021', name: '掛梯', avaliable: 80 },
          { type: '裝備機具', id: '3026', name: '護目鏡', avaliable: 80 },
          { type: '車輛', id: '4001', name: '堆高機', avaliable: 40 },
          { type: '車輛', id: '4002', name: '推土機', avaliable: 30 },
          { type: '車輛', id: '4003', name: '鏟裝機', avaliable: 30 },
          { type: '車輛', id: '4009', name: '大客車（20座以下）', avaliable: 80 },
          { type: '車輛', id: '4010', name: '大貨車', avaliable: 90 },
          { type: '車輛', id: '4011', name: '工程救險車', avaliable: 300 },
          { type: '車輛', id: '4015', name: '照明車', avaliable: 100 },
          { type: '車輛', id: '4016', name: '灑水車', avaliable: 250 },
          { type: '車輛', id: '4019', name: '供水車', avaliable: 300 }
        ]
      }, {
        name: '中正區清潔隊',
        parent: '環保局',
        resources: [
          { type: '人員', id: '1006', name: '工程人員', avaliable: 400 },
          { type: '人員', id: '1004', name: '志工', avaliable: 100 },
          { type: '物資', id: '2001', name: '大型太空包', avaliable: 100 },
          { type: '物資', id: '2004', name: '沙包', avaliable: 100 },
          { type: '物資', id: '2005', name: '臨時廁所', avaliable: 80 },
          { type: '裝備機具', id: '3014', name: '電鋸', avaliable: 80 },
          { type: '車輛', id: '4013', name: '垃圾車', avaliable: 400 },
          { type: '車輛', id: '4014', name: '資源回收車', avaliable: 400 }
        ]
      }, {
        name: '大安區清潔隊',
        parent: '環保局',
        resources: [
          { type: '人員', id: '1006', name: '工程人員', avaliable: 200 },
          { type: '人員', id: '1004', name: '志工', avaliable: 100 },
          { type: '物資', id: '2001', name: '大型太空包', avaliable: 120 },
          { type: '物資', id: '2004', name: '沙包', avaliable: 130 },
          { type: '物資', id: '2005', name: '臨時廁所', avaliable: 60 },
          { type: '裝備機具', id: '3014', name: '電鋸', avaliable: 60 },
          { type: '車輛', id: '4013', name: '垃圾車', avaliable: 400 },
          { type: '車輛', id: '4014', name: '資源回收車', avaliable: 400 }
        ]
      }
      // {
      //   name: '信義中隊',
      //   phone: '46-(199)135-3592',
      //   parent: '第三救護大隊',
      //   manpower: 9,
      //   resources: [
      //     { type: '裝備', id: '3025', name: '呼吸器組', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3026', name: '護目鏡', avaliable: getRandomInt(1, 100) },
      //     { type: '車輛', id: '4001', name: '堆高機', avaliable: getRandomInt(1, 100) }

      //   ]
      // },
      // {
      //   name: '忠孝中隊',
      //   phone: '46-(199)135-3592',
      //   parent: '第三救護大隊',
      //   manpower: 9,
      //   resources: [
      //     { type: '裝備', id: '3025', name: '呼吸器組', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3026', name: '護目鏡', avaliable: getRandomInt(1, 100) },
      //     { type: '車輛', id: '4001', name: '堆高機', avaliable: getRandomInt(1, 100) }

      //   ]
      // },
      // {
      //   name: '信義分隊',
      //   phone: '46-(199)135-3592',
      //   parent: '信義中隊',
      //   manpower: 9,
      //   resources: [
      //     { type: '人力', id: '1001', name: '搜救人員', avaliable: getRandomInt(1, 100) },
      //     { type: '人力', id: '1002', name: '消防人員', avaliable: getRandomInt(1, 100) },
      //     { type: '物品', id: '2002', name: '屍袋', avaliable: getRandomInt(1, 100) },
      //     { type: '物品', id: '2003', name: '冰櫃', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3004', name: '救命器', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3005', name: '無線電對講機', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3006', name: '衛星電話', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3007', name: '抽水機', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3024', name: '錨子', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3025', name: '呼吸器組', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3026', name: '護目鏡', avaliable: getRandomInt(1, 100) },
      //     { type: '車輛', id: '4001', name: '堆高機', avaliable: getRandomInt(1, 100) },
      //     { type: '車輛', id: '4002', name: '推土機', avaliable: getRandomInt(1, 100) },
      //     { type: '車輛', id: '4003', name: '鏟裝機', avaliable: getRandomInt(1, 100) }
      //   ]
      // },
      // {
      //   name: '忠孝分隊',
      //   phone: '46-(199)135-3592',
      //   parent: '忠孝中隊',
      //   manpower: 9,
      //   resources: [
      //     { type: '人力', id: '1004', name: '志工', avaliable: getRandomInt(1, 100) },
      //     { type: '人力', id: '1005', name: '搜救犬', avaliable: getRandomInt(1, 100) },
      //     { type: '人力', id: '1006', name: '工程人員', avaliable: getRandomInt(1, 100) },
      //     { type: '物品', id: '2001', name: '大型太空包', avaliable: getRandomInt(1, 100) },
      //     { type: '物品', id: '2002', name: '屍袋', avaliable: getRandomInt(1, 100) },
      //     { type: '物品', id: '2003', name: '冰櫃', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3011', name: '排煙機', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3012', name: '照明燈', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3013', name: '口罩', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3014', name: '電鋸', avaliable: getRandomInt(1, 100) },
      //     { type: '裝備', id: '3015', name: '圓盤切割器', avaliable: getRandomInt(1, 100) },
      //     { type: '車輛', id: '4013', name: '垃圾車', avaliable: getRandomInt(1, 100) },
      //     { type: '車輛', id: '4014', name: '資源回收車', avaliable: getRandomInt(1, 100) },
      //     { type: '車輛', id: '4015', name: '照明車', avaliable: getRandomInt(1, 100) },
      //     { type: '車輛', id: '4016', name: '灑水車', avaliable: getRandomInt(1, 100) },
      //     { type: '車輛', id: '4017', name: '救生艇', avaliable: getRandomInt(1, 100) }
      //   ]
      // },
      // { 'name': 'Yakijo', 'manpower': 9, '消防車': 8, '救護車': 9, 'phone': '46-(199)135-3592', 'address': '5 Commercial Terrace', 'parent': null },
      // { 'name': 'Trilith', 'manpower': 8, '消防車': 3, '救護車': 5, 'phone': '505-(679)394-0537', 'address': '676 South Lane', 'parent': null },
      // { 'name': 'Kwideo', 'manpower': 15, '消防車': 4, '救護車': 20, 'phone': '594-(351)435-5993', 'address': '8 Del Mar Alley', 'parent': null },
      // { 'name': 'Photobean', 'manpower': 8, '消防車': 5, '救護車': 6, 'phone': '7-(407)221-1047', 'address': '97130 Lindbergh Plaza', 'parent': 'Yakijo' },
      // { 'name': 'Janyx', 'manpower': 18, '消防車': 11, '救護車': 18, 'phone': '389-(955)248-1777', 'address': '40 Springview Trail', 'parent': 'Yakijo' },
      // { 'name': 'Rooxo', 'manpower': 1, '消防車': 14, '救護車': 13, 'phone': '212-(507)619-3739', 'address': '37 Calypso Point', 'parent': 'Yakijo' },
      // { 'name': 'Edgeclub', 'manpower': 3, '消防車': 13, '救護車': 13, 'phone': '62-(811)299-0138', 'address': '51 Riverside Center', 'parent': 'Trilith' },
      // { 'name': 'Topdrive', 'manpower': 3, '消防車': 7, '救護車': 4, 'phone': '1-(276)779-4446', 'address': '21379 Portage Plaza', 'parent': 'Trilith' },
      // { 'name': 'Skibox', 'manpower': 11, '消防車': 2, '救護車': 15, 'phone': '54-(476)696-9666', 'address': '660 Autumn Leaf Lane', 'parent': 'Trilith' },
      // { 'name': 'Jabbercube', 'manpower': 3, '消防車': 20, '救護車': 20, 'phone': '62-(804)571-0945', 'address': '6 Lotheville Street', 'parent': 'Trilith' },
      // { 'name': 'Wikizz', 'manpower': 15, '消防車': 14, '救護車': 9, 'phone': '33-(852)986-2957', 'address': '5 Oakridge Alley', 'parent': 'Trilith' },
      // { 'name': 'Innojam', 'manpower': 5, '消防車': 8, '救護車': 18, 'phone': '86-(702)180-3704', 'address': '4363 Pierstorff Place', 'parent': 'Kwideo' },
      // { 'name': 'Pixoboo', 'manpower': 17, '消防車': 19, '救護車': 1, 'phone': '47-(117)573-6374', 'address': '77489 Alpine Center', 'parent': 'Kwideo' },
      // { 'name': 'Jaxnation', 'manpower': 19, '消防車': 5, '救護車': 19, 'phone': '62-(279)705-4909', 'address': '9 Parkside Street', 'parent': 'Kwideo' },
      // { 'name': 'Twitterwire', 'manpower': 2, '消防車': 5, '救護車': 11, 'phone': '63-(331)101-3884', 'address': '94203 Mcguire Alley', 'parent': 'Kwideo' },
      // { 'name': 'Wordpedia', 'manpower': 4, '消防車': 11, '救護車': 6, 'phone': '55-(734)135-4230', 'address': '10 Hanson Hill', 'parent': 'Photobean' },
      // { 'name': 'Browsecat', 'manpower': 17, '消防車': 15, '救護車': 19, 'phone': '7-(647)120-3679', 'address': '53 Moland Hill', 'parent': 'Photobean' },
      // { 'name': 'Camimbo', 'manpower': 17, '消防車': 16, '救護車': 16, 'phone': '46-(783)268-0601', 'address': '388 Hansons Trail', 'parent': 'Janyx' },
      // { 'name': 'Devpoint', 'manpower': 6, '消防車': 9, '救護車': 20, 'phone': '62-(555)311-1329', 'address': '7746 Mockingbird Point', 'parent': 'Janyx' },
      // { 'name': 'Twinder', 'manpower': 14, '消防車': 20, '救護車': 3, 'phone': '62-(993)618-2935', 'address': '8229 Huxley Junction', 'parent': 'Janyx' }
    ]
      .forEach(function (unit) {
        Units.insert(unit);
      });
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}