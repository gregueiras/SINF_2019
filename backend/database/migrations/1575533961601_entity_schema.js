'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntitySchema extends Schema {
  up () {
    this.create('entities', (table) => {
      table.increments()
      table.string('id_company_a',256).notNullable(),
      table.string('id_company_b',256).notNullable(),
      table.bigInteger('company_a')
      table.foreign('company_a').references('id').inTable('companies').onDelete('CASCADE')
      table.bigInteger('company_b')
      table.foreign('company_b').references('id').inTable('companies').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('entities')
  }
}

module.exports = EntitySchema
