import React, { useState, useEffect } from 'react';
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

export const EntryModal: React.FC<EntryModalProps> = ({ isOpen, onClose, onSave, date, existingEntry }) => {
    const [intensity, setIntensity] = useState<Intensity>(0);
    const [notes, setNotes] = useState('');
    const [medicationCount, setMedicationCount] = useState<number>(0);
    const [toothPain, setToothPain] = useState<boolean>(false);
    const [goodSleep, setGoodSleep] = useState<boolean>(false);
    const [period, setPeriod] = useState<boolean>(false);
    const [hydration, setHydration] = useState<boolean>(false);
    const [caffeine, setCaffeine] = useState<boolean>(false);
    const [exercise, setExercise] = useState<boolean>(false);
    const [stress, setStress] = useState<boolean>(false);
    const [weather, setWeather] = useState<boolean>(false);

    // Reset state when modal opens or entry changes
    useEffect(() => {
        if (isOpen) {
            setIntensity(existingEntry?.intensity ?? 0);
            setNotes(existingEntry?.notes ?? '');
            setMedicationCount(existingEntry?.medicationCount ?? 0);
            setToothPain(existingEntry?.toothPain ?? false);
            setGoodSleep(existingEntry?.goodSleep ?? false);
            setPeriod(existingEntry?.period ?? false);
            setHydration(existingEntry?.hydration ?? false);
            setCaffeine(existingEntry?.caffeine ?? false);
            setExercise(existingEntry?.exercise ?? false);
            setStress(existingEntry?.stress ?? false);
            setWeather(existingEntry?.weather ?? false);
        }
    }, [isOpen, existingEntry]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ 
            date, 
            intensity, 
            notes, 
            medicationCount: medicationCount > 0 ? medicationCount : undefined,
            toothPain: toothPain || undefined,
            goodSleep: goodSleep || undefined,
            period: period || undefined,
            hydration: hydration || undefined,
            caffeine: caffeine || undefined,
            exercise: exercise || undefined,
            stress: stress || undefined,
            weather: weather || undefined,
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
                                    onClick={() => setIntensity(level)}
                                    className={`
                    w-10 h-10 rounded-full font-medium text-sm transition-all duration-150
                    ${intensity === level ? 'ring-2 ring-indigo-500 ring-offset-2 scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'}
                    ${getIntensityColor(level)}
                  `}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Medicación 💊</label>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Cantidad:</span>
                            <div className="flex gap-2">
                                {[0, 1, 2].map((count) => (
                                    <button
                                        key={count}
                                        type="button"
                                        onClick={() => setMedicationCount(count)}
                                        className={`
                                            w-20 h-12 rounded-lg font-medium text-lg transition-all duration-150 flex items-center justify-center
                                            ${medicationCount === count 
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
                        <label className="block text-sm font-medium text-gray-700">Otros indicadores</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setToothPain(!toothPain)}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    toothPain 
                                        ? 'bg-red-50 border-red-400 text-red-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">🦷</span>
                                <span className="text-xs font-medium">Dientes</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setGoodSleep(!goodSleep)}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    goodSleep 
                                        ? 'bg-green-50 border-green-400 text-green-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">🛏️</span>
                                <span className="text-xs font-medium">Sueño</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPeriod(!period)}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    period 
                                        ? 'bg-pink-50 border-pink-400 text-pink-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">🩸</span>
                                <span className="text-xs font-medium">Regla</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setHydration(!hydration)}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    hydration 
                                        ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">💧</span>
                                <span className="text-xs font-medium">Agua</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setCaffeine(!caffeine)}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    caffeine 
                                        ? 'bg-amber-50 border-amber-400 text-amber-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">☕</span>
                                <span className="text-xs font-medium">Café</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setExercise(!exercise)}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    exercise 
                                        ? 'bg-purple-50 border-purple-400 text-purple-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">🏃</span>
                                <span className="text-xs font-medium">Ejercicio</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setStress(!stress)}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    stress 
                                        ? 'bg-orange-50 border-orange-400 text-orange-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">😰</span>
                                <span className="text-xs font-medium">Estrés</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setWeather(!weather)}
                                className={`p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                                    weather 
                                        ? 'bg-cyan-50 border-cyan-400 text-cyan-700 shadow-sm' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">🌤️</span>
                                <span className="text-xs font-medium">Clima</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
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
