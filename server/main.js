import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
// import UsersCollection from '../imports/db/UsersCollection';
import '../imports/api'; //import method cho server

//Khởi tạo users
const userData = [{
  username: 'thuthao',
  password: '123',
  profile: {
    fullname: 'Thao',
    role: true,
  }
}, {
  username: 'thuthao1',
  password: '123',
  profile: {
    fullname: 'Thao 1',
    role: false,
  }
}, {
  username: 'thuthao2',
  password: '123',
  profile: {
    fullname: 'Thao 2',
    role: false,
  }
}]

Meteor.startup(() => {
  //nếu kh tìm thấy email này mới create email
  if (!Accounts.findUserByUsername('thuthao')) {
    userData.forEach(user => {
      Accounts.createUser(user);
    })
  }
})
