import React from 'react';
import { InputStyled, SearchIcon } from './styled';

const SearchBar = (props) =>{
    return(
        <InputStyled
            placeholder={props.placeholder} 
            prefix={< SearchIcon />}
        />
    )
}

export default SearchBar;