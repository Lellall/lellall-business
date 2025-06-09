import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #032F30;
  color: #d1d5db;
  padding: 40px 20px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  font-family: Arial, sans-serif;
  border-top: 1px solid #2d4a4a;
  border-bottom: 1px solid #2d4a4a;
  position: relative;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 150px;
  margin-bottom: 20px;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 15px;
    text-transform: uppercase;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 0.9rem;
    margin-bottom: 10px;
    color: #d1d5db;

    a {
      color: #d1d5db;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #f97316;
      }
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  span {
    font-size: 0.9rem;
  }

  a {
    color: #d1d5db;
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
      color: #f97316;
    }
  }
`;

const SubscribeSection = styled.div`
  min-width: 250px;
  text-align: center;

  p {
    font-size: 0.9rem;
    margin-bottom: 15px;
    color: #d1d5db;
  }

  .subscribe-input {
    display: flex;
    align-items: center;
    gap: 10px;

    input {
      padding: 10px;
      width: 200px;
      border: none;
      border-radius: 4px;
      background-color: #4b5e5e;
      color: #d1d5db;
      font-size: 0.9rem;
      outline: none;

      &::placeholder {
        color: #a3b3b3;
      }
    }

    button {
      padding: 10px 20px;
      background-color: #f97316;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #e06b1a;
      }
    }
  }
`;

const Logo = styled.div`
  position: absolute;
  left: 20px;
  bottom: 10px;
  color: #f97316;
  font-size: 1.5rem;
  font-weight: bold;

  img {
    height: 30px;
    vertical-align: middle;
  }
`;

const Copyright = styled.p`
  position: absolute;
  right: 20px;
  bottom: 10px;
  font-size: 0.7rem;
  color: #a3b3b3;
  text-align: right;
`;

const FooterComponent = () => {
  const navigate = useNavigate();

  return (
    <FooterWrapper>
      <FooterSection>
        <h3>Company</h3>
        <ul>
          <li><a onClick={() => { navigate("/about-us") }}>About us</a></li>
          <li><a onClick={() => { navigate("/terms") }}>Terms</a></li>
          {/* <li><a href="#">Careers</a></li>
          <li><a href="#">Blog</a></li> */}
        </ul>
      </FooterSection>

      <FooterSection>
        <h3>Contact</h3>
        <ul>
          <li><a href="#">Help & Support</a></li>
          <li><a href="#">Partner with us</a></li>
          <li><a href="#">Ride with us</a></li>
        </ul>
      </FooterSection>

      <FooterSection>
        <h3>Legal</h3>
        <ul>
          <li><a onClick={() => { navigate("/terms") }}>Terms & Conditions</a></li>
          <li><a onClick={() => { navigate("/terms") }}>Refund & Cancellation</a></li>
          <li><a onClick={() => { navigate("/terms") }}>Privacy Policy</a></li>
        </ul>
      </FooterSection>

      <FooterSection>
        <h3>Follow us</h3>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <a
            href="https://www.linkedin.com/company/l%C3%A9llall/about/"
            target="blank"
          >
            <img src="/assets/linkedin.svg" />
          </a>
          <a href="https://twitter.com/Lellall_ng" target="blank">
            <img src="/assets/twitter.svg" />
          </a>
          <a href="https://www.instagram.com/lellall_ng" target="blank">
            <img src="/assets/instagram.svg" />
          </a>
          <a href="https://www.tiktok.com/@lellall_ng" target="blank">
            <img src="/assets/tiktok.svg" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100091527516585"
            target="blank"
          >
            <img src="/assets/facebook.svg" />
          </a>
        </div>
      </FooterSection>

      {/* <SubscribeSection>
        <p>Receive exclusive offers in your mailbox</p>
        <div className="subscribe-input">
          <input type="email" placeholder="Enter Your email" />
          <button>Subscribe</button>
        </div>
      </SubscribeSection> */}

      <Logo>
        LELLALL<span style={{ color: "#fff" }}>LL</span>🔗
      </Logo>
      <Copyright>All rights Reserved © LELALL 2025</Copyright>
    </FooterWrapper>
  );
};

export default FooterComponent;