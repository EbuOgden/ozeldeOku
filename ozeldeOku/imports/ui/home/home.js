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
import '../../startup/client/config.js'
import '../../../client/lib/jquery.raty.js';
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


Template.newSchoolRegister.events({
  'click #anaSayfaRoute'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  }
})

Template.login.events({
  'click #anaSayfaRoute'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },
})
