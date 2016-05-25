/* PACKAGE IMPORTS */
import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { reCAPTCHA } from 'meteor/altapp:recaptcha';
import { GoogleMaps } from 'meteor/dburles:google-maps';
import { FlowRouter } from 'meteor/kadira:flow-router';
/*          */

/* DATABASE VARIABLES IMPORTS */
import { Schools } from '../../../imports/api/collections/schools.js';
import { Dormitories } from '../../../imports/api/collections/dormitories.js';
import { News } from '../../../imports/api/collections/news.js';
//import { SchoolVideos } from '../../../imports/api/collections/schoolVideos.js';
//import { SchoolImages } from '../../../imports/api/collections/SchoolImages.js';
import { Comments } from '../../../imports/api/collections/comments.js';
import { schoolInfo } from '../../api/client/schoolClass.js';
import { userInfo } from '../../api/client/userClass.js';

/*          */

/* HTML IMPORTS */
import './aboutUs/aboutUs.html';
import './home.html';
import './homeLayout.html';
import './homeCenter.html';
import './homeBottom.html';
import './newSchoolRegister.html';
import './licenseAgreement.html';
import './login.html';
import './forgotPassword.html';
import './signupModal.html';
import './favorites.html';
import './map.html';
/*          */

/* JAVASCRIPT IMPORTS */
import '../../../client/lib/jquery.raty.js';
import '../../../client/lib/controls.js';
import '../../startup/client/config.js'
/*          */


Template.home.events({

})

Template.home.onRendered(() => {

})

Template.home.helpers({

})

Template.homeLayout.events({
  'click #logoHome'(event){
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'click #aboutUs'(event, instance){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'aboutUs', bottom: 'homeBottom'});
  },

  'click #logInBut'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'login', bottom: 'homeBottom'});
  },

  'click #adminDash'(event){
    if(Meteor.user().profile.role == 'admin'){
      FlowRouter.go('/admin');
    }
  },

  'click #logOut'(event){
    Meteor.logout(() => {
      FlowRouter.go('/');
    });

  }
})

Template.homeLayout.onRendered(() => {

})

Template.homeLayout.helpers({
  userRole(){
    return Meteor.user().profile.role;
  }
})


Template.homeCenter.onRendered(() => {

  $('#carouselSlick').slick({
    slideInterval : 4000,
    swipe : false,
    touchMove : false,
    dots : false,
    initialSlide : 0,
    arrows : false,
    draggable : false,
    accessibility : false,
    autoplay : true
  });

  $('#rate').raty({
    readOnly : true,
    score : 4
  });

})

Template.homeCenter.events({

})

Template.homeBottom.events({
  'click #toHome'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },
  'click #aboutUs'(event, instance){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'aboutUs', bottom: 'homeBottom'});
  },
  'click #newSchoolReg'(event){
    FlowRouter.go('/');
    window.scrollTo(0, 0);
    BlazeLayout.render('home', {top: 'homeLayout', center : 'newSchoolRegister', bottom: 'homeBottom'});
  },

  'click #touchU'(event){
    window.scrollTo(0, 0);
    BlazeLayout.render('home', {top : 'homeLayout', center : 'map', bottom: 'homeBottom'});
  }
})

Template.newSchoolRegister.onRendered(() => {
  Meteor.call('getCities', (err, result) => {
    if(err){

    }
    else{
      const cities = result;
      for(let i = 0; i < cities.length; i++){
        $('#city').append('<option>' + cities[i] + '</option>');
      }
    }
  })
})


Template.newSchoolRegister.events({
  'click #anaSayfaRoute'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'change #city'(event){
    const cityN = $('#city').val();
    if(isEmpty(cityN)){

    }
    else{
      $('#county').empty();

      Meteor.call('getCounties', cityN, (err, result) => {
        if(err){
          alert(err.reason);
        }
        else{
          const counties = result;
          for(let i = 0; i < counties.length; i++){
            $('#county').append('<option>' + counties[i] + '</option>');
          }
          $('#county').append('<option>Diğer...</option>');
        }
      });
    }
  },

  'change #county'(event){
      const countyVal = $('#county').val();

      if(isEqual(countyVal, "Diğer...")){
      }
  },

  'click #newSchoolRegister'(event, instance){

    const schoolName = trimInput($('#schoolName').val());
    const tradeName = trimInput($('#tradeName').val());
    const schoolType = $('#schoolTypeSelect').val();
    const taxNum = trimInput($('#taxNum').val());
    const authorizePersonName = trimInput($('#authorizePersonName').val());
    const authorizeCaption = trimInput($('#authorizeCaption').val());
    const schoolEmail = trimInput($('#schoolEmail').val());
    const schoolrEmail = trimInput($('#schoolrEmail').val());
    const schoolPassword = $('#schoolPassword').val();
    const schoolrPassword = $('#schoolrPassword').val();
    const schoolAddress = trimInput($('#schoolAddress').val());
    const schoolCity = $('#city').val();
    const schoolCounty = $('#county').val();
    const schoolPhoneNum = $('#schoolPhoneNum').val();
    const schoolFaxNum = $('#schoolFaxNum').val();
    const schoolWebSite = $('#schoolWebSite').val();
    const captchaData = grecaptcha.getResponse()

    // if((isEmpty(schoolName) || isEmpty(tradeName) || isEmpty(schoolType) || isEmpty(taxNum) ||
    //   isEmpty(authorizePersonName) || isEmpty(authorizeCaption) || isEmpty(schoolEmail) || isEmpty(schoolrEmail) ||
    //   isEmpty(schoolPassword) || isEmpty(schoolrPassword) || isEmpty(schoolAddress) || isEmpty(schoolCity) ||
    //   isEmpty(schoolCounty) || isEmpty(schoolPhoneNum) || isEmpty(schoolFaxNum) || isEmpty(schoolWebSite) )){
    //     alert("Lütfen tüm alanları doldurunuz!");
    //     return;
    // }

    if(!$('#agreementCheck').prop('checked')){
      alert("Lütfen üyelik sözleşmesini kabul ediniz!");
      return;
    }

    if(isEmpty(captchaData)){
      alert("Lütfen Captcha işlemini yapınız!");
      return;
    }

    if(isEqual(schoolEmail, schoolrEmail)){
      if(isEmail(schoolrEmail)){
      }
      else{
        alert("Girdiğiniz e-mail geçersizdir. Lütfen kontrol ediniz.");
        return;
      }
    }
    else{
      console.log( "schoolEmail : " + schoolEmail);
      console.log( "schoolrEmail : " + schoolrEmail);
      alert("Girdiğiniz e-mailler eşit değildir. Lütfen kontrol ediniz.");
      return;
    }


    if(isEqual(schoolPassword, schoolrPassword)){
      const __newSchoolO = new schoolInfo(schoolName, tradeName, schoolType, taxNum, authorizePersonName, authorizeCaption,
      schoolrEmail, schoolAddress, schoolrPassword, schoolCity, schoolCounty, schoolPhoneNum, schoolFaxNum, schoolWebSite);

      const _schoolN = __newSchoolO.school;

      Meteor.call('encryptPass', _schoolN, (err, result) => {
        if(err){
          alert(err.reason);
        }
        else{
          Meteor.call('recaptchControl', captchaData, _schoolN, result, (err, result) => {

            grecaptcha.reset();

            if(err){
              alert(err.reason);
            }
            else{
              document.getElementById("newSchoolRegisterForm").reset();
              alert("Başvurunuz başarıyla alınmıştır.");
            }
          })
        }
      })


    }
    else{
      alert("Girdiğiniz şifreler eşit değildir. Lütfen kontrol ediniz.");
      return;
    }

  }
})

Template.login.events({
  'click #anaSayfaRoute'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },
})

Template.login.events({
  'click #loginUser'(event){

    const email = $('#usrEmail').val();
    const password = $('#usrPassword').val();

    if(isEmpty(email) || isEmpty(password)){
      alert("Lütfen tüm alanları doldurunuz");
      return;
    }

    Meteor.loginWithPassword(email, password, (err) => {
      if(err){
        if(err.error == 403){
          alert("Kullanıcı bulunamadı");
        }
        else{
          alert("Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
      else{
        BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
      }
    })
  }
})

Template.map.onRendered(() => {
  GoogleMaps.create({
    name: 'mapHere',
    element: document.getElementById('mapHere'),
    options: {
      center: new google.maps.LatLng(41.0082, 28.9784),
      zoom: 8
    }
  });

})

Template.map.events({
  'click #anaSayfaRoute'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },
})

Template.registerHelper('roleControl', function(role){
  if(role == 'admin'){
    return true;
  }
  else{
    return false;
  }
})
