const UserProfile = new SimpleSchema({
  name : {
    type : String,
    optional : false
  },

  surname : {
    type : String,
    optional : true
  },

  role : {
    type : String,
    optional : false
  }
})

Meteor.users.attachSchema(new SimpleSchema({
    username : {
      type : String,
      optional : true
    },

    emails : {
      type : Array,
      optional : true
    },

    "emails.$" : {
      type : Object
    },

    "emails.$.address" : {
      type : String
    },

    "emails.$.verified" : {
      type : Boolean,
      optional : true

    },

    createdAt : {
      type : Date,
      autoValue : function(){
        if(this.isInsert){
          return new Date();
        }
      }
    },

    profile : {
      type : UserProfile,
    },

    services : {
      type : Object,
      optional : true,
      blackbox : true
    }

}), {replace : true});
