import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import GroundCollection from '../db/GroundCollection';
import AvailableTime from '../db/AvailableTime';

Meteor.methods({
    'ground.insert'(groundData) {
        console.log('vao method')
        // const { groundName, pricePerHour, minMinutesUnit, address, lat, lng, description } = groundData;
        check(groundData, {
            groundName: String,
            pricePerHour: Number,
            minMinutesUnit: Number,
            address: String,
            description: String,
            imageGround: String,
            //available time data
            availableTime: [{
                dayOfWeek: Array,
                timeAvailableFrom: Number, //save minutes on day
                timeAvailableTo: Number, 
            }]
        });
        console.log('goi duoc check')
        if (!this.userId) {
            throw new Meteor.Error('Not authorizaed!');
        }
        console.log({
            groundData,
        })
        const groundId = GroundCollection.insert({
            groundName: groundData.groundName,
            pricePerHour: groundData.pricePerHour,
            minMinutesUnit: groundData.minMinutesUnit,
            address: groundData.address,
            description: groundData.description,
            imageGround: groundData.imageGround,

            userId: this.userId,
        });
        //Với mỗi available time, duyệt từng phần tử insert theo value và groundId
        groundData.availableTime.forEach(time => AvailableTime.insert({
            ...time,
            groundId,
        }));
    },

    //update
    'ground.edit'(_id, groundData) {
        console.log('da vao method chinh sua')
        if (!this.userId) {
            throw new Meteor.Error('Not permission!');
        }
        
        console.log('groundData: ', { groundData });
        // console.log('item: ', groundData.imageGround);

        GroundCollection.update({_id}, { $set: groundData }); // edit all element
        AvailableTime.remove({
            groundId: _id,
        });

        groundData.availableTime.forEach(time => AvailableTime.insert({
            ...time,
            groundId: _id,
        }));

        console.log('groundData sau update: ', { groundData });
    },

    'ground.delete'(_id) {
        console.log('da vao method delete');
        if (!this.userId) {
            throw new Meteor.Error('Not authorized!');
        }
        GroundCollection.remove({ _id });
        AvailableTime.remove({ groundId: _id });
    },

    'ground.getAvailabeTimeGround'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized!');
        }

        return availableTime = AvailableTime.find({
            groundId: _id,
        }).fetch();
    },
})