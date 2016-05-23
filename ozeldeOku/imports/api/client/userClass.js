export class userInfo {
  constructor(email, password, name, surname){
    this._email = email;
    this._password = password;
    this._name = name
    this._surname = surname
  }

  get user(){
    return this.getUser();
  }

  getUser(){
    const __usobj = {
      __email : this._email,
      __password : this._password,
      __name : this._name,
      __surname : this._surname
    }

    return __usobj;
  }
}
