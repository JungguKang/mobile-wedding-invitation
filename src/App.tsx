import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Heading1 } from '@/components/Text.tsx';
import Wrapper from '@/components/Wrapper.tsx';
// import Account from '@/layout/Account/Account.tsx'; // Lazy loaded
import Container from '@/layout/Container.tsx';
import FloatingBar from '@/layout/FloatingBar/FloatingBar.tsx';
// import PhotoGallery from '@/layout/Gallery/PhotoGallery.tsx'; // Lazy loaded
// import BookGallery from '@/layout/BookGallery/BookGallery.tsx'; // Lazy loaded
// import Guestbook from '@/layout/Guestbook/Guestbook.tsx'; // Lazy loaded
// import Invitation from '@/layout/Invitation/Invitation.tsx'; // Lazy loaded
// import Location from '@/layout/Location/Location.tsx'; // Lazy loaded
// import Main from '@/layout/Main/Main.tsx'; // Lazy loaded

const Main = React.lazy(() => import('@/layout/Main/Main.tsx'));
const Invitation = React.lazy(() => import('@/layout/Invitation/Invitation.tsx'));
const PhotoGallery = React.lazy(() => import('@/layout/Gallery/PhotoGallery.tsx'));
const BookGallery = React.lazy(() => import('@/layout/BookGallery/BookGallery.tsx'));
const Location = React.lazy(() => import('@/layout/Location/Location.tsx'));
const Account = React.lazy(() => import('@/layout/Account/Account.tsx'));
const Guestbook = React.lazy(() => import('@/layout/Guestbook/Guestbook.tsx'));

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [location.pathname]);

  const checkScrollPosition = () => {
    if (galleryRef.current) {
      const { offsetTop } = galleryRef.current;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= offsetTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Suspense fallback={<div>Loading Main...</div>}>
          <Main />
        </Suspense>
      </Wrapper>
      <Wrapper>
        <Heading1>모시는 글</Heading1>
        <Suspense fallback={<div>Loading Invitation...</div>}>
          <Invitation />
        </Suspense>
      </Wrapper>
      <Wrapper ref={galleryRef}>
        <Heading1>Gallery</Heading1>
        <Suspense fallback={<div>Loading PhotoGallery...</div>}>
          <PhotoGallery />
        </Suspense>
      </Wrapper>
      <Wrapper>
        <Heading1>Our Story</Heading1>
        <Suspense fallback={<div>Loading BookGallery...</div>}>
          <BookGallery />
        </Suspense>
      </Wrapper>
      <Wrapper>
        <Heading1>오시는 길</Heading1>
        <Suspense fallback={<div>Loading Location...</div>}>
          <Location />
        </Suspense>
      </Wrapper>
      <Wrapper>
        <Heading1>마음 전하실 곳</Heading1>
        <Suspense fallback={<div>Loading Account...</div>}>
          <Account />
        </Suspense>
      </Wrapper>
      <Wrapper>
        <Heading1>신랑 신부에게</Heading1>
        <Suspense fallback={<div>Loading Guestbook...</div>}>
          <Guestbook />
        </Suspense>
      </Wrapper>
      <FloatingBar isVisible={isVisible} />
    </Container>
  );
}

export default App;
