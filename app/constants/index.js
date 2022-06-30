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

module.exports = {
  SERVICE_DRAINPIPEMONITORINGINFO,
  SERVICE_LISTRAINFALLSERVICE,
  COMMON_OPENAPI_URL,
  gus,
};
