const { rainfallService } = require('../services');
const { getIndices } = require('../utils');

/**
 * 작성자 : 김지유
 */
const getRainfall = async (req, res, next) => {
  try {
    const {
      params: { limit, guName },
    } = req;

    const [startIndex, endIndex] = getIndices(limit);
    const rainfall = await rainfallService.getRainfall(
      startIndex,
      endIndex,
      guName || '',
    );

    res.status(200).json(rainfall);
  } catch (err) {
    res.status(400);
    next(err);
  }
};

module.exports = {
  getRainfall,
};
