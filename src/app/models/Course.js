const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete'); // Chức năng sort deleted
const AutoIncrement = require('mongoose-sequence')(mongoose); // Tự động tăng _id trong DB

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: { type: Number, },
    name: { type: String, require: true, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    videoId: { type: String, maxLength: 255 },
    image: { type: String, },
    level: { type: String, maxLength: 255 },
    courseTotal: { type: Number, },
    timeTotal: { type: Number, },
    slug: { type: String, slug: 'name', unique: true },
}, {
    // _id: false để mongoDB không can thiệp vào bị biến đổi thành ObjectId
    _id: false,
    timestamps: true,
});

// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['desc', 'asc'].includes(req.query.type);
        
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
}

// Add plugin
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement); // Khi thêm khoá mới => Chọc vào DB => file counters
// => kiểm tra seq hiện tại => tăng dần || thay vì chọc vào DB lấy ra id dữ liệu mới nhất
// rồi cộng dần dễ gây giảm hiệu năng

CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);
