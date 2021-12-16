import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Card, Avatar, } from 'antd';
import { UserOutlined, StarOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

import {
    ButtonStyledGroundInfo, TitleOfGround, FeeGroundStyled,
    DivStyledGroundInfo, CardStyledGroundInfo, 
} from "../styled";
import PageHeader from '../../mainLayout/pageHeader/PageHeader';
import GroundCollection from "../../../db/GroundCollection";
import AvailableTime from '../../../db/AvailableTime';
import BookingGround from '../../booking/BookingGround';

const { Meta } = Card;
const GroundInfoDetail = () => {
    let { id } = useParams();
    const { groundInfoById, availableTimeData } = useTracker(() => {
        const subAllGrounds = Meteor.subscribe('grounds').ready();
        const groundInfoById = GroundCollection.findOne({ _id: id });

        const subAvailableTime = Meteor.subscribe('availableTime').ready();
        const availableTimeData = AvailableTime.findOne({ groundId: id });
        return { groundInfoById, availableTimeData };
    }, [id]);
    const availableTime = ((availableTimeData.timeAvailableTo - availableTimeData.timeAvailableFrom) / 60).toFixed(0);
    //Create Modal Booking ground
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    return (
        <>
            <PageHeader title={"Ground"} showBack />
            <DivStyledGroundInfo>
                <div className='bodyOfLayout' >
                    <div className='imgLayout' >
                        <img src={groundInfoById.imageGround} />
                    </div>
                    <div className='bottomLayout' >
                        <TitleOfGround>{groundInfoById.groundName}</TitleOfGround>
                        <p>{groundInfoById.address}</p>
                        <CardStyledGroundInfo bordered={false}>
                            <Meta
                                avatar={
                                    <Avatar icon={<UserOutlined />} />
                                }
                                title='first name'
                                description='owner-player'
                            />
                        </CardStyledGroundInfo>
                        <p>{groundInfoById.description}</p>
                        <FeeGroundStyled >{`$${groundInfoById.pricePerHour}.00`}
                            <span> /hr</span>
                        </FeeGroundStyled>

                        <div>
                            <ButtonStyledGroundInfo size='large' onClick={showModal}>
                                BOOK NOW
                            </ButtonStyledGroundInfo>
                            <ButtonStyledGroundInfo size='large' icon={<StarOutlined className='startIcon' />} >Favorite</ButtonStyledGroundInfo>
                            <ButtonStyledGroundInfo size='large' icon={<ShareAltOutlined className='shareIcon' />}>Share</ButtonStyledGroundInfo>
                        </div>
                        <h2 style={{ color: 'green' }}><strong>{availableTime}</strong>
                            <span> hours Available </span>
                        </h2>
                    </div>
                </div>
            </DivStyledGroundInfo>

            {/* Button BOOK NOW */}
            <BookingGround
                visible={isModalVisible} setVisible={setIsModalVisible}
                groundInfoById={groundInfoById}
            />
        </>
    )
}

export default GroundInfoDetail;