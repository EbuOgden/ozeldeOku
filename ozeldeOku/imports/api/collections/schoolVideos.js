import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SchoolVideos = new Mongo.Collection('SchoolVideos');
//
// SchoolVideos.attachSchema(new SimpleSchema({
//   /* from School table */
//   schoolId : {
//     type : String,
//     optional : false
//   },
//
//
// }))
