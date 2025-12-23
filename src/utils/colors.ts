import { type Intensity } from '../types/migraine';

export const getIntensityColor = (intensity: Intensity): string => {
    switch (intensity) {
        case 0: return 'bg-green-100 text-green-800 border-green-200';
        case 1: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 2: return 'bg-yellow-200 text-yellow-900 border-yellow-300';
        case 3: return 'bg-orange-100 text-orange-800 border-orange-200';
        case 4: return 'bg-orange-200 text-orange-900 border-orange-300';
        case 5: return 'bg-orange-300 text-orange-950 border-orange-400';
        case 6: return 'bg-red-200 text-red-800 border-red-300';
        case 7: return 'bg-red-300 text-red-900 border-red-400';
        case 8: return 'bg-red-400 text-white border-red-500';
        case 9: return 'bg-red-500 text-white border-red-600';
        case 10: return 'bg-red-600 text-white border-red-700';
        default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
};
