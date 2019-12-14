'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcessLogStepSchema extends Schema {
  up () {
    this.create('process_log_steps', (table) => {
      table.increments()
      table.integer('step_no').notNullable()
      table.string("state", 256).notNullable();
      table.bigInteger("process_log_id").notNullable();
      table.foreign('process_log_id').references('id').inTable('process_logs').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('process_log_steps')
  }
}

module.exports = ProcessLogStepSchema
