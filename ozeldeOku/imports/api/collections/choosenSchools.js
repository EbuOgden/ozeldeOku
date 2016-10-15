import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ChoosenSchools = new Mongo.Collection('ChoosenSchools');

ChoosenSchools.attachSchema(new SimpleSchema({
  schoolId : {
    type : String,
    optional : false
  },
}))
