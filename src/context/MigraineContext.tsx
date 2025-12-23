import { createContext, useReducer, useEffect, type ReactNode, type Dispatch } from 'react';
import { type MigraineState, type MigraineAction } from '../types/migraine';

const STORAGE_KEY = 'migracheck-entries';

// Function to load state from localStorage
function loadStateFromStorage(): MigraineState {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            return JSON.parse(storedData);
        }
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
    }
    return { entries: {} };
}

// Function to save state to localStorage
function saveStateToStorage(state: MigraineState): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
}

export const initialState: MigraineState = loadStateFromStorage();

export function migraineReducer(state: MigraineState, action: MigraineAction): MigraineState {
    switch (action.type) {
        case 'ADD_ENTRY':
        case 'UPDATE_ENTRY':
            return {
                ...state,
                entries: {
                    ...state.entries,
                    [action.payload.date]: action.payload,
                },
            };
        case 'DELETE_ENTRY': {
            const newEntries = { ...state.entries };
            delete newEntries[action.payload.date];
            return {
                ...state,
                entries: newEntries,
            };
        }
        default:
            return state;
    }
}

export const MigraineContext = createContext<{
    state: MigraineState;
    dispatch: Dispatch<MigraineAction>;
}>({ state: initialState, dispatch: () => null });

export const MigraineProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(migraineReducer, initialState);

    // Save to localStorage whenever state changes
    useEffect(() => {
        saveStateToStorage(state);
    }, [state]);

    return (
        <MigraineContext.Provider value={{ state, dispatch }}>
            {children}
        </MigraineContext.Provider>
    );
};
