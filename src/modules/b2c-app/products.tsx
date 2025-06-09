// Products.jsx
import { useGetProductsQuery, useGetCategoriesQuery } from "@/redux/api/product.api";
import { SearchNormal1 } from "iconsax-react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

// Styled Components
const CardWrapper = styled.div`
  position: relative;
  width: 250px;
  max-width: 250px;
  box-sizing: border-box;
  height: 220px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 15px 15px 30px rgba(211, 209, 216, 0.25);
  overflow: hidden;
  transition: transform 0.3s ease;
  margin: 10px;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    margin: 8px 10px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  object-position: center;
  display: block;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CardContent = styled.div`
  padding: 12px;
`;

const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 1em;
  color: #333;
`;

const Price = styled.div`
  color: #555;
  font-size: 13px;
  font-family: sans-serif;
`;

const Discount = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #d9534f;
  font-size: 12px;
  background: white;
  padding: 4px 9px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CategoryBadge = styled.span`
  position: absolute;
  bottom: 130px;
  right: 8px;
  background: #fff3e0;
  color: #f97316;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OutSide = styled.span`
  background: #fff3e0;
  color: #f97316;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DeliveryInfo = styled.p`
  font-size: 10px;
  color: #6b7280;
  margin: 0;
`;

const Rating = styled.div`
  font-size: 12px;
  color: #6b7280;
  display: flex;
  gap: 4px;
`;

const Sidebar = styled.aside`
  width: 260px;
  background: linear-gradient(180deg, #ffffff, #f9fafb);
  padding: 24px;
  border-right: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    position: fixed;
    width: 80%;
    max-width: 260px;
    transform: translateX(-100%);
    z-index: 100;
    background: #fff;
    &.open {
      transform: translateX(0);
    }
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: linear-gradient(82deg, rgba(240, 109, 6, 1) 0%, rgba(61, 51, 51, 1) 98%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 12px 24px;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #f97316;
    transform: translateY(-2px);
  }
`;

const CategoryItem = styled.li`
  padding: 12px 16px;
  color: #4b5563;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;

  ${({ active }) =>
    active &&
    `
    background: linear-gradient(82deg, rgba(0, 24, 24, 1) 0%, rgba(247, 247, 255, 1) 98%);
    color: #fff;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-bottom: 2px solid #22c55e;
  `}

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background: #fff;
  width: 90%;
  max-width: 400px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
`;

const FilterButton = styled.span`
  padding: 6px 12px;
  background: #f06d06;
  color: #fff;
  font-size: 0.85rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e5e7eb;
  }
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 4px;
  max-height: none;
  overflow-y: visible;
  scroll-behavior: smooth;
  padding-bottom: 20px;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const LoadMoreButton = styled.button`
  background: #f06d06;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
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

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.85rem;
  }
`;

const ScrollProgressContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 4px;
  height: 100vh;
  background: #e5e7eb;
  z-index: 10;

  @media (max-width: 768px) {
    width: 3px;
  }
`;

const ScrollProgress = styled.div`
  width: 100%;
  height: ${({ progress }) => progress}%;
  background: #f97316;
  transition: height 0.2s ease;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  min-height: 80vh;
`;

const Products = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Changed to null for categoryId
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [page, setPage] = useState(1);
  const [size] = useState(60);
  const [allProducts, setAllProducts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Fetch categories
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  // Fetch products with filter and categoryId
  const { data, isLoading, error, isFetching } = useGetProductsQuery({
    page,
    size,
    filter: searchQuery || undefined, // Pass search query
    categoryId: selectedCategory || undefined, // Pass selected category ID
  });

  // Normalize products data
  const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
      ? data.products
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.results)
          ? data.results
          : [];
  const totalProducts = data?.resultTotal;

  // Normalize categories data
  const categories = categoriesData?.data || categoriesData?.categories || categoriesData || [];
  const categoryList = [
    { id: null, name: "All" }, // Add "All" category for no filtering
    ...categories.map((cat) => ({ id: cat.id, name: cat.name })),
  ];

  // Update products when new data is fetched
  useEffect(() => {
    if (products.length > 0) {
      setAllProducts((prev) =>
        page === 1 ? products : [...prev, ...products]
      );
    }
  }, [products, page]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
    setAllProducts([]); // Clear products to show new results
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1); // Reset to first page on category change
    setAllProducts([]); // Clear products to show new results
    setIsSidebarOpen(false);
    setIsModalOpen(false);
  };

  // Handle load more
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Scroll progress
  const handlePageScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handlePageScroll);
    return () => window.removeEventListener("scroll", handlePageScroll);
  }, []);

  // Loading state for initial load
  if (isLoading && page === 1) {
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

  // Error handling
  if (error) {
    console.error("Query Error:", error);
    return <div>Error loading products: {error.message || "Unknown error"}</div>;
  }

  // No products
  // if (!allProducts.length && !isLoading) return <div>No products available.</div>;

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar className={isSidebarOpen ? "open" : ""}>
        <SidebarTitle>CATEGORIES</SidebarTitle>
        <ul className="space-y-1">
          {isCategoriesLoading ? (
            <li>Loading categories...</li>
          ) : (
            categoryList.map((category) => (
              <CategoryItem
                key={category.id || "all"}
                active={selectedCategory === category.id}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name}
              </CategoryItem>
            ))
          )}
        </ul>
      </Sidebar>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 text-xl"
                aria-label="Close modal"
              >
                ×
              </button>
            </ModalHeader>
            <ul className="space-y-1">
              {isCategoriesLoading ? (
                <li>Loading categories...</li>
              ) : (
                categoryList.map((category) => (
                  <CategoryItem
                    className="text-xs font-light"
                    key={category.id || "all"}
                    active={selectedCategory === category.id}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.name}
                  </CategoryItem>
                ))
              )}
            </ul>
          </ModalContent>
        </Modal>
      )}

      <main className="flex-1 p-4">
        <div className="text-xs font-light flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <button
            className="md:hidden bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            Categories
          </button>

          <FilterContainer>
            {["New", "Hot", "Free delivery", "Pickup", "More Filters"].map(
              (filter) => (
                <FilterButton className="text-xs font-light" key={filter}>
                  {filter}
                </FilterButton>
              )
            )}
          </FilterContainer>
        </div>

        <div className="flex items-center justify-center w-full mt-10 mb-10">
          <div className="flex w-full max-w-xl">
            <input
              type="text"
              placeholder="Search Products"
              value={searchQuery}
              onChange={handleSearch}
              className="text-xs font-light flex-grow px-5 py-2 text-gray-700 bg-gray-50 mr-2 rounded-sm focus:outline-none"
            />
            <Button className="flex justify-between">
              <div className="mt-1 mr-2">
                <SearchNormal1 size="14" color="#fff" />
              </div>
              Find
            </Button>
          </div>
        </div>

        <ScrollProgressContainer>
          <ScrollProgress progress={scrollProgress} />
        </ScrollProgressContainer>

        <ProductGrid id="product-grid">
          {allProducts.map((product) => (
            <CardWrapper
              key={product.id}
              onClick={() => navigate(`/shop/${product.id}`)}
            >
              <Image src={product.imageUrl} alt={product.name} />
              <CategoryBadge>{product.category?.name}</CategoryBadge>
              {product.discount > 0 && (
                <Discount>{product.discount}% OFF</Discount>
              )}
              <CardContent>
                <Title className="text-xs font-light">{product.name}</Title>
                <Price className="text-xs font-light">
                  ₦{product.price.toLocaleString()}
                </Price>
                <Rating>
                  <OutSide>{product.category?.name}</OutSide>
                </Rating>
              </CardContent>
            </CardWrapper>
          ))}
        </ProductGrid>

        <LoadMoreContainer>
          {isFetching ? (
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
          ) : (
            allProducts.length < totalProducts && (
              <LoadMoreButton onClick={handleLoadMore} disabled={isFetching}>
                Load More
              </LoadMoreButton>
            )
          )}
        </LoadMoreContainer>
      </main>
    </div>
  );
};

export default Products;