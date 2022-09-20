import {render, screen} from '@testing-library/react';
import EmptyPlacesList from './empty-places-list';
import {DEFAULT_CITY} from '../../const';

describe('Test EmptyPlacesList component', () => {
  it('Should render correctly', () => {
    render(
      <EmptyPlacesList
        cityName={DEFAULT_CITY}
      />
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${DEFAULT_CITY}`)).toBeInTheDocument();
  });
});
