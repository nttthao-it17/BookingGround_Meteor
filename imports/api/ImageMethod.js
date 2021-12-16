import React from 'react';
import { Meteor } from 'meteor/meteor';

var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dswpm5bnb',
    api_key: '232495772785499',
    api_secret: 'RZ1nF9wOZa7FGRqAYZg-Mh10eEA'
});

const uploadfilePromise = (base64Data) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(base64Data, (error, result) => {
            console.log({ error, result });
            if (error) return reject(error);
            resolve(result);
        });
    })
}

Meteor.methods({
    'uploadFile': async (base64Data) => {
       
        const result = await uploadfilePromise(base64Data);
        return result;
    }
})
