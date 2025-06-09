import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../../../../assets/new-logo.svg";
import { StyledButton } from "@/components/button/button-lellall";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { selectAuth, logout } from "@/redux/api/auth/auth.slice";

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 20;
  padding: 0 15px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: 100px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 120px;
    height: 80px;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
  gap: 24px;
  z-index: 21;
  color: ${(props) => props.color || "inherit"};
  background: ${(props) => props.background || "transparent"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  width: ${(props) => props.width || "auto"};
  padding: ${(props) => props.padding || "0"};
  border-radius: ${(props) => props.borderRadius || "0px"};

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background: ${(props) => props.background || "#032f30"};
    padding: 20px;
    align-items: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: ${(props) => props.borderRadius || "12px"};
    transform: ${(props) => (props.isOpen ? "translateY(0)" : "translateY(-100%)")};
    transition: transform 0.3s ease-in-out;
    z-index: 100;
    top: 80px; /* Adjust based on your header height */
  }
`;

const NavItem = styled.li`
  position: relative;
  font-size: 0.75rem;
  font-weight: 300;
  color: ${(props) => props.color || "white"};

  a,
  button {
    color: ${(props) => props.color || "white"};
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
      color: #f97316;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 10px 0;
  }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  font-weight: inherit;
  color: ${(props) => props.color || "white"};
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #f97316;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.background || "#1f2937"};
  border-radius: ${(props) => props.borderRadius || "8px"};
  width: 160px;
  margin-top: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 22;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    width: 100%;
    background: ${(props) => props.background || "#1f2937"};
    margin-top: 4px;
    border-radius: ${(props) => props.borderRadius || "4px"};
  }
`;

const DropdownItem = styled.li`
  padding: 8px 16px;
  color: ${(props) => props.color || "white"};
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 8px;
  }
`;

const SignUpButton = styled.div`
  z-index: 21;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "none" : "block")};
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${(props) => props.color || "white"};
  cursor: pointer;
  z-index: 23;

  @media (max-width: 768px) {
    display: block;
  }
`;

export default function Navbar({ color = "white", background, boxShadow, width, padding, borderRadius }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, refreshToken } = useSelector(selectAuth);

  console.log(isAuthenticated, "isAuthenticated");

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const handleLogoClick = () => {
    navigate("/shop");
    setIsOpen(false);
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      navigate("/login?ref=cart");
    } else {
      navigate("/cart");
    }
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      navigate("/shop");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.log(error, "error");
      toast.error("Logout failed. Please try again.");
    }
    setIsOpen(false);
  };

  const handleSignIn = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const handleSignUp = () => {
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <NavbarWrapper>
      <Logo src={logo} alt="Company Logo" onClick={handleLogoClick} />
      <div style={{ width, display: "flex", justifyContent: "center", borderRadius: borderRadius || "8px" }}>
        <NavMenu
          isOpen={isOpen}
          color={color}
          background={background}
          boxShadow={boxShadow}
          padding={padding}
          width={width}
          borderRadius={borderRadius}
        >
          <NavItem color={color}>
            <a onClick={() => { navigate("/shop"); setIsOpen(false); }}>Shop</a>
          </NavItem>
          {/* <NavItem color={color}>
            <DropdownButton color={color} onClick={() => toggleDropdown("categories")} aria-expanded={dropdown === "categories"}>
              Categories <ChevronDown size={16} className="ml-1" />
            </DropdownButton>
            {dropdown === "categories" && (
              <DropdownMenu borderRadius={borderRadius} background={background}>
                {["Electronics", "Fashion", "Home & Garden", "Sports"].map((item) => (
                  <DropdownItem
                    key={item}
                    color={color}
                    onClick={() => {
                      navigate(`/shop?category=${item.toLowerCase()}`);
                      setIsOpen(false);
                      toggleDropdown(null);
                    }}
                  >
                    {item}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </NavItem> */}
          <NavItem color={color}>
            <a onClick={handleCartClick}>Cart</a>
          </NavItem>
          <NavItem color={color}>
            <a onClick={() => { navigate("/about-us"); setIsOpen(false); }}>About Us</a>
          </NavItem>
          {isAuthenticated ? (
            <>
              <NavItem color={color}>
                <a onClick={() => { navigate("/terms"); setIsOpen(false); }}>Privacy & Policy</a>
              </NavItem>
              <NavItem color={color}>
                <a onClick={() => { navigate("/procurement"); setIsOpen(false); }}>Procurement</a>
              </NavItem>
              <NavItem color={color}>
                <a onClick={handleLogout}>Logout</a>
              </NavItem>
            </>
          ) : (
            isOpen && (
              <>
                <NavItem color={color}>
                  <a onClick={handleSignIn}>Sign In</a>
                </NavItem>
                <NavItem color={color}>
                  <StyledButton
                    style={{ padding: "10px 15px", fontWeight: 500, borderRadius: "50px" }}
                    background="#fff"
                    color="#000"
                    width="130px"
                    variant="outline"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </StyledButton>
                </NavItem>
              </>
            )
          )}
        </NavMenu>
      </div>
      {!isOpen && !isAuthenticated && (
        <SignUpButton isOpen={isOpen}>
          <StyledButton
            style={{ padding: "10px 15px", fontWeight: 500, borderRadius: "50px" }}
            background="#fff"
            color="#000"
            width="130px"
            variant="outline"
            onClick={handleSignUp}
          >
            Login
          </StyledButton>
        </SignUpButton>
      )}
      <Hamburger color={color} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </Hamburger>
    </NavbarWrapper>
  );
}