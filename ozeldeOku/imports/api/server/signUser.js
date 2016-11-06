import { Accounts } from 'meteor/accounts-base';

import { Messages } from '/imports/api/collections/messages.js';
import { MessageRooms } from '/imports/api/collections/messageRooms.js';
import { Logs } from '/imports/api/collections/logs.js';

Meteor.methods({
  signUser(user){

    this.unblock();

    const newUser = Accounts.createUser({
      email : user.__email,
      password : user.__password,
      profile : {
        name : user.__name,
        surname : user.__surname,
        role : 'Parent'
      }
    })

    if(newUser == ""){
      throw new Meteor.Error('cant.sign.up', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
    else{
      var newMessageRoomId = MessageRooms.insert({
        memberIds : [newUser, 'ozeldeoku'],
        ownerId : 'ozeldeoku',
        ownerName : 'Özelde Oku',
        roomTitle : "Sistemimize hoşgeldiniz."
      })

      if(newMessageRoomId){
        var newMessageId = Messages.insert({
          messageContext : "Sistemimize hoşgeldiniz. Özelokulları araştırabilir ve karşılaştırabilirsiniz.",
          senderId : 'ozeldeoku',
          readerId : newUser,
          roomId : newMessageRoomId
        })

        if(newMessageId){
          return true;
        }
        else{
          Logs.insert({
            schoolId : "NULL",
            dormitoryId : "NULL",
            logMessage : "Yeni üye velinin : '" + newUser + " ' odası oluştu, mesaj oluşturulamadı"
          })
        }
      }
      else{
        Logs.insert({
          schoolId : "NULL",
          dormitoryId : "NULL",
          logMessage : "Yeni üye velinin : '" + newUser + " ' odası oluşturulamadi"
        })
      }
    }
  },
})
