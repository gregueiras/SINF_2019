"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProcessedFileSchema extends Schema {
  up() {
    this.create("processed_files", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users").onDelete('CASCADE');

      table.uuid("file_id").unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("processed_files");
  }
}

module.exports = ProcessedFileSchema;
