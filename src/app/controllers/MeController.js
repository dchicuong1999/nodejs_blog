const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored
    stored(req, res) {
        res.send('This path .../me/stored !!!');
    }

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // res.json(res.locals._sort);
        let courseQuery = Course.find({});

        // Pagination
        let limitPerPage = 2;
        let currPage = req.params.page || 1;

        if (currPage < 1) {
            res.redirect('/me/stored/courses/page-1')
        }

        // Method skip(X): xác định sẽ lấy document => bỏ qua X các document trước đó.
        courseQuery
            .limit(limitPerPage)
            .skip((limitPerPage * (currPage - 1))); // Bỏ qua document ít nhất 1 page về trở về trước

        Promise.all([
            courseQuery.sortable(req), 
            Course.countDocumentsWithDeleted({ deleted: true }),
            Course.countDocuments(),
        ])
            .then(([courses, deletedCount, totalDocument]) => {
                const totalPage = Math.ceil(totalDocument/limitPerPage);

                if (currPage > totalPage || isNaN(currPage)) {
                    res.redirect('/me/stored/courses/page-1');
                } else {
                    res.render('me/stored-courses', {
                        courses: multipleMongooseToObject(courses),
                        deletedCount,
    
                        currPage,
                        totalDocument,
                        // Math.ceil => số nguyên nhỏ nhất lớn hơn hoặc bằng một số đã cho (Làm tròn lên)
                        lastPage: Math.ceil(totalDocument/limitPerPage), 
                        //end
                    });
                }
            })
            .catch(next);

            
        // console.log(req.query.type, req.query.column)

        // Chức năng sắp xếp
        // if (req.query.hasOwnProperty('_sort')) {
        //     const isValidType = ['desc', 'asc'].includes(req.query.type);
            
        //     courseQuery = courseQuery.sort({
        //     Khi sử dụng 1 biến làm key cho Object đó => cho biến đó vào ngoặc vuông
        //         [req.query.column]: isValidType ? req.query.type : 'desc',
        //     })
        // }

        // Thêm chức năng sắp xếp từ helpers đối với những field cần thiết thay vì phải lặp lại
        // đoạn code như trên ở từng nơi khác nhau
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Promise.all([Course.findDeleted({}), Course.countDocumentsWithDeleted({ deleted: true })])
            .then(([courses, deletedCount]) => {
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                    deletedCount,
                });
            })
            .catch(next);
    }

    // [GET] /me/stored/blog
    storedBlog(req, res, next) {
        res.send('This path: /me/stored/blog');
    }

    // [GET] /news/:slug & // [GET] /me/stored/courses/:slug
    noResult(req, res, next) {
        res.send('OPS... NO RESULT! Please try again...');
    }
}

module.exports = new MeController();
