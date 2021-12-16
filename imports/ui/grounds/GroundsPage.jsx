import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, notification } from 'antd';
import 'antd/dist/antd.css';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import PageHeader from '../mainLayout/pageHeader/PageHeader';
import GroundCollection from '../../db/GroundCollection';
import ShowListGrounds from './owner/ShowListGrounds';
import GroundForm from './owner/GroundForm';
import AvailableTime from '../../db/AvailableTime';
import GroundPlayer from './player/GroundPlayer';
import HeaderPlayer from './player/HeaderPlayer';

const GroundsCollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    return (
        <>
            <Modal
                visible={visible}
                title="Add new ground"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate({ ...values, imageGround: file.response.url });
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <GroundForm getForm={form} getFile={file} setNewFile={setFile} />
            </Modal>
        </>
    );
};

const notificationShow = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
}

//subscribe available time
const displayTimeData = () => {
    const {isReadyTime, timeData} = useTracker(() => {
        const isReadyTime = Meteor.subscribe('availableTime').ready();
        const timeData = AvailableTime.find({}).fetch();
        return {timeData};
    })

}

const GroundsPage = () => {
    const [visible, setVisible] = useState(false);
    const [crrUser, setCrrUser] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(300);

    const insertGround = (values) => {
        // console.log('insertGround')
        Meteor.call('ground.insert', values, function (err) {
            if (!err) {
                notificationShow('success', 'Success', 'Insert success!');
                return;
            } else {
                notificationShow('error', 'Error', 'Insert failed!');
                return console.log(err);
            }
        })
    }

    const onCreate = (values) => {
        console.log({ values });
        console.log(values.availableTime);
        const test = values.availableTime.map(time => ({
            dayOfWeek: time.dayOfWeek,
            timeAvailableFrom: time.timeAvailableFrom.diff(moment(time.timeAvailableFrom.toDate()).startOf('day'), 'minutes'),
            timeAvailableTo: time.timeAvailableTo.diff(moment(time.timeAvailableTo.toDate()).startOf('day'), 'minutes'),
        }))

        values.availableTime = test;
        // console.log('dong 75: ', test);

        console.log('Received values of form: ', values);

        setVisible(false);
        insertGround(values);
    };

    const {isReady, groundsData, currentUser} = useTracker(() => {
        const isReady = Meteor.subscribe('grounds').ready();
        const groundsData = GroundCollection.find({}).fetch();
        const currentUser = Meteor.user();
        return {isReady, groundsData, currentUser };
    })

    displayTimeData();

    useEffect(()=>{
        if(isReady){
            setCrrUser(currentUser.profile.userRole);
            console.log(currentUser.profile.userRole);
        }
    }, [isReady]);

    const handleCreate = (values) => {
        if (isReady) {
            // console.log(currentUser.profile.userRole)
            if (currentUser.profile.userRole === 'owner') {
                // thuthao123
                // pass: 1 -> owner

                // console.log('grounds: ', groundsData)
                onCreate(values);
            } else {
                notificationShow('error', 'Error', 'No permission!');
                setVisible(false);
                return;
            }
        }
    }

    return crrUser === 'owner' ? (
        <div>
            <PageHeader title={"Ground"} showBack={false} />
            <Button
                type="primary"
                onClick={() => { setVisible(true); }}
            >
                New Grounds
                </Button>
            <GroundsCollectionCreateForm
                visible={visible}
                onCreate={handleCreate}
                onCancel={() => { setVisible(false); }}
            />
            <ShowListGrounds />
        </div>
    ) : (
        <>
            <HeaderPlayer 
                keyword={keyword} 
                setKeyword={setKeyword} 
                min={min} setMin={setMin}
                max={max} setMax={setMax}
                groundsData={groundsData}
            />
            <GroundPlayer
                keyword={keyword}
                min={min}
                max={max}
            />
        </>
    );
};

export default GroundsPage;