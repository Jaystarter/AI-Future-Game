import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameApp } from './ui/GameApp';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameApp />
  </React.StrictMode>
);
