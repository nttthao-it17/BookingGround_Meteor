import { Meteor } from 'meteor/meteor';
import GroundCollection from '../../db/GroundCollection';

Meteor.publish('grounds', function publishGrounds(){
    return GroundCollection.find({});
})

//owner side
Meteor.publish('groundCrrUser', function publishGrounds(){
    return GroundCollection.find({userId: this.userId});
})

//player side
Meteor.publish('groundGetAll', function publishGrounds(query){
    return GroundCollection.find(query);
})