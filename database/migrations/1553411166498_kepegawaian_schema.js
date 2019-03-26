'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KepegawaianSchema extends Schema {
  up () {
    this.create('kepegawaians', (table) => {
      table.integer('tdp').unsigned().references('tdp').inTable('perusahaans')
      table.integer('ktp').unsigned().references('ktp').inTable('users')
      table.enu('status',['sedang','telah']).defaultTo('sedang')
      table.timestamps()
    })
  }

  down () {
    this.drop('kepegawaians')
  }
}

module.exports = KepegawaianSchema
