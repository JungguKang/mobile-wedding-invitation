import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import data from 'data.json';
import mainImg from '@/assets/images/00.jpg';
import envelopeCover from '/envelope_cover.png'; 
import stickerImg from '/sticker.png';

const Main = () => {
  const { greeting } = data;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
      setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen && window.scrollY > 100) {
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
    <Container onClick={handleOpen}>
      <EnvelopeWrapper isOpen={isOpen}>
        <EnvelopeBody src={envelopeCover} alt="envelope" />
        {/* <Sticker src={stickerImg} alt="sticker" /> */}
        <StickerWrapper>
          <StickerTop isOpen={isOpen} />
          <StickerBottom isOpen={isOpen} />
        </StickerWrapper>
        <Flap isOpen={isOpen} />
        <Letter isOpen={isOpen}>
          <MainImg src={mainImg} />
          <MainTitle>{greeting.title}</MainTitle>
          <SubTitle>{greeting.eventDetail}</SubTitle>
        </Letter>
      </EnvelopeWrapper>
    </Container>
  );
};

export default Main;

// --- Styled Components ---

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  cursor: pointer;
  background-color: transparent;
`;

const EnvelopeWrapper = styled.div<{ isOpen: boolean }>`
  position: relative;
  width: 300px;
  height: 180px;
  transition: transform 0.5s 0.3s ease-in-out;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  ${(props) => props.isOpen && `
    transform: translateY(100px);
  `}
`;

const EnvelopeBody = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 0;
`;

//  const Sticker = styled.img`
//     position: absolute;
//     width: 60px;
//     height: 60px;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     z-index: 2;
// `;

// 스티커를 감싸고 중앙에 배치하는 Wrapper
const StickerWrapper = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

// 스티커의 절반을 나타내는 공통 스타일
const StickerHalf = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  background-image: url(${stickerImg});
  background-size: 100% 200%; /* 이미지를 두 배 길이로 늘려 위/아래를 선택 */
  transition: transform 0.3s ease-out;
`;

const StickerTop = styled(StickerHalf)<{ isOpen: boolean }>`
  top: 0;
  background-position: top;
  ${(props) => props.isOpen && `
    transform: translateY(-8px) rotateZ(-15deg);
  `}
`;

const StickerBottom = styled(StickerHalf)<{ isOpen: boolean }>`
  bottom: 0;
  background-position: bottom;
  ${(props) => props.isOpen && `
    transform: translateY(8px) rotateZ(15deg);
  `}                                                                                                                 ▄
`;   

const Flap = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 90px 150px 0 150px;
  border-color: #ffffff transparent transparent transparent;
  transform-origin: top;
  transition: transform 0.6s 0.3s ease-in-out;
  transform: rotateX(0deg);
  z-index: 1;

  ${(props) => props.isOpen && `
    transform: rotateX(180deg);
    z-index: 0;
  `}
`;

const Letter = styled.div<{ isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 260px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 -3px 10px rgba(0,0,0,0.08);
  padding: 20px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.6s 0.5s ease-in-out, transform 0.6s 0.5s ease-in-out;
  z-index: 2;

  ${(props) => props.isOpen && `
    opacity: 1;
    transform: translate(-50%, 150px);
  `}
`;

const MainImg = styled.img`
  width: 90%;
  max-width: 450px;
  padding-top: 20px;
`;

const MainTitle = styled.p`
  font-family: Wave, serif;
  font-size: 1.7rem;
  color: #2F2120;
  line-height: 120%;
  white-space: pre-line;
`;

const SubTitle = styled.p`
  font-family: Wave, serif;
  font-size: 1.1rem;
  color: #2F2120;
  line-height: 140%;
  white-space: pre-line;
`;
