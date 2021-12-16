import {Meteor} from 'meteor/meteor';
import { check } from 'meteor/check'; 
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
    'user.register'(userData){
        const { username, password, email, fullname, phone, userRole } = userData;
        console.log('userdata: ', userData)
        check(userData, {
            username: String,
            email: String,
            password: String,
            fullname: String,
            phone: String,
            userRole: String,
            prefix: String,
            confirm: String,
        });
        console.log('3')

        const userID = Accounts.createUser({
            username: userData.username,
            email: userData.email,
            password: userData.password, 
            profile: {
                fullname: userData.fullname,
                phone: userData.phone,
                userRole: userData.userRole
            }
        })
            
    }
})