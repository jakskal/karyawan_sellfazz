'use strict'

const { trait, test } = use('Test/Suite')('Kepegawaian')
const User = use('App/Models/User')
const Kepegawaian = use('App/Models/Kepegawaian')

trait('Test/ApiClient')
trait('Auth/Client')

function failOnError(params) {
  if(params){
    console.log("error = ", params);
  }
}

const data = {
  user_id : 5
}
let saveData = {
  tdp : 11,
  status : "sedang"
}
let upData = {
  status : "telah",
  tdp : 11
}

test('create kepegawaian', async ({ assert, client }) => { 
  const user = await User.find(data.user_id)
  saveData.ktp = user.ktp
  const response = await client
  .post('api/v1/kepegawaian')
  .loginVia(user,'jwt')
  .send(saveData)
  .end()
  failOnError(response.error)
  response.assertStatus(201)
  response.assertJSONSubset({
      tdp: saveData.tdp,
      ktp: saveData.ktp,
      status: "sedang",
  })
  
})

test('read kepegawaian', async ({ assert, client }) => { 
  const response = await client
  .get('api/v1/kepegawaian')
  .end()

  failOnError(response.error)
  response.assertStatus(200)
  response.body.forEach(element => {
    assert.isTrue(element.hasOwnProperty("tdp"))
    assert.isTrue(element.hasOwnProperty("nama"))
    assert.isTrue(element.hasOwnProperty("pemilik"))
    assert.isTrue(element.hasOwnProperty("kepegawaian"))
    element.kepegawaian.forEach(elem => {
      assert.isTrue(elem.hasOwnProperty("first_name"))
      assert.isTrue(elem.hasOwnProperty("last_name"))
      assert.isTrue(elem.hasOwnProperty("pivot"))
      assert.isTrue(elem.pivot.hasOwnProperty("tdp"))
      assert.isTrue(elem.pivot.hasOwnProperty("ktp"))
      assert.isTrue(elem.pivot.hasOwnProperty("status"))
      assert.isTrue(element.tdp == elem.pivot.tdp)
      assert.isTrue(elem.pivot.ktp == elem.ktp)
    })
  });
  
})

test('update kepegawaian', async ({ assert, client }) => { 
  const user = await User.find(data.user_id)
  const kepegawaian = await Kepegawaian.findBy({ktp: user.ktp, tdp:upData.tdp})
  
  const response = await client
  .patch('api/v1/kepegawaian')
  .loginVia(user,'jwt')
  .send(upData)
  .end()

  failOnError(response.error)
  response.assertStatus(200)
  assert.isTrue(upData.status !== kepegawaian.status)
  if (upData.status !== kepegawaian.status){
    assert.isTrue(response.body !== upData.status )
  }
  
})

test('delete kepegawaian', async ({ assert, client }) => { 
  const user = await User.find(data.user_id)
  const kepegawaian = await Kepegawaian.findBy({ktp: user.ktp, tdp: upData.tdp})
  
  const response = await client
  .delete('api/v1/kepegawaian')
  .loginVia(user,'jwt')
  .send(upData)
  .end()

  failOnError(response.error)
  response.assertStatus(200)
  response.assertJSONSubset(
  {message:`succes remove user ${user.first_name} from kepegawaian perusahaan with tdp ${kepegawaian.tdp}`}
 )
  
})
