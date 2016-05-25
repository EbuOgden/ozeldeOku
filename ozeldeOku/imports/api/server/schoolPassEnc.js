import { CryptoJS } from 'meteor/altapp:aes';

Meteor.methods({
  encryptPass(schoolInfo){
    const encrypted = CryptoJS.AES.encrypt(schoolInfo.__schoolPassword, schoolInfo.__schoolName);

    if(encrypted == ""){
      throw new Meteor.Error('cant.encrypt', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
    else{
      return encrypted.toString();
    }

  }
})
