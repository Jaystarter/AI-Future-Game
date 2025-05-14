// Basic Game State Management with Zustand

// Import necessary dependencies
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the possible time periods
export enum TimePeriod {
    DAWN_APPLIED_AI_2030 = '2030',
    AI_BOOM_2040 = '2040',
    AGE_OF_AUGMENTATION_2050 = '2050',
    TOWARDS_SINGULARITY_2070 = '2070',
}

// Define the possible environments
export enum Environment {
    HOME = 'Home',
    WORKPLACE = 'Workplace',
}

// Define the structure of a Meeting
export interface Meeting {
    id: string; // Unique ID for the meeting
    date: string; // e.g., "YYYY-MM-DD"
    timeSlot: string; // e.g., "HH:MM-HH:MM", "10:00-11:00"
    title: string;
    // participants?: string[]; // Optional
}

// Interface for the game state
export interface IGameState {
    currentTimePeriod: TimePeriod;
    currentEnvironment: Environment;
    completedInteractions: string[]; // Array of interaction IDs/keys
    lightsOn: boolean; // Track light status (e.g., in the current room/scene)
    musicPlaying: boolean; // Track music status
    watchedContentIds: string[]; // Track IDs of 'watched' TV content
    weeklyMealPlan: { [day: string]: string | null }; // day -> mealId or null
    currentTemperature: number; // Track current thermostat setting
    isSinkLeaking: boolean; // Track if the sink is currently leaking
    scheduledMeetings: Meeting[]; // Track scheduled meetings
    companionRelationshipScore?: number; // Store relationship score with AI companion
    // Add other relevant state properties (e.g., score, inventory)
}

// Define the interface for the store actions
export interface GameStateActions {
    setTimePeriod: (newPeriod: TimePeriod) => void;
    setEnvironment: (newEnvironment: Environment) => void;
    completeInteraction: (interactionId: string) => void;
    setLights: (isOn: boolean) => void;
    setMusic: (isPlaying: boolean) => void;
    watchContent: (contentId: string) => void; // Action to mark content as watched
    setMealForDay: (day: string, mealId: string | null) => void; // Action to plan a meal
    setTemperature: (temp: number) => void; // Action to set thermostat temperature
    setSinkFixed: () => void; // Action to mark the sink as fixed
    scheduleMeeting: (meeting: Meeting) => boolean; // Action to schedule a meeting, returns true if successful
    setCompanionRelationshipScore: (score: number) => void; // Action to set companion score
    resetState: () => void; // Optional: Add a way to reset state
}

// Default initial state
const initialState: IGameState = {
    currentTimePeriod: TimePeriod.DAWN_APPLIED_AI_2030,
    currentEnvironment: Environment.HOME,
    completedInteractions: [],
    lightsOn: false, // Default lights off
    musicPlaying: false, // Default music off
    watchedContentIds: [], // Initially empty watched history
    weeklyMealPlan: {}, // Initially empty meal plan
    currentTemperature: 21, // Default temperature (e.g., Celsius)
    isSinkLeaking: true, // Default state: sink starts leaking
    scheduledMeetings: [], // Initially no meetings scheduled
    companionRelationshipScore: 10, // Default companion relationship score
};

// Create the Zustand store with persistence middleware
export const useGameState = create<IGameState & GameStateActions>()(
    persist(
        (set, get) => ({
            // Initial state properties
            ...initialState,

            // Actions (mutations)
            setTimePeriod: (newPeriod) => set({ currentTimePeriod: newPeriod }),
            setEnvironment: (newEnvironment) => set({ currentEnvironment: newEnvironment }),
            completeInteraction: (interactionId) => set((state) => {
                if (!state.completedInteractions.includes(interactionId)) {
                    return { completedInteractions: [...state.completedInteractions, interactionId] };
                }
                return {}; // No change if already completed
            }),
            setLights: (isOn) => set({ lightsOn: isOn }),
            setMusic: (isPlaying) => set({ musicPlaying: isPlaying }),
            watchContent: (contentId) => set((state) => {
                if (!state.watchedContentIds.includes(contentId)) {
                    return { watchedContentIds: [...state.watchedContentIds, contentId] };
                }
                return {}; // No change if already watched
            }),
            setMealForDay: (day, mealId) => set((state) => ({
                weeklyMealPlan: {
                    ...state.weeklyMealPlan,
                    [day]: mealId,
                }
            })),
            setTemperature: (temp) => set({ currentTemperature: temp }),
            setSinkFixed: () => set({ isSinkLeaking: false }),
            scheduleMeeting: (newMeeting) => {
                const state = get(); // Get current state
                // Basic conflict detection (same date and timeSlot)
                const conflict = state.scheduledMeetings.find(
                    m => m.date === newMeeting.date && m.timeSlot === newMeeting.timeSlot
                );
                if (conflict) {
                    console.warn(`Conflict detected for meeting "${newMeeting.title}" at ${newMeeting.date} ${newMeeting.timeSlot}`);
                    return false; // Indicate failure
                }
                set({
                    scheduledMeetings: [...state.scheduledMeetings, newMeeting],
                });
                return true; // Indicate success
            },
            setCompanionRelationshipScore: (score) => set({ companionRelationshipScore: score }),
            resetState: () => set(initialState),
        }),
        {
            name: 'ai-future-game-storage', // Unique name for localStorage key
            storage: createJSONStorage(() => localStorage), // Use localStorage
        }
    )
);

// Optional: Log initial state or when state changes
useGameState.subscribe((state) => {
    console.log('Game State Updated:', state);
});

console.log('Initial Game State Loaded:', useGameState.getState());

// Example Usage (can be used in components/scenes)
/*
import { useGameState, TimePeriod } from './GameState';

function SomeGameComponent() {
    const { currentTimePeriod, setTimePeriod, completeInteraction, lightsOn, setLights, musicPlaying, setMusic } = useGameState();

    const handleNextPeriod = () => {
        setTimePeriod(TimePeriod.NEAR_FUTURE_2030);
    };

    const handleInteraction = () => {
        completeInteraction('some_interaction_id');
    };

    const handleLights = () => {
        setLights(!lightsOn);
    };

    const handleMusic = () => {
        setMusic(!musicPlaying);
    };

    return (
        <div>
            <p>Current Period: {currentTimePeriod}</p>
            <button onClick={handleNextPeriod}>Go to 2030</button>
            <button onClick={handleInteraction}>Complete Interaction</button>
            <button onClick={handleLights}>Toggle Lights</button>
            <button onClick={handleMusic}>Toggle Music</button>
        </div>
    );
}
*/
