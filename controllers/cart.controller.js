const db = require('../db');

module.exports = {
    addToCart: (req, res, next) => {
        var productID = req.params.productID;
        var sessionID = req.signedCookies.sessionID;
        if (!sessionID) {
            res.redirect('/products');
            return;
        }

        var count = db.get('sessions')
            .find({ id: sessionID})
            .get('cart.' + productID, 0)
            .value();

        db.get('sessions')
            .find({ id: sessionID})
            .set('cart.' + productID, count + 1)
            .write();

        var gePproductQuantity = db.get('sessions').find({ id: sessionID}).value();
        var productCart = Object.values(gePproductQuantity.cart).length;
        console.log(productCart);
        // WANT TO IN SỐ LƯỢNG RA MÀN HÌNH NHƯNG KO BIẾT TRUYỀN ĐI ĐÂU :< :<
        res.redirect('/products');
    }
    
}