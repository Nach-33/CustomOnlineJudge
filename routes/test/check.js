const express = require('express');
const router = express.Router({ mergeParams: true });

router.route('/').get((req, res) => {
    res.send('API Working');
})

module.exports = router