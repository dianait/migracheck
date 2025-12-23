import { type MigraineEntry } from '../types/migraine';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns';

export interface DailyDataPoint {
    date: string;
    day: number;
    intensity: number;
    hasEntry: boolean;
    medicationCount: number;
}

export interface MonthlyDataPoint {
    month: string;
    monthNumber: number;
    totalDays: number;
    daysWithMigraines: number;
    averageIntensity: number;
    totalMedication: number;
}

/**
 * Get daily data points for a specific month
 */
export function getMonthlyData(entries: Record<string, MigraineEntry>, monthDate: Date): DailyDataPoint[] {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthStart);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return days.map((day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const entry = entries[dateStr];
        
        return {
            date: dateStr,
            day: day.getDate(),
            intensity: entry?.intensity ?? 0,
            hasEntry: !!entry,
            medicationCount: entry?.medicationCount ?? 0,
        };
    });
}

/**
 * Get monthly aggregated data for a specific year
 */
export function getYearlyData(entries: Record<string, MigraineEntry>, yearDate: Date): MonthlyDataPoint[] {
    const yearStart = startOfYear(yearDate);
    const yearEnd = endOfYear(yearDate);
    const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

    return months.map((month) => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
        
        let totalIntensity = 0;
        let daysWithMigraines = 0;
        let totalMedication = 0;
        
        days.forEach((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const entry = entries[dateStr];
            
            if (entry) {
                daysWithMigraines++;
                totalIntensity += entry.intensity;
                totalMedication += entry.medicationCount ?? 0;
            }
        });

        const averageIntensity = daysWithMigraines > 0 ? totalIntensity / daysWithMigraines : 0;

        return {
            month: format(month, 'MMM'),
            monthNumber: month.getMonth(),
            totalDays: days.length,
            daysWithMigraines,
            averageIntensity: Math.round(averageIntensity * 10) / 10,
            totalMedication,
        };
    });
}

