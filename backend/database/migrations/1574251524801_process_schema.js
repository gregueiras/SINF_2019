'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcessSchema extends Schema {
  up () {
    this.create('processes', (table) => {
      table.increments();
      table.string('description',256);
      table.bigInteger('user').notNullable();
      table.foreign('user').references('id').inTable('users');
      table.bigInteger('company_a').notNullable();
      table.bigInteger('company_b').notNullable();
      table.bigInteger('process_type').notNullable();
      table.foreign('company_a').references('id').inTable('companies');
      table.foreign('company_b').references('id').inTable('companies');
      table.foreign('process_type').references('id').inTable('process_types');
      table.timestamps();
    })
  }

  down () {
    this.drop('processes')
  }
}

module.exports = ProcessSchema
