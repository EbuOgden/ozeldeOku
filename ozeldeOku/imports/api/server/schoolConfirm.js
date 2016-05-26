import { Accounts } from 'meteor/accounts-base';
import { CryptoJS } from 'meteor/altapp:aes';

import { Schools } from '../collections/schools.js';

Meteor.methods({
  confirmSchool(schoolName){
    this.unblock();

    const school = Schools.findOne({"schoolName" : schoolName});

    const pass = CryptoJS.AES.decrypt(school.schoolPassword, school.schoolName);
    const passOrigin = pass.toString(CryptoJS.enc.Utf8);

    const newSchoolAccount = Accounts.createUser({
      email : school.schoolEmail,
      password : passOrigin,
      profile : {
        name : school.authorizedPerson,
        surname : " ",
        role : 'School'
      }
    })

    if(newSchoolAccount == ""){
      throw new Meteor.Error('cant.sign.up', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
    else{
      const schoolUpdate = Schools.update({"_id" : school._id}, {
        $set : {
          isValidate : true,
          schoolPassword : " "
        }
      })

      if(schoolUpdate == ""){
        throw new Meteor.Error('cant.update.school', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
      }
      else{
      }
    }
  }
})
