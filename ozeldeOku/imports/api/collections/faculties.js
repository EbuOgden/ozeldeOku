import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Faculties = new Mongo.Collection('Faculties');

Faculties.attachSchema(new SimpleSchema({

  facultyName : {
    type : String,
    max : 256,
    optional : false
  }

}), { replace : true})
