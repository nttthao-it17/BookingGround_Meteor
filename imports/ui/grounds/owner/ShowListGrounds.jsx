import React, { useState } from 'react';
import { Space, Button, Modal, Popconfirm, Form, notification } from 'antd';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import {
    EditButtonStyled,
    DeleteButtonStyled,
    TableStyled,
} from '../styled';
import GroundCollection from '../../../db/GroundCollection';
import GroundForm from './GroundForm';

const columns = [
    {
        title: 'Ground name',
        dataIndex: 'groundName',
        key: 'groundName',
    },
    {
        title: 'Image of Ground',
        dataIndex: 'imageGround',
        key: 'imageGround',
        render: (imageGround) => {
            // console.log('imageGround: ', imageGround);
            return (
                <img src={imageGround} style={{ width: 30, height: 30 }} />
            )
        }
    },
    {
        title: 'Price per Hour',
        dataIndex: 'pricePerHour',
        key: 'pricePerHour',
    },
    {
        title: 'Min minutes unit',
        dataIndex: 'minMinutesUnit',
        key: 'minMinutesUnit',
    },

    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Action',
        key: 'action',
        render: (record) => (
            <Space size="middle">
                <DesignEditModalButton record={record} />
                <DesignDeleteButton record={record} />
            </Space>
        ),
    },
];

const notificationSuccess = (type, message, description) =>{
    notification[type]({
        message,
        description,
    });
}

const ShowListGrounds = () => {
    const isReady = useTracker(() => {
        const sub = Meteor.subscribe('groundCrrUser').ready();
        return sub;
    })

    const groundCrrUserData = useTracker(() => {
        const groundData = GroundCollection.find({ userId: Meteor.userId() }).fetch();
        return groundData;
    })

    if (isReady) {
        console.log('groundData dong 83: ', groundCrrUserData);
        // console.log('id: ', groundCrrUserData[0]._id);
    }

    const data = groundCrrUserData.map(item => ({
        key: item._id,
        groundName: item.groundName,
        imageGround: item.imageGround,
        pricePerHour: item.pricePerHour,
        minMinutesUnit: item.minMinutesUnit,
        address: item.address,
        description: item.description,
    }))
    return (
        <>
            <TableStyled columns={columns} dataSource={data} />
        </>
    )
}

const DesignEditModalButton = (props) => {
    const { record } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    //Updated
    const handleOk = (values) => {
        // console.log({record}); 
        const _id = record.key;
        //Chuyển đổi thành phút trong ngày sau khi update để lưu vào database
        const test = values.availableTime.map(time => ({
            dayOfWeek: time.dayOfWeek,
            timeAvailableFrom: time.timeAvailableFrom.diff(moment(time.timeAvailableFrom.toDate()).startOf('day'), 'minutes'),
            timeAvailableTo: time.timeAvailableTo.diff(moment(time.timeAvailableTo.toDate()).startOf('day'), 'minutes'),
        }))
        values.availableTime = test;
        //...values sẽ lấy được hết các elements trong obj, bao gồm cả test (thuộc obj value)
        Meteor.call('ground.edit', _id, {...values, imageGround: file.response.url }, function (err) {
            if (!err) {
                notificationSuccess('success', 'Success', 'Editting success!');
                setIsModalVisible(false);
            } else {
                return console.log(err);
            }
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button icon={<EditButtonStyled />} onClick={showModal} />
            <Modal
                title="Editing items"
                visible={isModalVisible}
                footer={null} //tắt các button của Modal
                onCancel={handleCancel}
            >
                <GroundForm
                    //Tạo các props để truyền vào component con GroundForm
                    getForm={form}
                    getFile={file}
                    setNewFile={setFile}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    isShouldShowButton={true}
                    initialValue={record}
                />
            </Modal>
        </>
    )
}

const DesignDeleteButton = (props) => {
    const { record } = props;
    const deleteItem = () => {
        const _id = record.key;
        Meteor.call('ground.delete', _id, function (err) {
            if (!err) {
                notificationSuccess('success', 'Success', 'Delete success!');
                return;
            } else {
                return console.log(err);
            }
        })
    }

    return (
        <Popconfirm title="Sure to delete?" onConfirm={deleteItem}>
            <Button icon={<DeleteButtonStyled />} />
        </Popconfirm>
    )
}

export default ShowListGrounds;