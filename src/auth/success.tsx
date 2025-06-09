import styled from "styled-components";
import Email from "../../assets/email.svg";
import { StyledButton as RoundButton } from '@/components/button/button-lellall';

import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Image = styled.img`
  width: 150px; /* Adjust the size as needed */
`;

const Subtitle = styled.p`
  margin-top: 20px;
  font-size: 16px;
  width: 70%; /* Adjust the width for responsiveness */
  text-align: center;
  @media (max-width: 768px) {
    width: 90%; /* Adjust for smaller screens */
  }
  /* Highlight spam part */
  span {
    color: red; /* or any other color you prefer */
    font-weight: bold;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff; /* Adjust the color as needed */
  color: #fff;
  cursor: pointer;
`;

const VerificationPage = () => {
    const navigate = useNavigate();
    return (
        <PageContainer>
            <Image src={Email} alt="Verification Image" />
            <Subtitle>
                An email verification has been sent to your account. Please click the
                link to verify your account before making any payment. Also, remember to
                check your <span>spam</span> or junk folder for the email verification.
                It might have been filtered there by mistake. Once found, click the link
                to verify your account before proceeding with any payment.
            </Subtitle>

            <RoundButton
                style={{
                    padding: '16px 20px',
                    fontWeight: 600,
                    borderRadius: '40px',
                    marginTop:"20px"
                }}
                background="#F06D06"
                color="#fff"
                width="150px"
                variant="outline"
                onClick={() => navigate("/shop")}
            >
                Continue Shopping
            </RoundButton>
        </PageContainer>
    );
};

export default VerificationPage;
