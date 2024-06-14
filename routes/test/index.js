const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/check', require('./check'));

module.exports = router;
