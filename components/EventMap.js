import Image from 'next/image';
import {useState, useEffect} from 'react';
import ReactMapGl, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';
import {GOOGLE_MAP_API_KEY, MAPBOX_API_TOKEN} from '@/config/index'

function EventMap({evt}) {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        width: '100%',
        height: '500px',
        zoom: 12
      });

    useEffect(() => {

        // Get latitude & longitude from address.
        Geocode.fromAddress(evt.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
                setViewport({...viewport, latitude: lat, longitude: lng});
                setLoading(false);
            },
            (error) => {
            console.error(error);
            }
        );

    }, [viewport, evt])
    Geocode.setApiKey(`${GOOGLE_MAP_API_KEY}`);

    if (loading) {
        return false;
    }

    console.log(lat, lng)

    return (
        <ReactMapGl {...viewport} mapboxApiAccessToken={`${MAPBOX_API_TOKEN}`} onViewportChange={(vp) => setViewport(vp)}>
            <Marker key={evt.id} latitude={lat} longitude={lng}>Hello</Marker>
        </ReactMapGl>
    )
}

export default EventMap
