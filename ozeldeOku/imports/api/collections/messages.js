import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Messages = new Mongo.Collection('Messages');

Messages.attachSchema(new SimpleSchema({
  messageContext : {
    type : String,
    optional : false
  },

  senderId : {
    type : String,
    optional : false
  },

  readerId : {
    type : String,
    optional : false
  },

  sendTime : {
    type : Date,
    optional : false,
    autoValue : function(){
      if(this.isInsert){
        return new Date();
      }
    }
  },

  isRead : {
    type : Boolean,
    optional : false,
    autoValue : function(){
      if(this.isInsert){
        return false;
      }
    }

  },

  roomId : {
    type : String,
    optional : false,
    index : 1
  }


}))
