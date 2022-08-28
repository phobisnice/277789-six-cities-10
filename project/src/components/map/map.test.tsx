import {render, screen} from '@testing-library/react';
import Map from './map';
import {makeFakeOffer} from '../../utils/mocks';

describe('Test Map component', () => {
  const fakeOffer = makeFakeOffer();
  const {city} = fakeOffer;
  it('Should render correctly', () => {
    render(
      <Map
        city={city}
        points={[fakeOffer]}
        className={'cities__map'}
      />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('map').classList.contains('leaflet-container')).toBeTruthy();
    expect(screen.getAllByRole('button').length).toBeTruthy();
  });
});
