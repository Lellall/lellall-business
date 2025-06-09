import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import styled from "styled-components";
import { Mobile } from "iconsax-react";
import { Controller, useForm } from "react-hook-form";
import useShoppingCart from "./use-shoppingg-cart"; // Adjust path as needed
import axios from "axios";
import { StyledButton as RoundedButton } from "@/components/button/button-lellall";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { configUrl } from "@/utils/config"; // Adjust path as needed
import useProductStore from "./use-product-store";
import { useOrderItemsMutation } from "./cart.api";
import AuthModal from "./auth-modal";
import InputWithIcon from "./input-with-icon";

// Styled Components
const ParentContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Aligns children to the right */
  width: 100%;
  padding: 0 1rem; /* Prevent edge-to-edge content */
  box-sizing: border-box; /* Ensure padding doesn't cause overflow */

  @media (max-width: 768px) {
    justify-content: center; /* Center on mobile */
    padding: 0 0.5rem;
  }
`;

const BillingContainer = styled.div`
  max-width: 100%; /* Prevent overflow */
  width: min(90vw, 500px); /* Responsive width: 90% of viewport, capped at 500px */
  margin: 1rem 0;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 15px 15px 30px rgba(211, 209, 216, 0.25);
  font-family: "Open Sans", sans-serif;

  /* Position to the right on desktop */
  @media (min-width: 768px) {
    margin-left: auto; /* Push to the right */
    max-width: 500px; /* Maintain max width on desktop */
  }

  /* Full width on mobile */
  @media (max-width: 600px) {
    padding: 12px;
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: 0.85rem;
  color: #333;
  margin-bottom: 8px;
  display: block;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 0.75rem;
  margin-top: 4px;
`;

const AutocompleteWrapper = styled.div`
  .react-google-places-autocomplete {
    width: 100%;
  }

  .react-google-places-autocomplete__input {
    width: 100%;
    padding: 12px;
    font-size: 0.85rem;
    border: 1px solid ${({ hasError }) => (hasError ? "red" : "#D3D3D3")};
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #f06d06;
      box-shadow: 0 0 0 3px rgba(240, 109, 6, 0.1);
    }
  }

  .react-google-places-autocomplete__suggestions {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-size: 0.85rem;
  }

  .react-google-places-autocomplete__suggestion {
    padding: 10px;
    cursor: pointer;
    color: #333;

    &:hover {
      background: #fff3e0;
      color: #f06d06;
    }
  }
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

  @media (max-width: 600px) {
    padding: 10px 20px;
    font-size: 0.85rem;
  }
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ModalTitle = styled.p`
  font-size: 1rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ModalText = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const BillingAddress = ({ isShopsClose, bundle }) => {
  const lat1 = 9.0698368;
  const lon1 = 7.464775700000001;
  const [customerPosition, setCustomerPosition] = useState("");
  const [value, setValue] = useState(null);
  const [mapError, setMapError] = useState(false);
  const [formData, setFormData] = useState({
    landmark: "",
    house: "",
  });

  const navigate = useNavigate();
  const {
    setFee,
    shppingFee,
    setAddressInfo,
    setPositionPoint,
    setDistance,
    setPhone,
    address,
    positionPoint,
    distance,
    consumerPhoneNumber,
  } = useProductStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { cart: cartItems } = useShoppingCart();
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [orderItems, { data: res, error, isSuccess, isLoading }] = useOrderItemsMutation();

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  }

  useEffect(() => {
    if (value) {
      geocodeByAddress(value.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          const distance = calculateDistance(lat1, lon1, lat, lng);
          setCustomerPosition(distance);
          setDistance(distance);
          setPositionPoint({ latitude: lat, longitude: lng });
          setFee(Number(distance * 200).toFixed(2));
        });
      setAddressInfo(value.label);
    }
  }, [value, setDistance, setPositionPoint, setFee, setAddressInfo]);

  useEffect(() => {
    if (isSuccess) {
      navigate(`/summary?id=${res.orderId}`);
    }
  }, [isSuccess, res, navigate]);

  const paymentItems =
    bundle !== undefined
      ? { bundleId: bundle.id }
      : {
        paymentItems: cartItems.map((item) => ({
          productId: item?.id,
          count: item?.qnty,
          productName: item?.name,
          price: item?.price * item?.qnty,
        })),
      };

  const handleOrder = async (phone) => {
    if (isAuthenticated === false) {
      setShowModal(true);
      return;
    }
    if (isShopsClose) {
      setIsModalOpen(true);
      return;
    }
    const data = {
      ...paymentItems,
      address: { streetName: address },
      distance: Number(distance?.toFixed(1)),
      deliveryPoint: positionPoint,
      consumerPhoneNumber: phone,
    };
    try {
      await orderItems(data).unwrap();
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (values) => {
    if (isShopsClose) {
      setIsModalOpen(true);
      return;
    }
    if (value === null) {
      setMapError(true);
      return;
    }
    if (!values.phone) {
      return;
    }
    await handleOrder(values.phone);
  };

  return (
    <>
      <ToastContainer />
      <ParentContainer>
        <BillingContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper>
              <Label>Delivery Address</Label>
              <AutocompleteWrapper hasError={mapError}>
                <GooglePlacesAutocomplete
                  apiKey="AIzaSyBrdpKCFrR1oMxYds0rkd80BWkhzREXmSY"
                  selectProps={{
                    value,
                    onChange: setValue,
                    placeholder: "Search address",
                    styles: {
                      control: (provided) => ({
                        ...provided,
                        border: `1px solid ${mapError ? "red" : "#D3D3D3"}`, // Apply dynamic border
                        boxShadow: "none",
                        fontSize: "0.85rem",
                        padding: "0",
                        borderRadius: "8px",
                        "&:focus": {
                          borderColor: "#f06d06",
                          boxShadow: "0 0 0 3px rgba(240, 109, 6, 0.1)",
                        },
                      }),
                      input: (provided) => ({
                        ...provided,
                        fontSize: "0.85rem",
                      }),
                      option: (provided) => ({
                        ...provided,
                        fontSize: "0.85rem",
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        fontSize: "0.85rem",
                      }),
                    },
                  }}
                />
              </AutocompleteWrapper>
              {mapError && <ErrorMessage>Please enter your delivery address.</ErrorMessage>}
            </InputWrapper>
            <InputWrapper>
              <Label>Phone Number</Label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Phone number must be 11 digits",
                  },
                }}
                render={({ field }) => (
                  <InputWithIcon
                    icon={Mobile}
                    type="text"
                    placeholder="Enter your phone number"
                    {...field}
                    hasError={errors.phone}
                    errorMessage={errors.phone?.message}
                    style={{
                      borderRadius: "8px",
                      border: errors.phone ? "1px solid #d9534f" : "1px solid #e5e7eb",
                      padding: "12px",
                      fontSize: "0.85rem",
                    }}
                  />
                )}
              />
            </InputWrapper>
            <CheckoutButton
              type="submit"
              backgroundColor="#f06d06"
              loading={isLoading}
              disabled={isLoading}
            >
              Proceed to Checkout
            </CheckoutButton>
          </form>
        </BillingContainer>
      </ParentContainer>
      {showModal && (
        <AuthModal onClose={() => setShowModal(false)}>
          <ModalTitle>Please sign in or sign up to proceed.</ModalTitle>
          <RoundedButton
            backgroundColor="#0E5D37"
            onClick={() => navigate("/login?ref=cart")}
            spaceBottom="10px"
          >
            Sign In
          </RoundedButton>
          <RoundedButton
            backgroundColor="#F06D06"
            onClick={() => navigate("/register?ref=cart")}
            spaceTop="10px"
            spaceBottom="10px"
          >
            Sign Up
          </RoundedButton>
        </AuthModal>
      )}
      {isModalOpen && (
        <AuthModal onClose={() => setIsModalOpen(false)}>
          <ModalTitle>We are currently closed</ModalTitle>
          <ModalText>
            Our shop is closed for today. We will resume our regular operating hours from Monday to
            Saturday, opening at 10 am and closing at 5 pm.
          </ModalText>
        </AuthModal>
      )}
    </>
  );
};

export default BillingAddress;