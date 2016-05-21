const ProductDispather  = require('../dispatchers/product-dispatcher'),
      assign            = require('object-assign'),
      Immutable         = require('immutable'),
      events            = require('events'),
      util              = require('util'),
      CHANGE_EVENT      = 'change';

class ParentProductStore {
    constructor() {
        events.EventEmitter.call(this);
    }
}

// 利用 util 模块使 ParentProductStore 继承 EventEmmiter
util.inherits(ParentProductStore, events.EventEmitter);

class ProductStore extends ParentProductStore {
    constructor(products) {
        super();

        this.products = products;
    }
    createProduct(product){
        this.products = this.products.set(product.id, product);
    }
    updateProduct(product){
        this.products = this.products.set(product.id, product);
    }
    deleteProduct(id){
        this.products = this.products.remove(id);
    }
    getAllProducts(){
        return this.products;
    }
    emitChange(){
        this.emit(CHANGE_EVENT);
    }
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }
}

module.exports = new ProductStore(
    Immutable.Map({
        '12d45a95-1630-44ec-93f2-473680a06dfa': {
            id: '12d45a95-1630-44ec-93f2-473680a06dfa',
            name: 'abc',
            model: 'def',
            status: 'using'
        },
        'bf2b8840-0307-4fa7-8369-a2d26874e8f5': {
            id: 'bf2b8840-0307-4fa7-8369-a2d26874e8f5',
            name: 'fgh',
            model: 'lmn',
            status: 'scrapped'
        }
    })
);
