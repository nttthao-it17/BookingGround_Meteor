import React from 'react';
import { StyledContent } from './styled';
import { Layout } from 'antd';

import PageHeader from '../mainLayout/pageHeader/PageHeader';

const { Content } = Layout;

const ChildrenPage = () => {
    return (
        <>
            <PageHeader title={"Ground Info"} showBack={true} />
            <Content>
                <StyledContent>
                    <div className='div-content'>
                        <div>welcommmmmmmmmmmm</div>
                        <div>welcommmmmmmmmmmm</div>
                        <div>welcommmmmmmmmmmm</div>
                        <div>welcommmmmmmmmmmm</div>
                        <div>welcommmmmmmmmmmm</div>
                    </div>
                </StyledContent>

            </Content>
        </>
    )
}

export default ChildrenPage;