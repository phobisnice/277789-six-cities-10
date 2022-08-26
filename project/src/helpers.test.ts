import {
  checkLoadingAuthStatus,
  checkValueByRegexp,
  getCityByName,
  getPercentFromRating,
  sortPlacesByType,
  checkAuthStatus,
  getRandomValueFromArray
} from './helpers';
import {AuthorizationStatus, CITIES, REGEXP_TYPES, ValidateError} from './const';
import {makeFakeOffer} from './utils/mocks';
import {toast} from 'react-toastify';

describe('Test helper functions', () => {
  it('getPercentFromRating should return string with percent', () => {
    expect(getPercentFromRating(0)).toBe('0%');
    expect(getPercentFromRating(2)).toBe('40%');
    expect(getPercentFromRating(20)).toBe('100%');
    expect(getPercentFromRating(-2)).toBe('0%');
  });

  it('getCityByName should return city from list cities', () => {
    const city = CITIES[0];
    const {name} = city;
    expect(getCityByName(name)).toEqual(city);
  });

  it('sortPlacesByType should return new array doesnt change initial array', () => {
    const firstOffer = makeFakeOffer();
    const secondOffer = makeFakeOffer();
    const offersFromLowPriceToHigh = firstOffer.price > secondOffer.price ? [secondOffer, firstOffer] : [firstOffer, secondOffer];
    const offersFromHighPriceToLow = firstOffer.price < secondOffer.price ? [secondOffer, firstOffer] : [firstOffer, secondOffer];
    const lowPriceItemSorted = sortPlacesByType(offersFromLowPriceToHigh, 'Price: high to low');
    const highPriceItemSorted = sortPlacesByType(offersFromHighPriceToLow, 'Price: high to low');
    expect(offersFromLowPriceToHigh).not.toEqual(lowPriceItemSorted);
    expect(offersFromHighPriceToLow).toEqual(highPriceItemSorted);
    expect(offersFromHighPriceToLow !== highPriceItemSorted).toBeTruthy();
  });

  it('checkValueByRegexp should return true if regex valid regexp and false if is not', () => {
    const validEmail = 'test@test.com';
    const invalidEmail = 'dsfsdfsdfsdf.com';
    const validPassword = '123ad';
    const invalidPassword = '111';
    expect(checkValueByRegexp(validEmail, REGEXP_TYPES.email, ValidateError.Email)).toBeTruthy();
    expect(checkValueByRegexp(invalidEmail, REGEXP_TYPES.email, ValidateError.Email)).toBeFalsy();
    expect(checkValueByRegexp(validPassword, REGEXP_TYPES.password, ValidateError.Password)).toBeTruthy();
    expect(checkValueByRegexp(invalidPassword, REGEXP_TYPES.password, ValidateError.Password)).toBeFalsy();
  });

  it('checkValueByRegexp should show warning if it is invalid', () => {
    const invalidEmail = 'dsfsdfsdfsdf.com';
    const invalidPassword = '111';

    toast.warn = jest.fn();

    checkValueByRegexp(invalidEmail, REGEXP_TYPES.email, ValidateError.Email);
    checkValueByRegexp(invalidPassword, REGEXP_TYPES.password, ValidateError.Password);

    expect(toast.warn).toBeCalledTimes(2);
  });

  it('checkLoadingAuthStatus should return true if authorization status UNKNOWN', () => {
    expect(checkLoadingAuthStatus(AuthorizationStatus.Unknown)).toBeTruthy();
    expect(checkLoadingAuthStatus(AuthorizationStatus.Auth)).toBeFalsy();
    expect(checkLoadingAuthStatus(AuthorizationStatus.NoAuth)).toBeFalsy();
  });

  it('checkAuthStatus should return true if authorization status AUTH', () => {
    expect(checkAuthStatus(AuthorizationStatus.Unknown)).toBeFalsy();
    expect(checkAuthStatus(AuthorizationStatus.Auth)).toBeTruthy();
    expect(checkAuthStatus(AuthorizationStatus.NoAuth)).toBeFalsy();
  });

  it('getRandomValueFromArray should return random element from array', () => {
    const mockArray = ['test', 'array', 10, 999, {test: true}, [1, 2]];
    expect(mockArray).toContain(getRandomValueFromArray(mockArray));
  });
});
