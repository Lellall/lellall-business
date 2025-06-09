import React from 'react';
import styled from 'styled-components';
import man from '../../../assets/man.svg';
import { FaMapMarkerAlt, FaTags, FaClock } from 'react-icons/fa';
import { StyledButton } from '@/components/button/button-lellall';

const Container = styled.section`
  background-color: #032F30; // Tailwind's orange-500
  color: white;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 6%;
  min-height: 400px;
  margin-top: -10px;

  /* Stack elements vertically on mobile */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0 4%;
    min-height: auto;
  }
`;

const Heading = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 1rem;

  /* Scale font size for mobile */
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const SubText = styled.p`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 2rem;

  /* Adjust font size for mobile */
  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  background-color: #033421;
  color: white;
  font-weight: bold;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #055e3f;
  }

  /* Center button and adjust padding on mobile */
  @media (max-width: 768px) {
    margin: 0 auto;
    padding: 0.8rem 1.5rem;
  }
`;

const ManImage = styled.img`
  height: 450px;
  object-fit: contain;
  width: 80%;
  min-height: 400px;
  margin-bottom: -100px;

  /* Scale image for mobile */
  @media (max-width: 768px) {
  display:none;
    height: 300px;
    min-height: auto;
    width: 100%;
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    height: 200px;
      display:none;

  }
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  margin-right: 70px;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
    gap: 1.5rem;
    margin-right: 0;
    align-items: center; // Center children horizontally
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
    flex-direction: column; // Optional: stack icon and text
    align-items: center;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 350px;
  padding: 2rem 0;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
    padding: 1.5rem 0;
    align-items: center; // Needed to center child elements
  }
`;


const IconWrapper = styled.div`
  background: white;
  padding: 0.6rem;
  border-radius: 1rem;
  color: #f97316;
  font-size: 1.5rem;

  /* Adjust icon size for mobile */
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.5rem;
  }
`;


const Banner = () => {
    return (
        <Container>
            <TextSection>
                <Heading>WHAT ARE YOU WAITING FOR?</Heading>
                <SubText>
                    Start shopping your favourite <br /> products now!!!!
                </SubText>
                <StyledButton
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
                    Get Started
                </StyledButton>
            </TextSection>

            <div>
                <ManImage src={man} alt="Happy customer" />
            </div>

            <Features>
                <FeatureItem>
                    <IconWrapper><FaMapMarkerAlt /></IconWrapper>
                    <span>Live Tracing</span>
                </FeatureItem>
                <FeatureItem>
                    <IconWrapper><FaTags /></IconWrapper>
                    <span>Daily Discounts</span>
                </FeatureItem>
                <FeatureItem>
                    <IconWrapper><FaClock /></IconWrapper>
                    <span>Quick Delivery</span>
                </FeatureItem>
            </Features>
        </Container>
    );
};

export default Banner;