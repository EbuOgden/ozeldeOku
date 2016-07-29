export const otherScholarInfos = {
  __otherScholarInfos : [{
    __otherScholarName : "",
    _otherScholarRate__ : 0
  }],

  set setOtherScholarInfos(obj){
    this.__otherScholarInfos.push({
      __otherScholarName : obj.otherScholarName,
      _otherScholarRate__ : obj.otherScholarRate
    })
  },

  get getOtherScholarInfos(){
    return this.__otherScholarInfos;
  }
}
