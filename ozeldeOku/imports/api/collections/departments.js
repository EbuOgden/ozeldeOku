import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Departments = new Mongo.Collection('Departments');

Departments.attachSchema(new SimpleSchema({
  departmentName : {
    type : String,
    max : 256,
    optional : false
  },

  departmentDescription : {
    type : String,
    max : 256,
    optional : false
  }
}), { replace : true})
