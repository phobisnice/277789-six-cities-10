import {render, screen} from '@testing-library/react';
import {image} from 'faker';
import RoomGallery from './room-gallery';
import {MAX_ROOM_IMAGES_COUNT} from '../../const';

describe('Test RoomGallery component', () => {
  const fakeImages = new Array(MAX_ROOM_IMAGES_COUNT + 1)
    .fill('')
    .map(() => image.imageUrl(260, 200, '', true));

  it('Should render correctly', () => {
    render(
      <RoomGallery
        images={fakeImages}
      />
    );

    expect(screen.getAllByRole('img').length).toBe(MAX_ROOM_IMAGES_COUNT);
  });
});
