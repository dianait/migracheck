import { createContext, useReducer, type ReactNode, type Dispatch } from 'react';
import { type MigraineState, type MigraineAction } from '../types/migraine';

export const initialState: MigraineState = {
    entries: {},
};

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

    return (
        <MigraineContext.Provider value={{ state, dispatch }}>
            {children}
        </MigraineContext.Provider>
    );
};
