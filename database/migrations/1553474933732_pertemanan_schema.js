'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PertemananSchema extends Schema {
  up () {
    this.create('pertemanans', (table) => {
      table.integer('ktp_user').unsigned().notNullable().references('ktp').inTable('users')
      table.integer('ktp_teman').unsigned().notNullable().references('ktp').inTable('users')
      table.string('status').defaultTo('menunggu')
      table.timestamps()
    })
  }

  down () {
    this.drop('pertemanans')
  }
}

module.exports = PertemananSchema
