import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import {useState} from 'react';

type PlacesListProps = {
  places: Offers;
  kind: string
}

function PlacesList({places, kind}: PlacesListProps) : JSX.Element {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <>
      {
        places.map((place) => <PlaceCard key={place.id} isActive={activeCard === place.id} onHover={() => setActiveCard(place.id)} info={place} kind={kind} />)
      }
    </>
  );
}

export default PlacesList;
