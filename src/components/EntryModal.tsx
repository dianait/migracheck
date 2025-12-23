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

    // Reset state when modal opens or entry changes
    useEffect(() => {
        if (isOpen) {
            setIntensity(existingEntry?.intensity ?? 0);
            setNotes(existingEntry?.notes ?? '');
            setMedicationCount(existingEntry?.medicationCount ?? 0);
        }
    }, [isOpen, existingEntry]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ date, intensity, notes, medicationCount: medicationCount > 0 ? medicationCount : undefined });
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
