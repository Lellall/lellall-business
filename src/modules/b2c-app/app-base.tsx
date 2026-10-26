import styled from 'styled-components';
import Navbar from './components/navbar';
import imgCover from "../../../assets/imgCover.svg";
import { StyledButton } from '@/components/button/button-lellall';
import play from "../../../assets/play.svg";
import Bg from "./bg.svg";
import { Play } from 'iconsax-react';
import InstallApp from './install-app';
import ProductPage from './products';
import FooterComponent from './Footer';
import Hero from './neew';
import { useNavigate } from 'react-router-dom';

// Styled component for the hero section
const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  // background: url(${Bg});
  background: #001818;
clip-path: polygon(100% 0, 100% 89%, 0 100%, 0 0);

  no-repeat top center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: white;
  text-align: center;
  margin: 0;
  padding: 0;
  position: relative;
  top: 0;
  box-sizing: border-box;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    // padding: 5rem 1.5rem 2rem;
    text-align: center;
    max-width: 100%;
     min-height: 65vh;
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
  margin-top: 100px;

  @media (max-width: 1024px) {
    padding: 0 25px; /* Slightly more padding for tablets for better spacing */
    margin-top: 80px; /* Reduced margin for tablets */
  }

  @media (max-width: 768px) {
    padding: 0 55px; /* Tighter padding for smaller screens */
    margin-top: 60px; /* Further reduced for mobile */
  }

  @media (max-width: 480px) {
    margin-top: 40px; /* Minimal margin for very small screens */
    padding: 0 30px; /* Even tighter for mobile */
  }
`;

// Styled heading
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
    font-size: 2.8rem; /* Slightly smaller for tablets */
    line-height: 1.3; /* Better readability */
  }

  @media (max-width: 768px) {
    font-size: 2rem; /* Comfortable for mobile */
    line-height: 1.4; /* More breathing room */
  }

  @media (max-width: 480px) {
    font-size: 1.6rem; /* Even smaller for tiny screens */
  }
`;

// Styled subheading
const Subheading = styled.p`
  font-size: 1rem;
  margin: 20px 0;
  text-align: left;
  color: #EDE9FE;
  font-weight: 200;

  @media (max-width: 1024px) {
    font-size: 1rem; /* Consistent size for tablets */
    margin: 18px 0; /* Slightly tighter margin */
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Slightly smaller for mobile */
    margin: 15px 0; /* Tighter for smaller screens */
  }

  @media (max-width: 480px) {
    font-size: 0.85rem; /* Readable on tiny screens */
    margin: 12px 0;
  }
`;

// Updated ButtonContainer
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 20px;

  img {
    margin-top: -30px;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    gap: 1.2rem; /* Slightly larger gap for tablet readability */
    margin-top: 18px; /* Adjusted for balance */
    img {
      margin-top: -20px; /* Less extreme offset for tablets */
      width: 45px; /* Slightly larger for visibility */
    }
  }

  @media (max-width: 768px) {
    flex-direction: row; /* Stack buttons vertically for better fit */
    align-items: flex-start; /* Align to start for consistency */
    gap: 0.8rem; /* Tighter gap for mobile */
    margin-top: 15px;
    img {
      margin-top: -10px;
      width: 40px;
    }
  }

  @media (max-width: 480px) {
    gap: 0.6rem; /* Even tighter for small screens */
    margin-top: 12px;
    img {
      margin-top: -8px;
      width: 35px; /* Smaller for tiny screens */
    }
  }
`;

// Styled image (hero graphic)
const HeroImage = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60%;
  height: 100%;
  margin-top: -200px;
  // z-index: 99 !important;

  @media (max-width: 1024px) {
    display: none;
  }
`;
const Cover = styled.div`
margin-top: -200px;
 @media (max-width: 768px) {
  margin-top: -150px;

  }
`

// React component for the hero section
const AppBase = () => {
  const navigate = useNavigate()
  return (
    <div>
      <HeroSection>
        <Navbar />
        <ContentWrapper>
          <Heading>
            Shop <br /> <span>Fresh Goods & Procurement.</span>
          </Heading>
          <Subheading>
            Quick delivery of local products and custom procurement solutions.
          </Subheading>
          <ButtonContainer>
            <StyledButton
            onClick={() => navigate('/shop')}
              style={{
                padding: '19px 15px',
                fontWeight: 500,
                borderRadius: '50px',
              }}
              background="#fff"
              color="#000"
              width="130px"
              variant="outline"
            >
              Start Shopping
            </StyledButton>
            <StyledButton
              onClick={() => navigate('/procurement')}
              style={{
                padding: '19px 15px',
                fontWeight: 500,
                borderRadius: '50px',
              }}
              background="#F06D06"
              color="#fff"
              width="170px"
              variant="outline"
            >
              <Play size="32" color="#fff" /> Checkout Procurement
            </StyledButton>

          </ButtonContainer>
        </ContentWrapper>
        <HeroImage src={imgCover} alt="Man holding groceries" />
      </HeroSection>
      {/* <SPACESECTION /> */}
      <Cover>
        <InstallApp />
      </Cover>
      {/* <div className="bg-white min-h-[700px]">
        <ProductPage />
      </div> */}
      {/* <div>
        <InstallApp />
      </div> */}
      <FooterComponent />
    </div>
  );
};

export default AppBase;
