import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Upload, Icon } from 'antd';
import _get from 'lodash/get';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


class CustomUploadSingleImage extends React.Component {
    state = {
        loading: false,
    };

    handleChange = (info) => {
        const { input, onChangeFile } = this.props;
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (imageUrl) => this.setState({
                imageUrl,
                loading: false,
            }))
        }
        onChangeFile(info ? info.file : null); // nơi nhận props
        // console.log('info: ', {info});
    };

    customRequest = async ({ file, onError, onProgress, onSuccess }) => {
        var base64Data = await toBase64(file);
        Meteor.call('uploadFile', base64Data, (error, uploadedUrl) => {
            if (!error) {
                onSuccess(uploadedUrl);
            } else {
                onError(error);
            }
        })
    }

    render() {
        const { loading } = this.state;
        const { val, URL } = this.props;
        const value = val || null;
        // val = {
        //     response: {
        //         url: 'asdf'
        //     }
        // }
        const uploadButton = () => (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const imageUrl = _get(this.state, 'imageUrl') || _get(value, 'response.url') || URL
        // console.log('imageUrl: ', this.state); //local url
        // console.log('imageUrl value: ', value); //cloudinary url

        return (
            <Upload
                accept='.jpg, .png'
                customRequest={this.customRequest}
                listType='picture-card'
                className='upload-pictures'
                showUploadList={false}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="pictures" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        )
    }
}

export default CustomUploadSingleImage;