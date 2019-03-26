# Framework
This app use [adonisjs](https://adonisjs.com/docs/4.1/installation), please install it first and dont forget setup env.

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
### to run 
```bash
adonis serve --dev
```

## based on task

a. mencari perusahaan berdasarkan nama perusahaan
```js
localhost:3333/api/v1/perusahaan?nama={alfamart}
```
b. mendapatkan perusahaan berdasarkan tdp
```js
localhost:3333/api/v1/perusahaan?tdp={11}
```
c. mendapat daftar karyawan yang sedang bekerja di perusahaan berdasarkan tdp
```js
localhost:3333/api/v1/perusahaan?tdp={11}&kepegawaian={sedang}
```
d. mendapat daftar karyawan yang telah/sedang bekerja di perusahaan berdasarkan tdp
```js
localhost:3333/api/v1/perusahaan?tdp=11&kepegawaian=sedang/telah
```
e. mencari karyawan berdasarkan nama
```js
localhost:3333/api/v1/user?first_name={ang}&lastname={sanusi12}
```
f. mendapat informasi karyawan berdasarkan ktp karyawan
```js
localhost:3333/api/v1/user?ktp={4}
```
g. mendapat riwayat pekerjaan karyawan berdasarkan ktp
```js
localhost:3333/api/v1/user/riwayat?ktp=2
```
h. mendapat karyawan lain yang telah menjadi teman dari seorang karyawan (berdasarkan ktp)
```js
localhost:3333/api/v1/pertemanan?ktp=1
```
i. mendapat karyawan lain yang dianggap pernah bekerja bersama-sama (berdasarkan ktp)
```js
localhost:3333/api/v1/pertemanan?ktp=4&status=pernah bekerja sama
```
j. mencari teman-temannya teman-teman , yang bukan teman teman dari seorang karyawan (berdasarkan ktp)
```js
localhost:3333/api/v1/pertemanan?ktp=4&teman=bukan
```
k. API aktivitas CRUD
untuk melihat route 
```js
adonis route:list
```
Note = id perusahaan bukan tdp, 

### tersedia file postman dengan nama `karyawan.postman_collection.json` untuk mempermudah mengetahui bagaimana route bekerja