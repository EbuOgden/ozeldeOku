import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../ui/notFound/notFound.html';


FlowRouter.notFound = {
  name : 'notFound',
  action (){
    BlazeLayout.render('notFound');
  }
}
