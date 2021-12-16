import React from 'react';
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    CopyrightOutlined
} from '@ant-design/icons';
import { Button, Layout } from 'antd';

import { FooterStyled, LayoutStyled, ButtonStyled } from './styled';

const FooterComponent = () => {
    return (
        <Layout>
            <FooterStyled>
                <LayoutStyled>
                    <div className='line-top'>
                        <div className='menu-footer'>
                            <div>Logo Image</div>
                            <div>Download App</div>
                            <div>F.A.Q</div>
                            <div>Suport</div>
                            <div>Feedback</div>
                        </div>
                        <div className='line-icon'>
                            <ButtonStyled 
                                icon={<FacebookOutlined />} 
                                type='link'
                                href='https://www.facebook.com/'
                                target='blank'
                                // style={{color: 'black'}}
                            />
                            <ButtonStyled 
                                icon={<TwitterOutlined />} 
                                type='link'
                                href='https://twitter.com/twister'
                                target='blank'
                                // style={{color: 'black'}}
                            />
                            <ButtonStyled 
                                icon={<InstagramOutlined />} 
                                type='link'
                                href='https://www.instagram.com/'
                                target='blank'
                                // style={{color: 'black'}}
                            />
                        </div>
                    </div>
                    <div className='line-bottom'>
                        <CopyrightOutlined />2017 Zigvy Inc.
                    </div>
                </LayoutStyled>

            </FooterStyled>
        </Layout>
    )

}

export default FooterComponent;