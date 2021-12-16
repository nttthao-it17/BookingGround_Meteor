import React from "react";
import 'antd/dist/antd.css';
import { List } from 'antd';
import { useTracker } from 'meteor/react-meteor-data';
import { useHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import {
    DivStyled,
    CardStyled,
    FeeGroundStyled,
    EditStyledParagrap
} from '../styled';
import GroundCollection from '../../../db/GroundCollection';

const { Meta } = CardStyled;

const GroundPlayer = (props) => {
    const {
        keyword,
        min, max,
    } = props;

    const queryByPriceRange = {
        pricePerHour: {
            $gte: min, // pricePerHour >= min
            $lte: max, // pricePerHour <= max
        }
    }
    const query = {
        $and: [queryByPriceRange]
    };
    if (keyword) {
        const queryByKeyword = ({
            $or: [{
                groundName: { $regex: new RegExp(keyword, "i") } //hoặc groundName: keyword để input tìm kiếm chính xác
            }, {
                address: { $regex: new RegExp(keyword, "i") }
            }],
        });
        query.$and.push(queryByKeyword);
    }

    const { groundData } = useTracker(() => {
        const sub = Meteor.subscribe('groundGetAll').ready();
        const groundData = GroundCollection.find(query).fetch();
        return { groundData };
    })

    // console.log('dong 53: ', groundData)
    const history = useHistory();
    const onHandleGroundInfo = (id) => {
        console.log('id: ', id);
        history.push(`/app/grounds/ground-info/${id}`);
    }

    return (
        <DivStyled>
            <div className="site-card-wrapper" >
                <List
                    itemLayout='horizontal'
                    size='large'
                    grid={{ gutter: 16, column: 3 }}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 6,
                    }}
                    dataSource={groundData}
                    renderItem={item => {
                        /*Tính giá tiền trong tgian tối thiểu (minMinuteUnit) để tính giá tiền sân
                        trong khoảng tgian custom */
                        // const calc = (item.pricePerHour * (item.minMinutesUnit / 60)).toFixed(2);
                        const fixPrice = (item.pricePerHour).toFixed(2);

                        return (
                            <List.Item>
                                <CardStyled
                                    hoverable={true}
                                    onClick={() => onHandleGroundInfo(item._id)}
                                    cover={
                                        <img src={item.imageGround} />
                                    }
                                >
                                    <DivStyled>
                                        <div className='divMeta' >
                                            <Meta
                                                title={item.groundName}
                                                description={item.address}
                                            />
                                            <EditStyledParagrap>
                                                <div className='showPriceOfGrounf'>
                                                    <FeeGroundStyled >{`$${fixPrice}`}</FeeGroundStyled>
                                                    <p>/hour</p>
                                                </div>
                                            </EditStyledParagrap>
                                        </div>
                                    </DivStyled>
                                </CardStyled>
                            </List.Item>
                        )
                    }}
                />
            </div >
        </DivStyled>

    )
}

export default GroundPlayer;