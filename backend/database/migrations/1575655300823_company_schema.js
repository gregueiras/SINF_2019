'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.table('companies', (table) => {
      table.string('token', 1500)
      table.bigInteger('expires')
    })
  }

  down () {
    this.table('companies', (table) => {
      table.dropColumn('token')
      table.dropColumn('expires')
    })
  }
}

module.exports = CompanySchema
