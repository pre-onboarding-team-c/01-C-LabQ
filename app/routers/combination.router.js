const router = require('express').Router();
const { combinationController } = require('../controllers');

router.get('/', combinationController.getCombinedData);

module.exports = router;
