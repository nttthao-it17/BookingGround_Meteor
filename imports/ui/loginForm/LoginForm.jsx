import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect, useHistory, withRouter, Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

import { FormItemStyled, ButtonStyled } from './styled';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const submit = () => {
       Meteor.loginWithPassword(username, password, (err) =>{
           if(err) alert('Invalid account!')
       })
    };
      
    const currentUserId = useTracker(() =>{
        const currentUserId = Meteor.userId();
        return currentUserId;
    })

    if (currentUserId) {
        return <Redirect to="/app" />
    }

    return(
        <>
            <Form 
                name="normal_login"
                onFinish={submit} 
            >
                <h1>Login</h1>
                <FormItemStyled
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input 
                        prefix={<UserOutlined />} 
                        placeholder="Username" 
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormItemStyled>

                <FormItemStyled
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormItemStyled>
                <FormItemStyled>
                    <ButtonStyled type="button" htmlType="submit" >
                    Log in
                    </ButtonStyled>
                    <div>Or <Link to='/register'>register now</Link></div>
                </FormItemStyled>
            </Form>
        </>
        
    );
}

export default withRouter(LoginForm)