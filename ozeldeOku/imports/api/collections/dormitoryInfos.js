import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const DormitoryInfos = new Mongo.Collection('DormitoryInfos');

DormitoryInfos.attachSchema(new SimpleSchema({
  dormitoryId : {
    type : String,
    optional : false
  },

  dormitory : {
    type : Object,
    optional : true
  },

  "dormitory.dormitoryName" : {
    type : String,
    optional : true
  },

  "dormitory.dormitoryCity" : {
    type : String,
    optional : true
  },

  "dormitory.dormitoryCounty" : {
    type : String,
    optional : true
  },

  "dormitory.dormitoryLat" : {
    type : String,
    optional : true
  },

  "dormitory.dormitoryLng" : {
    type : String,
    optional : true
  }
}))
