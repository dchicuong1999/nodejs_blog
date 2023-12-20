const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /home
    home(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
        console.log(req.body);
        // console.log(req.query.q);
        // console.log(req.query.ref);
        // console.log(req.query.author);
    }

    // [GET] /contact
    contact(req, res) {
        res.send('CONTACT PAGE!!!');
    }
}

module.exports = new SiteController();
