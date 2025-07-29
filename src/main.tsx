import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SimpleApp from './SimpleApp.tsx'

console.log('MirrorMinds main.tsx loaded');

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
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #0a0a0a; color: white; font-family: system-ui; text-align: center;">
        <div>
          <h1 style="color: #ff4444;">Error Loading MirrorMinds</h1>
          <p>Check the browser console for more details.</p>
          <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    `;
  }
}
