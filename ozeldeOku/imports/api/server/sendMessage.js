import { MessageRooms } from '/imports/api/collections/messageRooms.js';
import { Messages } from '/imports/api/collections/messages.js';
import { Logs } from '/imports/api/collections/logs.js';

Meteor.methods({
  _sNewM(obj){
    this.unblock();

    if(obj){
      const messageRoom = obj.__da;
      const message = obj.__nMes;
      const senderId = obj.__seId;
      const readerId = obj.__reId;

      if(messageRoom){
        // var newMessage = Messages.insert({
        //   messageContext = message,
        //   senderId =
        // })

      }else{
        throw new Meteor.Error('cant.find.messageroom', 'Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
      }
    }

  }
})
