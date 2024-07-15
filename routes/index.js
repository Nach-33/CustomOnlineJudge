const express = require('express');
const router = express.Router();

router.use('/test', require('./test'));
router.use('/admin', require('./admin'));
router.use('/user', require('./user'));


module.exports = router;
