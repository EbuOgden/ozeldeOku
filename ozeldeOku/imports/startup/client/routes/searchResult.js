import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/searchResults/searchResults.js';

FlowRouter.route('/aramaSonuclari',{
  name : "search.results",

  triggersEnter : [function(context){
      document.title = "Arama Sonuçları";

  }],

  action (params, queryParams){
    BlazeLayout.render('searchResults', {top : 'homeLayout', center : 'searchResultsCenter', bottom : 'homeBottom'});
  }
})
