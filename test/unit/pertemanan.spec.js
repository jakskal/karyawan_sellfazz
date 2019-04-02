'use strict'

const { test, trait } = use('Test/Suite')('Pertemanan')
trait('Test/ApiClient')

function failOnError(params) {
  if(params){
    console.log("error = ", params);
  }
}


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

test('I => mendapat karyawan lain yang telah menjadi teman dari seorang karyawan (berdasarkan ktp)', async({assert, client})=>{
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

test('J => mendapat karyawan lain yang telah menjadi teman dari seorang karyawan (berdasarkan ktp)', async({assert, client})=>{
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

