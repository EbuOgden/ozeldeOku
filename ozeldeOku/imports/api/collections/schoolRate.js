import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SchoolRates = new Mongo.Collection('SchoolRates');

SchoolRates.attachSchema(new SimpleSchema({
  userId : {
    type : String,
    optional : false,
    index : 1
  },

  schoolId : {
    type : String,
    optional : false
  }


}), {replace : true});
