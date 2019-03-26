'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with perusahaans
 */

 const Perusahaan = use('App/Models/Perusahaan')
 const AuthorizationService = use('App/Services/AuthorizationService')

class PerusahaanController {
  /**
   * Show a list of all perusahaans.
   * GET perusahaans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const {perusahaan,tdp}=request.get()
    let {kepegawaian}=request.get()
    if (kepegawaian == "sedang/telah"||kepegawaian == "telah/sedang"){
      kepegawaian = ""
    }
    if(perusahaan){
      let result = await Perusahaan.query().where('nama','like',`%${perusahaan}%`).fetch()
      result = JSON.parse(JSON.stringify(result))
      if (result.length == 0){
        return {message:"resource not found"}
      }
      return result
    }else if(tdp && kepegawaian){
      let result = await Perusahaan.query().where({tdp}).with('kepegawaian',(builder)=>{
        builder.where({status:kepegawaian})
      }).fetch()
      result = JSON.parse(JSON.stringify(result))
      if (result.length == 0){
        return {message:"resource not found"}
      }
      return result
    }else if(tdp){
      let result = await Perusahaan.query().where({tdp}).with('kepegawaian').fetch()
      result = JSON.parse(JSON.stringify(result))
      if (result.length == 0){
        return {message:"resource not found"}
      }
      return result
    }
  return await Perusahaan.query().with('user').fetch()
  }

  /**
   * Render a form to be used for creating a new perusahaan.
   * GET perusahaans/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, auth }) {
    const user = await auth.getUser()
    const body = request.all()
    const perusahaan = new Perusahaan();
    perusahaan.fill(body)
    await user.perusahaan().save(perusahaan)
    return perusahaan
  
  }

  /**
   * Update perusahaan details.
   * PUT or PATCH perusahaans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth }) {
    const user = await auth.getUser();
    const {id} = params;
    const perusahaan = await Perusahaan.find(id);
    AuthorizationService.verifyPemilik(perusahaan, user)
    perusahaan.merge(request.only('nama'))
    await perusahaan.save()
    return perusahaan
  }

  /**
   * Delete a perusahaan with id.
   * DELETE perusahaans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const user = await auth.getUser();
    const {id} = params;
    const perusahaan = await Perusahaan.find(id);
    AuthorizationService.verifyPemilik(perusahaan, user)
    await perusahaan.delete();
    return perusahaan
  }
}

module.exports = PerusahaanController
