import { Schools } from '../collections/schools.js';
import { reCAPTCHA } from 'meteor/altapp:recaptcha';

Meteor.methods({
  recaptchControl(recaptchData, userInfo){
    this.unblock();

    // var verifyCaptcha  = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, recaptchData);
    //
    // if(!verifyCaptcha.success){
    //   throw new Meteor.Error('recaptcha.failed', 'reCAPTCHA Failed : ' + verifyCaptcha.error);
    // }
    //
    // else{
    //   const newSchool = School.insert({
    //     schoolName : userInfo.__schoolName,
    //     tradeName : userInfo.__tradeName,
    //     schoolType : userInfo.__schoolType,
    //     taxNo : userInfo.__taxNum,
    //     authorizedPerson : userInfo.__authorizePersonName,
    //     authorizedCaption : userInfo.__authorizeCaption,
    //     schoolEmail : userInfo.__schoolEmail,
    //     schoolPassword : userInfo.__schoolPassword,
    //     schoolAddress : userInfo.__schoolAddress,
    //     schoolCity : userInfo.__schoolCity,
    //     schoolCounty : userInfo.__schoolCounty,
    //     schoolPhoneNumber : userInfo.__schoolPhoneNum,
    //     schoolFaxNumber : userInfo.__schoolFaxNum
    //   })
    //
    //   if(newSchool == ""){
    //     throw new Meteor.Error('school.insert.fail', "Şu anda teknik bir problem yaşanmaktadır. Lütfen daha sonra tekrar deneyiniz");
    //   }
    //   else{
    //   }
    // }

    const newSchool = Schools.insert({
      schoolName : userInfo.__schoolName,
      tradeName : userInfo.__tradeName,
      schoolType : userInfo.__schoolType,
      taxNo : userInfo.__taxNum,
      authorizedPerson : userInfo.__authorizePersonName,
      authorizedCaption : userInfo.__authorizeCaption,
      schoolEmail : userInfo.__schoolEmail,
      schoolPassword : userInfo.__schoolPassword,
      schoolAddress : userInfo.__schoolAddress,
      schoolCity : userInfo.__schoolCity,
      schoolCounty : userInfo.__schoolCounty,
      schoolPhoneNumber : userInfo.__schoolPhoneNum,
      schoolFaxNumber : userInfo.__schoolFaxNum,
      schoolWebSite : userInfo.__schoolWebSite
    })

    if(newSchool == ""){
      throw new Meteor.Error('school.insert.fail', "Şu anda teknik bir problem yaşanmaktadır. Lütfen daha sonra tekrar deneyiniz");
    }
    else{
    }

  }
})
