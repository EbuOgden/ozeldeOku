/* baska dosyadan bu db degiskenini kullanabilmek icin export yapiyoruz */
import { Mongo } from 'meteor/mongo';
export const Roles = new Mongo.Collection('Roles');

Roles.attachSchema(new SimpleSchema({
  roleType : {
    type : String,
    optional : false
  }
}), {replace : true});
