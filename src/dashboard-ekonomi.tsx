import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DashboardEkonomi } from './app/components/DashboardEkonomi';
import './styles/theme.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DashboardEkonomi />
  </StrictMode>
);
