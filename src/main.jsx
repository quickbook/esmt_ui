import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { initializeAuth } from "./api/axiosClient";
import { fetchAllDomainData } from "./redux/Slices/domainSlice";

// Initialize auth token and domain data on app startup
console.log('🚀 App starting - initializing authentication...');
initializeAuth().then((authData) => {
  console.log('✨ Auth initialization complete, loading domain data...');

  // Load domain data after auth is initialized
  store.dispatch(fetchAllDomainData()).then(() => {
    console.log('🎯 App fully initialized - rendering...');
  }).catch((domainErr) => {
    console.warn('⚠️ Domain data loading completed with warning:', domainErr.message);
  });

}).catch((err) => {
  console.warn('⚠️ Auth initialization completed with warning:', err.message);
  console.log('🔄 Continuing with app initialization...');
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
