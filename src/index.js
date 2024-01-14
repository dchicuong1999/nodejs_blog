const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

const sortMiddleware = require('./app/middlewares/sortMiddleware');
const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware xử lý dữ liệu từ form submit
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(methodOverride('_method'));

app.use(sortMiddleware); // Custom middleware

app.use(morgan('combined')); // HTTP logger

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.get('/middleware',
    function (req, res, next) {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            req.sign = 'PASS';
            return next();
        }
        res.status(403).json({
            Message: 'Access denied!'
        })
    },
    function (req, res, next) {
        res.json({
            Message: 'Successfully! Welcome...',
            sign: req.sign,
        });
    }
);