import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setActivePlace} from '../../store/hotels-data/hotels-data';
import {useCallback} from 'react';

type PlacesListProps = {
  places: Offers;
  kind: 'favorites' | 'near-places' | 'cities';
}

function PlacesList({places, kind}: PlacesListProps) : JSX.Element {
  const dispatch = useAppDispatch();

  const onPlaceHoverHandle = useCallback((id: number) => {
    dispatch(setActivePlace(id));
  }, [dispatch]);

  return (
    <>
      {
        places.map((place) => (
          <PlaceCard
            key={`place-card-${place.id}`}
            onHoverHandle={onPlaceHoverHandle}
            info={place}
            kind={kind}
          />
        ))
      }
    </>
  );
}

export default PlacesList;
