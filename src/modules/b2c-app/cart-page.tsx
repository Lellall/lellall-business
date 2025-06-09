import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useShoppingCart from './use-shoppingg-cart'; // Adjust path as needed
import { ArrowLeft, Trash } from 'iconsax-react';
import { StyledButton as RoundedButton } from '@/components/button/button-lellall';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import BillingAddress from './BillingAddress'; // Adjust path as needed
import { formatCurrency } from '@/utils/formatCurrency'; // Adjust path as needed
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar'; // Adjust path as needed
import { ViewportWidth } from '@/utils/enums';
import useGlobalModalStore from './use-global-modal';
import useProductStore from './use-product-store';
import BillingAddress from './billing-address';
import { toast } from 'react-toastify';

// Styled Components
const CartContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
  font-family: 'Open Sans', sans-serif;

  @media (max-width: ${ViewportWidth.sm}px) {
    padding: 0 15px;
  }
`;

const CartTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 24px;
  font-weight: 600;

  @media (max-width: ${ViewportWidth.sm}px) {
    font-size: 1.2rem;
  }
`;

const BackButtonContainer = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 0.9rem;

  &:hover {
    color: #f06d06;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 15px 15px 30px rgba(211, 209, 216, 0.25);

  padding: 16px;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
width: 100%;
  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    align-items: flex-start;
    padding: 12px;
    width: 100%;
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;

`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: ${ViewportWidth.sm}px) {
    width: 100%;
  }
`;

const ProductName = styled.div`
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
`;

const ProductPrice = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${ViewportWidth.sm}px) {
    justify-content: center;
    width: 100%;
    margin: 12px 0;
  }
`;

const CircleButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: ${({ type }) => (type === 'minus' ? '#d9534f' : '#22c55e')};
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ type }) => (type === 'minus' ? '#c9302c' : '#16a34a')};
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }

  @media (max-width: ${ViewportWidth.sm}px) {
    width: 28px;
    height: 28px;
  }
`;

const CountDisplay = styled.span`
  font-size: 0.9rem;
  color: #333;
  width: 40px;
  text-align: center;
`;

const Subtotal = styled.div`
  flex: 1;
  font-size: 0.9rem;
  color: #333;
  text-align: right;

  @media (max-width: ${ViewportWidth.sm}px) {
    text-align: left;
    width: 100%;
    margin-top: 8px;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;

  @media (max-width: ${ViewportWidth.sm}px) {
    flex-direction: column;
  }
`;

const TotalCover = styled.div`

  @media (max-width: ${ViewportWidth.sm}px) {
    width: 100%;
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 0.9rem;
  color: #333;
  border-bottom: 1px solid #e5e7eb;
`;

const CheckoutButton = styled(RoundedButton)`
  background: #f06d06;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #e55a05;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  text-align: center;
`;

const EmptyCartImage = styled.img`
  width: 100%;
  max-width: 300px;
  margin-bottom: 24px;
`;

const EmptyCartText = styled.div`
  font-size: 0.9rem;
  color: #6b7280;

  .bold {
    font-weight: 600;
    color: #333;
    font-size: 1rem;
    margin-bottom: 8px;
  }
`;

const CartPage = () => {
    const {
        cart: cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useShoppingCart();
    // const { isAuthenticated, accessToken, refreshAccessToken } = useAuth();
    const isAuthenticated = false;
    const accessToken = "";
    const refreshAccessToken = "";
    const [isLoading, setLoading] = useState(false);
    const isShopsClose = useGlobalModalStore((state) => state.isShopsClose);
    const { shppingFee, address, positionPoint, distance, consumerPhoneNumber } = useProductStore();
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qnty, 0);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    const orderData = cartItems.map((item) => ({
        productId: item?.id,
        count: item?.qnty,
        productName: item?.name,
        price: item?.price * item?.qnty,
    }));

  

    const closeModal = () => {
        setShowAuthModal(false);
    };

    const handleIncrement = (item) => {
        if (item.qnty < item.quantity) {
            increaseQuantity(item.id);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <Navbar
                    color="#000000"
                    background="white"
                    boxShadow="box-shadow: -1px 2px 5px -21px rgba(0,0,0,0.75);"
                    width="500px"
                    padding="10px"
                    borderRadius="50px"
                />
            </div>
            <CartContainer>
                <BackButtonContainer onClick={() => navigate('/')}>
                    <ArrowLeft size="24" />
                    <span>Back to Products</span>
                </BackButtonContainer>
                <CartTitle>My Cart</CartTitle>
                {cartItems?.length < 1 ? (
                    <EmptyCartContainer>
                        <EmptyCartImage src="/src/assets/undraw_empty.svg" alt="Empty Cart" />
                        <EmptyCartText>
                            <p className="bold">Empty Cart!</p>
                            <p>Your shopping cart is empty</p>
                        </EmptyCartText>
                    </EmptyCartContainer>
                ) : (
                    <>
                        {cartItems?.map((item) => (
                            <CartItem key={item?.id}>
                                <ProductImage src={item.imageUrl} alt={item.name} />
                                <ProductDetails>
                                    <ProductName>{item.name}</ProductName>
                                    <ProductPrice>{formatCurrency(item?.price)}</ProductPrice>
                                    <CounterContainer>
                                        <CircleButton
                                            type="minus"
                                            disabled={item?.qnty === 0}
                                            onClick={() => decreaseQuantity(item?.id)}
                                        >
                                            -
                                        </CircleButton>
                                        <CountDisplay>{Number(item?.qnty)}</CountDisplay>
                                        <CircleButton type="plus" onClick={() => handleIncrement(item)}>
                                            +
                                        </CircleButton>
                                    </CounterContainer>
                                </ProductDetails>
                                <Subtotal>{formatCurrency(item?.price * item?.qnty)}</Subtotal>
                                <ActionButton onClick={() => removeFromCart(item?.id)}>
                                    <Trash size="22" color="#d9534f" />
                                </ActionButton>
                            </CartItem>
                        ))}
                        <TotalContainer>
                            <TotalCover></TotalCover>
                            <TotalCover>
                                <ListItem>
                                    <div>Total:</div>
                                    <div>{formatCurrency(Number(subtotal))}</div>
                                </ListItem>
                                <BillingAddress isShopsClose={isShopsClose} />
                            </TotalCover>
                        </TotalContainer>
                    </>
                )}
            </CartContainer>
            {showAuthModal && (
                <AuthModal onClose={closeModal}>
                    <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '15px' }}>
                        Please sign in or sign up to proceed.
                    </p>
                    <RoundedButton
                        backgroundColor="#0E5D37"
                        onClick={() => navigate('/login?ref=cart')}
                        spaceBottom="10px"
                    >
                        Sign In
                    </RoundedButton>
                    <RoundedButton
                        backgroundColor="#F06D06"
                        onClick={() => navigate('/register?ref=cart')}
                        spaceTop="10px"
                        spaceBottom="10px"
                    >
                        Sign Up
                    </RoundedButton>
                </AuthModal>
            )}
        </>
    );
};

export default CartPage;