import {render, screen} from '@testing-library/react';
import EmptyPlacesList from './empty-places-list';

describe('Test EmptyPlacesList component', () => {
  it('Should render correctly', () => {
    render(
      <EmptyPlacesList />
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
