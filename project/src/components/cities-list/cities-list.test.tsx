import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitiesList from './cities-list';
import {CITIES} from '../../const';

describe('Test CitiesList component', () => {
  const mockCity = CITIES[0];

  it('Should render correctly', () => {
    render(
      <CitiesList currentCity={mockCity} onClickHandle={jest.fn()} />
    );
    const links = screen.getAllByRole('link');
    const activeLink = links.filter((item) => item.classList.contains('tabs__item--active'))[0];

    expect(links.length).toBe(CITIES.length);
    expect(activeLink?.textContent).toBe(mockCity.name);
  });

  it('onClick should called when user click on city', async () => {
    const onClick = jest.fn();

    render(
      <CitiesList currentCity={mockCity} onClickHandle={onClick} />
    );

    const cityLink = screen.getAllByRole('link')[1];

    await userEvent.click(cityLink);
    expect(onClick).toBeCalled();
    expect(onClick).nthCalledWith(1, cityLink.textContent);

  });
});
