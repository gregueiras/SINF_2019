'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderCorrespondenceSchema extends Schema {
  up () {
    this.create('order_correspondences', (table) => {
      table.increments()
      table.string('purchase_order', 256);
      table.string('sales_order',256);
      table.timestamps()
    })
  }

  down () {
    this.drop('order_correspondences')
  }
}

module.exports = OrderCorrespondenceSchema
