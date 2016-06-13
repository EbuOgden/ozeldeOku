signFunc = function(){

  const email = $('#emailUNew').val();
  const password = $('#passwordUNew').val();
  const passwordR = $('#passwordURNew').val();
  const name = $('#nameUNew').val();
  const surname = $('#surnameUNew').val();

  const __userC = new userInfo(email, passwordR, name, surname);

  const __user = __userC.user;

  Meteor.call('signUser', __user, (err,result) => {
    if(err){
      alert(err.reason);
    }
    else{
      alert("Başarıyla kayıt oldunuz!");
      $('#signUp').modal('hide');
      $('#emailUNew').val("");
      $('#passwordUNew').val("");
      $('#passwordURNew').val("");
      $('#nameUNew').val("");
      $('#surnameUNew').val("");
    }
  })
}

fileU = function(link){
  Meteor.call('imgUpload', link, (err,result) => {
    if(err){
      alert(err.reason);
    }
    else{
      alert("Dosyanız başarılı bir şekilde yüklenmiştir.");
    }
  })

}
