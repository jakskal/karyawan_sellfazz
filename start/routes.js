'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(()=>{
    Route.post('auth/login','Usercontroller.login')
    Route.post('auth/register','UserController.register');
    
    Route.get('user','UserController.index')
    Route.get('user/riwayat','UserController.riwayat')
    Route.delete('user','UserController.destroy').middleware(['auth'])
    Route.patch('user','UserController.update').middleware(['auth'])

    Route.get('perusahaan','PerusahaanController.index')
    Route.post('perusahaan','PerusahaanController.create').middleware(['auth'])
    Route.delete('perusahaan/:id','PerusahaanController.destroy').middleware(['auth'])
    Route.patch('perusahaan/:id','PerusahaanController.update').middleware(['auth'])

    Route.get('kepegawaian','KepegawaianController.index')
    Route.post('kepegawaian','KepegawaianController.create').middleware(['auth'])
    Route.delete('kepegawaian','KepegawaianController.destroy').middleware(['auth'])
    Route.patch('kepegawaian','KepegawaianController.update').middleware(['auth'])

    Route.get('pertemanan','PertemananController.index')
    Route.post('pertemanan','PertemananController.create').middleware(['auth'])
    Route.get('pertemanan/permintaan','PertemananController.permintaan').middleware(['auth'])
    Route.patch('pertemanan/terima','PertemananController.terimaPermintaan').middleware(['auth'])
    Route.delete('pertemanan','PertemananController.destroy').middleware(['auth'])
    Route.patch('pertemanan','PertemananController.update').middleware(['auth'])
}).prefix('api/v1');
