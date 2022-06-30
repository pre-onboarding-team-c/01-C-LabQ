const { combinationService } = require('../services');

const getCombinedData = async (req, res) => {
  const {
    query: { limit, gubn, meaYmd, meaYmd2 },
  } = req;

  const combinedData = await combinationService.getCombinedData(limit || 1, gubn || '01', meaYmd, meaYmd2);

  res.status(200).json(combinedData);
};

module.exports = {
  getCombinedData,
};
