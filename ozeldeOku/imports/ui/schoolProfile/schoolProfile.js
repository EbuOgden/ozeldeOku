import { Templating } from 'meteor/templating';


import './schoolProfile.html';
import './schoolProfileCenter.html';

import '../../api/client/clientFuncs.js';

Template.schoolProfileCenter.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  }
})

Template.schoolProfileCenter.onRendered(() => {
  
})
