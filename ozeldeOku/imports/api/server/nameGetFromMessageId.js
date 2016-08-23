Meteor.methods({
  usN(id){
    this.unblock();

    if(id != 'ozeldeoku'){
        const name = Meteor.users.findOne({"_id" : id}).profile.name;

        if(name){
          return name;
        }
        else{
          throw new Meteor.Error('cant.get.username', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
        }
    }
    else{
      return "Özelde Oku";
    }

  }
})
