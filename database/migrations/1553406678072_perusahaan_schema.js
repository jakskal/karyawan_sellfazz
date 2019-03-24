'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PerusahaanSchema extends Schema {
  up () {
    this.create('perusahaans', (table) => {
      table.increments()
      table.integer('tdp').unsigned().notNullable().unique()
      table.string('nama').notNullable()
      table.integer('pemilik').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down(){
      this.drop('perusahaans')
  }
}

module.exports = PerusahaanSchema
