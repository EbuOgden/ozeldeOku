import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';

Meteor.methods({
  signUser(user){

    const newUser = Accounts.createUser({
      email : user.__email,
      password : user.__password,
      profile : {
        name : user.__name,
        surname : user.__surname,
        role : user.__role
      }
    })

    if(newUser == ""){
      throw new Meteor.Error('cant.sign.up', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
    else{

    }
  }
})
