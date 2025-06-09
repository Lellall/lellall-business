import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { BaseUrl } from '@/utils/config';
import { formatCurrency } from '@/utils/formatCurrency';
import IllustrationImg from "../../assets/undraw_receipt.svg";


// Styled components for page layout
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Roboto', sans-serif; /* Use Roboto font */

  @media (max-width: 768px) {
    padding: 20px; /* Add padding for smaller screens */
  }
`;

const Title = styled.h1`
  font-size: 1.5rem; /* Increase title font size */
  margin-bottom: 30px; /* Increase margin */
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem; /* Adjust font size for smaller screens */
    margin-bottom: 20px; /* Adjust margin for smaller screens */
  }
`;

const Illustration = styled.img`
  width: 200px;
  height: auto;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Message = styled.p`
  font-size: 13px;
  text-align: center;
  margin-bottom: 10px;
`;

const Summary = () => {
    const [timeRemaining, setTimeRemaining] = useState(300);
    const [showRetry, setShowRetry] = useState(false);
    const [status, setStatus] = useState('PENDING');
    const token = localStorage.getItem("access_token")
    const refreshAccessToken = localStorage.getItem("refresh_token")

    const [details, setDetails] = useState(null);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingOne, setLoadingOne] = useState(false);

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    useEffect(() => {
        if (token) {
            fetchOrderStatus();
        }
    }, [token]);

    const fetchOrderStatus = async () => {
        try {
            setLoadingOne(true);
            const response = await axios.get(`${BaseUrl}/orders/consumer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            setDetails(data);
            setLoadingOne(false);
            if (data.status === 'ACCEPTED') {
                initiateCheckout(id);
            } else {
                setStatus(data.status);
                setLoadingOne(false);
            }
        } catch (error) {
            setLoadingOne(false);
            if (error.response && error.response.status === 500) {
                // refreshAccessToken();
            }
            console.error('Error fetching order status:', error);
        }
    };

    useEffect(() => {
        if (details !== null) {
            getSummary();
        }
    }, [details]);

    const initiateCheckout = async (orderId) => {
        try {
            setLoading(true);

            const response = await axios.post(
                `${BaseUrl}/checkout/initiate`,
                { orderId, paymentPlatform: 'PAYSTACK' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const { paymentUrl } = response.data;

            window.location.href = paymentUrl;
        } catch (error) {
            setLoading(false);
            console.error('Error initiating checkout:', error);
        } finally {
            setLoading(false);
        }
    };

    const getSummary = async () => {
        try {
            const response = await axios.post(
                `${BaseUrl}/checkout/summary`,
                { items: details.paymentItems, deliveryPoint: details.deliveryPoint },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setSummary(response.data);
        } catch (error) {
            console.error('Error fetching summary:', error);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeRemaining <= 0) {
            setShowRetry(true);
        }
    }, [timeRemaining]);

    const handleRetryClick = () => {
        // Implement retry logic here
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
 
    return (
        <PageContainer>
            <Title>Below are your order summary </Title>
            <Illustration src={IllustrationImg} alt='Illustration' />
            <TimerContainer>
                <Message>You can proceed to pay for the items below thanks.</Message>
                {loadingOne && 'Loading summary, please wait...'}
                {summary && (
                    <SummaryContainer>
                        <SummaryHeader>Checkout summary</SummaryHeader>
                        <SummaryItems>
                            {summary?.items?.map((item, index) => (
                                <SummaryItem key={index}>
                                    <ItemName>{item.name}</ItemName>
                                    <ItemDetails>
                                        <ItemCost>
                                            {item.type === 'CHARGE'
                                                ? `${formatCurrency(item.amount)}`
                                                : `${formatCurrency(item.amount)}`}
                                        </ItemCost>
                                    </ItemDetails>
                                </SummaryItem>
                            ))}
                        </SummaryItems>
                        <TotalCost>Total: {formatCurrency(summary.totalCost)}</TotalCost>
                        <TotalCost>
                            <Button
                                style={{
                                    backgroundColor: '#FF725E',
                                    color: 'white',
                                    fontSize: '11px',
                                    padding: '5px 10px',
                                }}
                                onClick={() => initiateCheckout(id)}
                                disabled={loading}
                            >
                                {loading ? 'Initializing...' : 'Proceed to pay now'}
                            </Button>
                        </TotalCost>
                    </SummaryContainer>
                )}
            </TimerContainer>
            {showRetry && <RetryButton onClick={handleRetryClick}>Retry</RetryButton>}
        </PageContainer>
    );
};

export default Summary;

const SummaryContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  width: 300px;
`;

const SummaryHeader = styled.p`
  text-align: center;
`;

const SummaryItems = styled.div`
  margin-top: 10px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 13px;
`;

const ItemName = styled.span`
  flex: 1;
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ItemCost = styled.span`
  flex: 1;
  text-align: right;
`;

const TotalCost = styled.h3`
  margin-top: 20px;
  text-align: center;
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  font-size: 1.1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
