import React from 'react';
import styled from 'styled-components';
import Apple from './apple.svg';
import playstoreIcon from './google.svg';
import QCommerceMockup from '../../../assets/xp.png';
import ProcurementMockup from '../../../assets/io.png';
import Banner from './banner';

const InstallSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  color: #ffffff;
  overflow: hidden;
  position: relative;
  clip-path: polygon(100% 1%, 100% 100%, 0 100%, 0 11%);

  @media (max-width: 768px) {
  clip-path: polygon(100% 1%, 100% 100%, 0 100%, 0 5%);
    flex-direction: column;
  }
`;

const AppHalf = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: ${props => props.bg || 'linear-gradient(135deg, #F06D06 0%, #FF8C00 100%)'};
  background-size: 150% 150%;
  animation: gradientPulse 12s ease infinite;
  position: relative;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.02);
  }

  @keyframes gradientPulse {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @media (max-width: 768px) {
    min-height: 80vh;
    width: 100%;
  }
`;

const AppImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 2rem;
  transform: perspective(1200px) rotateY(-12deg) rotateX(8deg);
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
  transition: transform 0.4s ease, filter 0.4s ease;
  animation: scaleIn 0.8s ease forwards;

  ${AppHalf}:hover & {
    transform: perspective(1200px) rotateY(-6deg) rotateX(4deg);
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
  }

  @keyframes scaleIn {
    from { transform: scale(0.8) perspective(1200px) rotateY(-12deg) rotateX(8deg); opacity: 0; }
    to { transform: scale(1) perspective(1200px) rotateY(-12deg) rotateX(8deg); opacity: 1; }
  }

  @media (max-width: 768px) {
    width: 250px;
  }
`;

const AppImage1 = styled.img`
  width: 550px;
  height: auto;
  margin-bottom: 2rem;
  transform: perspective(1200px) rotateY(-12deg) rotateX(8deg);
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
  transition: transform 0.4s ease, filter 0.4s ease;
  animation: scaleIn 0.8s ease forwards;

  ${AppHalf}:hover & {
    transform: perspective(1200px) rotateY(-6deg) rotateX(4deg);
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
  }

  @keyframes scaleIn {
    from { transform: scale(0.8) perspective(1200px) rotateY(-12deg) rotateX(8deg); opacity: 0; }
    to { transform: scale(1) perspective(1200px) rotateY(-12deg) rotateX(8deg); opacity: 1; }
  }

  @media (max-width: 768px) {
    width: 250px;
  }
`;

const Heading = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  // text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  color: ${props => props.color || '#F06D06'};

  span {
    color: ${props => props.color || '#F06D06'};
    // text-shadow: 0 0 10px ${props => props.color || '#F06D06'};
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subheading = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  font-weight: 300;
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.color || '#F06D06'};
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StoreButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;

  img {
    height: 60px;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px) scale(1.1);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 480px) {
    img {
      height: 50px;
    }
  }
`;

const WebAppButton = styled.a`
  display: inline-block;
  padding: 14px 30px;
  background: #001818;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 0 15px rgba(0, 196, 180, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 0 25px rgba(0, 196, 180, 0.7);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 1.1rem;
  }
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  text-align: center;
  transform: translateX(-50%);
  color: #ffffff;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  // z-index: 10;

  Ascending and Descending Triangle
  <path d="M0,0 L100,0 L50,100 Z" fill="#F06D06" />
</svg> z-index: 10;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    top: 1rem;
  }
`;

const ManMiddle = styled.div`
width: 100vw;
height: 100vh;
background: #F06D06;
margin-top: -10px;
`

const InstallApp = () => {
  return (
    <div>


      <InstallSection>
        <AppHalf bg="#fff">
          <AppImage style={{ paddingTop: '20px' }} src={QCommerceMockup} alt="Q-Commerce App" />
          <Heading style={{ color: '#000 !important' }}>LÉLLALL Mobile</Heading>
          <Subheading color='#333'>
            Shop local vendors with unmatched speed and ease. Get it on iOS or Android now.
          </Subheading>
          <StoreButtons>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={Apple} alt="Download on the App Store" />
            </a>
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <img src={playstoreIcon} alt="Get it on Google Play" />
            </a>
          </StoreButtons>
        </AppHalf>
        <AppHalf bg="#F06D06" style={{ borderTopRightRadius: "10px" }}>
          <AppImage1 src={ProcurementMockup} alt="E-Procurement Web App" />
          <div className="mt-5"></div>
          <Heading color="#fff"><span>LÉLLALL</span> Procurement</Heading>
          <Subheading color='#fff'>
            Transform bulk purchasing with our cutting-edge web platform. Launch now.
          </Subheading>
          <WebAppButton href="https://procurement.lellall.com" target="_blank" rel="noopener noreferrer">
            Get Started
          </WebAppButton>
        </AppHalf>
      </InstallSection>
      <Banner />
    </div>
  );
};

export default InstallApp;