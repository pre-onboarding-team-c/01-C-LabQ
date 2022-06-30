const router = require('express').Router();
const { rainfallController } = require('../controllers');

router.get('/', rainfallController.getRainfall);

module.exports = router;
