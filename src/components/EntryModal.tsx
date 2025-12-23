import { useReducer, useEffect } from 'react';
import { type Intensity, type MigraineEntry } from '../types/migraine';
import { getIntensityColor } from '../utils/colors';
import { X } from 'lucide-react';

interface EntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (entry: Omit<MigraineEntry, 'id'>) => void;
    date: string;
    existingEntry?: MigraineEntry;
}

type FormState = Omit<MigraineEntry, 'id' | 'date'>;

type FormAction =
    | { type: 'SET_INTENSITY'; payload: Intensity }
    | { type: 'SET_NOTES'; payload: string }
    | { type: 'SET_MEDICATION_COUNT'; payload: number }
    | { type: 'TOGGLE_TOOTH_PAIN' }
    | { type: 'TOGGLE_GOOD_SLEEP' }
    | { type: 'TOGGLE_PERIOD' }
    | { type: 'TOGGLE_HYDRATION' }
    | { type: 'TOGGLE_CAFFEINE' }
    | { type: 'TOGGLE_EXERCISE' }
    | { type: 'TOGGLE_STRESS' }
    | { type: 'TOGGLE_WEATHER' }
    | { type: 'RESET'; payload: Partial<FormState> };

const initialFormState: FormState = {
    intensity: 0,
    notes: '',
    medicationCount: 0,
    toothPain: false,
    goodSleep: false,
    period: false,
    hydration: false,
    caffeine: false,
    exercise: false,
    stress: false,
    weather: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case 'SET_INTENSITY':
            return { ...state, intensity: action.payload };
        case 'SET_NOTES':
            return { ...state, notes: action.payload };
        case 'SET_MEDICATION_COUNT':
            return { ...state, medicationCount: action.payload };
        case 'TOGGLE_TOOTH_PAIN':
            return { ...state, toothPain: !state.toothPain };
        case 'TOGGLE_GOOD_SLEEP':
            return { ...state, goodSleep: !state.goodSleep };
        case 'TOGGLE_PERIOD':
            return { ...state, period: !state.period };
        case 'TOGGLE_HYDRATION':
            return { ...state, hydration: !state.hydration };
        case 'TOGGLE_CAFFEINE':
            return { ...state, caffeine: !state.caffeine };
        case 'TOGGLE_EXERCISE':
            return { ...state, exercise: !state.exercise };
        case 'TOGGLE_STRESS':
            return { ...state, stress: !state.stress };
        case 'TOGGLE_WEATHER':
            return { ...state, weather: !state.weather };
        case 'RESET':
            return { ...initialFormState, ...action.payload };
        default:
            return state;
    }
}

export const EntryModal = ({ isOpen, onClose, onSave, date, existingEntry }: EntryModalProps) => {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    // Reset state when modal opens or entry changes
    useEffect(() => {
        if (isOpen) {
            dispatch({
                type: 'RESET',
                payload: {
                    intensity: existingEntry?.intensity ?? 0,
                    notes: existingEntry?.notes ?? '',
                    medicationCount: existingEntry?.medicationCount ?? 0,
                    toothPain: existingEntry?.toothPain ?? false,
                    goodSleep: existingEntry?.goodSleep ?? false,
                    period: existingEntry?.period ?? false,
                    hydration: existingEntry?.hydration ?? false,
                    caffeine: existingEntry?.caffeine ?? false,
                    exercise: existingEntry?.exercise ?? false,
                    stress: existingEntry?.stress ?? false,
                    weather: existingEntry?.weather ?? false,
                },
            });
        }
    }, [isOpen, existingEntry]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ 
            date, 
            intensity: formState.intensity, 
            notes: formState.notes, 
            medicationCount: (formState.medicationCount ?? 0) > 0 ? formState.medicationCount : undefined,
            toothPain: formState.toothPain || undefined,
            goodSleep: formState.goodSleep || undefined,
            period: formState.period || undefined,
            hydration: formState.hydration || undefined,
            caffeine: formState.caffeine || undefined,
            exercise: formState.exercise || undefined,
            stress: formState.stress || undefined,
            weather: formState.weather || undefined,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-in-out]">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-[fadeInZoom_0.2s_ease-in-out]">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Log for {date}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Intensity (0-10)</label>
                        <div className="flex flex-wrap gap-2">
                            {([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as Intensity[]).map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => dispatch({ type: 'SET_INTENSITY', payload: level })}
                                    className={`
                    w-10 h-10 rounded-full font-medium text-sm transition-all duration-150
                    ${formState.intensity === level ? 'ring-2 ring-indigo-500 ring-offset-2 scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'}
                    ${getIntensityColor(level)}
                  `}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Medication 💊</label>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex gap-2">
                                {[0, 1, 2].map((count) => (
                                    <button
                                        key={count}
                                        type="button"
                                        onClick={() => dispatch({ type: 'SET_MEDICATION_COUNT', payload: count })}
                                        className={`
                                            w-20 h-12 rounded-lg font-medium text-lg transition-all duration-150 flex items-center justify-center
                                            ${(formState.medicationCount ?? 0) === count 
                                                ? 'bg-indigo-600 text-white ring-2 ring-indigo-500 ring-offset-2 scale-110 shadow-md' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                                            }
                                        `}
                                    >
                                        {count === 0 ? '—' : '💊'.repeat(count)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Other Indicators</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => dispatch({ type: 'TOGGLE_TOOTH_PAIN' })}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    formState.toothPain 
                                        ? 'bg-red-50 border-red-400 text-red-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">🦷</span>
                                <span className="text-xs font-medium">Teeth</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch({ type: 'TOGGLE_GOOD_SLEEP' })}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    formState.goodSleep 
                                        ? 'bg-green-50 border-green-400 text-green-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">🛏️</span>
                                <span className="text-xs font-medium">Sleep</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch({ type: 'TOGGLE_PERIOD' })}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    formState.period 
                                        ? 'bg-pink-50 border-pink-400 text-pink-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">🩸</span>
                                <span className="text-xs font-medium">Period</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch({ type: 'TOGGLE_HYDRATION' })}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    formState.hydration 
                                        ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">💧</span>
                                <span className="text-xs font-medium">Water</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch({ type: 'TOGGLE_CAFFEINE' })}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    formState.caffeine 
                                        ? 'bg-amber-50 border-amber-400 text-amber-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">☕</span>
                                <span className="text-xs font-medium">Coffee</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch({ type: 'TOGGLE_EXERCISE' })}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    formState.exercise 
                                        ? 'bg-purple-50 border-purple-400 text-purple-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">🏃</span>
                                <span className="text-xs font-medium">Exercise</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch({ type: 'TOGGLE_STRESS' })}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    formState.stress 
                                        ? 'bg-orange-50 border-orange-400 text-orange-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">😰</span>
                                <span className="text-xs font-medium">Stress</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch({ type: 'TOGGLE_WEATHER' })}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    formState.weather 
                                        ? 'bg-cyan-50 border-cyan-400 text-cyan-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">🌤️</span>
                                <span className="text-xs font-medium">Weather</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                        <textarea
                            id="notes"
                            value={formState.notes}
                            onChange={(e) => dispatch({ type: 'SET_NOTES', payload: e.target.value })}
                            className="w-full h-24 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-gray-700"
                            placeholder="How are you feeling?"
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm active:scale-95"
                        >
                            Save Entry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
