import {render, screen} from '@testing-library/react';
import EmptyFavorites from './empty-favorites';

describe('Test EmptyFavorites component', () => {
  it('Should render correctly', () => {
    render(
      <EmptyFavorites />
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});
