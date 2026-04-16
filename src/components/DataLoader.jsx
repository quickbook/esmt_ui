import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
import { fetchAllDomainData } from '../redux/Slices/domainSlice';
import { restoreFromLocalStorage, logout } from '../redux/Slices/loginSlice';

export default function DataLoader({ children }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.domain);

  // Check if any data is loading
  const isLoading = Object.values(loading).some(value => value === true);

  // Check if any data has an error
  const hasError = Object.values(error).some(value => value !== null);

  // Check if all data has been loaded at least once
  const allLoaded = !isLoading && !hasError;

  // Initialize: Load domain data and restore login session from localStorage
  useEffect(() => {

    // Restore login session from localStorage
    const loginSessionData = localStorage.getItem('loginSession');
    if (loginSessionData) {
      try {
        const parsed = JSON.parse(loginSessionData);
        const { user, roleName } = parsed;

        if (user) {
          // Restore user session
          dispatch(restoreFromLocalStorage({ user, roleName }));
          console.log('✅ Session restored from localStorage');
        }
      } catch (error) {
        console.error('❌ Error restoring session:', error);
        dispatch(logout());
      }
    }
  }, [dispatch]);

  // Log domain data loading state
  useEffect(() => {
    if (isLoading) {
      //console.log('📊 Loading domain data...', loading);
    } else if (hasError) {
      console.error('❌ Domain data loading failed:', error);
    } else if (allLoaded) {
      console.log('✅ All domain data loaded successfully!');
    }
  }, [isLoading, hasError, allLoaded, loading, error]);

  const handleRetry = () => {
    console.log('🔄 Retrying domain data fetch...');
    dispatch(fetchAllDomainData());
  };

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show error screen
  if (hasError) {
    return <ErrorScreen errors={error} onRetry={handleRetry} />;
  }

  // Show app content
  return <>{children}</>;
}
