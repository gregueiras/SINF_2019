'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StepSchema extends Schema {
  up () {
    this.create('steps', (table) => {
      table.increments()
      table.bigInteger('action_id').notNullable()
      table.foreign('action_id').references('id').inTable('actions')
      table.integer('step_no').notNullable()
      table.bigInteger('trigger_id').notNullable()
      table.foreign('trigger_id').references('id').inTable('triggers')

      table.timestamps()
    })
  }

  down () {
    this.drop('steps')
  }
}

module.exports = StepSchema
