import React from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Redirect, useHistory } from "react-router-dom";

const UserItem = (props) => {
    const his = useHistory();
    const showUserID = () =>{
        his.push(`/app/users/${props.item._id}`);
    }
        
    return (
    <div>
        <div>Fullname: {props.item.profile.fullname}</div>
        <div>Username: {props.item.username}</div>
        <div>Password: {props.item.services.password.bcrypt}</div>
        
        <button 
            type="button" 
            className="btn btn-default"
            onClick = {showUserID}
        >
            Detail
        </button>
        
        <div>----------------</div>
    </div>
)}
    
const UserListPage = () =>{

    const isReady = useTracker(() => {
        const sub = Meteor.subscribe("usersList").ready();
        return sub;
    })

    const usersList = useTracker(() =>{
        const usersData = Meteor.users.find().fetch();
        return usersData;
    })

    const currentUser = useTracker(() =>{
        const curUser = Meteor.user();
        return curUser;
    })

    if(isReady){
        if(currentUser.profile.role === false){
            return(
                <Redirect to="/app"/>
            )
        }
    
        return(
            <div>
                {usersList.map((itemArr, i) => <UserItem  key={i} item={itemArr} />)}
            </div>
        );
    }
    return <></>;
}

export default UserListPage; 