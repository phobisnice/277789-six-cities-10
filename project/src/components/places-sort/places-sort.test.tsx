import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlacesSort from './places-sort';
import {SORT_TYPES} from '../../const';

describe('Test PlacesSort component', () => {
  it('Should render correctly', () => {
    const sortClickHandle = jest.fn();
    const [firstSortType] = SORT_TYPES;

    render(
      <PlacesSort
        onClickHandle={sortClickHandle}
        activeSortType={firstSortType}
      />
    );

    expect(screen.getAllByRole('listitem').length).toBe(SORT_TYPES.length);
    expect(screen.getAllByText(firstSortType).length).toBe(2);
  });

  it('Should open sort dropdown on button click', async () => {
    const sortClickHandle = jest.fn();
    const [firstSortType] = SORT_TYPES;

    render(
      <PlacesSort
        onClickHandle={sortClickHandle}
        activeSortType={firstSortType}
      />
    );

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');

    await userEvent.click(screen.getByTestId('sort-dropdown-button'));

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');
  });

  it('Should change sort type and close sort dropdown on type item click',async () => {
    const sortClickHandle = jest.fn();
    const [firstSortType, secondSortType] = SORT_TYPES;

    render(
      <PlacesSort
        onClickHandle={sortClickHandle}
        activeSortType={firstSortType}
      />
    );

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');

    await userEvent.click(screen.getByTestId('sort-dropdown-button'));

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    await userEvent.click(screen.getByText(secondSortType));

    expect(sortClickHandle).toBeCalled();
    expect(sortClickHandle).nthCalledWith(1, secondSortType);
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });
});
