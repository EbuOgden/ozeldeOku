import { Schools } from '/imports/api/collections/schools.js';

import { Messages } from '/imports/api/collections/messages.js';
import { MessageRooms } from '/imports/api/collections/messageRooms.js';
import { Logs } from '/imports/api/collections/logs.js';

Schools.find().observeChanges({
  added(id, field){

    /* INITIAL SYSTEM MESSAGE */

    /* create new message room with system and school */


    if(!MessageRooms.findOne({"memberIds" : id})){
      var newRoomId = MessageRooms.insert({
        memberIds : [id, 'ozeldeoku'],
        ownerId : 'ozeldeoku',
        ownerName : "Özelde Oku",
        roomImage : '/schoolIcon.png',
        roomTitle : 'Sistemimize hoşgeldiniz.'
      })

      if(newRoomId){
        var newMessageId = Messages.insert({
            messageContext : "Okulunuzla alakalı detaylı bilgileri 'Okul Bilgilerim' menüsünden doldurabilir ve görüntüleyebilirsiniz.",
            senderId : 'ozeldeoku',
            readerId : id,
            roomId : newRoomId
        })

        if(newMessageId){
          Logs.insert({
            schoolId : id,
            dormitoryId : "NULL",
            logMessage : "Mesaj başarıyla eklendi."
          })
        }
        else{
          Logs.insert({
            schoolId : id,
            dormitoryId : "NULL",
            logMessage : "Mesaj eklenemedi."
          })
        }
      }
      else{
        Logs.insert({
          schoolId : schoolId,
          dormitoryId : "NULL",
          logMessage : "Sisteme yeni kayıt olmuş okul için, yeni mesaj odası oluşturulamadı."
        })
      }

      /*          */
    }
  }
})
