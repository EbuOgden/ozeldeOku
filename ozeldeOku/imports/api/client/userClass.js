export class userInfo {
  constructor(email, password, name, surname, role){
    this._email = email;
    this._password = password;
    this._name = name
    this._surname = surname
    this._role = role
  }

  get user(){
    return this.getUser();
  }

  getUser(){
    const __usobj = {
      __email : this._email,
      __password : this._password,
      __name : this._name,
      __surname : this._surname,
      __role : this._role
    }

    return __usobj;
  }
}
