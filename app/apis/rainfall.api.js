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
