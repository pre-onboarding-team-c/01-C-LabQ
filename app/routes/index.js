const router = require('express').Router();

const drainPipeRouter = require('./drainpipe');
const rainFall = require('./rainfall');
const combination = require('./combination');

router.use('/drainpipes', drainPipeRouter);
router.use('/rainfalls', rainFall);
router.use('/combinations', combination);

module.exports = router;
