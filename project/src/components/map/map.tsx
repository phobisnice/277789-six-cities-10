import {CSSProperties, useEffect, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
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

function Map({city, points, className, style, activePlaceId}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
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
  }, [map, points, activePlaceId]);

  return (
    <section className={`${className} map`} ref={mapRef} style={style}>
    </section>
  );
}

export default Map;
