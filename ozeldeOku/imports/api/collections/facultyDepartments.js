import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const FacultyDepartments = new Mongo.Collection('FacultyDepartments');

/* okula ait fakultenin departmanlari */

FacultyDepartments.attachSchema(new SimpleSchema({
  schoolId : {
    type : String,
    optional : false
  },

  facultyId : {
    type : String,
    optional : false
  },

  departmentIds : {
    type : [String],
    optional : false
  }

}), {replace : true})
