import React from 'react';

export const TitleScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="title-screen">
    <h1>AI Future Game</h1>
    <p>Explore the evolution of AI through four time periods.</p>
    <button onClick={onStart}>Start Game</button>
  </div>
);
