'use strict'

const { trait, test } = use('Test/Suite')('Perusahaan')
const User = use('App/Models/User')
const Perusahaan = use('App/Models/Perusahaan')

trait('Test/ApiClient')
trait('Auth/Client')



function failOnError(params) {
  if(params){
    console.log("error = ", params);
  }
}

const data = {
  tdp:8080,
  nama:"Lotte Mart",
  pemilik: 1 //user id pemilik perusahaan
}

const upData = {
  nama: "Carefour",
}

test('create perusahaan', async ({ assert, client }) => { 
  const user = await User.find(data.pemilik)

  const response = await client
  .post('api/v1/perusahaan')
  .loginVia(user,'jwt')
  .send(data)
  .end()
  failOnError(response.error)
  response.assertStatus(201)
  response.assertJSONSubset({
      tdp:data.tdp,
      nama: data.nama,
      pemilik: data.pemilik,
  })
  
})

test('read all perusahaan', async ({ assert, client }) => { 
  const response = await client
  .get('api/v1/perusahaan')
  .end()
  failOnError(response.error)
  response.assertStatus(200)
  response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("id"))
    assert.isTrue(Element.hasOwnProperty("tdp"))
    assert.isTrue(Element.hasOwnProperty("nama"))
    assert.isTrue(Element.hasOwnProperty("pemilik"))
  })
  
})

test('update perusahaan', async ({ assert, client }) => { 
  const perusahaan = await Perusahaan.findBy({tdp:data.tdp})
  const user = await User.find(data.pemilik)
  const id = perusahaan.id
  const response = await client
  .patch(`api/v1/perusahaan/${id}`)
  .loginVia(user,"jwt")
  .send(upData)
  .end()
  failOnError(response.error)
  
  response.assertStatus(200)
  assert.isTrue(response.body.hasOwnProperty("id"))
  assert.isTrue(response.body.hasOwnProperty("tdp"))
  assert.isTrue(response.body.hasOwnProperty("nama"))
  assert.isTrue(response.body.hasOwnProperty("pemilik"))
  assert.isTrue(upData.nama !== perusahaan.nama)
  if(upData.nama !== perusahaan.nama){
    assert.isTrue(response.body.nama == upData.nama)  
  }
  
})

test('delete perusahaan', async ({assert, client})=>{
  let perusahaan = await Perusahaan.findBy({tdp:data.tdp})
  const user = await User.find(data.pemilik)
  const id = perusahaan.id

  perusahaan = JSON.parse(JSON.stringify(perusahaan))
  const response = await client
  .delete(`/api/v1/perusahaan/${id}`)
  .loginVia(user,'jwt')
  .end()
  
  response.assertStatus(200)
  response.assertJSONSubset({
    deleted_perusahaan : perusahaan
  })
})

test('A => mencari perusahaan berdasarkan nama perusahaan', async({assert, client})=>{
  const nama = `alfam`
  const response = await client.get(`api/v1/perusahaan?perusahaan=${nama}`).end()
  failOnError(response.error)

  response.assertStatus(200)
  response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("id"))
    assert.isTrue(Element.hasOwnProperty("tdp"))
    assert.isTrue(Element.hasOwnProperty("pemilik"))
  })

})

test('B => mencari perusahaan berdasarkan tdp perusahaan', async({assert, client})=>{
  const tdp = `11`
  const response = await client.get(`api/v1/perusahaan?tdp=${tdp}`).end()
  failOnError(response.error)

  response.assertStatus(200)
  response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("id"))
    assert.isTrue(Element.hasOwnProperty("tdp"))
    assert.isTrue(Element.hasOwnProperty("nama"))
    assert.isTrue(Element.hasOwnProperty("pemilik"))
  })

})

test('C => mendapat daftar karyawan yang sedang bekerja di perusahaan berdasarkan tdp', async({assert, client})=>{
  const tdp = "11"
  const kepegawaian = "sedang"
  const response = await client.get(`api/v1/perusahaan?tdp=${tdp}&kepegawaian=${kepegawaian}`).end()
  failOnError(response.error)

  response.assertStatus(200)
  response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("id"))
    assert.isTrue(Element.hasOwnProperty("tdp"))
    assert.isTrue(Element.hasOwnProperty("nama"))
    assert.isTrue(Element.hasOwnProperty("pemilik"))
    assert.isTrue(Element.hasOwnProperty("kepegawaian"))
    Element.kepegawaian.forEach(elem=>{
      assert.isTrue(elem.hasOwnProperty("ktp"))
      assert.isTrue(elem.hasOwnProperty("first_name"))
      assert.isTrue(elem.hasOwnProperty("last_name"))
      assert.isTrue(elem.hasOwnProperty("pivot"))
      assert.isTrue(elem.pivot.hasOwnProperty("status"))
      assert.isTrue(elem.pivot.hasOwnProperty("ktp"))
      assert.isTrue(elem.pivot.hasOwnProperty("tdp"))
      assert.isTrue(elem.pivot.ktp == elem.ktp)
      assert.isTrue(Element.tdp == elem.pivot.tdp)
    })
  })

})

test('D => mendapat daftar karyawan yang telah/sedang bekerja di perusahaan berdasarkan tdp', async({assert, client})=>{
  const tdp = "11"
  const kepegawaian = "telah/sedang"
  const response = await client.get(`api/v1/perusahaan?tdp=${tdp}&kepegawaian=${kepegawaian}`).end()
  failOnError(response.error)

  response.assertStatus(200)
  response.body.forEach(Element=>{
    assert.isTrue(Element.hasOwnProperty("id"))
    assert.isTrue(Element.hasOwnProperty("tdp"))
    assert.isTrue(Element.hasOwnProperty("nama"))
    assert.isTrue(Element.hasOwnProperty("pemilik"))
    assert.isTrue(Element.hasOwnProperty("kepegawaian"))
    Element.kepegawaian.forEach(elem=>{
      assert.isTrue(elem.hasOwnProperty("ktp"))
      assert.isTrue(elem.hasOwnProperty("first_name"))
      assert.isTrue(elem.hasOwnProperty("last_name"))
      assert.isTrue(elem.hasOwnProperty("pivot"))
      assert.isTrue(elem.pivot.hasOwnProperty("ktp"))
      assert.isTrue(elem.pivot.hasOwnProperty("tdp"))
      assert.isTrue(elem.pivot.hasOwnProperty("status"))
      assert.isTrue(elem.pivot.ktp == elem.ktp)
      assert.isTrue(Element.tdp == elem.pivot.tdp)
    })
  })

})