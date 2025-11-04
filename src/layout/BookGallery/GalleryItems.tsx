import { Gallery, Item } from 'react-photoswipe-gallery';
import images from './Images';

const GalleryItems = () => {
  return (
    <Gallery withCaption>
      <div style={{ display: 'none' }}>
        {images.map((image, index) => (
          <Item
            key={index}
            original={image.source}
            thumbnail={image.source}
            width={image.width}
            height={image.height}
            caption={image.alt}
          >
            {({ ref, open }) => (
              <img ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open} src={image.source} alt={image.alt} />
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
};

export default GalleryItems;
