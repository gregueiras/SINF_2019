'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcessLogSchema extends Schema {
  up () {
    this.create('process_logs', (table) => {
      table.increments();
      table.timestamps();
    })
  }

  down () {
    this.drop('process_logs')
  }
}

module.exports = ProcessLogSchema
