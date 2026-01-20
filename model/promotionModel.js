var db = require('./databaseConfig.js');

var promotionDB = {

    getPromotions: function(countryId) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(err => {
                if (err) {
                    conn.end();
                    return reject(err);
                }

                var sql = `
SELECT DISTINCT 
    i.SKU,
    i.NAME,
    ic.RETAILPRICE AS originalPrice,
    p.DISCOUNTRATE,
    p.STARTDATE,
    p.ENDDATE,
    p.IMAGEURL
FROM promotionentity p
JOIN itementity i ON p.ITEM_ID = i.ID
JOIN item_countryentity ic ON i.ID = ic.ITEM_ID
WHERE ic.COUNTRY_ID = ?
  AND CURDATE() BETWEEN p.STARTDATE AND p.ENDDATE
  AND i.ISDELETED = 0

                `;

                conn.query(sql, [countryId], (err, result) => {
                    conn.end();
                    if (err) return reject(err);

                    // Calculate promo price in backend (BEST PRACTICE)
                    var promotions = result.map(r => ({
                        sku: r.SKU,
                        name: r.NAME,
                        originalPrice: r.originalPrice,
                        discountRate: r.DISCOUNTRATE,
                        promoPrice: Math.round(
                            r.originalPrice * (1 - r.DISCOUNTRATE / 100)
                        ),
                        startDate: r.STARTDATE,
                        endDate: r.ENDDATE,
                        imageURL: r.IMAGEURL.replace('/IS3102_Project-war', '')
                    }));

                    resolve(promotions);
                });
            });
        });
    }
};

module.exports = promotionDB;
