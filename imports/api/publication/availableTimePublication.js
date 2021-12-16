import {Meteor} from 'meteor/meteor';
import AvailableTime from '../../db/AvailableTime';

Meteor.publish('availableTime', function callBack(){
    return AvailableTime.find({});
})