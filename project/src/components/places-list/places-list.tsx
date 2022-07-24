import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import {useState} from 'react';
import {PreviewSize} from '../../const';

type PlacesListProps = {
  places: Offers;
  kind: 'favorites' | 'near-places' | 'cities';
}

function PlacesList({places, kind}: PlacesListProps) : JSX.Element {
  const [activeCard, setActiveCard] = useState(0);
  const imageSizes = {
    width: kind !== 'favorites' ? PreviewSize.NormalItemWidth : PreviewSize.FavoriteItemWidth,
    height: kind !== 'favorites' ? PreviewSize.NormalItemHeight : PreviewSize.FavoriteItemHeight,
  };

  return (
    <>
      {
        places.map((place) => <PlaceCard key={place.id} isActive={activeCard === place.id} imageSizes={imageSizes} onHoverHandle={() => setActiveCard(place.id)} info={place} kind={kind} />)
      }
    </>
  );
}

export default PlacesList;
