import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import {PreviewSize} from '../../const';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setActivePlace} from '../../store/hotels-data/hotels-data';
import {useCallback} from 'react';

type PlacesListProps = {
  places: Offers;
  kind: 'favorites' | 'near-places' | 'cities';
}

function PlacesList({places, kind}: PlacesListProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const imageSizes = {
    width: kind !== 'favorites' ? PreviewSize.NormalItemWidth : PreviewSize.FavoriteItemWidth,
    height: kind !== 'favorites' ? PreviewSize.NormalItemHeight : PreviewSize.FavoriteItemHeight,
  };

  const onPlaceHoverHandle = useCallback((id: number) => {
    dispatch(setActivePlace(id));
  }, [dispatch]);

  return (
    <>
      {
        places.map((place) => (
          <PlaceCard
            key={place.id}
            imageSizes={imageSizes}
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
