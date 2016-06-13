import { Meteor } from 'meteor/meteor';
//import { reCAPTCHA } from 'meteor/altapp:recaptcha';

import { Roles } from '../imports/api/collections/roles.js';
import { Schools } from '../imports/api/collections/schools.js';
import { News } from '../imports/api/collections/news.js';
import { Comments } from '../imports/api/collections/comments.js';
import { CityCounty} from '../imports/api/collections/cityCounty.js';

import '../imports/api/collections/users.js';

import '../imports/startup/server/index.js'


//import { SchoolVideos } from '../imports/api/collections/schoolVideos.js';
//import { SchoolImages } from '../imports/api/collections/schoolImages.js';
//import { Messages } from '../imports/api/collections/messages.js';



Meteor.startup(() => {
  // reCAPTCHA.config({
  //   publickey: "6LeqWx8TAAAAAOf_iLzAXMSXiLGHnq7iyTKuWEiF"
  // })

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
