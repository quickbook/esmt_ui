import { Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { CustomerInfo } from "../pages/CustomerInfo";
import { PondInfo } from "../pages/PondInfo";
import { Availability } from "../pages/Availability";
import { Quote } from "../pages/Quote";
import { Login } from "../pages/Login";
import { AdultFishEstimator } from "../pages/AdultFishEstimator";
import { FeedBassEstimator } from "../pages/FeedBassEstimator";
import { GrassCarpEstimator } from "../pages/GrassCarpEstimator";
import { AlaCarteEstimator } from "../pages/AlaCarteEstimator";
import { PondEstimator } from "../pages/PondEstimator";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TopBar from "./TopBar";
import ErrorPage from "../pages/ErrorPage";
import { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import AdminDashboard from "../admin/AdminDashboard";
import { ProfilePage } from "../pages/ProfilePage";

const Router = () => {
  // Scroll logic
  const location = useLocation();

  const [showDown, setShowDown] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // If not scrollable
      if (fullHeight <= windowHeight + 50) {
        setShowDown(false);
        setShowUp(false);
        return;
      }

      if (scrollTop < 300) {
        setShowDown(true);
        setShowUp(false);
      } else if (windowHeight + scrollTop >= fullHeight - 50) {
        setShowDown(false);
        setShowUp(true);
      } 
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToBottom = () =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/estimate" replace />} />
        <Route path="/estimate" element={<HomePage />} />
        <Route path="/estimate/login" element={<Login />} />
        <Route path="/estimate/signup" element={<Signup />} />
        <Route path="/estimate/profile" element={<ProfilePage />} />
        <Route path="/estimate/customer-info" element={<CustomerInfo />} />
        <Route path="/estimate/pond-info" element={<PondInfo />} />
        <Route path="/estimate/estimator/:type" element={<PondEstimator />} />
        <Route
          path="/estimate/estimator/ADD_CATCHABLE_FISH"
          element={<AdultFishEstimator />}
        />
        <Route
          path="/estimate/estimator/FEED_POND_BASS"
          element={<FeedBassEstimator />}
        />
        <Route
          path="/estimate/estimator/STOCK_GRASS_CARP"
          element={<GrassCarpEstimator />}
        />
        <Route
          path="/estimate/estimator/CUSTOM_STOCKING"
          element={<AlaCarteEstimator />}
        />
        <Route path="/estimate/availability" element={<Availability />} />
        <Route path="/estimate/quote" element={<Quote />} />
        <Route path="/estimate/admin" element={<AdminDashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
        {/* Scroll Down Button */}
        {showDown && (
          <Zoom in>
            <Fab
              color="secondary"
              onClick={scrollToBottom}
              size="medium"
              aria-label="Scroll to bottom"
              sx={{
                position: "fixed",
                bottom: 20,
                right: 10,
                zIndex: 1000,
              }}
            >
              <KeyboardArrowDownIcon sx={{ fontSize: "32px" }} />
            </Fab>
          </Zoom>
        )}

        {/* Scroll Up Button */}
        {showUp && (
          <Zoom in>
            <Fab
              color="secondary"
              onClick={scrollToTop}
              size="medium"
              aria-label="Scroll to top"
              sx={{
                position: "fixed",
                bottom: 20,
                right: 10,
                zIndex: 1000,
              }}
            >
              <KeyboardArrowUpIcon sx={{ fontSize: "32px" }} />
            </Fab>
          </Zoom>
        )}
    </>
  );
};

export default Router;
