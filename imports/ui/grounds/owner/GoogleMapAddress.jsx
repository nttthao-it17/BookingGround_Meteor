import React from 'react';
import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
// import Geocode from 'react-geocode';
// import Autocomplete from 'react-google-autocomplete';

// Geocode.setApiKey('AIzaSyBU_LEp0t3dmV1UsmEdM3gJN309J2pDlgg')

class GoogleMapAddress extends React.Component {
    // state={
    //     address: '',
    //     state: '',
    //     zoom: 8,
    //     height: 400,
    //     mapPosition: {
    //         lat: 0,
    //         lng: 0,
    //     },
    //     markerPosition: {
    //         lat: 0,
    //         lng: 0,
    //     }
    // }

    // onMarkerDragEnd = (e) =>{
    //     let newLat = e.latLng.lat();
    //     // console.log('newLat: ', newLat);
    //     let newLng = e.latLng.lng();

    //     //Get address from latitude & longitude
    //     Geocode.fromLatLng(newLat, newLng)
    //         .then(res => console.log('res: ', res))  
    //         .catch(err => console.log(err))
    // }
    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                <Marker
                    draggable={true}
                    // onDragEnd={this.onMarkerDragEnd}
                    position={{ lat: 10.7948201, lng: 106.7197457 }}
                >
                    <InfoWindow>
                        <div>Landmark 81</div>
                    </InfoWindow>
                </Marker>
                {/* <Autocomplete
                    setApiKey={'AIzaSyC740acn2lsYt9545S_g1BDXRdjEYnGCuM'}
                /> */}
            </GoogleMap>
        ));

        return (
            <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBU_LEp0t3dmV1UsmEdM3gJN309J2pDlgg&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

export default GoogleMapAddress;