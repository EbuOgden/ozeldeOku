import { Templating } from 'meteor/templating';


import './profile.html';
import './profileCenter.html';

Template.profileCenter.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  }
})
