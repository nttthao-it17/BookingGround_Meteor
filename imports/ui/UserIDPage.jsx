import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
    
const UserIDPage = () =>{
    const { userId } = useParams();
    const currentUserId = Meteor.userId();
    const isReady = useTracker(() =>{
        return Meteor.subscribe("usersList").ready();
    })

    // const {usesData, fullname, username, role} = useTracker(() =>{
    //     const ids = Meteor.users.findOne({_id: userId});
    //     console.log(ids)
    //     return {usesData: ids, fullname: ids.profile.fullname, username: ids.username, role: ids.profile.role};
    // })

    const usesData = useTracker(() =>{
        const ids = Meteor.users.findOne({_id: userId});
        console.log(ids)
        return ids;
    })

    if(isReady){
        return(
            <div>
                <div>Fullname: {usesData.profile.fullname}</div>
                <div>Username: {usesData.username}</div>
                <div>Role: {usesData.profile.role === true ? "Admin" : "User"}</div>
            </div>
        )
    }
    return <></>
}

export default UserIDPage;