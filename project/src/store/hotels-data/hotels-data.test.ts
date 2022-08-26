import {hotelsData} from './hotels-data';
import {HotelsData} from '../../types/state';
import {fetchOffersAction} from '../api-actions';
import {changeCity, changeSortType, setActivePlace, updatePlaceWishlistStatus} from './hotels-data';
import {makeFakeOffer} from '../../utils/mocks';
import {CITIES} from '../../const';

describe('Test hotels reducer', () => {
  let state: HotelsData;
  const fakeOffer = makeFakeOffer();
  const defaultCity = {
    location: {
      latitude: 48.857116,
      longitude: 2.355333,
      zoom: 9,
    },
    name: 'Paris',
  };

  beforeEach(() => {
    state = {
      city: defaultCity,
      places: [],
      sortType: 'Popular',
      activePlaceId: 0,
      isDataLoading: false,
    };
  });

  it('Without additional parameters should return initial state', () => {
    expect(hotelsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        city: defaultCity,
        places: [],
        sortType: 'Popular',
        activePlaceId: 0,
        isDataLoading: false,
      });
  });

  describe('Test fetchOffersAction', () => {
    it('Should update loading status to true when fetchOffersAction pending', () => {
      expect(hotelsData.reducer(state, {type: fetchOffersAction.pending.type}))
        .toEqual({
          city: defaultCity,
          places: [],
          sortType: 'Popular',
          activePlaceId: 0,
          isDataLoading: true,
        });
    });

    it('Should update loading status to false and load offers when fetchOffersAction fulfilled', () => {
      state = {
        city: defaultCity,
        places: [],
        sortType: 'Popular',
        activePlaceId: 0,
        isDataLoading: true,
      };

      expect(hotelsData.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: [fakeOffer]}))
        .toEqual({
          city: defaultCity,
          places: [fakeOffer],
          sortType: 'Popular',
          activePlaceId: 0,
          isDataLoading: false,
        });
    });

    it('Should update loading status to false when fetchOffersAction rejected', () => {
      state = {
        city: defaultCity,
        places: [],
        sortType: 'Popular',
        activePlaceId: 0,
        isDataLoading: true,
      };

      expect(hotelsData.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: [fakeOffer]}))
        .toEqual({
          city: defaultCity,
          places: [fakeOffer],
          sortType: 'Popular',
          activePlaceId: 0,
          isDataLoading: false,
        });
    });
  });

  describe('Test changeCity action', () => {
    it('Should change city by a given value', () => {
      const city = CITIES.filter((item) => item.name !== defaultCity.name)[0];
      const {name: cityName} = city;

      expect(hotelsData.reducer(state, changeCity(cityName)))
        .toEqual({
          city: city,
          places: [],
          sortType: 'Popular',
          activePlaceId: 0,
          isDataLoading: false,
        });
    });

    it('Should not change city by a given value if this unknown city', () => {
      const fakeCityName = 'TestCityName';

      expect(hotelsData.reducer(state, changeCity(fakeCityName)))
        .toEqual({
          city: defaultCity,
          places: [],
          sortType: 'Popular',
          activePlaceId: 0,
          isDataLoading: false,
        });
    });
  });

  describe('Test changeSortType action', () => {
    it('Should change sort type by a given value', () => {
      const sortType = 'Price: low to high';

      expect(hotelsData.reducer(state, changeSortType(sortType)))
        .toEqual({
          city: defaultCity,
          places: [],
          sortType: 'Price: low to high',
          activePlaceId: 0,
          isDataLoading: false,
        });
    });
  });

  describe('Test setActivePlace action', () => {
    it('Should change active place id by a given id value', () => {
      const testId = 10;

      expect(hotelsData.reducer(state, setActivePlace(testId)))
        .toEqual({
          city: defaultCity,
          places: [],
          sortType: 'Popular',
          activePlaceId: 10,
          isDataLoading: false,
        });
    });
  });

  describe('Test updatePlaceWishlistStatus action', () => {
    it('Should update wishlist status on item', () => {
      const mockOffer = makeFakeOffer();
      state = {
        city: defaultCity,
        places: [mockOffer],
        sortType: 'Popular',
        activePlaceId: 0,
        isDataLoading: false,
      };
      const {id, isFavorite} = mockOffer;
      const fakePayload = {
        status: !isFavorite,
        id
      };


      const clonedMockOffer = {...mockOffer};
      clonedMockOffer.isFavorite = fakePayload.status;

      expect(hotelsData.reducer(state, updatePlaceWishlistStatus(fakePayload)))
        .toEqual({
          city: defaultCity,
          places: [clonedMockOffer],
          sortType: 'Popular',
          activePlaceId: 0,
          isDataLoading: false,
        });
    });

    it('Should not update wishlist status on item if it same', () => {
      const mockOffer = makeFakeOffer();
      state = {
        city: defaultCity,
        places: [mockOffer],
        sortType: 'Popular',
        activePlaceId: 0,
        isDataLoading: false,
      };
      const {id, isFavorite} = mockOffer;
      const fakePayload = {
        status: isFavorite,
        id
      };


      const clonedMockOffer = {...mockOffer};
      clonedMockOffer.isFavorite = !fakePayload.status;

      expect(hotelsData.reducer(state, updatePlaceWishlistStatus(fakePayload)))
        .not.toEqual({
          city: defaultCity,
          places: [clonedMockOffer],
          sortType: 'Popular',
          activePlaceId: 0,
          isDataLoading: false,
        });
    });
  });
});
