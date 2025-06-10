import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { StyledButton } from '@/components/button/button-lellall';
import Input from '@/components/input/input';
import { theme } from '@/theme/theme';
import Navbar from './components/navbar';
import FooterComponent from './Footer';
import { useCreateInquiryMutation } from '@/redux/api/auth/auth.api';

// Validation schema
const schema = yup.object({
    name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    company: yup.string().optional(),
    phone: yup.string().optional(),
    message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
}).required();

// Styled components
const InquirySection = styled.section`
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

const FormSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  margin: 40px auto;

  @media (max-width: 768px) {
    margin: 30px auto;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 15px;
  }
`;

const FormHeading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  margin: 0 0 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
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

const Inquiry = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [createInquiry, { isLoading }] = useCreateInquiryMutation();

    const onSubmit = async (data: {
        name: string;
        email: string;
        company?: string;
        phone?: string;
        message: string;
    }) => {
        try {
            await createInquiry(data).unwrap();
        } catch (error) {
            // Error toast handled in RTK Query
        }
    };

    return (
        <div>
            <InquirySection>
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
                        Inquire About Our <span>B2B Platform</span>
                    </Heading>
                    <Subheading>
                        Have questions about our eProc B2B platform? Fill out the form below, and our team will get back to you promptly.
                    </Subheading>
                </ContentWrapper>
            </InquirySection>
            <MainContent>
                <FormSection>
                    <FormContainer>
                        <FormHeading>Submit Your Inquiry</FormHeading>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        width="100%"
                                        label="Full Name"
                                        placeholder="Your full name"
                                        type="text"
                                        error={errors.name?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        width="100%"
                                        label="Email"
                                        placeholder="Your email address"
                                        type="email"
                                        error={errors.email?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="company"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        width="100%"
                                        label="Company (Optional)"
                                        placeholder="Your company name"
                                        type="text"
                                        error={errors.company?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        width="100%"
                                        label="Phone (Optional)"
                                        placeholder="Your phone number"
                                        type="text"
                                        error={errors.phone?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="message"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        width="100%"
                                        label="Message"
                                        placeholder="Your inquiry about the B2B platform"
                                        type="textarea"
                                        error={errors.message?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <div className="mt-4">
                                <StyledButton
                                    background={theme.colors.active}
                                    color={theme.colors.secondary}
                                    width="100%"
                                    variant="outline"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Submitting...' : 'SUBMIT INQUIRY'}
                                </StyledButton>
                            </div>
                        </form>
                    </FormContainer>
                </FormSection>
                <FooterComponent />
            </MainContent>
        </div>
    );
};

export default Inquiry;