import React from 'react';
import styled from 'styled-components';
import Navbar from './components/navbar';
import FooterComponent from './Footer';

// Styled component for the hero section
const HeroSection = styled.section`
  width: 100%;
  height: 60vh;
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
    height: 50vh;
  }

  @media (max-width: 480px) {
    height: 40vh;
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
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
  text-align: left;

  span {
    color: #F06D06;
  }

  @media (max-width: 1024px) {
    font-size: 2.5rem;
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
  font-size: 1.1rem;
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

const MainContent = styled.main`
  scroll-behavior: smooth;
  position: relative;
  min-height: 100vh;
  background: #f9f9f9;
`;

const LegalContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
  color: #333;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const LegalHeading = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const LegalSubHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 30px 0 15px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const LegalList = styled.ul`
  list-style-type: disc;
  margin-left: 25px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const LegalListItem = styled.li`
  margin-bottom: 12px;
  font-size: 1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const LegalParagraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const LegalLink = styled.a`
  color: #F06D06;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ddd;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const PrivacyPolicy = () => {
  const copyright = `© All Rights Reserved. ${new Date().getFullYear()}, Lellall Technologies Limited`;

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
            Privacy <span>Policy</span>
          </Heading>
          <Subheading>
            How we collect, use, and protect your personal information at LÉLLALL.
          </Subheading>
        </ContentWrapper>
      </HeroSection>
      <MainContent>
        <LegalContainer>
          <LegalHeading>Privacy Policy</LegalHeading>
          <LegalParagraph>
            At LÉLLALL, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
          </LegalParagraph>

          <LegalSubHeading>Information We Collect</LegalSubHeading>
          <LegalParagraph>
            We may collect personal information that you voluntarily provide to us when you register on the LÉLLALL platform, express an interest in obtaining information about us or our products and services, or otherwise contact us.
          </LegalParagraph>
          <LegalList>
            <LegalListItem><strong>Personal Information Provided by You:</strong> We collect names; phone numbers; email addresses; mailing addresses; and other similar information.</LegalListItem>
            <LegalListItem><strong>Log and Usage Data:</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our platform.</LegalListItem>
          </LegalList>


          <LegalSubHeading>How We Use Your Information</LegalSubHeading>
          <LegalParagraph>
            We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </LegalParagraph>
          <LegalList>
            <LegalListItem>To facilitate account creation and logon process.</LegalListItem>
            <LegalListItem>To fulfill and manage your orders, payments, returns, and exchanges made through the platform.</LegalListItem>
            <LegalListItem>To request feedback and to contact you about your use of our platform.</LegalListItem>
            <LegalListItem>To send you marketing and promotional communications.</LegalListItem>
            <LegalListItem>To protect our services and ensure safety and security.</LegalListItem>
          </LegalList>

          <LegalSubHeading>Will Your Information Be Shared With Anyone?</LegalSubHeading>
          <LegalParagraph>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </LegalParagraph>
          <LegalList>
            <LegalListItem><strong>Vendors and Delivery Partners:</strong> We may share your information with our registered vendors and delivery personnel to fulfill your orders effectively.</LegalListItem>
            <LegalListItem><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</LegalListItem>
          </LegalList>

          <LegalSubHeading>How Long Do We Keep Your Information?</LegalSubHeading>
          <LegalParagraph>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
          </LegalParagraph>

          <LegalSubHeading>How Do We Keep Your Information Safe?</LegalSubHeading>
          <LegalParagraph>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </LegalParagraph>

          <LegalSubHeading>Changes to This Privacy Notice</LegalSubHeading>
          <LegalParagraph>
            We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
          </LegalParagraph>

          <LegalSubHeading>Contact Us</LegalSubHeading>
          <LegalParagraph>
            If you have questions or comments about this notice, you may email us at <LegalLink href="mailto:support@lellall.com">support@lellall.com</LegalLink>.
          </LegalParagraph>

          <Copyright>{copyright}</Copyright>
        </LegalContainer>
        <FooterComponent />
      </MainContent>
    </div>
  );
};

export default PrivacyPolicy;
