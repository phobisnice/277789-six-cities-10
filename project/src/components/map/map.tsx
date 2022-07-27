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
}

const defaultCustomIcon = new Icon({
  iconUrl: MapPin.InactiveImage,
  iconSize: MAP_PIN_SIZE.iconSize as LeafletSize,
  iconAnchor: MAP_PIN_SIZE.iconAnchor as LeafletSize,
});

function Map({city, points, className, style}: MapProps): JSX.Element {
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

        marker.setIcon(defaultCustomIcon).addTo(map);
      });
    }
  }, [map, points]);

  return (
    <section className={`${className} map`} ref={mapRef} style={style}>
    </section>
  );
}

export default Map;
