import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #eafef1;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const Highlight = styled.span`
  color: orangered;
  font-weight: bold;
`;

const ContactInfo = styled.div`
  margin-top: 20px;
`;

const ContactHeading = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const PhoneNumber = styled.a`
  color: orangered;
  text-decoration: none;
`;

const EmailAddress = styled.a`
  color: orangered;
  text-decoration: none;
`;

const OrderConfirmation = () => {
    return (
        <Container>
            <Title>Confirmation of Your Order and Next Steps</Title>
            <Message>
                Thank you for your recent purchase with us. We are delighted to confirm
                that your payment was successfully processed.
            </Message>
            <Message>
                Our team is dedicated to ensuring your satisfaction, and we want to
                assure you that we are already working on processing your order
                promptly. To provide you with the best service possible, a member of our
                team will be reaching out to you shortly to discuss the details of your
                order and confirm any specific requirements you may have.
            </Message>
            <Message>
                Alternatively, if you have any urgent inquiries or wish to provide
                additional information, please don't hesitate to contact us directly at:
            </Message>
            <ContactInfo>
                <ContactHeading>Contact Information:</ContactHeading>
                <ContactMethod>
                    <Icon>📞</Icon>
                    <PhoneNumber href='tel:08100909430'>0810 090 9430</PhoneNumber>
                </ContactMethod>
                <ContactMethod>
                    <Icon>✉️</Icon>
                    <EmailAddress href='mailto:Support@lellall.com'>
                        Support@lellall.com
                    </EmailAddress>
                </ContactMethod>
            </ContactInfo>
        </Container>
    );
};

export default OrderConfirmation;
