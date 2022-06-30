const { rainFallService } = require('../services');

const getRainFall = async (req, res) => {
  try {
    const {
      params: { limit, guName },
    } = req;

    const startIndex = ((limit || 1) - 1) * 10 + 1;
    const endIndex = startIndex + 9;
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
