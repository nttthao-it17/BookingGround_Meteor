import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

BookingCollection = new Mongo.Collection();

BookingCollection.schema = new SimpleSchema({
    dateTime: new Date(),
    minuteStart: Number,
    minuteEnd: Number,
    timeBin: Array,
    openMatch: {type: Boolean, defaultValue: false}
})
export default BookingCollection;