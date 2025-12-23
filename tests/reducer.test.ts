import { describe, it, expect } from 'vitest';
import { migraineReducer, initialState } from '../src/context/MigraineContext';
import { MigraineAction } from '../src/types/migraine';

describe('migraineReducer', () => {
    it('should add a new entry', () => {
        const action: MigraineAction = {
            type: 'ADD_ENTRY',
            payload: { id: '1', date: '2023-01-01', intensity: 5, notes: 'Test' },
        };
        const newState = migraineReducer(initialState, action);
        expect(newState.entries['2023-01-01']).toEqual(action.payload);
    });

    it('should update an existing entry', () => {
        const startState = {
            entries: {
                '2023-01-01': { id: '1', date: '2023-01-01', intensity: 5 as const },
            },
        };
        const action: MigraineAction = {
            type: 'UPDATE_ENTRY',
            payload: { id: '1', date: '2023-01-01', intensity: 8, notes: 'Worse' },
        };
        // @ts-ignore - casting for test setup simplicity if needed, but here it matches shape
        const newState = migraineReducer(startState, action);
        expect(newState.entries['2023-01-01'].intensity).toBe(8);
        expect(newState.entries['2023-01-01'].notes).toBe('Worse');
    });

    it('should delete an entry', () => {
        const startState = {
            entries: {
                '2023-01-01': { id: '1', date: '2023-01-01', intensity: 5 as const },
            },
        };
        const action: MigraineAction = {
            type: 'DELETE_ENTRY',
            payload: { date: '2023-01-01' },
        };
        const newState = migraineReducer(startState, action);
        expect(newState.entries['2023-01-01']).toBeUndefined();
    });
});
