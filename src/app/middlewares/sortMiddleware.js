module.exports = function sortMiddleware(req, res, next) {
    // res.locals: Cho phép đặt các biến => Xử lý & hiển thị các thông tin như đường dẫn, 
    // path name, authenticated user, user settings,... được hiển thị trong ứng dụng.
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };

    if (req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enabled = true;
        // res.locals._sort.column = req.query.column;
        // res.locals._sort.type = req.query.type;

        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        })
    };

    next();
}