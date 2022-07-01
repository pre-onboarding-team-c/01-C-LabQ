/**
 * 작성자 : 김지유
 * 순수 Open Api 를 분리해놨습니다.
 */
const { default: axios } = require('axios');
const { createCommonOpenApiUrl } = require('../utils');
const { SERVICE_LISTRAINFALLSERVICE } = require('../constants');

const rainfallInstance = axios.create({
  baseURL: createCommonOpenApiUrl(SERVICE_LISTRAINFALLSERVICE),
});

const getRainfall = async (startIndex, endIndex, guName) => {
  const response = await rainfallInstance.get(`${startIndex}/${endIndex}/${guName}`);

  return response;
};

module.exports = {
  getRainfall,
};
