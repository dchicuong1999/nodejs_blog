const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    nextPrevPage: (a, b) => Number(a) + Number(b),
    sortable: (field, sort) => {
        // field là tên của trường column => nơi mà bạn sắp xếp
        // sort = _sort => Các data truyền trên url(enabled, column, type) & có thể render ra views
        // _sort&column=name&type=asc === sort.enabled & sort.column & sort.type

        // Kiểm tra tính hợp lệ của sort.type truyền trên url => chỉ bao gồm desc & asc
        let isValidType = ['desc', 'asc'].includes(sort.type); // true/false
        
        // Check cái column đang click có trùng với cái sort.column đang truyền trên url
        // Đúng => Lấy theo sort.type truyền trên url đó & thay đổi icon
        // Sai => Lấy theo mặc định desc
        const sortType = field === sort.column ? (isValidType ? sort.type : 'desc') : 'default';

        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        // {{{giá trị}}} => html trả về dạng nguyên mẫu 
        // => Do đó cần dùng Handlebars.escapeExpression
        // và Handlebars.SafeString để bảo vệ đoạn mã tránh bị xâm nhập từ bên ngoài
        
        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

        const output = 
            `<a href="${href}">
                <span class="${icon}"></span>
            </a>`;
        return new Handlebars.SafeString(output);
    },
    
    // Pagination
    eachPaginate: (currPage, lastPage) => {           
        let tagPage = '';
        let currPageId = Number(currPage);

        for (let i = 1; i <= lastPage; i++) {
            const btnActive = currPageId === i ? 'btn-danger' : '';
            const styleActive = btnActive ? 'style="color: white; background:transparent;"' : '';
            
            tagPage += `<li class="page-item ${btnActive}">
                            <a class="page-link" ${styleActive} href="/me/stored/courses/page-${i}">
                                <span class="tag-id">${i}</span>
                            </a>
                        </li>`;
        }
        return tagPage;
    },
};