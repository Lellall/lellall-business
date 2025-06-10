import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import AuthLayout from "./auth/auth-layout";
import Login from "./auth/login";
import Registration from "./auth/registration";
import ForgotPassword from "./auth/forgot-password";
import Layout from "./modules/restaurant/features/layout/layout";
import Shops from "./modules/restaurant/features/shops/shops";
import Menu from "./modules/restaurant/features/menu/menu";
import Orders from "./modules/restaurant/features/menu/order";
import ViewShop from "./modules/restaurant/features/shops/view-shop";
import Reports from "./modules/restaurant/features/reports/reports";
import Subscriptions from "./modules/restaurant/features/subscriptions/subscriptions";
import Reservations from "./modules/restaurant/features/reservations/reservations";
import Reservation from "./modules/restaurant/features/reservations/reservation";
import AdminLayout from "./modules/admin/features/layout/layout";
import Operations from "./modules/admin/features/operations/operations";
import ViewOrderOperations from "./modules/admin/features/operations/view-order-operations";
import Settings from "./modules/restaurant/features/settings/settings";
import { selectAuth } from "./redux/api/auth/auth.slice";
import ProtectedRoute from "./protected-routes/protect-routes";
import NotFound from "./not-found/not-found";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBase from "./modules/b2c-app/app-base";
import Shop from "./modules/b2c-app/second-screen";
import ProductDetail from "./modules/b2c-app/product-detail";
import CartPage from "./modules/b2c-app/cart-page";
import Summary from "./modules/b2c-app/summary";
import AboutUs from "./modules/b2c-app/about-us";
import TransactionStatusPage from "./modules/b2c-app/transaction-status";
import VerificationPage from "./auth/success";
import TermsAndConditions from "./modules/b2c-app/terms";
import Inquiry from "./modules/b2c-app/inquiry";

const App = () => {
  // const { isAuthenticated } = useSelector(selectAuth);
  const isAdmin = true; // Hardcoded to true to show admin routes
  const isAuthenticated = true; // Hardcoded to true to show admin routes

  const restaurantRoutes = (
    <>
      <Route index element={<Shops />} />
      <Route path="shops" element={<Shops />} />
      <Route path="shops/:id" element={<ViewShop />} />
      <Route path="settings" element={<Settings />} />
      <Route path="menu" element={<Menu />} />
      <Route path="reports" element={<Reports />} />
      <Route path="menu/orders" element={<Orders />} />
      <Route path="subscriptions" element={<Subscriptions />} />
      <Route path="reservations" element={<Reservations />} />
      <Route path="reservations/:id" element={<Reservation />} />
    </>
  );

  const adminRoutes = (
    <>
      <Route index element={<Operations />} />
      <Route path="operations" element={<Operations />} />
      <Route path="operations/:id" element={<ViewOrderOperations />} />
    </>
  );

  return (
    <Router>
      <Suspense fallback={<div>loading....</div>}>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route
                path="/login"
                element={
                  <AuthLayout>
                    <Login />
                  </AuthLayout>
                }
              />
              <Route
                path="/register"
                element={
                  <>
                    <Registration />
                  </>
                }
              />
              <Route
                path="/reset"
                element={
                  <AuthLayout>
                    <ForgotPassword />
                  </AuthLayout>
                }
              />
            </>) :
            (
              <>
                <Route
                  path="/"
                  element={
                    <>
                      <AppBase />
                    </>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <AuthLayout>
                      <Login />
                    </AuthLayout>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthLayout>
                      <Registration />
                    </AuthLayout>
                  }
                />
                <Route
                  path="/reset"
                  element={
                    <AuthLayout>
                      <ForgotPassword />
                    </AuthLayout>
                  }
                />
                <Route
                  path="/shop"
                  element={
                    <>
                      <Shop />
                    </>
                  }
                />
                <Route
                  path="/shop/:id"
                  element={
                    <>
                      <ProductDetail />
                    </>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <>
                      <CartPage />
                    </>
                  }
                />
                <Route
                  path="/summary"
                  element={
                    <>
                      <Summary />
                    </>
                  }
                />
                <Route
                  path="/about-us"
                  element={
                    <>
                      <AboutUs />
                    </>
                  }
                />
                <Route
                  path="/checkout/status"
                  element={
                    <>
                      <TransactionStatusPage />
                    </>
                  }
                />
                <Route
                  path="/success"
                  element={
                    <>
                      <VerificationPage />
                    </>
                  }
                />
                <Route
                  path="/terms"
                  element={
                    <>
                      <TermsAndConditions />
                    </>
                  }
                />
                <Route
                  path="/procurement"
                  element={
                    <>
                      <Inquiry />
                    </>
                  }
                />
              </>
            )
          }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
};

export default App;