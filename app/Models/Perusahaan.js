'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Perusahaan extends Model {
    kepegawaian(){
        return this
        .belongsToMany('App/models/User','tdp','ktp','tdp','ktp')
        .pivotModel('App/models/kepegawaian')
        .withPivot(['status'])
      }
    user(){
      return this
      .belongsTo('App/Models/User','pemilik','id')
    }
}

module.exports = Perusahaan
