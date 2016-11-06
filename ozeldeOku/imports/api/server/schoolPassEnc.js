import { CryptoJS } from 'meteor/altapp:aes';

Meteor.methods({
  encryptPass(schoolInfo){
    this.unblock();

    const a = Meteor.users.findOne({"emails.address" : schoolInfo.__schoolEmail});

    if(a){
      throw new Meteor.Error('cant.encrypt', "Bu e-mail adresi kullanılmaktadır. Lütfen başka bir e-mail adresi deneyiniz.");
    }
    else{
      const encrypted = CryptoJS.AES.encrypt(schoolInfo.__schoolPassword, schoolInfo.__schoolName);

      if(encrypted == ""){
        throw new Meteor.Error('cant.encrypt', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
      }
      else{
        return encrypted.toString();
      }
    }



  }
})
