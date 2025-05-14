// src/utils/soundManager.ts

const audioCache: { [key: string]: HTMLAudioElement } = {};
const BASE_SOUND_PATH = '/sounds/'; // Sounds will be in public/sounds/

/**
 * Plays a sound effect.
 * @param soundName - The name of the sound file (e.g., 'ui_click.mp3')
 * @param volume - The volume to play the sound at (0.0 to 1.0)
 */
export const playSound = (soundName: string, volume: number = 0.7): void => {
  const soundPath = `${BASE_SOUND_PATH}${soundName}`;
  try {
    let audio = audioCache[soundPath];
    if (!audio) {
      audio = new Audio(soundPath);
      audioCache[soundPath] = audio;
    }

    audio.currentTime = 0; // Rewind to start if already playing or played
    audio.volume = Math.max(0, Math.min(1, volume)); // Clamp volume
    
    // Play the sound
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay was prevented or other error
        console.warn(`Could not play sound "${soundPath}":`, error);
        // Optional: Remove from cache if it's problematic
        // delete audioCache[soundPath];
      });
    }
  } catch (error) {
    console.error(`Error playing sound "${soundPath}":`, error);
  }
};

/**
 * Preloads a sound or a list of sounds.
 * @param soundNames - A single sound name or an array of sound names (e.g., 'ui_click.mp3')
 */
export const preloadSounds = (soundNames: string | string[]): void => {
  const names = Array.isArray(soundNames) ? soundNames : [soundNames];
  names.forEach(soundName => {
    const soundPath = `${BASE_SOUND_PATH}${soundName}`;
    if (!audioCache[soundPath]) {
      const audio = new Audio(soundPath);
      audio.load(); // Important for preloading
      audioCache[soundPath] = audio;
      console.log(`Preloaded sound: ${soundPath}`);
    }
  });
};
