const productStore      = require('./../store/product-store'),
      ProductConstants  = require('./../constants/product-constants'),
      Dispatcher        = require('flux').Dispatcher;

let productDispatcher = new Dispatcher();

productDispatcher.register((action) => {
  switch (action.actionType) {
    case ProductConstants.CREATE:
      productStore.createProduct(action.product);
      productStore.emitChange();

      break;

    case ProductConstants.UPDATE:
      productStore.updateProduct(action.product);
      productStore.emitChange();

      break;

    case ProductConstants.DELETE:
      productStore.deleteProduct(action.id);
      productStore.emitChange();

      break;

    default:
  }
});

module.exports = productDispatcher;
