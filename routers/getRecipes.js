const express = require('express');
const router = express.Router();
const { getRecipes } = require('../utils/index');
const { watchSearchForm } = require('../script');

router.get('/', (req, res) => {
    watchSearchForm();
    res.sendStatus(200);
    console.log('Router working');
});

module.exports = router;