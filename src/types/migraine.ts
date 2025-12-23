export type Intensity = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface MigraineEntry {
    id: string;
    date: string; // ISO date string YYYY-MM-DD
    intensity: Intensity;
    notes?: string;
    medicationCount?: number; // Número de píldoras tomadas (0, 1, 2, etc.)
    toothPain?: boolean; // 🦷 Dolor de dientes
    goodSleep?: boolean; // 🛏️ Durmió bien
    period?: boolean; // 🩸 Menstruación
    hydration?: boolean; // 💧 Hidratación adecuada
    caffeine?: boolean; // ☕ Consumió cafeína
    exercise?: boolean; // 🏃 Hizo ejercicio
    stress?: boolean; // 😰 Estrés
    weather?: boolean; // 🌤️ Cambios de clima/presión
}

export interface MigraineState {
    entries: Record<string, MigraineEntry>; // Keyed by date YYYY-MM-DD for O(1) access
}

export type MigraineAction =
    | { type: 'ADD_ENTRY'; payload: MigraineEntry }
    | { type: 'UPDATE_ENTRY'; payload: MigraineEntry }
    | { type: 'DELETE_ENTRY'; payload: { date: string } };
