/* Mongoyu import ediyoruz */

import { Mongo } from 'meteor/mongo';

/* baska dosyadan bu db degiskenini kullanabilmek icin export yapiyoruz */

export const Roles = new Mongo.Collection('Roles');
