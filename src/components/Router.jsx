import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { CustomerInfo } from "../pages/CustomerInfo";
import { PondInfo } from "../pages/PondInfo";
import { Availability } from "../pages/Availability";
import { Quote } from "../pages/Quote";
import { Login } from "../pages/Login";
import { PondSelection } from "../pages/PondSelection";
import { AdultFishEstimator } from "../pages/AdultFishEstimator";
import { FeedBassEstimator } from "../pages/FeedBassEstimator";
import { GrassCarpEstimator } from "../pages/GrassCarpEstimator";
import { AlaCarteEstimator } from "../pages/AlaCarteEstimator";
import { PondEstimator } from "../pages/PondEstimator";
import HomePage from "../pages/HomePage";
import TopBar from "./TopBar";


const Router = () => {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customer-info" element={<CustomerInfo />} />
        <Route path="/pond-info" element={<PondInfo />} />
        <Route path="/pond-selection" element={<PondSelection />} />
        <Route path="/estimator/:type" element={<PondEstimator />} />
        <Route path="/estimator/adult-fish" element={<AdultFishEstimator />} />
        <Route path="/estimator/feed-bass" element={<FeedBassEstimator />} />
        <Route path="/estimator/grass-carp" element={<GrassCarpEstimator />} />
        <Route path="/estimator/ala-carte" element={<AlaCarteEstimator />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/quote" element={<Quote />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
