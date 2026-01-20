var express = require('express');
var router = express.Router();
var promotionDB = require('../model/promotionModel.js');

router.get('/getPromotions', (req, res) => {
    var countryId = req.query.countryId;

    promotionDB.getPromotions(countryId)
    .then(result => res.json(result))
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch promotions' });
    });
});

module.exports = router;
