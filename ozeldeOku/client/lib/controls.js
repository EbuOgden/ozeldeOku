import { SchoolNotice } from '/imports/api/collections/schoolNotice.js';
import { SchoolEvents } from '/imports/api/collections/schoolEvents.js';
import { Schools } from '/imports/api/collections/schools.js';

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

schoolReject = function(schoolName){
	const s = Schools.findOne({"schoolName" : schoolName});

	if(s){
		Schools.remove({"_id" : s._id});
	}
}

addNotice = function(title, message){
	if(isEmpty(title) || isEmpty(message)){
		alert("Lütfen tüm kutuları doldurunuz!");
	}
	else{
		const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

		if(s){
			SchoolNotice.insert({
				schoolId : s._id,
				noticeTitle : title,
				noticeMessage : message
			})

			$('#schoolNoticeAdd').modal('hide');
		}
	}
}

addEvent = function(title, message){
	if(isEmpty(title) || isEmpty(message)){
		alert("Lütfen tüm kutuları doldurunuz!");
	}
	else{
		const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

		if(s){
			SchoolEvents.insert({
				schoolId : s._id,
				eventTitle : title,
				eventMessage : message
			})

			$('#schoolEventAdd').modal('hide');
		}
	}
}
