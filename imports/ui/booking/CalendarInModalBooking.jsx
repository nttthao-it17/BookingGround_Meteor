import React, { useState, useEffect } from 'react';
// import moment from "moment";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Card } from "antd";

const CalendarInModalBooking = (props) => {
    const { value: now ,setNow: setNow } = props;
    const [calendar, setCalendar] = useState([]);
    // const  [day, setDay] = useState([]);
    const startDay = now.clone().startOf('month'); 
    console.log('startDay: ', startDay.format('D'));
    const endDay = now.clone().endOf('month');
    useEffect(() => {
        const day = startDay.clone().subtract(1, 'day');
        const a = [];
        while (day.isBefore(endDay, 'day')) {
            a.push(
                Array(13)
                    .fill(0)
                    .map(() => day.add(1, 'days').clone())
            );
        }
        setCalendar(a);
    }, [now]);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        speed: 500
    };
    const renderDate = () => {

    }
    return (
        <>
            <h2>Multiple items</h2>
            <Slider {...settings}>
                {/* {a.map(i => (<Card>{i}</Card>))} */}
                {
                    [1,2,3,4,].map(day => {
                        console.log('day: ', day);
                        return(
                            <Card onClick={() => setNow(day)}>
                                {day}
                            </Card>
                    )})
                }
            </Slider>
        </>
    )
}
export default CalendarInModalBooking; 