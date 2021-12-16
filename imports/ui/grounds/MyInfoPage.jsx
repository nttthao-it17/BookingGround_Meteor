import React from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const MyInfoPage = () =>{
    const {fullname, username, role, isReady} = useTracker(() => {
        const sub = Meteor.subscribe("usersList").ready();
        console.log("success", sub)
        if(sub){
            const info = Meteor.user();
            console.log(info);
            console.log(info.profile.role)
            return {fullname: info.profile.fullname, username: info.username, role: info.profile.role, isReady: true}
        }
        return  {isReady: false};
    });

    if(!isReady){
        return(<div>Error!!</div>)
    }
    return(
        <div>
            <div>Fullname: {fullname}</div>
            <div>Username: {username}</div>
            <div>Role: {role === true ? "admin" : "user"}</div>
        </div>
    );
}

export default MyInfoPage;