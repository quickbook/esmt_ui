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
        <Route path="/estimate/" element={<HomePage />} />
        <Route path="/estimate/login" element={<Login />} />
        <Route path="/estimate/signup" element={<Signup />} />
        <Route path="/estimate/customer-info" element={<CustomerInfo />} />
        <Route path="/estimate/pond-info" element={<PondInfo />} />
        {/* <Route path="/estimate/pond-selection" element={<PondSelection />} /> */}
        <Route path="/estimate/estimator/:type" element={<PondEstimator />} />
        <Route path="/estimate/estimator/adult-fish" element={<AdultFishEstimator />} />
        <Route path="/estimate/estimator/feed-bass" element={<FeedBassEstimator />} />
        <Route path="/estimate/estimator/grass-carp" element={<GrassCarpEstimator />} />
        <Route path="/estimate/estimator/ala-carte" element={<AlaCarteEstimator />} />
        <Route path="/estimate/availability" element={<Availability />} />
        <Route path="/estimate/quote" element={<Quote />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
