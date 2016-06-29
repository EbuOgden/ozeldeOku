import { Meteor } from 'meteor/meteor';
//import { reCAPTCHA } from 'meteor/altapp:recaptcha';

import { Roles } from '../imports/api/collections/roles.js';
import { Schools } from '../imports/api/collections/schools.js';
import { News } from '../imports/api/collections/news.js';
import { Comments } from '../imports/api/collections/comments.js';
import { CityCounty } from '../imports/api/collections/cityCounty.js';
import { Departments } from '../imports/api/collections/departments.js';
import { Faculties } from '../imports/api/collections/faculties.js';
import { FacultyDepartments } from '../imports/api/collections/facultyDepartments.js';

import '../imports/api/collections/users.js';

import '../imports/startup/server/index.js'


//import { SchoolVideos } from '../imports/api/collections/schoolVideos.js';
//import { SchoolImages } from '../imports/api/collections/schoolImages.js';
//import { Messages } from '../imports/api/collections/messages.js';



Meteor.startup(() => {

  // CityCounty.insert({
  //     city : 'İstanbul',
  //     county : ['Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar']
  //
  // })
  //
  // CityCounty.insert({
  //   city : 'İzmir',
  //   county : ['Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama']
  // })
  //
  // CityCounty.insert({
  //   city : 'Ankara',
  //   county : ['Akyurt', 'Altındağ', 'Ayaş', 'Balâ', 'Beypazarı']
  // })

  // reCAPTCHA.config({
  //   publickey: "6LeqWx8TAAAAAOf_iLzAXMSXiLGHnq7iyTKuWEiF"
  // })

  if(Faculties.find().count() == 0){
    const faculties = ['Atatürk Eğitim', 'Diş Hekimliği', 'Eczacılık', 'Fen-Edebiyat', 'Güzel Sanatlar', 'Hukuk', 'İktisat', 'İlahiyat',
    'İletişim', 'İşletme', 'Mühendislik', 'Sağlık Bilimleri', 'Siyasal Bilgiler', 'Spor Bilimleri', 'Teknik Eğitim', 'Teknoloji', 'Tıp'];

    for(let i = 0; i < faculties.length; i++){
      Faculties.insert({
        facultyName : faculties[i]
      })
    }
  }

  if(Departments.find().count() == 0){
    const departments = ['Bilgisayar ve Öğretim Teknolojileri Eğitimi', 'Din Kültürü ve Ahlak Bilgisi', 'Eğitim Bilimleri', 'Güzel Sanatlar Eğitimi',
    'İlköğretim Bölümü', 'OÖ Fen, Matematik Alanlar', 'OÖ Sosyal Alanlar', 'Özel Eğitim', 'Türkçe Eğitimi', 'Yabancı Diller Eğitimi', 'Pedagojik Formasyon Birimi',
    'OÖE Uygulama Birimi'];

    for(let i = 0; i < departments.length; i++){
      Departments.insert({
        departmentName : departments[i]
      })
    }
  }



  adminControl = Meteor.users.findOne({"username" : "admin"})
  if(!adminControl){
    Accounts.createUser({
      username : "admin",
      password : 'asdasd',
      profile : {
        name : 'admin',
        surname : 'admin',
        role : 'admin'
      }
    })
  }
});
