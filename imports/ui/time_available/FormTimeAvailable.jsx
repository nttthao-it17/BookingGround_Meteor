import React from 'react';
import { TimePicker, Space, Form } from 'antd';
import { get } from 'lodash'
import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons';


import { TagStyled, ButtonHeadingStyled, SelectStyled, RemoveIcon } from './styled';

const TimeAvailableForm = (props) => {
    const options = [
        { value: 'Mon' },
        { value: 'Tue' },
        { value: 'Wed' },
        { value: 'Thu' },
        { value: 'Fri' },
        { value: 'Sat' },
        { value: 'Sun' },
    ];

    const colorMap = {
        Mon: 'gold',
        Tue: 'lime',
        Wed: 'cyan',
        Thu: 'green',
        Fri: 'volcano',
        Sat: 'blue',
        Sun: 'purple'
    }

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        return (
            <TagStyled
                color={colorMap[value]}
                closable={closable}
                onClose={onClose}
            >
                {label}
            </TagStyled>
        )
    }

    //Time picker
    const onChange = (time) => {
        console.log(time);
    }

    // const checkTime = (_, value) =>{
    //     console.log('dong 49: ', {_});
    //     console.log('dong 50: ', value);
    // }

    const { dayOfWeek, start, end } = props;

    return (
        <Form.List name='availableTime'>
            {(fields, { add, remove }) => (
                <>
                    <Form.Item>
                        <div className='heading-available-time'>
                            <label>Available times</label>
                            <ButtonHeadingStyled
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                            />
                        </div>

                    </Form.Item>

                    {fields.map((field, index) => (
                        <Space key={field.key} align="baseline" >
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, curValues) =>
                                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                }
                            >
                                {() => (
                                    <Form.Item
                                        {...field}
                                        label="Day of week"
                                        name={[field.name, 'dayOfWeek']}
                                        fieldKey={[field.fieldKey, 'dayOfWeek']}
                                        rules={[{ required: true, message: 'Missing day of week' }]}
                                        initialValue={dayOfWeek}
                                    >
                                        <SelectStyled
                                            mode="multiple"
                                            showArrow
                                            tagRender={tagRender}
                                            options={options}
                                            placeholder='Day of week'
                                        />
                                    </Form.Item>
                                )}
                            </Form.Item>
                            <Form.Item
                                {...field}
                                label="Start"
                                name={[field.name, 'timeAvailableFrom']}
                                fieldKey={[field.fieldKey, 'timeAvailableFrom']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing start'
                                        // validator: checkTime, 
                                    }
                                ]}
                                initialValue={start}
                            >
                                <TimePicker
                                    use12Hours
                                    format="h:mm a"
                                    onChange={onChange}
                                    placeholder='From...'
                                />
                            </Form.Item>
                            <Form.Item
                                {...field}
                                label="End"
                                name={[field.name, 'timeAvailableTo']}
                                fieldKey={[field.fieldKey, 'timeAvailableTo']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing end'
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, endTime) {
                                            const availableTime = getFieldValue('availableTime');
                                            const startTime = get(availableTime, `[${index}].timeAvailableFrom`);
                                            console.log('startTime: ', startTime);
                                            if (endTime && startTime) {
                                                const startTimeMinutes = startTime.diff(moment(startTime.toDate()).startOf('day'), 'minutes');
                                                const endTimeMinutes = endTime.diff(moment(endTime.toDate()).startOf('day'), 'minutes');
                                                console.log(startTimeMinutes, endTimeMinutes);
                                                if ((endTimeMinutes - startTimeMinutes) >= 30) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(`End-time must be after start-time !`);
                                            }
                                        },
                                    }),
                                ]}
                                initialValue={end}

                            >
                                <TimePicker
                                    use12Hours
                                    format="h:mm a"
                                    onChange={onChange}
                                    placeholder='To...'
                                />
                            </Form.Item>

                            <RemoveIcon onClick={() => remove(field.key)} />
                        </Space>
                    ))}
                </>
            )}
        </Form.List>
    )
}

export default TimeAvailableForm;