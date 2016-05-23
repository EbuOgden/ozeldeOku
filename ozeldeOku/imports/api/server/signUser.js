import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  signUser(user){

    const newUser = Accounts.createUser({
      email : user.__email,
      password : user.__password,
      profile : {
        name : user.__name,
        surname : user.__surname,
        role : 'Veli'
      }
    })

    if(newUser == ""){
      throw new Meteor.Error('cant.sign.up', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
    else{

    }

    //user geldiginde insertte role veli olacak
  }
})
