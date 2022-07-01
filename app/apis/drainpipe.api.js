const { default: axios } = require('axios');
const { createCommonOpenApiUrl } = require('../utils');
const { SERVICE_DRAINPIPEMONITORINGINFO } = require('../constants');

const drainpipeInstance = axios.create({
  baseURL: createCommonOpenApiUrl(SERVICE_DRAINPIPEMONITORINGINFO),
});

const getDrainpipe = async (startIndex, endIndex, gubn, meaYmd, meaYmd2) => {
  const response = await drainpipeInstance.get(`${startIndex}/${endIndex}/${gubn}/${meaYmd}/${meaYmd2}`);

  return response;
};

module.exports = {
  getDrainpipe,
};
