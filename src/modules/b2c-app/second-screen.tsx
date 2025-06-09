import styled from 'styled-components';
import Navbar from './components/navbar';
import imgCover from "../../../assets/imgCover.svg";
import { StyledButton } from '@/components/button/button-lellall';
import { Play } from 'iconsax-react';
import Products from './products';
import FooterComponent from './Footer';

// Styled component for the hero section
const HeroSection = styled.section`
  width: 100%;
  height: 80vh; /* Reduced height for better scroll transition */
  background: linear-gradient(191deg, rgba(247, 247, 247, 1) 0%, rgba(0, 24, 24, 1) 98%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: white;
  text-align: center;
  margin: 0;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  border-radius: 0% 100% 0% 100% / 71% 0% 100% 29%;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 60vh; /* Shorter for mobile */
  }

  @media (max-width: 480px) {
    height: 50vh;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  margin-top: clamp(40px, 8vw, 80px);

  @media (max-width: 1024px) {
    padding: 0 25px;
    margin-top: clamp(30px, 7vw, 60px);
  }

  @media (max-width: 768px) {
    padding: 0 55px;
    margin-top: clamp(20px, 6vw, 50px);
  }

  @media (max-width: 480px) {
    margin-top: clamp(15px, 5vw, 40px);
    padding: 0 30px;
  }
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
  text-align: left;

  span {
    color: #F06D06;
  }

  @media (max-width: 1024px) {
    font-size: 2.8rem;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const Subheading = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
  text-align: left;
  color: #EDE9FE;
  font-weight: 200;

  @media (max-width: 1024px) {
    font-size: 1rem;
    margin: 18px 0;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 15px 0;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin: 12px 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 20px;

  img {
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    gap: 1.2rem;
    margin-top: 18px;
    img {
      width: 45px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 0.8rem;
    margin-top: 15px;
    img {
      width: 40px;
    }
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
    margin-top: 12px;
    img {
      width: 35px;
    }
  }
`;

const HeroImage = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 55%;
  height: auto;
  object-fit: contain;
  transform: rotate(2deg);
  z-index: 1;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MainContent = styled.main`
  scroll-behavior: smooth; /* Smooth scrolling for the entire page */
  position: relative;
  min-height: 100vh; /* Ensure enough height for scrolling */
`;

const Shop = () => {
  return (
    <div>
      <HeroSection>
        <Navbar
          color="#000000"
          background="white"
          boxShadow="box-shadow: -1px 2px 5px -21px rgba(0,0,0,0.75);"
          width="500px"
          padding="10px"
          borderRadius="50px"
        />
        <ContentWrapper>
          <Heading>
            What are you looking for?
          </Heading>
          <Subheading>
            Find your favourites within a few clicks and get them delivered
          </Subheading>
          <ButtonContainer>
            <StyledButton
              style={{
                padding: '16px 20px',
                fontWeight: 600,
                borderRadius: '40px',
              }}
              background="#fff"
              color="#000"
              width="150px"
              variant="outline"
            >
              Browse Products
            </StyledButton>
            <StyledButton
              style={{
                padding: '16px 20px',
                fontWeight: 600,
                borderRadius: '40px',
              }}
              background="#F06D06"
              color="#fff"
              width="190px"
              variant="outline"
            >
              <Play size="28" color="#fff" style={{ marginRight: '8px' }} />
              Explore Procurement
            </StyledButton>
          </ButtonContainer>
        </ContentWrapper>
        <HeroImage src={imgCover} alt="Man holding groceries" />
      </HeroSection>
      <MainContent>
        <Products />
        <FooterComponent />
      </MainContent>
    </div>
  );
};

export default Shop;