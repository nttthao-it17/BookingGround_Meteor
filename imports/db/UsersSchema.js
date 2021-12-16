import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// export const UsersCollection = new Mongo.Collection('user');

 const UsersSchema = new SimpleSchema({
    profile: Object,
        'profile.fullname': String,
        'profile.role': {type: Boolean, defaultValue: false}, //true: admin | false: user
    username: String,
    services: {
        type: Object,
        blackbox: true,
    }
})

Meteor.users.attachSchema(UsersSchema);

Meteor.publish('usersList', ()=>{
    console.log("success") // -> server, pub -> server(cmd)
    return Meteor.users.find();
})

