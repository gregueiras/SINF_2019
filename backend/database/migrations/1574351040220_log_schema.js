'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogSchema extends Schema {
  up () {
    this.create('logs', (table) => {
      table.increments()
      table.enu('state',['Completed','Pending','In Progress','Failed','Stopped'])
      table.string('description',256).notNullable()
      table.date('date').notNullable()
      table.bigInteger('process_id').notNullable()
      table.foreign('process_id').references('id').inTable('processes').onDelete('CASCADE')
      table.bigInteger('process_log_id').notNullable()
      //table.foreign('process_log_id').references('id').inTable('process_logs').onDelete('CASCADE')
      table.string('doc',256).defaultTo("");
      table.timestamps()
    })
  }

  down () {
    this.drop('logs')
  }
}

module.exports = LogSchema
