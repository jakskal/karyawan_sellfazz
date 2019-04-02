'use strict'

const { test, trait } = use('Test/Suite')('Pertemanan')
const User = use('App/Models/User')
const Pertemanan = use('App/Models/Pertemanan')

trait('Test/ApiClient')
trait('Auth/Client')

function failOnError(params) {
  if(params){
    console.log("error = ", params);
  }
}

let data = {
  ktp_user : 5,
  ktp_teman : 3,
  status : "pernah bekerja sama"
}

test('create request pertemanan', async({ client})=>{
  const user = await User.findBy({ ktp : data.ktp_user})
  
    const response = await client.post('api/v1/pertemanan')
    .loginVia(user, 'jwt')
    .send(data)
    .end()
    failOnError(response.error)

    response.assertStatus(201)
    response.assertJSONSubset({
      message:`permintaan pertemanan terkirim`,
      pertemanan : {
        ktp_teman : data.ktp_teman,
        ktp_user : data.ktp_user,
        status : "menunggu"
      }
    })
  })

  test('read permintaan pertemanan', async({assert, client})=>{
    const user2 = await User.findBy({ ktp : data.ktp_teman})
    const response = await client
    .get('api/v1/pertemanan/permintaan')
    .loginVia(user2, 'jwt')
    .end()
    failOnError(response.error)
  
    response.assertStatus(200)
    console.log(response.body);
    response.body.forEach(element=>{
      assert.isTrue(element.hasOwnProperty('ktp_user'))
      assert.isTrue(element.hasOwnProperty('ktp_teman'))
      assert.isTrue(element.hasOwnProperty('status'))
      assert.isTrue(element.status == "menunggu")
    })
  })

test('read all pertemanan', async({assert, client})=>{
  const response = await client.get('api/v1/pertemanan').end()
  failOnError(response.error)

  response.assertStatus(200)
  response.body.forEach(element=>{
    assert.isTrue(element.hasOwnProperty('ktp_user'))
    assert.isTrue(element.hasOwnProperty('ktp_teman'))
    assert.isTrue(element.hasOwnProperty('status'))
  })
})

test('terima permintaan pertemanan', async({assert, client})=>{
  const user2 = await User.findBy({ ktp : data.ktp_teman })

  const response = await client
  .patch('api/v1/pertemanan/terima')
  .loginVia(user2, 'jwt')
  .send({ktp_teman: data.ktp_user})
  .end()
  failOnError(response.error)

  response.assertStatus(200)
  response.assertJSONSubset({message:"teman berhasil ditambahkan"})

})

test('update pertemanan', async({assert, client})=>{
  const user = await User.findBy({ ktp : data.ktp_user})
  const pertemanan = await Pertemanan.findBy({ ktp_teman : data.ktp_teman, ktp_user : data.ktp_user})
  const response = await client
  .patch('api/v1/pertemanan')
  .loginVia(user, 'jwt')
  .send(data)
  .end()

  failOnError(response.error)

  response.assertStatus(200)
  assert.isTrue(response.body.hasOwnProperty('ktp_user'))
  assert.isTrue(response.body.hasOwnProperty('ktp_teman'))
  assert.isTrue(response.body.hasOwnProperty('status'))
  assert.isTrue(data.status !== pertemanan.status)
  if(data.status !== pertemanan.status){
    assert.isTrue(data.status == response.body.status)
  }
  
})

test('delete pertemanan', async({assert, client})=>{
  const user = await User.findBy({ ktp : data.ktp_user})

  const response = await client
  .delete('api/v1/pertemanan')
  .loginVia(user, 'jwt')
  .send(data)
  .end()
  failOnError(response.error)
  response.assertStatus(200)
  response.assertJSONSubset({
    message : `pertemanan user dengan id ${data.ktp_user} dan id ${data.ktp_teman} berhasil dihapus `
  })
  
})

test('H => mendapat karyawan lain yang telah menjadi teman dari seorang karyawan (berdasarkan ktp)', async({assert, client})=>{
  const ktp = 1
  const response = await client.get(`api/v1/pertemanan?ktp=${ktp}`).end()
  failOnError(response.Error)
  response.assertStatus(200)
  response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("ktp_user"))
    assert.isTrue(Element.hasOwnProperty("ktp_teman"))
    assert.isTrue(Element.hasOwnProperty("status"))
    assert.isTrue(Element.hasOwnProperty("ktp"))
    assert.isTrue(Element.hasOwnProperty("first_name"))
    assert.isTrue(Element.hasOwnProperty("last_name"))
  })
})

test('I => mendapat karyawan lain yang dianggap pernah bekerja bersama-sama (berdasarkan ktp)', async({assert, client})=>{
  const ktp = 1
  const status = "pernah bekerja sama"
  const response = await client.get(`/api/v1/pertemanan?ktp=${ktp}&status=${status}`).end()
  failOnError(response.Error)
  response.assertStatus(200)
  response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("ktp_user"))
    assert.isTrue(Element.hasOwnProperty("ktp_teman"))
    assert.isTrue(Element.hasOwnProperty("status"))
    assert.isTrue(Element.hasOwnProperty("ktp"))
    assert.isTrue(Element.hasOwnProperty("first_name"))
    assert.isTrue(Element.hasOwnProperty("last_name"))
  })
})

test('J => mencari teman-temannya teman-teman , yang bukan teman teman dari seorang karyawan (berdasarkan ktp)', async({assert, client})=>{
  const ktp = 1
  const teman = "bukan"
  const response = await client.get(`/api/v1/pertemanan?ktp=${ktp}&teman=${teman}`).end()
  failOnError(response.Error)
  response.assertStatus(200)
  response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("ktp_user"))
    assert.isTrue(Element.hasOwnProperty("ktp_teman"))
    assert.isTrue(Element.hasOwnProperty("status"))
    assert.isTrue(Element.hasOwnProperty("ktp"))
    assert.isTrue(Element.hasOwnProperty("first_name"))
    assert.isTrue(Element.hasOwnProperty("last_name"))
  })
})

