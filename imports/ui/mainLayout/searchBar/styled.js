import styled from 'styled-components';
import 'antd/dist/antd.css';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export const InputStyled = styled(Input)`
    width: 300px;
    margin: 15px 0;
    padding: 0 10px;
    border-radius: 6px;
    height: 33px;
`
export const SearchIcon = styled(SearchOutlined)`
    width: 30px;
`