/* PACKAGE IMPORTS */
import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { reCAPTCHA } from 'meteor/altapp:recaptcha';
/*          */

/* DATABASE VARIABLES IMPORTS */
import { Schools } from '../../../imports/api/collections/schools.js';
import { Dormitories } from '../../../imports/api/collections/dormitories.js';
import { News } from '../../../imports/api/collections/news.js';
//import { SchoolVideos } from '../../../imports/api/collections/schoolVideos.js';
//import { SchoolImages } from '../../../imports/api/collections/SchoolImages.js';
import { Comments } from '../../../imports/api/collections/comments.js';
import { userInfo } from '../../api/userClass.js';

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
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'click #aboutUs'(event, instance){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'aboutUs', bottom: 'homeBottom'});
  },

  'click #logInBut'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'login', bottom: 'homeBottom'});
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
  'click .centerMenu'(event){
    $(".centerMenu").css('color','black');
    var target = event.currentTarget;
    $(target).css('color', 'rgb(157,197,15)');
  },

})

Template.homeBottom.events({
  'click #toHome'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },
  'click #aboutUs'(event, instance){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'aboutUs', bottom: 'homeBottom'});
  },
  'click #newSchoolReg'(event){
    window.scrollTo(0, 0);
    BlazeLayout.render('home', {top: 'homeLayout', center : 'newSchoolRegister', bottom: 'homeBottom'});
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
    else{

      const _newSchoolO = new userInfo(schoolName, tradeName, schoolType, taxNum, authorizePersonName, authorizeCaption,
      schoolrEmail, schoolrPassword, schoolAddress, schoolCity, schoolCounty, schoolPhoneNum, schoolFaxNum, schoolWebSite);

      const _schoolN = _newSchoolO.user;

      Meteor.call('recaptchControl', captchaData, _schoolN, (err, result) => {

        grecaptcha.reset();

        if(err){
          alert(err.reason);
        }
        else{
          alert("Başvurunuz başarıyla alınmıştır.");
        }
      })

    }

  }
})

Template.login.events({
  'click #anaSayfaRoute'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },
})
