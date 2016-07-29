import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


import '../../../ui/home/home.js'

FlowRouter.route('/',{
  name : 'home',
  
  action () {
    BlazeLayout.render('home', {top : 'homeLayout', center: 'homeCenter', bottom: 'homeBottom'});
  },
})
