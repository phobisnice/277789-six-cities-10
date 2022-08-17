import {MAX_ROOM_IMAGES_COUNT} from '../../const';

type RoomGalleryProps = {
  images: string[];
}

function RoomGallery({images}: RoomGalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.slice(0, MAX_ROOM_IMAGES_COUNT).map((image) => (
          <div className="property__image-wrapper" key={`image-${image}`}>
            <img className="property__image" src={image} alt="Photo studio"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomGallery;
