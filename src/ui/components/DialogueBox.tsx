import React from 'react';
import { DialogueEntry } from '../../game/NPC'; 

export interface DialogueBoxProps {
  characterName: string; 
  lines: DialogueEntry[]; 
  index: number;
  onNext: () => void;
  onClose: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ characterName, lines, index, onNext, onClose }) => {
  const currentLine = lines[index];
  if (!currentLine) return null; 

  const speakerToShow = currentLine.speaker || characterName;
  const textToShow = currentLine.text;

  return (
    <div className="dialogue-box">
      <strong>{speakerToShow}</strong>
      <div className="dialogue-text">{textToShow}</div>
      <div className="dialogue-controls">
        {index < lines.length - 1 ? (
          <button onClick={onNext}>Next</button>
        ) : (
          <button onClick={onClose}>Close</button>
        )}
      </div>
    </div>
  );
};
