'use strict'

const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')
trait('Test/ApiClient')

function failOnError(params) {
  if(params){
    console.log("error = ", params);
  }
}

test('create user', async ({ assert, client }) => {
  const data = {
      ktp:7112,
      first_name: 'angling9912',
      last_name: 'zainuddin3',
      username: '991212354512',
      password: '1234',
      email: 'user991212354512@gmail.com'
    }
  

  const response = await client.post('api/v1/auth/register').send(data).end()
  failOnError(response.Error)
  response.assertStatus(200)
  response.assertJSONSubset({
      ktp:7112,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email
  })
  
})

test('get user', async ({ assert, client }) => {
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
  for (let i = 0; i < response.body.length; i++) {
    const element = response.body[i];
    assert.isTrue(element.hasOwnProperty("id"))
  }
})



test('login', async ({ assert, client }) => {
  const email = 'user1@gmail.com'
  const response = await client.post('api/v1/auth/login').accept('json').send({
    email, password: "1234"
  }).end()
  failOnError(response.Error)

  response.assertStatus(200)
  assert.isTrue(response.body.hasOwnProperty('token'))

})

test('E => mencari karyawan berdasarkan nama', async({assert, client})=>{
  const first_name = `ang`
  const last_name = `sanusi12`
  const response = await client.get(`api/v1/user?first_name=${first_name}&lastname=${last_name}`).end()
  failOnError(response.Error)

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
  failOnError(response.Error)

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
  failOnError(response.Error)

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



