import React, { useState, useEffect, useCallback } from 'react';
import { Input, Space, Select, Slider, Popover, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import _debounce from 'lodash/debounce';

import { DivStyled } from "../styled";
import PageHeader from '../../mainLayout/pageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

const HeaderPlayer = (props) => {
    const {
        keyword, setKeyword,
        min, setMin, max, setMax,
        groundsData,
    } = props;
    const timeOptionData = ['Available Only', 'All Ground'];
    const [minLocal, setMinLocal] = useState(0)
    const [maxLocal, setMaxLocal] = useState(300)
    const [time, setTime] = useState(timeOptionData[0]);

    const [searchInput, setSearchInput] = useState('');

    useEffect((value) => {
        setTime(timeOptionData[value]);
    })
    const handleTimeChange = value => {
        console.log(`selected ${value}`);
        if (value === timeOptionData[0]) {
            console.log('dong 23: ', { groundsData });
        }
    }

    const onChange = value => {
        // console.log('onChange: ', value);
        setMinLocal(value[0]);
        setMaxLocal(value[1]);
    }

    const onAfterChange = value => {
        console.log('onAfterChange: ', value);
        console.log('dong 39: ', min);
        setMin(value[0]);
        setMax(value[1]);
    }

    const content = (
        <>
            <p>Please choose value in slide below</p>
            <Slider
                range
                max={300}
                step={5}
                value={[minLocal, maxLocal]}
                onChange={onChange}
                onAfterChange={onAfterChange}
            />
        </>
    )

    //Use lodash debounce: function handleInput use:
    // 1. update input -> setSearchInput
    // 2. action handleActiveDelay (debounce)
    const handleInput = (e) => {
        setSearchInput(e.target.value);
        handleActiveDelay(e.target.value);
    }

    //Thực hiện set value cho keyword thay vì tại onChange của Search
    const handleActiveDelay = useCallback(_debounce((value) => {
        setKeyword(value);
    }, 500), [setKeyword]);

    return (
        <DivStyled>
            <div className='header-player-side' >
                <PageHeader title={"Ground"} showBack={false} />
                <Space>
                    <Popover
                        content={content}
                        title='Price Range'
                        trigger='click'
                    >
                        <Button style={{ width: 150 }}>Price Range <DownOutlined /></Button>
                    </Popover>
                    <Select
                        placeholder='Select Time...'
                        value={time}
                        onChange={handleTimeChange}
                        style={{ width: '150px' }}
                    >
                        {timeOptionData.map(timeOption => (
                            <Option key={timeOption}>
                                {timeOption}
                            </Option>
                        ))}
                    </Select>
                    <Search
                        value={searchInput}
                        placeholder="Search Ground..."
                        onChange={(e) => handleInput(e)}
                        style={{ width: 200 }}
                    />
                </Space>
            </div>
        </DivStyled>
    )
}

export default HeaderPlayer;