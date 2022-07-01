const { combinationService } = require('../services');

/**
 * 작성자 : 김지유
 */
const getCombinedData = async (req, res) => {
  const combinedData = await combinationService.getCombinedData('12');

  res.status(200).json(combinedData);
};

module.exports = {
  getCombinedData,
};
