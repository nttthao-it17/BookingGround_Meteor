import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Tag, Button, Select } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

export const TagStyled = styled(Tag)`
    margin-right: 3px;
`
export const ButtonHeadingStyled = styled(Button)`
    margin-left: 10px;
`
export const SelectStyled = styled(Select)`
    width: 200px;
`
export const RemoveIcon = styled(MinusCircleOutlined)`
    color: red;
`