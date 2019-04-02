'use strict'

const { trait, test } = use('Test/Suite')('Perusahaan')
trait('Test/ApiClient')

function failOnError(params) {
  if(params){
    console.log("error = ", params);
  }
}

test('A => mencari perusahaan berdasarkan nama perusahaan', async({assert, client})=>{
  const nama = `alfam`
  const response = await client.get(`api/v1/perusahaan?perusahaan=${nama}`).end()
  failOnError(response.Error)

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
  failOnError(response.Error)

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
  failOnError(response.Error)

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
  failOnError(response.Error)

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