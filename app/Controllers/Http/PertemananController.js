'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Pertemanan = use('App/Models/Pertemanan')
const User = use('App/Models/User')
const Database = use('Database')
const AuthorizationService = use('App/Services/AuthorizationService')
const ValidationService = use('App/Services/ValidationService')


/**
 * Resourceful controller for interacting with pertemanans
 */
class PertemananController {
  /**
   * Show a list of all pertemanans.
   * GET pertemanans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {ktp,status,teman} = request.get()
    if(ktp&& !status && !teman){
      const pertemanan = await Database.table('pertemanans').select('ktp_user','ktp_teman','status')
      .innerJoin('users','users.ktp','pertemanans.ktp_teman')
      .where({ktp_user:ktp}).select('ktp','first_name','last_name')
      return pertemanan
    }else if(ktp && status && !teman){
      const pertemanan = await Database.table('pertemanans').select('ktp_user','ktp_teman','status')
      .innerJoin('users','users.ktp','pertemanans.ktp_teman')
      .where({ktp_user:ktp,status}).select('ktp','first_name','last_name')
      return pertemanan
    }else if(ktp && teman && !status){
      console.log('here');
      if (teman !== "bukan"){
        return {message:"perintah tidak diketahui, untuk mencari teman-temanya teman teman yang bukan teman teman silahkan masukan nilai query ktp=@ktp&teman=bukan"}
      }
      const subquery = Database.select('ktp_teman').from('pertemanans').where('ktp_user',ktp)
      let pertemanan = await Database.from('pertemanans as T1').join('pertemanans as T2',function(){
        this.on('T1.ktp_teman','T2.ktp_user')
      }).select('T2.ktp_teman').where((builder)=>builder.whereNotIn('T2.ktp_teman',subquery).andWhereNot('T2.ktp_teman',ktp)).andWhere('T1.ktp_user',ktp)
      .join('users','T2.ktp_teman','users.ktp').select('first_name','last_name')
      
      return pertemanan
    }
  const pertemanan =  await Pertemanan.all()
  return pertemanan
  }

  /**
   * Render a form to be used for creating a new pertemanan.
   * GET pertemanans/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, auth }) {
    const user = await auth.getUser()
    const {ktp_teman} = request.all()
    const exist = await Pertemanan.findBy({ktp_teman,ktp_user:user.ktp})
    if(exist){
      return {"message":"pertemanan sudah ada"}
    }
    const pertemanan = new Pertemanan()
    pertemanan.fill({
      ktp_user:user.ktp,
      ktp_teman,
    })
    await pertemanan.save()
    return {message:`permintaan pertemanan terkirim`}
  }


  /**
   * Update pertemanan details.
   * PUT or PATCH pertemanans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth }) {
    const user = await auth.getUser();
    const { ktp_teman, status} = request.all();
    ValidationService.pertemananStatusValidation(status)
    const pertemanan = await Pertemanan.findBy({ktp_user:user.ktp,ktp_teman});
    AuthorizationService.verifyPertemanan(pertemanan, user)
    const update = await Pertemanan.query().where({ktp_user:user.ktp,ktp_teman}).update({status})
    if(update==0){
      return {message:"update pertemanan gagal"}
    }
    return await Pertemanan.findBy({ktp_user:user.ktp,ktp_teman});
  }

  /**
   * Delete a pertemanan with id.
   * DELETE pertemanans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, auth }) {
    const user = await auth.getUser();
    const {ktp_teman} = request.all();
    const pertemanan = await Pertemanan.findBy({ktp_user:user.ktp,ktp_teman});
    AuthorizationService.verifyPertemanan(pertemanan, user)
    await Pertemanan.query().where({ktp_user:user.ktp,ktp_teman}).delete()
    return pertemanan
  }

  async permintaan ({auth}){
    const user = await auth.getUser();
    const permintaan = await Pertemanan.findBy({ktp_teman:user.ktp,status:"menunggu"})
    if(!permintaan){
      return {message:"tidak ada permintaan pertemanan"}
    }
    return permintaan
  }
  async terimaPermintaan({request, auth}){
    const user = await auth.getUser();
    const {ktp_teman} = request.all()
    const permintaan = await Pertemanan.query().where({ktp_teman:user.ktp,status:"menunggu"})
                              .update({status:"teman"})
    if (!permintaan){
      return {message:"penerimaan gagal"}
    }
    const temanBaru = new Pertemanan()
    temanBaru.fill({ktp_teman,ktp_user:user.ktp,status:"teman"})
    await temanBaru.save()

    return {message:"teman berhasil ditambahkan"}
  }

}

module.exports = PertemananController
