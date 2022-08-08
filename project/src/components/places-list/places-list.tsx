import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import {PreviewSize} from '../../const';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setActivePlace} from '../../store/action';

type PlacesListProps = {
  places: Offers;
  kind: 'favorites' | 'near-places' | 'cities';
}

function PlacesList({places, kind}: PlacesListProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const {activePlaceId} = useAppSelector((state) => state);
  const imageSizes = {
    width: kind !== 'favorites' ? PreviewSize.NormalItemWidth : PreviewSize.FavoriteItemWidth,
    height: kind !== 'favorites' ? PreviewSize.NormalItemHeight : PreviewSize.FavoriteItemHeight,
  };

  function onPlaceHoverHandle(id: number) {
    dispatch(setActivePlace(id));
  }

  return (
    <>
      {
        places.map((place) => <PlaceCard key={place.id} isActive={activePlaceId === place.id} imageSizes={imageSizes} onHoverHandle={onPlaceHoverHandle} info={place} kind={kind} />)
      }
    </>
  );
}

export default PlacesList;
