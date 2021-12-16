import styled from 'styled-components';
import 'antd/dist/antd.css';
import { InputNumber, Table, Button, Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const InputNumberStyled = styled(InputNumber)`
    width: 100%;
`

//ShowListGrounds
export const EditButtonStyled = styled(EditOutlined)`
    color: green;
`
export const DeleteButtonStyled = styled(DeleteOutlined)`
    color: red;
`
export const TableStyled = styled(Table)`
    margin: 10px 30px;
`

//GroundForm
export const FormButtonStyled = styled(Button)`
    left: 35%;
    margin-right: 10px;
    &:hover{
        background-color: #40a9ff;
        color: white;
    }
`

//GroundPlayer
export const DivStyled = styled.div`
    .site-card-wrapper{
        width: 90%;
        margin: 0 auto;
    }
    .divMeta{
        display: flex;
        justify-content: space-between;
    }
    .header-player-side{
        width: 100%;
        display: flex;
    }
`
export const CardStyled = styled(Card)`
    width: 300px;
    padding: 8px;
`
export const FeeGroundStyled = styled.h2`
    color: green;
    h2 span{
        color: gray;
        font-size: 16px;
    }
`
export const EditStyledParagrap = styled.div`
    .showPriceOfGrounf h2{
        margin: 0;
    }
    .showPriceOfGrounf p{
        color: green;
    }
`

//GroundInfoDetail
export const TitleOfGround = styled.h2`
    font-size: 30px;
`
export const ButtonStyledGroundInfo = styled(Button)`
    .startIcon, .shareIcon{
        color: #51ac0c;
    }
    &:hover{
        background-color: #51ac0c;
        border-color: #51ac0c;
        color: white;
        .startIcon, .shareIcon{
            border-color: white;
            color: white;
        }
    }
`
export const DivStyledGroundInfo = styled.div`
    .bodyOfLayout{
        display: flex;
        margin: 0 auto;
        width: 90%;
    }
    .bodyOfLayout .imgLayout{
        width: 65%;
        padding-right: 30px;
    }
    .bodyOfLayout .imgLayout img{
        width: 100%;
    }
    .bodyOfLayout .bottomLayout{
        width: 35%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`
export const CardStyledGroundInfo = styled(Card)`
    border-top: 1px solid darkgrey;
`