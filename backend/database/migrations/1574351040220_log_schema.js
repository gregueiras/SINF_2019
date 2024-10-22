'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogSchema extends Schema {
  up () {
    this.create('logs', (table) => {
      table.increments()
      table.enum('state',['Completed','Pending','In Progress','Failed'])
      table.string('description',256).notNullable()
      table.date('date').notNullable()
      table.bigInteger('process_id').notNullable()
      table.foreign('process_id').references('id').inTable('processes')
      table.timestamps()
    })
  }

  down () {
    this.drop('logs')
  }
}

module.exports = LogSchema
