const router = require('express').Router();
// const { drainPipeController } = require('../controllers');

// router.get('/', drainPipeController.getDrainPipe);
router.get('/', (req, res, next) => {
  const { gubn, limit, meaYmd, meaYmd2 } = req.query;
  console.log('gubn : ', gubn);
  console.log('limit : ', limit);
  console.log('meaYmd: ', meaYmd);
  console.log('meaYmd2: ', meaYmd2);
});

module.exports = router;
