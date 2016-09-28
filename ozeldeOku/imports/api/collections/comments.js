import { Mongo } from 'meteor/mongo';
import { SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Comments = new Mongo.Collection('Comments');

Comments.attachSchema(new SimpleSchema({
  schoolId : {
    type : String,
    optional : false,
    index : 1
  },

  comment : {
    type : String,
    optional : false
  },

  sendTime : {
    type : Date,
    optional : false,
    autoValue : function() {
      if(this.isInsert){
        return new Date;
      }
    }
  }

}), {replace : true});
