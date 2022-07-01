/**
 * 작성자 : 김지유
 */
const SERVICE_DRAINPIPEMONITORINGINFO = 'DrainpipeMonitoringInfo';
const SERVICE_LISTRAINFALLSERVICE = 'ListRainfallService';
const COMMON_OPENAPI_URL = `http://openAPI.seoul.go.kr:8088/${process.env.AUTHORIZATION_KEY}/json`;
const gus = [
  '강서',
  '양천',
  '구로',
  '금천',
  '영등포',
  '동작',
  '관악',
  '서초',
  '강남',
  '송파',
  '강동',
  '은평',
  '마포',
  '서대문',
  '종로',
  '중',
  '용산',
  '강북',
  '성북',
  '동대문',
  '성동',
  '노원',
  '중랑',
  '광진',
];

/**
 * 작성자 : 김지유
 * 각 구분코드 별 하수관로 구 이름과 갯수 목록입니다.
 */
const drainpipeInfos = {
  '01': {
    guName: '종로',
    amount: 4,
  },
  '02': {
    guName: '중',
    amount: 5,
  },
  '03': {
    guName: '용산',
    amount: 9,
  },
  '04': {
    guName: '성동',
    amount: 11,
  },
  '05': {
    guName: '광진',
    amount: 12,
  },
  '06': {
    guName: '동대문',
    amount: 14,
  },
  '07': {
    guName: '중랑',
    amount: 8,
  },
  '08': {
    guName: '성북',
    amount: 5,
  },
  '09': {
    guName: '강북',
    amount: 2,
  },
  10: {
    guName: '도봉',
    amount: 9,
  },
  11: {
    guName: '노원',
    amount: 11,
  },
  12: {
    guName: '은평',
    amount: 8,
  },
  13: {
    guName: '서대문',
    amount: 11,
  },
  14: {
    guName: '마포',
    amount: 20,
  },
  15: {
    guName: '양천',
    amount: 12,
  },
  16: {
    guName: '강서',
    amount: 14,
  },
  17: {
    guName: '구로',
    amount: 13,
  },
  18: {
    guName: '금천',
    amount: 8,
  },
  19: {
    guName: '영등포',
    amount: 12,
  },
  20: {
    guName: '동작',
    amount: 26,
  },
  21: {
    guName: '관악',
    amount: 7,
  },
  22: {
    guName: '서초',
    amount: 14,
  },
  23: {
    guName: '강남',
    amount: 21,
  },
  24: {
    guName: '송파',
    amount: 2,
  },
  25: {
    guName: '강동',
    amount: 6,
  },
};

const INFO_000 = 'INFO-000';

module.exports = {
  SERVICE_DRAINPIPEMONITORINGINFO,
  SERVICE_LISTRAINFALLSERVICE,
  COMMON_OPENAPI_URL,
  gus,
  drainpipeInfos,
  INFO_000,
};
