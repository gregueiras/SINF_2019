'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcessTypeSchema extends Schema {
  up () {
    this.create('process_types', (table) => {
      table.increments()
      table.bigInteger('user').notNullable();
      table.foreign('user').references('id').inTable('users').onDelete('CASCADE');
      table.string('type',256).unique().notNullable();
      table.string('descriptionA',256).notNullable();
      table.string('descriptionB',256).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('process_types')
  }
}

module.exports = ProcessTypeSchema
