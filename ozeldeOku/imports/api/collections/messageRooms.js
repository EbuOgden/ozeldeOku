import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MessageRooms = new Mongo.Collection('MessageRooms');

MessageRooms.attachSchema(new SimpleSchema({
    memberIds : {
      type : [String],
      optional : false
    },

    createdAt : {
      type : Date,
      optional : false,

      autoValue : function(){
        if(this.isInsert){
          return new Date();
        }
      }
    },

    ownerId : {
      type : String,
      optional : false
    },

    ownerName : {
      type : String,
      optional : false
    },

    roomImage : {
      type : String,
      optional : false
    },

    roomTitle : {
      type : String,
      optional : false
    }

}))
