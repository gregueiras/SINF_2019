'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcessTypeSchema extends Schema {
  up () {
    this.create('process_types', (table) => {
      table.increments()
      table.string('type',256)
      table.timestamps()
    })
  }

  down () {
    this.drop('process_types')
  }
}

module.exports = ProcessTypeSchema
