const { COMMON_OPENAPI_URL } = require('../constants');

/**
 * 작성자 : 김지유
 * OpenApi 의 기반 Url 을 반환합니다.
 * @param {string} service - 사용할 OpenApi 의 서비스 이름입니다.
 * @returns {string} - http://openAPI.seoul.go.kr:8088/{KEY}/{TYPE}/{SERVICE}
 */
const createCommonOpenApiUrl = service => `${COMMON_OPENAPI_URL}/${service}`;

/**
 * 작성자 : 김지유
 * limit에 해당하는 startIndex 와 endIndex 를 반환합니다.
 * @param {number} limit 페이지를 의미합니다.
 * @returns {Array<number>} [startIndex, endIndex] 형식의 배열을 반환합니다.
 */
const getIndices = (limit = 1, option = 1) => {
  const startIndex = ((limit || 1) - 1) * 10 * option + 1;
  const endIndex = startIndex + 10 * option - 1;

  return [startIndex, endIndex];
};

/**
 * 작성자 : 김지유
 * 각 구분코드 별 하수관로 갯수 목록입니다.
 */
const drainpipeAmounts = {
  '01': 4,
  '02': 5,
  '03': 9,
  '04': 11,
  '05': 12,
  '06': 14,
  '07': 8,
  '08': 5,
  '09': 2,
  10: 9,
  11: 11,
  12: 8,
  13: 11,
  14: 20,
  15: 12,
  16: 14,
  17: 13,
  18: 8,
  19: 12,
  20: 26,
  21: 7,
  22: 14,
  23: 21,
  24: 2,
  25: 6,
};

/**
 * 작성자 : 김영우
 * TYPE이 XML인지 파악
 * @param {Object | string} data - Open API로 받은 데이터
 * @returns {boolean}
 */
const isTypeXml = data => {
  const regex = /<([^>]+)>/gi;
  const result = regex.test(data);

  return result;
};

const numberToDateString = (number, isYear = false) => String(number).padStart(isYear ? 4 : 2, 0);

/**
 * 작성자 : 김지유
 * YYYYMMDDhhmm 형식의 숫자로 이루어진 12자리 문자열의 시간 계산을 도와주는 함수이다.
 * @param {string} time YYYYMMDDhhmm 형식의 숫자로 이루어진 12자리 문자열
 * @param {number} calc 더할 시간(단위 : 분), 빼고 싶다면 음수를 입력하면 된다.
 * @returns {string} YYYYMMDDhhmm 형식의 숫자로 이루어진 12자리 문자열
 */
const calculateTime = (time, calc) => {
  const dateTime = new Date(time.slice(0, 4), time.slice(4, 6) - 1, time.slice(6, 8), time.slice(8, 10), time.slice(10));

  dateTime.setMinutes(dateTime.getMinutes() + calc);

  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  return numberToDateString(year, true) + numberToDateString(month) + numberToDateString(date) + numberToDateString(hours) + numberToDateString(minutes);
};

module.exports = {
  createCommonOpenApiUrl,
  getIndices,
  drainpipeAmounts,
  isTypeXml,
  calculateTime,
  numberToDateString,
};
