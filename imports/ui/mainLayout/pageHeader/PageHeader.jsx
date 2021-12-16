import React from 'react';
import 'antd/dist/antd.css';
import { PageHeaderStyled } from './styled';

const PageHeaderComponent = (props) => {
    const addtionalProps = {};
    //Cần 2 điều kiện để show icon:
    // có props onBack
    // backIcon != false
    if (!props.showBack) {
        addtionalProps.backIcon = false; // kh show icon
    } else {
        addtionalProps.onBack = () => { window.history.back() };
    }

    return (
        <PageHeaderStyled
            ghost={false}
            className='site-page-header'
            title={props.title}
            {...addtionalProps}
        />
    )
}

export default PageHeaderComponent;