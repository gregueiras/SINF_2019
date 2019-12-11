'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcessProductSchema extends Schema {
  up () {
    this.create('process_products', (table) => {
      table.increments()
      table.bigInteger('process_id').notNullable()
      table.foreign('process_id').references('id').inTable('processes')
      table.bigInteger('product_id').notNullable()
      table.foreign('product_id').references('id').inTable('products')
      table.timestamps()
    })
  }

  down () {
    this.drop('process_products')
  }
}

module.exports = ProcessProductSchema
