import React from 'react';

export interface DialogueBoxProps {
  name: string;
  lines: string[];
  index: number;
  onNext: () => void;
  onClose: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ name, lines, index, onNext, onClose }) => (
  <div className="dialogue-box">
    <strong>{name}</strong>
    <div className="dialogue-text">{lines[index]}</div>
    <div className="dialogue-controls">
      {index < lines.length - 1 ? (
        <button onClick={onNext}>Next</button>
      ) : (
        <button onClick={onClose}>Close</button>
      )}
    </div>
  </div>
);
