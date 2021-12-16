import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button } from 'antd';
import {
    QuestionCircleOutlined, ArrowRightOutlined,
    LeftOutlined, RightOutlined,
} from "@ant-design/icons";
import moment from "moment";

import CalendarInModalBooking from './CalendarInModalBooking';

const BookingGround = (props) => {
    const {
        visible, setVisible,
        groundInfoById,
    } = props;
    const [value, setValue] = useState(moment());
    const currMonth = useMemo(()=> value.format('MMMM'),[value]);
    const currYear = useMemo(()=> value.format('YYYY'),[value]);

    // const currYear = value.format('YYYY');

    const prevMonth = () => {
        setValue(val=>val.clone().subtract(1,'month')) ;
    }
    const nextMonth = () => {
        setValue( val=>val.clone().add(1, 'month'));
    }
    const handleOk = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <>
            <Modal
                visible={visible}
                title={(
                    <>
                        <h3>Book your Match</h3>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '70%' }}>
                                <span style={{ color: 'green', borderRight: '0.5px solid rgb(229 238 229)', paddingRight: '20px' }}>{groundInfoById.groundName}</span>
                                <span style={{ color: 'grey', paddingLeft: '20px' }}>{groundInfoById.address}</span>
                            </div>
                            <div style={{
                                width: '30%', height: '35px',
                                border: '1px solid #f4eeee',
                                borderRadius: '3px',
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}>
                                <Button icon={<LeftOutlined />}
                                    style={{ border: 'none', color: 'grey' }}
                                    onClick={prevMonth}
                                />  
                                <div style={{
                                    height: '35px',
                                    lineHeight: '35px',
                                    borderLeft: '1px solid #f4eeee',
                                    borderRight: '1px solid #f4eeee',
                                    width: '65%',
                                    textAlign: 'center',
                                }}>
                                    {currMonth} {currYear}
                                </div>
                                <Button icon={<RightOutlined />}
                                    style={{ border: 'none', color: 'grey', }}
                                    onClick={nextMonth}
                                />
                            </div>
                        </div>
                    </>
                )}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={
                    <div style={{ display: 'flex', padding: 0 }}>
                        <p style={{ width: '65%', paddingRight: '20px', textAlign: 'initial', color: 'gray' }}>
                            <QuestionCircleOutlined />&nbsp;
                            Select "Open Match" to get your match available for other teams to join.
                            You can also join an someone's Openning Match.
                        </p>
                        <Button key="submit" type="primary"
                            style={{
                                left: '20%', margin: '10px 0',
                                width: 100, height: 45,
                            }}
                            icon={<ArrowRightOutlined />}
                            onClick={handleOk}
                        >
                            NEXT
                        </Button>
                    </div>
                }
            >
                <CalendarInModalBooking
                    value={value} setValue={setValue}
                />
            </Modal>
        </>
    )
}

export default BookingGround;