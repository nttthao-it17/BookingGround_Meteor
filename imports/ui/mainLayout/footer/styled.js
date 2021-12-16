import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import styled from 'styled-components';

const { Footer } = Layout;

export const FooterStyled = styled(Footer)`
    font-size: 15px;
`;

export const LayoutStyled = styled.div`
    .line-top, .menu-footer{
        display: flex;
    }

    .menu-footer div{
        width: 130px;
    }

    .line-icon{
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }

    .line-icon span{
        width: 30px;
    }

    .line-icon span svg{
        width: 20px;
        height: 20px;
    }
`
export const ButtonStyled = styled(Button)`
    color: black;

`
