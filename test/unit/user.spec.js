'use strict'

const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')
trait('Test/ApiClient')
trait('Auth/Client')

function failOnError(params) {
  if(params){
    console.log("error = ", params);
  }
}
const data = {
  ktp: 1007,
  first_name: 'james007',
  last_name: 'bond007',
  username: 'james_bond007',
  password: '1234',
  email: 'jamesbond007@gmail.com'
}

const upData = {
  first_name: 'hanoman',
  last_name: 'siamang',
  email: 'james7@gmail.com'
}

test('create user', async ({ assert, client }) => { 

  const response = await client.post('api/v1/auth/register').send(data).end()
  // console.log(response.error);
  failOnError(response.error)
  response.assertStatus(201)
  response.assertJSONSubset({
      ktp:data.ktp,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email
  })
  
})

test('read all user', async ({ assert, client }) => {
    const response = await client.get('/api/v1/user').end()
  
  response.assertStatus(200)
  response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("id"))
    assert.isTrue(Element.hasOwnProperty("ktp"))
    assert.isTrue(Element.hasOwnProperty("first_name"))
    assert.isTrue(Element.hasOwnProperty("last_name"))
    assert.isTrue(Element.hasOwnProperty("email"))
    assert.isTrue(Element.hasOwnProperty("created_at"))
    assert.isTrue(Element.hasOwnProperty("updated_at"))
  })
})

test('update user', async ({assert, client}) =>{
  const user = await User.findBy({ktp:data.ktp})

  const response = await client
    .patch('api/v1/user')
    .loginVia(user,'jwt')
    .send(upData)
    .end()
  failOnError(response.error)
  response.assertStatus(200)
  assert.isTrue(upData.first_name !== user.first_name)
  if(upData.first_name !== user.first_name){
    assert.isTrue(response.body.first_name == upData.first_name)
  }

  assert.isTrue(upData.last_name !== user.last_name)
  if(upData.last_name !== user.last_name){
    assert.isTrue(response.body.last_name == upData.last_name)
  }
  
  assert.isTrue(upData.email !== user.email)
  if(upData.email !== user.email){
    assert.isTrue(response.body.email == upData.email)
  }

})

test('delete user', async({assert, client})=>{
let user = await User.findBy({ktp:data.ktp})

const response = await client
.delete('api/v1/user')
.loginVia(user, 'jwt')
.end()

user = JSON.parse(JSON.stringify(user))
response.assertStatus(200)
response.assertJSONSubset({
  deleted_user : user
})

})



test('login', async ({ assert, client }) => {
  const email = 'user1@gmail.com'
  const response = await client.post('api/v1/auth/login').accept('json').send({
    email, password: "1234"
  }).end()
  failOnError(response.error)

  response.assertStatus(200)
  assert.isTrue(response.body.hasOwnProperty('token'))

})

test('E => mencari karyawan berdasarkan nama', async({assert, client})=>{
  const first_name = `ang`
  const last_name = `sanusi12`
  const response = await client.get(`api/v1/user?first_name=${first_name}&lastname=${last_name}`).end()
  failOnError(response.error)

  response.assertStatus(200)
  response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("id"))
    assert.isTrue(Element.hasOwnProperty("ktp"))
    assert.isTrue(Element.hasOwnProperty("first_name"))
    assert.isTrue(Element.hasOwnProperty("last_name"))
    assert.isTrue(Element.hasOwnProperty("email"))
    assert.isTrue(Element.hasOwnProperty("created_at"))
    assert.isTrue(Element.hasOwnProperty("updated_at"))
  })

})

test('F => mencari informasi karyawan berdasarkan ktp karyawan', async({assert, client})=>{
  const ktp = 4
  const response = await client.get(`api/v1/user?ktp=${ktp}`).end()
  failOnError(response.error)

  response.assertStatus(200)
  assert.isTrue(response.body.hasOwnProperty("id"))
  assert.isTrue(response.body.hasOwnProperty("ktp"))
  assert.isTrue(response.body.hasOwnProperty("first_name"))
  assert.isTrue(response.body.hasOwnProperty("last_name"))
  assert.isTrue(response.body.hasOwnProperty("email"))
  assert.isTrue(response.body.hasOwnProperty("created_at"))
  assert.isTrue(response.body.hasOwnProperty("updated_at"))
})

test('G => mendapat riwayat pekerjaan karyawan berdasarkan ktp', async({assert, client})=>{
  const ktp = 2
  const response = await client.get(`api/v1/user/riwayat?ktp=${ktp}`).end()
  failOnError(response.error)

    response.assertStatus(200)
    response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("tdp"))
    assert.isTrue(Element.hasOwnProperty("nama"))
    assert.isTrue(Element.hasOwnProperty("pivot"))
    assert.isTrue(Element.pivot.hasOwnProperty("ktp"))
    assert.isTrue(Element.pivot.hasOwnProperty("tdp"))
    assert.isTrue(Element.pivot.hasOwnProperty("status"))
    assert.isTrue(Element.tdp == Element.pivot.tdp)
  })
})



