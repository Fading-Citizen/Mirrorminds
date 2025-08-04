import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SimpleApp from './SimpleApp.tsx'

console.log('MirrorMinds main.tsx loaded');

// Function to initialize the app
function initializeApp() {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    console.log('Creating React root...');
    
    // Try simple app first, then full app
    const useSimpleApp = false; // Change to true for testing
    
    createRoot(rootElement).render(
      <StrictMode>
        {useSimpleApp ? <SimpleApp /> : <App />}
      </StrictMode>,
    );
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Error rendering MirrorMinds app:', error);
    
    // Try to find root element again or create fallback
    let rootElement = document.getElementById('root');
    
    if (!rootElement) {
      // Create root element if it doesn't exist
      rootElement = document.createElement('div');
      rootElement.id = 'root';
      document.body.appendChild(rootElement);
      console.log('Created missing root element');
    }
    
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #0a0a0a; color: white; font-family: system-ui; text-align: center;">
          <div>
            <h1 style="color: #ff4444;">Error Loading MirrorMinds</h1>
            <p>Check the browser console for more details.</p>
            <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
            <button onclick="window.location.reload()" style="padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">
              Reload Page
            </button>
          </div>
        </div>
      `;
    }
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already ready
  initializeApp();
}
