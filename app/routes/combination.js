const router = require('express').Router();
// const { combinationController } = require('../controllers');

// router.get('/', combinationController.getCombination);
router.get('/', (req, res, next) => {
  res.send('OK');
});

module.exports = router;
