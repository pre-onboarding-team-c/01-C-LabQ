const { rainfallService } = require('../services');

/**
 * 작성자 : 김지유
 */
const getRainfall = async (req, res) => {
  try {
    const {
      query: { limit, guName },
    } = req;

    const rainfall = await rainfallService.getRainfall(limit || 1, guName || '');

    res.status(200).json(rainfall);
  } catch (err) {
    res.status(400);
    console.err(err);
  }
};

module.exports = {
  getRainfall,
};
