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

      if(messageRoom){
        var a = messageRoom._readerId;

        for(let i = a.length; i--;){
          if((a[i] == senderId) || (a[i] === senderId)){
            delete a[i];
          }
        }

        a = a.filter(function(str){
          return /\S/.test(str);
        })

        const readerId = a[0];

        var newMessage = Messages.insert({
          messageContext : message,
          senderId : senderId,
          readerId : readerId,
          roomId : messageRoom._rId
        })

        if(newMessage){
          return "Mesajınız gönderilmiştir."
        }

      }else{
        throw new Meteor.Error('cant.find.messageroom', 'Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
      }
    }

  }
})
