import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

GroundCollection = new Mongo.Collection('grounds')
//schema attach to collection
GroundCollection.schema = new SimpleSchema({
    groundName: String,
    pricePerHour: Number,
    minMinutesUnit: Number,
    address: String,
    description: String,
    imageGround: String,
    // voteStar: Number
})
export default GroundCollection;