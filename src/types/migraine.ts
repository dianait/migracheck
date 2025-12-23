export type Intensity = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface MigraineEntry {
    id: string;
    date: string; // ISO date string YYYY-MM-DD
    intensity: Intensity;
    notes?: string;
}

export interface MigraineState {
    entries: Record<string, MigraineEntry>; // Keyed by date YYYY-MM-DD for O(1) access
}

export type MigraineAction =
    | { type: 'ADD_ENTRY'; payload: MigraineEntry }
    | { type: 'UPDATE_ENTRY'; payload: MigraineEntry }
    | { type: 'DELETE_ENTRY'; payload: { date: string } };
