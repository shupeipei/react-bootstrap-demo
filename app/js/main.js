var React      = require('react');
var ProductBox = require('./components/product-box');

// 为所有字符串对象添加去前后空格函数
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

React.render(
    <ProductBox />,
    document.body
);
