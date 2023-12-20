const mongoose = require('mongoose');

async function connect() {
    try {
        // Các field được chỉ định trong Schema sẽ được save vào DB & tất cả các field khác không được lưu khi các field khác được gửi
        // Bạn phải cài đặt strict là true thủ công kể từ phiên bản v7 của Mongoose
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect Successful!');
    } catch (error) {
        console.log('Connect Fail!');
    }
}

module.exports = { connect };
