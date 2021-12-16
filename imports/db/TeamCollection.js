import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

TeamCollection = new Mongo.Collection();

TeamCollection.schema = new SimpleSchema({
    logo: String,
    teamName: String,
    teamNumber: Number,
    // leaderID: //=> userID
})
export default TeamCollection;