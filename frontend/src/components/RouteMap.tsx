import {Point, useFindRoute} from "../hooks/useFindRoute.ts";
import {DirectionsRenderer, GoogleMap} from "@react-google-maps/api";
import {useEffect, useState} from "react";

export interface RouteMapProps {
    startingPoint?: Point;
    destinationPoint?: Point;
    height?: string
}

export const RouteMap = ({startingPoint, destinationPoint, height}: RouteMapProps) => {
    const [directions, setDirections] = useState<any>(null);

    const findRoute = useFindRoute({setDirections: setDirections});

    useEffect(() => {
        if (startingPoint && destinationPoint) {
            findRoute(startingPoint!, destinationPoint!);
        }
    }, [startingPoint, destinationPoint]);


    const options = {
        disableDefaultUI: true,
        gestureHandling: 'greedy',
        mapId: 'fbd0e4c5778bb4b3',
    };

    const center = startingPoint && {
        lat: 52.2318813,
        lng: 21.0324811,
    };

    return <GoogleMap
        mapContainerStyle={{
            width: '100vw',
            height: height ?? '50vh',
        }}
        options={options}
        zoom={14}
        center={center}
    >
        {directions && <DirectionsRenderer directions={directions}/>}
    </GoogleMap>
}
