const { rainFallService } = require('../services');
const { getIndices } = require('../utils');

/**
 * 작성자 : 김지유
 */
const getRainFall = async (req, res) => {
  try {
    const {
      params: { limit, guName },
    } = req;

    const [startIndex, endIndex] = getIndices(limit);
    const rainFall = await rainFallService.getRainFall(
      startIndex,
      endIndex,
      guName || '',
    );

    res.status(200).json(rainFall);
  } catch (err) {
    res.status(400);
    console.err(err);
  }
};

module.exports = {
  getRainFall,
};
