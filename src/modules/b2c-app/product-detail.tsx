import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "iconsax-react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import default styles
import FooterComponent from "./Footer"; // Adjust path as needed
import { Oval } from "react-loader-spinner";
import Navbar from "./components/navbar"; // Adjust path as needed
import { formatCurrency } from "@/utils/formatCurrency"; // Adjust path as needed
import useShoppingCart from "./use-shoppingg-cart"; // Adjust path as needed
import { configUrl } from "@/utils/config"; // Adjust path as needed

// Styled Components
const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 1rem auto;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  min-height: 80vh;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 15px;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  max-width: 500px;
  position: relative;
`;

const RightColumn = styled.div`
  flex: 1;
  padding: 16px;
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

const ProductTitle = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 12px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CategoryBadge = styled.span`
  background: #fff3e0;
  color: #f97316;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  display: inline-block;
`;

const ProductDescriptionP = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 12px 0;
  line-height: 1.5;
`;

const ProductPriceSpan = styled.div`
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
  margin: 12px 0;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
`;

const CircleButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: ${({ type }) => (type === "minus" ? "#d9534f" : "#22c55e")};
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ type }) => (type === "minus" ? "#c9302c" : "#16a34a")};
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

const CountDisplay = styled.span`
  font-size: 0.9rem;
  color: #333;
  width: 40px;
  text-align: center;
`;

const ActionButton = styled.button`
  background: ${({ variant }) =>
        variant === "buy" ? "#f06d06" : "linear-gradient(82deg, #001818 0%, #f7f7ff 98%)"};
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  margin-right: 12px;
  margin-bottom: 12px;

  &:hover {
    background: ${({ variant }) => (variant === "buy" ? "#e55a05" : "#f97316")};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.85rem;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  min-height: 80vh;
`;

const ErrorMessage = styled.div`
  color: #d9534f;
  font-size: 0.9rem;
  text-align: center;
  padding: 40px;
  min-height: 80vh;
`;

// Custom styles for ImageGallery
const GalleryContainer = styled.div`
  .image-gallery {
    width: 100%;
    max-height: 400px;

    @media (max-width: 768px) {
      max-height: 300px;
    }
  }

  .image-gallery-slide img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      height: 300px;
    }
  }

  .image-gallery-thumbnails-wrapper {
    margin-top: 10px;
  }

  .image-gallery-thumbnail {
    width: 80px;
    height: 60px;
    border-radius: 4px;
    overflow: hidden;
    border: 2px solid transparent;
    transition: border 0.2s ease;

    &.active,
    &:hover {
      border: 2px solid #f06d06;
    }
  }

  .image-gallery-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-gallery-icon {
    color: #f06d06;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    transition: color 0.2s ease;

    &:hover {
      color: #e55a05;
    }
  }

  .image-gallery-left-nav,
  .image-gallery-right-nav {
    padding: 10px;
  }

  .image-gallery-play-button,
  .image-gallery-fullscreen-button {
    display: none; /* Hide unused controls */
  }
`;

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { addToCart, removeFromCart, isProductInCart, cart, increaseQuantity, decreaseQuantity } =
        useShoppingCart();

    const foundItem = cart.find((item) => item?.id === id);
    const exists = isProductInCart(id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://api.lellall.com/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError(err.message || "Failed to load product details");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleToggleCart = () => {
        if (exists) {
            removeFromCart(id);
        } else {
            addToCart(product);
        }
    };

    const handleBuyNow = () => {
        if (!exists) {
            addToCart(product);
        }
        navigate("/cart");
    };

    // Prepare images for the gallery
    const images = [
        {
            original: product?.imageUrl || "https://via.placeholder.com/500",
            thumbnail: product?.imageUrl || "https://via.placeholder.com/150",
        },
    ];

    if (isLoading) {
        return (
            <LoaderContainer>
                <Oval
                    height={40}
                    width={40}
                    color="#f06d06"
                    secondaryColor="#e5e7eb"
                    strokeWidth={4}
                    strokeWidthSecondary={4}
                />
            </LoaderContainer>
        );
    }

    if (error || !product) {
        return <ErrorMessage>Error: {error || "Product not found"}</ErrorMessage>;
    }

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
            <DetailContainer>
                <div>
                    <BackButtonContainer onClick={() => navigate("/shop")}>
                        <ArrowLeft size="24" />
                        <span>Back to Products</span>
                    </BackButtonContainer>
                    <LeftColumn>
                        <GalleryContainer>
                            <ImageGallery
                                items={images}
                                showPlayButton={false}
                                showFullscreenButton={false}
                                showNav={true}
                                showBullets={true}
                                autoPlay={false}
                                slideInterval={5000}
                                slideDuration={450}
                                thumbnailPosition="bottom"
                            />
                        </GalleryContainer>
                    </LeftColumn>
                </div>
                <RightColumn>
                    <CategoryBadge>{product.category?.name}</CategoryBadge>
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductPriceSpan>{formatCurrency(product.price)}</ProductPriceSpan>
                    <ProductDescriptionP>{product.description || "No description available."}</ProductDescriptionP>
                    {exists && (
                        <CounterContainer>
                            <span>Quantity:</span>
                            <CircleButton
                                type="minus"
                                disabled={foundItem?.qnty === 0}
                                onClick={() => decreaseQuantity(id)}
                            >
                                -
                            </CircleButton>
                            <CountDisplay>{Number(foundItem?.qnty)}</CountDisplay>
                            <CircleButton type="plus" onClick={() => increaseQuantity(id)}>
                                +
                            </CircleButton>
                        </CounterContainer>
                    )}
                    <div>
                        <ActionButton onClick={handleToggleCart}>
                            {exists ? "Remove from Cart" : "Add to Cart"}
                        </ActionButton>
                        <ActionButton variant="buy" onClick={handleBuyNow}>
                            Buy Now
                        </ActionButton>
                    </div>
                </RightColumn>
            </DetailContainer>
            <FooterComponent />
        </>
    );
};

export default ProductDetail;