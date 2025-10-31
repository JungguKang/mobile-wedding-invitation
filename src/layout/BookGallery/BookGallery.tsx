import styled from '@emotion/styled';
import React, { useState, useEffect, useRef } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';

// Dummy image data for demonstration
const dummyImagePairs = [
  { left: '/public/thumbnail.jpg', right: '/public/background_1.png' },
  { left: '/public/background.png', right: '/public/thumbnail.jpg' },
];

interface BookGalleryProps {
  imagePairs?: { left: string; right: string; }[];
}

const BookGallery: React.FC<BookGalleryProps> = ({ imagePairs = dummyImagePairs }) => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const bookRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState(0);

  const currentLeftImage = imagePairs[currentPairIndex]?.left;
  const currentRightImage = imagePairs[currentPairIndex]?.right;

  const goToNextPair = () => {
    setCurrentPairIndex((prevIndex) => (prevIndex + 1) % imagePairs.length);
  };

  const goToPrevPair = () => {
    setCurrentPairIndex((prevIndex) => (prevIndex - 1 + imagePairs.length) % imagePairs.length);
  };

  // Swipe handling
  useEffect(() => {
    const bookElement = bookRef.current;
    if (!bookElement) return;

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (deltaX > 50) { // Swiped right
        goToPrevPair();
      } else if (deltaX < -50) { // Swiped left
        goToNextPair();
      }
    };

    bookElement.addEventListener('touchstart', handleTouchStart);
    bookElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      bookElement.removeEventListener('touchstart', handleTouchStart);
      bookElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStartX, imagePairs.length]);

  // // Collect all images for PhotoSwipe gallery
  // const allImages = imagePairs.flatMap(pair => [
  //   { src: pair.left, alt: 'Left page image' },
  //   { src: pair.right, alt: 'Right page image' }
  // ]);

  return (
    <Gallery>
      <BookContainer ref={bookRef}>
        {/* Navigation buttons (optional, for testing/fallback) */}
        <NavButton onClick={goToPrevPair} style={{ left: 0 }}>&lt;</NavButton>
        <NavButton onClick={goToNextPair} style={{ right: 0 }}>&gt;</NavButton>

        <BookSpread>
          <BookPage>
            {currentLeftImage && (
              <Item
                original={currentLeftImage}
                thumbnail={currentLeftImage}
                width="1024" // Placeholder width
                height="768" // Placeholder height
              >
                {({ ref, open }) => (
                  <BookImage
                    src={currentLeftImage}
                    alt="Left page"
                    ref={ref as React.MutableRefObject<HTMLImageElement>}
                    onClick={open}
                  />
                )}
              </Item>
            )}
          </BookPage>
          <BookPage>
            {currentRightImage && (
              <Item
                original={currentRightImage}
                thumbnail={currentRightImage}
                width="1024" // Placeholder width
                height="768" // Placeholder height
              >
                {({ ref, open }) => (
                  <BookImage
                    src={currentRightImage}
                    alt="Right page"
                    ref={ref as React.MutableRefObject<HTMLImageElement>}
                    onClick={open}
                  />
                )}
              </Item>
            )}
          </BookPage>
        </BookSpread>
      </BookContainer>
    </Gallery>
  );
};

export default BookGallery;

const BookContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px; /* Max width for the book */
  height: 400px; /* Fixed height for the book */
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #f0e6d2 0%, #f0e6d2 50%, #e0d6c2 50%, #e0d6c2 100%); /* Placeholder book background */
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden; /* Hide overflowing content during swipe */
`;

const BookSpread = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out; /* For swipe animation */
`;

const BookPage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const BookImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: pointer;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 10;
`;
