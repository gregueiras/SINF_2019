'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique();
      table.string('tenant', 80).notNullable().unique();
      table.string('organization', 80).notNullable();
      table.string('clientId',80).notNullable();
      table.string('clientSecret',80).notNullable();
      table.string('token', 1500);
      table.bigInteger('expires');
      table.timestamps()
    })
  }
  down () {
    this.drop('companies');
  }
}

module.exports = CompanySchema
