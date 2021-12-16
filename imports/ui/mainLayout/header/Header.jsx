import React from 'react';
import { Layout } from 'antd';

import SearchBar from '../searchBar/SearchBar';
import ListForm from '../../userLogout/ListForm';
import { HeaderStyled, LinkStyled } from './styled';

const { Header } = Layout;

const HeaderComponent = () => {
    return (
        <Layout>
            <Header>
                <HeaderStyled>
                    <div className="link-body">
                        <LinkStyled to="/app">FIND MATCH</LinkStyled>
                        <LinkStyled to="/app/grounds">GROUNDS</LinkStyled>
                        <LinkStyled to="/app/messages">MESSAGES</LinkStyled>
                        <LinkStyled to="/app/upcoming">UPCOMING</LinkStyled>
                        <LinkStyled to='/app/children-page'>Children Page</LinkStyled>
                        <SearchBar placeholder='Search ground, team or someone' />
                        <ListForm />
                    </div>
                </HeaderStyled>
            </Header>
        </Layout>
    )
}

export default HeaderComponent;