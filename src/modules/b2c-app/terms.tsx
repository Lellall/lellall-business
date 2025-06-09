import React from 'react';
import styled from 'styled-components';
import Navbar from './components/navbar';
import imgCover from '../../../assets/imgCover.svg';
import { StyledButton } from '@/components/button/button-lellall';
import { Play } from 'iconsax-react';
import FooterComponent from './Footer';

// Styled component for the hero section
const HeroSection = styled.section`
  width: 100%;
  height: 60vh; /* Adjusted for a shorter, focused hero */
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
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

const HeroImage = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: auto;
  object-fit: contain;
  transform: rotate(2deg);
  z-index: 1;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MainContent = styled.main`
  scroll-behavior: smooth;
  position: relative;
  min-height: 100vh;
  background: #f9f9f9; /* Light background for readability */
`;

// Styled components for the legal content
const LegalContainer = styled.div`
  max-width: 1000px; /* Wider for better readability */
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
  color: #F06D06; /* Match brand color */
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

const TermsAndConditions = () => {
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
                        Terms & <span>Conditions</span>
                    </Heading>
                    <Subheading>
                        Understand the rules and policies for using the LÉLLALL platform.
                    </Subheading>
                    {/* <ButtonContainer>
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
                            Contact Support
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
                            Learn More
                        </StyledButton>
                    </ButtonContainer> */}
                </ContentWrapper>
                {/* <HeroImage src={imgCover} alt="Man holding groceries" /> */}
            </HeroSection>
            <MainContent>
                <LegalContainer>
                    <LegalHeading>Terms and Conditions</LegalHeading>
                    <LegalParagraph>
                        Welcome to LÉLLALL.COM. These terms and conditions outline the rules and regulations for the use of our platform.
                    </LegalParagraph>

                    <LegalParagraph>
                        By accessing this website and using our services, we assume you accept these terms and conditions in full. Do not continue to use LÉLLALL's website or services if you do not accept all of the terms and conditions stated on this page.
                    </LegalParagraph>

                    <LegalSubHeading>Terminology</LegalSubHeading>
                    <LegalList>
                        <LegalListItem>"Client," "You," and "Your" refers to you, the person accessing this website and accepting LÉLLALL's terms and conditions.</LegalListItem>
                        <LegalListItem>"LÉLLALL," "Ourselves," "We," "Our," and "Us" refers to our company.</LegalListItem>
                        <LegalListItem>"Party," "Parties," or "Us" refers to both the Client and ourselves.</LegalListItem>
                        <LegalListItem>"Service" refers to the services offered by LÉLLALL, including but not limited to the on-demand courier service, website, and any related features or functionalities.</LegalListItem>
                        <LegalListItem>"Vendor" refers to local businesses or individuals offering goods or services through the LÉLLALL platform.</LegalListItem>
                    </LegalList>

                    <LegalSubHeading>Use of Our Platform</LegalSubHeading>
                    <LegalList>
                        <LegalListItem>You agree to use LÉLLALL's services for lawful purposes only and in a manner consistent with all applicable laws and regulations.</LegalListItem>
                        <LegalListItem>You are solely responsible for ensuring the accuracy and legality of any information you provide through the LÉLLALL platform.</LegalListItem>
                        <LegalListItem>LÉLLALL reserves the right to refuse service, terminate accounts, or cancel orders at our discretion, including but not limited to cases of fraudulent or abusive behavior.</LegalListItem>
                    </LegalList>

                    <LegalSubHeading>Intellectual Property</LegalSubHeading>
                    <LegalList>
                        <LegalListItem>All content included on the LÉLLALL platform, such as text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of LÉLLALL or its content suppliers and is protected by international copyright laws.</LegalListItem>
                        <LegalListItem>You may not reproduce, modify, distribute, display, perform, or create derivative works of any content from the LÉLLALL platform without our express written consent.</LegalListItem>
                    </LegalList>

                    <LegalSubHeading>Privacy</LegalSubHeading>
                    <LegalParagraph>
                        Your privacy is important to us. Please review our <LegalLink href="/privacy-policy">Privacy Policy</LegalLink> to understand how we collect, use, and safeguard your personal information.
                    </LegalParagraph>

                    <LegalSubHeading>Liability</LegalSubHeading>
                    <LegalList>
                        <LegalListItem>LÉLLALL shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the LÉLLALL platform.</LegalListItem>
                        <LegalListItem>In no event shall LÉLLALL's aggregate liability for all claims relating to the LÉLLALL platform exceed the greater of one hundred dollars ($100) or the amount you paid LÉLLALL, if any, in the past six months for the services giving rise to the liability.</LegalListItem>
                    </LegalList>

                    <LegalSubHeading>Changes to Terms and Conditions</LegalSubHeading>
                    <LegalParagraph>
                        LÉLLALL reserves the right to revise these terms and conditions at any time without notice. By using the LÉLLALL platform, you agree to be bound by the current version of these terms and conditions.
                    </LegalParagraph>

                    <LegalSubHeading>Contact Information</LegalSubHeading>
                    <LegalParagraph>
                        If you have any questions or concerns about these terms and conditions, please contact us at <LegalLink href="mailto:support@lellall.com">support@lellall.com</LegalLink>.
                    </LegalParagraph>

                    <LegalParagraph>
                        By using the LÉLLALL platform, you acknowledge that you have read, understood, and agreed to be bound by these terms and conditions.
                    </LegalParagraph>

                    <LegalHeading>Refund Policy</LegalHeading>
                    <LegalParagraph>
                        At LÉLLALL, we strive to ensure the utmost satisfaction of our users. However, we understand that there may be instances where a refund is necessary. Please review our refund policy below:
                    </LegalParagraph>

                    <LegalSubHeading>1. Cancellations before Confirmation</LegalSubHeading>
                    <LegalParagraph>
                        If you choose to cancel your order before it is confirmed by the vendor, you are eligible for a full refund. Please contact our customer service team immediately to initiate the cancellation process.
                    </LegalParagraph>

                    <LegalSubHeading>2. Incomplete or Incorrect Orders</LegalSubHeading>
                    <LegalParagraph>
                        In the event that your order is incomplete or incorrect upon delivery, please contact us immediately. We will investigate the issue and, if warranted, provide either a refund or replacement for the affected items.
                    </LegalParagraph>

                    <LegalSubHeading>3. Quality Concerns</LegalSubHeading>
                    <LegalParagraph>
                        Should you have any concerns regarding the quality of the groceries delivered, please reach out to us within 24 hours of receiving your order. We may request additional information or evidence to assess the situation and determine the appropriate course of action, which may include issuing a partial or full refund.
                    </LegalParagraph>

                    <LegalSubHeading>4. Payment Disputes</LegalSubHeading>
                    <LegalParagraph>
                        If you believe that you have been charged incorrectly or unfairly, please contact our customer service team with relevant details. We will investigate the matter promptly and provide a resolution as necessary.
                    </LegalParagraph>

                    <LegalSubHeading>5. Processing Time</LegalSubHeading>
                    <LegalParagraph>
                        Refunds may take up to 5-7 business days to process, depending on your payment method and financial institution.
                    </LegalParagraph>

                    <LegalSubHeading>6. Contact Us</LegalSubHeading>
                    <LegalParagraph>
                        For any refund-related inquiries or assistance, please reach out to our customer service team at <LegalLink href="mailto:support@lellall.com">support@lellall.com</LegalLink>. We are here to help and ensure that your experience with LÉLLALL is a positive one.
                    </LegalParagraph>

                    <LegalSubHeading>7. Modifications to the Refund Policy</LegalSubHeading>
                    <LegalParagraph>
                        LÉLLALL reserves the right to modify or update this refund policy at any time without prior notice. Any changes will be effective immediately upon posting on the Platform.
                    </LegalParagraph>

                    <LegalParagraph>
                        By using our services, you agree to abide by the terms outlined in this refund policy. If you have any questions or concerns regarding refunds, please do not hesitate to contact us.
                    </LegalParagraph>

                    <Copyright>{copyright}</Copyright>
                </LegalContainer>
                <FooterComponent />
            </MainContent>
        </div>
    );
};

export default TermsAndConditions;