isEmpty = function(message){
	if(message === "" || message == "" || message === "undefined" || message == "undefined"){
		return true;
	}
	else
		return false;
}

isEqual = function(message1, message2){
	if((message1 == message2) || (message1 === message2)){
		return true;
	}
	else{
		return false;
	}

}

trimInput = function(value){
	return value.replace(/^\s*$/g, '');
}

isEmail = function(email){
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(email))
			return true;

	else{
			return false;
	}
}

isValidPassword = function(password){
	if(password.length < 6){
		return false;
	}

	else {
		return true;
	}
}

areValidPassword = function(password, rePassword){

	if(password !== rePassword){
		return false;
	}

	return true;
}

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

schoolConfirm = function(schoolName){
	Meteor.call('confirmSchool', schoolName, (err, result) => {
		if(err){
			alert(err.reason);
		}
		else{
			$('#schoolInfo').modal('hide');
			alert(schoolName + "'in üyeliği aktif edilmiştir.");
		}
	})
}
