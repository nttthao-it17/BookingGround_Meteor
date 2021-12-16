import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

UsersCollection = new Mongo.Collection();
//schema attach to Collection
UsersCollection.schema = new SimpleSchema({
    username: String,
    profile : Object,
        'profile.fullname': String,
        'profile.phone': String,
        'profile.userRole': String,
    email: String,
    services: {
        type: Object,
        blackbox: true
    }
})
// const userSchema = UsersCollection.schema;

export default UsersCollection;