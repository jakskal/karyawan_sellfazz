'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with kepegawaians
 */
const Kepegawaian = use('App/Models/Kepegawaian')
const Pertemanan = use('App/Models/Pertemanan')
const User = use('App/Models/User')
const Perusahaan = use('App/Models/Perusahaan')
const ValidationService = use('App/Services/ValidationService')
const Database = use('Database')
class KepegawaianController {
  /**
   * Show a list of all kepegawaians.
   * GET kepegawaians
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params }) {
    return await Perusahaan.query().with('kepegawaian').fetch()
  }

  /**
   * Render a form to be used for creating a new kepegawaian.
   * GET kepegawaians/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, auth }) {
    const user = await auth.getUser()
    const {tdp,status} = request.all()
    if(!tdp){
      return {message:'tdp not exist'}
    }
    const kepegawaian = new Kepegawaian()
    kepegawaian.fill({
      tdp,
      ktp: user.ktp,
      status
    })
    await kepegawaian.save()
    await this.updatePertemanan(tdp,user,status)
 
  return kepegawaian
  }

  /**
   * Update kepegawaian details.
   * PUT or PATCH kepegawaians/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request, auth }) {
    const user = await auth.getUser();
    const {tdp, status} = request.all();
    const exist = await Kepegawaian.findBy({tdp,ktp:user.ktp})
    ValidationService.kepegawaianStatusValidation(exist,status)
    const kepegawaian = await Kepegawaian.query().where({ktp:user.ktp,tdp}).update({status})
    if(kepegawaian == 1){
      this.updatePertemanan(tdp,user,status)
      return {message:`success update kepegawaian ${user.first_name} perusahaan with tdp ${tdp} to ${status}`}
    }
    return {message:"update failed"}
  }

  async updatePertemanan(tdp,user,statuskerja){
    let status = "pernah bekerja sama"
    if (statuskerja == "sedang"){
      status = "teman kantor"
    }
    let daftarKaryawan = await Kepegawaian.query().where({tdp}).fetch()
    daftarKaryawan = JSON.parse(JSON.stringify(daftarKaryawan))
    let daftarKTP = daftarKaryawan.map(element=>{
      return element.ktp
    })
    for (let i = 0;i < daftarKTP.length;i++){
      if(daftarKTP[i] == user.ktp){
        continue
      }
      let pertemanan = await Pertemanan.findBy({ktp_teman:daftarKTP[i],ktp_user:user.ktp})
      if (!pertemanan){
        pertemanan = new Pertemanan()
        pertemanan.fill({ktp_teman:daftarKTP[i],ktp_user:user.ktp,status})
        await pertemanan.save()
      }else if(pertemanan){
        await Pertemanan.query().where({ktp_teman:daftarKTP[i],ktp_user:user.ktp}).update({status})
      }
  
      let pertemanan2 = await Pertemanan.findBy({ktp_teman:user.ktp,ktp_user:daftarKTP[i]})
      if (!pertemanan2){
        pertemanan2 = new Pertemanan()
        pertemanan2.fill({ktp_user:daftarKTP[i],ktp_teman:user.ktp,status})
        await pertemanan2.save()
      }else if(pertemanan){
        await Pertemanan.query().where({ktp_user:daftarKTP[i],ktp_teman:user.ktp}).update({status})
      }
    }
  }
  /**
   * Delete a kepegawaian with id.
   * DELETE kepegawaians/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, auth }) {
    const user = await auth.getUser();
    const {tdp} = request.all();
    const kepegawaian = await Kepegawaian.query().where({ktp:user.ktp,tdp}).delete()
    if (kepegawaian==1){
      await this.updatePertemanan(tdp,user,"telah")
      return {message:`succes remove user ${user.first_name} from kepegawaian perusahaan with tdp ${tdp}`}
    }
    return {message:`delete failed`}
  }


}

module.exports = KepegawaianController
