import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/news/news.js';

const news = FlowRouter.group({ prefix : '/haberler',
});

news.route('/', {
  name : 'news',

  action(){
    BlazeLayout.render('home', {top : 'homeLayout', center : 'schoolNews', bottom : 'homeBottom'});
  }
})

news.route('/:newsTitle', {
  name : 'news.detail',

  action(){
    BlazeLayout.render('home', {top : 'homeLayout', center : 'news', bottom : 'homeBottom'});
  }
})
