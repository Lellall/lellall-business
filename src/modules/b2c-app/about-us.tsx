import styled from 'styled-components';
import Navbar from './components/navbar';
import FooterComponent from './Footer';
import { StyledButton } from '@/components/button/button-lellall';
import { Bookmark } from 'iconsax-react';
import founder1 from '../../../assets/mustapha.jpeg'; // Placeholder for Mustapha Muhammad
import founder2 from '../../../assets/yahya.png'; // Placeholder for Yahya Ahmad

// Styled component for the About Us hero section
const AboutSection = styled.section`
  width: 100%;
  min-height: 80vh;
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
    min-height: 60vh;
  }

  @media (max-width: 480px) {
    min-height: 50vh;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  text-align: center;

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
  text-align: center;
  color: #EDE9FE;
  font-weight: 200;
  max-width: 800px;

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
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;

  @media (max-width: 1024px) {
    gap: 1.2rem;
    margin-top: 18px;
  }

  @media (max-width: 768px) {
    gap: 0.8rem;
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
    margin-top: 12px;
  }
`;

const FoundersSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 40px auto;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FounderCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FounderImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
    object-position: center 30%;
  border: 2px solid #F06D06;
  display: block;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;
const FounderImage1 = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: center 5%; /* Adjusts focus to the head, reducing top white space */
  border-radius: 50%;
  margin-bottom: 20px;
  border: 2px solid #F06D06;
  display: block;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    object-position: center 20%; /* Maintain focus on smaller screens */
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    object-position: center 20%; /* Maintain focus on smallest screens */
  }
`;

const FounderName = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  color: #000;
  margin: 0 0 10px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const FounderTitle = styled.p`
  font-size: 1rem;
  color: #000;
  margin: 0 0 10px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const FounderBio = styled.p`
  font-size: 0.9rem;
  color: #000;
  text-align: center;
  font-weight: 200;
  max-width: 350px;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    max-width: 300px;
  }
`;

const MainContent = styled.main`
  scroll-behavior: smooth;
  position: relative;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutUs = () => {
  return (
    <div>
      <AboutSection>
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
            About <span>Us</span>
          </Heading>
          <Subheading>
            We are a passionate team dedicated to making your shopping experience seamless, fast, and delightful. Our mission is to connect you with the products you love through innovation and exceptional service.
          </Subheading>
          <ButtonContainer>
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
              <Bookmark size="28" color="#fff" style={{ marginRight: '8px' }} />
              Contact Us
            </StyledButton>
          </ButtonContainer>
        </ContentWrapper>
      </AboutSection>
      <MainContent>
        <FoundersSection>
          <FounderCard>
            <FounderImage1 src={founder1} alt="Mustapha Muhammad" />
            <FounderName>Mustapha Muhammad</FounderName>
            <FounderTitle>Co-Founder & CEO</FounderTitle>
            <FounderBio>
              Mustapha Muhammad, a tech entrepreneur and business strategist with a Computer Science degree, specializes in operations and digital transformation, streamlining business processes.
            </FounderBio>
          </FounderCard>
          <FounderCard>
            <FounderImage src={founder2} alt="Yahya Ahmad" />
            <FounderName>Yahya Ahmad</FounderName>
            <FounderTitle>Co-Founder & CTO</FounderTitle>
            <FounderBio>
            Yahaya Ahmad, a Full Stack Developer and CTO, is passionate about building innovative digital solutions that drive business growth. With expertise in designing and scaling products, he excels at creating seamless and impactful user experiences.
            </FounderBio>
          </FounderCard>
        </FoundersSection>
        <FooterComponent />
      </MainContent>
    </div>
  );
};

export default AboutUs;