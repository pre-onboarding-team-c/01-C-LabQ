const { rainFallService } = require('../services');

const getRainFall = async (req, res) => {
  // 어떤 방식으로 할지 고민
  // const { body: { startIndex, endIndex, guName, }, } = req;
  // const { params: { startIndex, endIndex, guName, }, } = req;
  // const { query: { startIndex, endIndex, guName, }, } = req;
  // const rainFall = await rainFallService.getRainFall(
  //   startIndex,
  //   endIndex,
  //   guName,
  // );
  // res.json(rainFall);
};

module.exports = {
  getRainFall,
};
