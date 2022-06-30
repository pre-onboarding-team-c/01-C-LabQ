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

module.exports = {
  createCommonOpenApiUrl,
  getIndices,
  drainpipeAmounts,
};
