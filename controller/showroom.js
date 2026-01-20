// var express = require('express');
// var router = express.Router();
// var showroomDB = require('../model/showroom.js');

// // Get all showroom categories
// router.get('/getShowroomCategories', (req, res) => {
//     var countryId = req.query.countryId;
//     showroomDB.getCategories(countryId)
//     .then(categories => res.json(categories))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({ error: 'Failed to fetch categories' });
//     });
// });

// // Get all showroom items for a category
// router.get('/getShowroomByCategory', (req, res) => {
//     var countryId = req.query.countryId;
//     var category = req.query.cat;
//     showroomDB.getItemsByCategory(category, countryId)
//     .then(items => res.json(items))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({ error: 'Failed to fetch showroom items' });
//     });
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
var showroomDB = require('../model/showroom.js'); // your db methods

router.get('/getShowroomCategories', (req, res) => {
    showroomDB.getCategories()
        .then(result => res.json(result))
        .catch(err => {
            console.error(err);
            res.status(500).send("Error retrieving showroom categories");
        });
});

router.get('/getScenesByCategory', (req, res) => {
    var category = req.query.category;
    showroomDB.getScenesByCategory(category)
        .then(result => res.json(result))
        .catch(err => {
            console.error(err);
            res.status(500).send("Error retrieving showroom scenes");
        });
});

router.get('/getSceneItems', (req, res) => {
    var sceneId = req.query.sceneId;
    showroomDB.getSceneItems(sceneId)
        .then(result => res.json(result))
        .catch(err => {
            console.error(err);
            res.status(500).send("Error retrieving showroom items");
        });
});

module.exports = router;
