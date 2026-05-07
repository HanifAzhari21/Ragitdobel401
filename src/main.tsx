import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css'; // Import all CSS (tailwind, fonts, theme)

createRoot(document.getElementById('root')!).render(<App />);