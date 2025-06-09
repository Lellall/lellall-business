// @ts-nocheck
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Subs from "../../assets/Subs.svg";

import { BaseUrl } from '@/utils/config';
import OrderConfirmation from './order-confirm';
import useShoppingCart from './use-shoppingg-cart';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Illustration = styled.img`
 width: 120px;
  height: auto;
`;

const Heading = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
`;


const TransactionStatusPage = () => {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true); // State for loading indicator

    const urlParams = new URLSearchParams(window.location.search);
    const statusParam = urlParams.get('status');
    const txRefParam = urlParams.get('trxref');
    const navigate = useNavigate()
    const {
        clearCart
    } = useShoppingCart();

    const accessToken = localStorage.getItem("access_token")
    const refreshAccessToken = localStorage.getItem("refresh_token")
    useEffect(() => {
        if (!accessToken) return; // Exit early if accessToken is not available

        const fetchTransactionStatus = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/checkout/status?transactionReference=${txRefParam}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const data = response.data;
                setStatus(data.status);
                clearCart()
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching transaction status:', error);
            }
        };
        fetchTransactionStatus();
    }, [accessToken, txRefParam]);

    return (
        <Container>
            {loading ? (
                <CircularProgress />
            ) : (
                <>

                    {status === 'COMPLETED' ? (
                        <>
                            <Illustration src={Subs} alt="Transaction Illustration" />
                            <Heading>Payment completed successful!</Heading>
                            <br />
                            <OrderConfirmation />
                            <Button onClick={() => navigate('/cart')} style={{ height: "40px", marginLeft: "5px" }}>Go Home</Button>
                        </>
                    ) : (
                        status === 'PENDING' ? (
                            <>
                                <Illustration src='../assets/payment_pending.svg' alt="Transaction Illustration" />
                                <Heading>Payment is Pending...</Heading>
                                <br />
                                <Button onClick={() => navigate('/')} style={{ height: "40px", marginLeft: "5px" }}>Go Home</Button>
                            </>
                        ) : (
                            <>
                                <Illustration src='../assets/payment_failed.svg' alt="Transaction Illustration" />
                                <Heading>Error Processing Transaction</Heading>
                                <br />
                                <Button onClick={() => navigate('/')} style={{ height: "40px", marginLeft: "5px" }}>Go Home</Button>
                            </>
                        )
                    )}
                </>
            )}
        </Container>
    );
};

export default TransactionStatusPage;
