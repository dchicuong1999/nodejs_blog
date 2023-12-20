class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/other-1
    other1(req, res) {
        res.send('OTHER PAGE 1');
    }

    // [GET] /news/other-2
    other2(req, res) {
        res.send('OTHER PAGE 2');
    }

    // [GET] /news/:slug
    noResult(req, res) {
        res.send('OPS... NO RESULT!!!');
    }
}

module.exports = new NewsController();
