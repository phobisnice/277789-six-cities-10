import {renderHook} from '@testing-library/react';
import useMap from './useMap';
import {makeFakeCity} from '../utils/mocks';
import {MutableRefObject} from 'react';
import {Map} from 'leaflet';

describe('Test useMap hook', () => {
  const fakeCity = makeFakeCity();

  it('Should return instance of leaflet map if html element exist',() => {
    const map = document.createElement('div');
    const fakeRefWithHtmlElement: MutableRefObject<HTMLElement | null> = {
      current: map
    };

    const {result} = renderHook(() => useMap(fakeRefWithHtmlElement, fakeCity));
    expect(result.current).toBeInstanceOf(Object);
    expect(result.current instanceof Map).toBeTruthy();
  });

  it('Should not return instance of leaflet map if html element doesnt exist', () => {
    const map = null;
    const fakeRefWithHtmlElement: MutableRefObject<HTMLElement | null> = {
      current: map
    };

    const {result} = renderHook(() => useMap(fakeRefWithHtmlElement, fakeCity));
    expect(result.current instanceof Map).not.toBeTruthy();
  });
});
