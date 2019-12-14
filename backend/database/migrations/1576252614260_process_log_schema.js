'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcessLogSchema extends Schema {
  up () {
    this.create('process_logs', (table) => {
      table.increments();
      table.bigInteger('user').notNullable();
      table.foreign('user').references('id').inTable('users');
      table.bigInteger('company_a').notNullable();
      table.bigInteger('company_b').notNullable();
      table.foreign('company_a').references('id').inTable('companies').onDelete('CASCADE');
      table.foreign('company_b').references('id').inTable('companies').onDelete('CASCADE');
      table.bigInteger('process_type').notNullable();
      table.foreign('process_type').references('id').inTable('process_types').onDelete('CASCADE');
      table.timestamps();
    })
  }

  down () {
    this.drop('process_logs')
  }
}

module.exports = ProcessLogSchema
