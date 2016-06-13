Template.registerHelper('roleControlAdmin', function(role){
  if(role == 'admin'){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('roleControlSchool', function(role){
  if(role == "School"){
    return true;
  }
  else{
    return false;
  }
})
