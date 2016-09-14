import { Mongo } from 'meteor/mongo';
import { SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Comments = new Mongo.Collection('Comments');

Comments.attachSchema(new SimpleSchema{
  schoolId : {
    type : String,
    optional : false
  },

  

});
