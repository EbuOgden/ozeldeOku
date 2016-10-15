import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SchoolPhotos = new Mongo.Collection('SchoolPhotos');

SchoolPhotos.attachSchema(new SimpleSchema({
  schoolId : {
    type : String,
    optional : false
  },

  photoUrl : {
    type : String,
    optional : false
  },

  createdAt : {
    type : Date,
    autoValue : function(){
      if(this.isInsert){
        return new Date;
      }
    }
  }
}), {replace : true})
