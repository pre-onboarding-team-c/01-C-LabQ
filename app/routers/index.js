const router = require('express').Router();

const drainpipeRouter = require('./drainpipe.router');
const rainfallRouter = require('./rainfall.router');
const combinationRouter = require('./combination.router');

router.use('/drainpipes', drainpipeRouter);
router.use('/rainfalls', rainfallRouter);
router.use('/combinations', combinationRouter);

module.exports = router;
