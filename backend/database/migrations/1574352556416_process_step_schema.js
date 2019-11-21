'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcessStepSchema extends Schema {
  up () {
    this.create('process_steps', (table) => {
      table.increments()
      table.bigInteger('process_id').notNullable()
      table.foreign('process_id').references('id').inTable('processes')
      table.bigInteger('step_id').notNullable()
      table.foreign('step_id').references('id').inTable('steps')
      table.timestamps()
    })
  }

  down () {
    this.drop('process_steps')
  }
}

module.exports = ProcessStepSchema
