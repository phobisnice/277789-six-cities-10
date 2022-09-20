import {SORT_TYPES} from '../../const';
import {useState, MouseEvent} from 'react';

type PlacesSortProps = {
  onClickHandle: (sortType: typeof SORT_TYPES[number]) => void;
  activeSortType: typeof SORT_TYPES[number];
};

function PlacesSort({onClickHandle, activeSortType}: PlacesSortProps): JSX.Element {
  const [isOpenSort, setIsOpenSort] = useState(false);

  const sortClickHandle = (type: typeof SORT_TYPES[number]) => (evt: MouseEvent) => {
    onClickHandle(type);
    setIsOpenSort((isOpen) => !isOpen);
  };

  return (
    <form className="places__sorting" action="/" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpenSort(!isOpenSort)}
        data-testid="sort-dropdown-button"
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpenSort ? 'places__options--opened' : ''}`}>
        {
          SORT_TYPES.map((type) => (
            <li
              className={`places__option ${activeSortType === type ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={sortClickHandle(type)}
              key={type}
            >
              {type}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default PlacesSort;
