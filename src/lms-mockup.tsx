import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LMSMockup } from './app/components/LMSMockup';
import './styles/theme.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LMSMockup />
  </StrictMode>
);
