const { drainpipeService } = require('../services');

module.exports = {
  /**
   * 작성자 황시우
   * 부 작성자 : 김지유
   */
  getDrainpipe: async (req, res) => {
    const { limit, gubn, meaYmd, meaYmd2 } = req.query;

    const drainpipe = await drainpipeService.getDrainpipe(limit || 1, gubn || '01', meaYmd, meaYmd2);

    res.status(200).json(drainpipe);
  },
};
