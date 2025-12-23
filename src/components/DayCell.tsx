import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type MigraineEntry } from '../types/migraine';
import { getIntensityColor } from '../utils/colors';

interface DayCellProps {
    day: number;
    date: string;
    entry?: MigraineEntry;
    onClick: (date: string) => void;
    isToday?: boolean;
}

export const DayCell: React.FC<DayCellProps> = ({ day, date, entry, onClick, isToday }) => {
    const intensity = entry?.intensity ?? 0;
    // If no entry, we don't show intensity color, just a neutral one or none?
    // User asked for "modern". Let's wait for user input on interaction but for now basic render.

    const hasEntry = entry !== undefined;
    const colorClass = hasEntry ? getIntensityColor(intensity) : 'bg-white hover:bg-gray-50 border-gray-100';

    return (
        <button
            onClick={() => onClick(date)}
            className={twMerge(
                'h-24 w-full border rounded-xl p-2 flex flex-col items-start justify-between transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500',
                colorClass,
                isToday && 'ring-2 ring-indigo-500 ring-offset-2'
            )}
            data-testid={`day-cell-${date}`}
        >
            <span className={clsx("font-medium text-sm rounded-full w-7 h-7 flex items-center justify-center",
                hasEntry ? "bg-white/50" : "bg-gray-100 text-gray-600"
            )}>
                {day}
            </span>
            <div className="flex flex-col items-end gap-1 w-full">
                {hasEntry && (
                    <span className="text-xs font-semibold">
                        Lvl {intensity}
                    </span>
                )}
                {entry?.medicationCount && entry.medicationCount > 0 && (
                    <div 
                        className="flex flex-row items-center justify-center gap-0.5"
                        title={`${entry.medicationCount} píldora${entry.medicationCount > 1 ? 's' : ''}`}
                    >
                        {entry.medicationCount === 1 ? (
                            <span className="text-sm">💊</span>
                        ) : (
                            <>
                                <span className="text-sm">💊</span>
                                <span className="text-sm">💊</span>
                            </>
                        )}
                    </div>
                )}
            </div>
        </button>
    );
};
