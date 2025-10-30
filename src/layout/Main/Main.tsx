import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import data from 'data.json';
import mainImg from '@/assets/images/05.jpg';
import './Envelope.css';

const Main = () => {
  const { greeting } = data;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen && window.scrollY > 100) { // Trigger when scrolled down 100px
        setIsOpen(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <div className="envelope-container" onClick={handleOpen}>
      <div className={`envelope ${isOpen ? 'open' : ''}`}>
        <div className="letter">
          <MainImg src={mainImg} />
          <MainTitle>{greeting.title}</MainTitle>
          <SubTitle>{greeting.eventDetail}</SubTitle>
        </div>
        <div className="envelope-front"></div>
        <div className="flap"></div>
      </div>
    </div>
  );
};

export default Main;

const MainImg = styled.img`
  width: 90%;
  max-width: 450px;
  padding-top: 20px;
`;

const MainTitle = styled.p`
  font-family: HSSanTokki20-Regular, serif;
  font-size: 2rem;
  color: #2F2120;
  line-height: 120%;
  white-space: pre-line;
`;

const SubTitle = styled.p`
  font-size: 1.1rem;
  color: #2F2120;
  line-height: 140%;
  white-space: pre-line;
`;
