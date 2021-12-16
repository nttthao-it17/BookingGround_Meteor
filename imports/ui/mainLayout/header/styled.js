import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

export const HeaderStyled = styled.div`
    .link-body a:hover{
        background-color: white;
        color: black;
    }

    .link-body{
        background-color: black;
        text-align: center;
        display: flex;
        line-height: 44px;
    }
`

export const LinkStyled = styled(Link)`
    color: white ;
    padding: 10px;
    width: 150px;
`