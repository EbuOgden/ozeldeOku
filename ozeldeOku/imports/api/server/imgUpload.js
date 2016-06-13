import { Schools } from '../collections/schools.js';

Meteor.methods({
  imgUpload(link){
    this.unblock();

    const userId = this.userId;
    const user = Meteor.users.findOne(userId);
    const userEmail = user.emails[0].address;

    const updateStatus = Schools.update({
      "schoolEmail" : userEmail
    }, {
      $set : {
        imgSrc : link
      }
    })

    if(updateStatus == ""){
      throw new Meteor.Error('upload.fail', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
    else{
      
    }
  }
})
