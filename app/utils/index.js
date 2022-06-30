const { COMMON_OPENAPI_URL } = require('../constants');

/**
 * OpenApi 의 기반 Url 을 반환합니다.
 * @param {string} service - 사용할 OpenApi 의 서비스 이름입니다.
 * @returns {string} - http://openAPI.seoul.go.kr:8088/{KEY}/{TYPE}/{SERVICE}
 */
const createCommonOpenApiUrl = service => `${COMMON_OPENAPI_URL}/${service}`;

/**
 * limit에 해당하는 startIndex 와 endIndex 를 반환합니다.
 * @param {number} limit 페이지를 의미합니다.
 * @returns {Array<number>} [startIndex, endIndex] 형식의 배열을 반환합니다.
 */
const getIndices = (limit = 1) => {
  const startIndex = ((limit || 1) - 1) * 10 + 1;
  const endIndex = startIndex + 9;

  return [startIndex, endIndex];
};

module.exports = {
  createCommonOpenApiUrl,
  getIndices,
};
