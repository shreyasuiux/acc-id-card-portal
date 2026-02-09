// Import warning suppression FIRST, before any other imports
import './utils/suppressWarnings';
import './utils/backgroundRemovalConfig';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Log app initialization
    console.log('🚀 HR ID Card Generator Portal initialized');
    console.log('✓ Background removal: Single-threaded mode (optimized for compatibility)');

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;