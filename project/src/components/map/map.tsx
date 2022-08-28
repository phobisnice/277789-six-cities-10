import {CSSProperties, useEffect, useRef} from 'react';
import {Icon, Layer, Marker, Map as LeafletMap} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City, Offers} from '../../types/offer';
import {LeafletSize} from '../../types/leaflet';
import useMap from '../../hooks/useMap';
import {MapPin, MAP_PIN_SIZE} from '../../const';

type MapProps = {
  city: City;
  points: Offers;
  className: string;
  style?: CSSProperties;
  activePlaceId?: number
}

const defaultCustomIcon = new Icon({
  iconUrl: MapPin.InactiveImage,
  iconSize: MAP_PIN_SIZE.iconSize as LeafletSize,
  iconAnchor: MAP_PIN_SIZE.iconAnchor as LeafletSize,
});

const activeCustomIcon = new Icon({
  iconUrl: MapPin.ActiveImage,
  iconSize: MAP_PIN_SIZE.iconSize as LeafletSize,
  iconAnchor: MAP_PIN_SIZE.iconAnchor as LeafletSize,
});

function clearMap(map: LeafletMap, city: City) {
  map.eachLayer((layer: Layer) => {
    if (layer instanceof Marker) {
      map.removeLayer(layer);
    }
  });

  const {location: {
    latitude: cityLatitude,
    longitude: cityLongitude,
  }} = city;

  map.setView([cityLatitude, cityLongitude]);
}

function Map({city, points, className, style, activePlaceId}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      clearMap(map, city);

      points.forEach((point) => {
        const {latitude, longitude} = point.location;
        const marker = new Marker({
          lat: latitude,
          lng: longitude,
        });

        const icon = activePlaceId === point.id ? activeCustomIcon : defaultCustomIcon;
        marker.setIcon(icon).addTo(map);
      });
    }
  }, [map, city, points, activePlaceId]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
      style={style}
      data-testid="map"
    />
  );
}

export default Map;
