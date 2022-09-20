import {render, screen} from '@testing-library/react';
import Loader from './loader';

describe('Test Loader component', () => {
  it('Should render correctly', () => {
    render(
      <Loader />
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
