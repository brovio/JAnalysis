import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import App from './App';
import './index.css';

const emotionCache = createCache({
  key: 'janalytics-cache',
  prepend: true
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CacheProvider value={emotionCache}>
      <App />
    </CacheProvider>
  </StrictMode>
);