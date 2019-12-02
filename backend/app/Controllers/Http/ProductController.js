'use strict'
const Product = use("App/Models/Product");

class ProductController {
  async index() {
    return Product.all();
  }
}

module.exports = ProductController
