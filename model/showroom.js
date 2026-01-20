// var db = require('./databaseConfig.js');

// var showroomDB = {

//     getCategories: function(countryId) {
//         return new Promise((resolve, reject) => {
//             var conn = db.getConnection();
//             conn.connect(err => {
//                 if(err){
//                     conn.end();
//                     return reject(err);
//                 }
// var sql = "SELECT DISTINCT i.CATEGORY " +
//           "FROM itementity i " +
//           "JOIN item_countryentity ic ON i.ID = ic.ITEM_ID " +
//           "WHERE ic.COUNTRY_ID = ? AND i.ISDELETED = 0 AND i.DTYPE = 'FurnitureEntity'";

//                 conn.query(sql, [countryId], (err, result) => {
//                     if(err){
//                         conn.end();
//                         return reject(err);
//                     }
//                     var categories = result.map(r => ({ name: r.CATEGORY }));
//                     conn.end();
//                     resolve(categories);
//                 });
//             });
//         });
//     },

//     getItemsByCategory: function(category, countryId) {
//     return new Promise((resolve, reject) => {
//         var conn = db.getConnection();
//         conn.connect(err => {
//             if (err) {
//                 conn.end();
//                 return reject(err);
//             }

//             var sql = `
//                 SELECT 
//                     i.SKU,
//                     i.NAME,
//                     i.DESCRIPTION,
//                     ic.RETAILPRICE,
//                     f.IMAGEURL
//                 FROM itementity i
//                 JOIN item_countryentity ic ON i.ID = ic.ITEM_ID
//                 JOIN furnitureentity f ON i.ID = f.ID
//                 WHERE ic.COUNTRY_ID = ?
//                   AND i.CATEGORY = ?
//                   AND i.ISDELETED = 0
//             `;

//             conn.query(sql, [countryId, category], (err, result) => {
//                 if (err) {
//                     conn.end();
//                     return reject(err);
//                 }

//                 var items = result.map(r => ({
//                     sku: r.SKU,
//                     name: r.NAME,
//                     description: r.DESCRIPTION,
//                     price: r.RETAILPRICE,
//                     imageURL: r.IMAGEURL   // ✅ REAL DB VALUE
//                 }));

//                 conn.end();
//                 resolve(items);
//             });
//         });
//     });
// }

// };

// module.exports = showroomDB;

var db = require('./databaseConfig.js');

var showroomDB = {

    getCategories: function () {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();

            conn.connect(err => {
                if (err) {
                    conn.end();
                    return reject(err);
                }

                var sql = `
                    SELECT DISTINCT category
                    FROM showroom_scene
                `;

                conn.query(sql, (err, result) => {
                    conn.end();
                    if (err) return reject(err);

                    resolve(result);
                });
            });
        });
    },

    getScenesByCategory: function(category) {
    return new Promise((resolve, reject) => {
        var conn = db.getConnection();
        conn.connect(err => {
            if (err) { conn.end(); return reject(err); }

            var sql = `
                SELECT id, title, image_path
                FROM showroom_scene
                WHERE category = ?
            `;
            conn.query(sql, [category], (err, result) => {
                conn.end();
                if (err) return reject(err);
                resolve(result);
            });
        });
    });
}
,

    getSceneItems: function (sceneId) {
    return new Promise((resolve, reject) => {
        var conn = db.getConnection();

        conn.connect(err => {
            if (err) {
                conn.end();
                return reject(err);
            }

            var sql = `
    SELECT 
        i.SKU,
        i.NAME,
        f.IMAGEURL
    FROM showroom_scene_item s
    JOIN itementity i
        ON s.product_sku = i.SKU
    LEFT JOIN furnitureentity f
        ON i.ID = f.ID
    WHERE s.scene_id = ?
`;


            conn.query(sql, [sceneId], (err, result) => {
                conn.end();
                if (err) return reject(err);

                resolve(result);
            });
        });
    });
}


};

module.exports = showroomDB;
