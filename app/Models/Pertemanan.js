'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pertemanan extends Model {
    // user(){
    //     return this.belongsToMany('App/models/User','ktp_user','ktp','ktp_teman','ktp')
    //     .pivotModel('App/models/User')
    // }
}

module.exports = Pertemanan
