'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.bigInteger('user').notNullable()
      table.foreign('user').references('id').inTable('users')
      table.bigInteger('id_company_a')
      table.bigInteger('id_company_b')
      table.bigInteger('company_a')
      table.foreign('company_a').references('id').inTable('companies')
      table.bigInteger('company_b')
      table.foreign('company_b').references('id').inTable('companies')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
