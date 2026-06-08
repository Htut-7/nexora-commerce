import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './router/Router';
import AuthContextProvider from './Contexts/AuthContext';
import CartContextProvider from './Contexts/CartContext';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <CartContextProvider>
      <StrictMode>
      <Router/>
  </StrictMode>
    </CartContextProvider>
  </AuthContextProvider>
  
)
