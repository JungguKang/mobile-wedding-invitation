import styled from '@emotion/styled';
import React, { useState, useEffect, useRef } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';

import images from './Images';

import FrameImage from './FrameImage';



const BookGallery: React.FC = () => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const bookRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState(0);

  const goToNextPair = () => {
    setCurrentPairIndex((prevIndex) => (prevIndex + 1) % (images.length / 2));
  };

  const goToPrevPair = () => {
    setCurrentPairIndex((prevIndex) => (prevIndex - 1 + images.length / 2) % (images.length / 2));
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
  }, [touchStartX, images.length]);

  return (
    <Gallery>
      <GalleryWrapper ref={bookRef}>
        {/* Navigation buttons (optional, for testing/fallback) */}
        <NavButton onClick={goToPrevPair} style={{ left: 0 }}>&lt;</NavButton>
        <NavButton onClick={goToNextPair} style={{ right: 0 }}>&gt;</NavButton>

        {images.map((image, index) => (
          <Item
            key={index}
            original={image.source}
            thumbnail={image.source}
            width={image.width}
            height={image.height}
          >
            {({ ref, open }) => (
              <div style={{ display: index >= currentPairIndex * 2 && index <= currentPairIndex * 2 + 1 ? 'block' : 'none' }}>
                <PolaroidFrame ref={ref as React.MutableRefObject<HTMLDivElement>} onClick={open} rotation={index % 2 === 0 ? -5 : 15}>
                  <FrameImage />
                  <BookImage
                    src={image.source}
                    alt={image.alt}
                  />
                  <DateText>{image.date}</DateText>
                </PolaroidFrame>
              </div>
            )}
          </Item>
        ))}
      </GalleryWrapper>
    </Gallery>
  );
};

export default BookGallery;

const GalleryWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px; /* Adjusted max width for two polaroids */
  height: 250px; /* Adjusted height for two polaroids */
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* Space between polaroids */
  overflow: hidden; /* Hide overflowing content during swipe */

  @media (max-width: 480px) {
    height: 200px;
    gap: 10px;
  }
`;

const BookImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: pointer;
  z-index: 1;
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

const PolaroidFrame = styled.div<{ rotation?: number }>`
  position: relative;
  width: 180px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 15px 35px 15px;
  box-sizing: border-box;
  transform: rotate(${(props) => props.rotation || 0}deg);

  @media (max-width: 480px) {
    width: 140px;
    height: 170px;
    padding: 10px 10px 25px 10px;
  }
`;

const DateText = styled.p`
  position: absolute;
  bottom: 10px; /* Adjusted position */
  font-family: sans-serif; /* Or a more suitable font */
  font-size: 0.8rem;
  color: #333;
  text-align: center;
  width: 100%;
  z-index: 3;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    bottom: 5px;
  }
`;
