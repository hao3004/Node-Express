const db = require('../db');

module.exports = {
    index: (req, res, next) => {
        var page = parseInt(req.query.page) || 1;
        // Note: 
        //     Pagination:
        //         [ 0, 1, 2, 3, 4, 5  ...]
        //             Page1   Page2   ...
        //         Items in Page n, with x items/page
        //         Begin  = (n-1)*n
        //         End    = (n-1)*x + x
        //     => Items = array.slice(begin,end)
        var perPage = 8;
        var start = (page -1)*perPage;
        var end = perPage*page
        // biến drop là dùng cho cách 2
        // var drop = (page - 1) + perPage;
        res.render('products/index', {
            products: db.get('products').value().slice(start,end)
            //thư viện lowdash được dùng nh trong node
            // products: db.get('products').drop(drop).take(perPage).value()
        });
    }
}