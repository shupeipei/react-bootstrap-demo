/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

// 设置端口
app.set('port', (process.env.PORT || 3000));

// 设置项目根目录
app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/product', function(req, res) {
    fs.readFile('products.json', function(err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// 新增产品
app.post('/product', function(req, res) {
    fs.readFile('products.json', function(err, data) {
        var products = JSON.parse(data);
        products.push(req.body);
        fs.writeFile('products.json', JSON.stringify(products, null, 4), function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache');
            res.send(JSON.stringify(products));
        });
    });
});

// 删除产品
app.post('/product-del', function(req, res) {
    fs.readFile('products.json', function(err, data) {
        var products, newProducts;

        products = JSON.parse(data);
        newProducts = [];

        for (var i = 0; i < products.length; i++) {
            if (products[i].id !== req.body.id) {
                newProducts.push(products[i]);
            }
        };

        fs.writeFile('products.json', JSON.stringify(newProducts, null, 4), function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache');
            res.send(JSON.stringify(products));
        });
    });
});

// 修改产品
app.put('/product', function(req, res) {
    fs.readFile('products.json', function(err, data) {
        var products, newProducts;

        products = JSON.parse(data);
        newProducts = [];

        for (var i = 0; i < products.length; i++) {
            if (products[i].id === req.body.id) {
                newProducts.push(req.body);
            } else {
                newProducts.push(products[i]);
            }
        };

        fs.writeFile('products.json', JSON.stringify(newProducts, null, 4), function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache');
            res.send(JSON.stringify(products));
        });
    });
});

// 更新产品库
app.post('/product-refresh', function(req, res) {
    fs.writeFile('products.json', JSON.stringify(JSON.parse(req.body), null, 4), function(err) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache');
        res.send(JSON.stringify(products));
    });
});

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
