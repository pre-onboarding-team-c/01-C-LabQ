const router = require('express').Router();
const { rainFallController } = require('../controllers');

router.get('/', rainFallController.getRainFall);

module.exports = router;
