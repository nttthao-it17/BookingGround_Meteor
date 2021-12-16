import React, { useEffect, useRef } from 'react';
import { Form, Input } from 'antd';
import 'antd/dist/antd.css';
import PropTypes, { number } from 'prop-types';

import { InputNumberStyled, FormButtonStyled } from '../styled';
import CustomUploadSingleImage from './UploadImages';
import GoogleMapAddress from './GoogleMapAddress';
import TimeAvailableForm from '../../time_available/FormTimeAvailable';

const GroundForm = (props) => {
    const {
        getForm: form, setNewFile: setFile, //GroundPage, đặt lại tên -> têncũ: tênmới
        onOk: handleOk, onCancel: handleCancel,
        isShouldShowButton: shouldShowButton, initialValue: record //ShowListGrounds
    } = props;

    const inputEl = useRef(null);
    const isUpdate = !!record; // record có value

    useEffect(() => {
        if (isUpdate) {
            const _id = record.key;
            Meteor.call('ground.getAvailabeTimeGround', _id, (error, availableTime) => {
                // console.log(inputEl, error, availableTime);
                inputEl.current.setFieldsValue({
                    availableTime: availableTime.map(time => ({
                        // lấy từng phần tử cần thiết trong object ra xử lý
                        dayOfWeek: time.dayOfWeek,
                        timeAvailableFrom: moment().startOf('day').add(time.timeAvailableFrom, 'minutes'),
                        timeAvailableTo: moment().startOf('day').add(time.timeAvailableTo, 'minutes'),
                    }))
                });
            })
        }
    }, [record]);

    //update imageGround when field change value
    //url : obj -> { response:{ url: record.imageGround }}
    useEffect(() => {
        setFile({ response: { url: record.imageGround } });
    }, [record.imageGround]);
    // console.log('pic 42: ', record.imageGround);

    return (
        <Form
            ref={inputEl}
            form={form}
            layout="vertical"
            name="form_in_modal"
            onFinish={handleOk}
            initialValues={record ? record : {}}
        >
            <Form.Item
                name="groundName"
                label="Ground name"
                rules={[
                    {
                        required: true,
                        message: 'Please input the ground name!',
                    },
                ]}
            // initialValue={typeof record.groundName !== undefined ? record.groundName : ''}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="pricePerHour"
                label="Price-per-hour (USD)"
                rules={[
                    {
                        type: 'number',
                        min: 1,
                        required: true,
                        message: 'Please input the price-per-hour and must upper 1 USD!',
                    },
                ]}
            // initialValue={typeof record.pricePerHour !== undefined ? record.pricePerHour : ''}
            >
                <InputNumberStyled />
            </Form.Item>
            <Form.Item
                name="minMinutesUnit"
                label="Min-minutes-unit"
                rules={[
                    {
                        type: 'number',
                        min: 30,
                        required: true,
                        message: 'Please input the min-minutes-unit and must upper 30 minutes!',
                    },
                ]}
            // initialValue={typeof record.minMinutesUnit !== undefined ? record.minMinutesUnit : ''}
            >
                <InputNumberStyled />
            </Form.Item>
            <Form.Item
                name="address"
                label="Address"
                rules={[
                    {
                        required: true,
                        message: 'Please input the address!',
                    },
                ]}
            // initialValue={typeof record.address !== undefined ? record.address : ''}
            >
                <Input />
            </Form.Item>
            <GoogleMapAddress />
            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: 'Please input the description!',
                    },
                ]}
            // initialValue={typeof record.description !== undefined ? record.description : ''}
            >
                <Input type="textarea" />
            </Form.Item>
            {/* ImageUploader */}
            <label>Ground image</label>
            <CustomUploadSingleImage
                onChangeFile={setFile}
                URL={record.imageGround}
            />
            {/* Available Time */}
            <TimeAvailableForm
                dayOfWeek={record.dayOfWeek}
                start={record.timeAvailableFrom}
                end={record.timeAvailableTo}
            />

            {shouldShowButton && (<FormButtonStyled htmlType="button" onClick={handleCancel}>Cancel</FormButtonStyled>)}
            {shouldShowButton && (<FormButtonStyled htmlType="submit">Save</FormButtonStyled>)}
        </Form>
    )
}
GroundForm.defaultProps = {
    shouldShowButton: false,
    initialValue: {},
}

GroundForm.PropTypes = {
    form: PropTypes.any,
    file: PropTypes.string.isRequired,
    setFile: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    initialValue: PropTypes.any,
    shouldShowButton: PropTypes.bool,
}

export default GroundForm;