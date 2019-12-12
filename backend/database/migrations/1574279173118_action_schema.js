"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ActionSchema extends Schema {
  up() {
    this.create("actions", table => {
      table.increments();
      table.string("description", 256);
      table.string("type",256);
      table.bigInteger("trigger_id").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("actions");
  }
}

module.exports = ActionSchema;
