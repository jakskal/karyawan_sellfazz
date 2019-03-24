'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KepegawaianSchema extends Schema {
  up () {
    this.create('kepegawaians', (table) => {
      table.integer('tdp').unsigned().references('tdp').inTable('perusahaans')
      table.integer('ektp').unsigned().references('ektp').inTable('perusahaans')
      table.enu('status',['sedang','telah']).defaultTo('sedang')
      table.timestamps()
    })
  }

  down () {
    this.drop('kepegawaians')
  }
}

module.exports = KepegawaianSchema
