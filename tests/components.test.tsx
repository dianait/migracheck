import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DayCell } from '../src/components/DayCell';
import { EntryModal } from '../src/components/EntryModal';
import { MonthlyChart } from '../src/components/MonthlyChart';
import { YearlyChart } from '../src/components/YearlyChart';
import App from '../src/App';
import { type MigraineEntry } from '../src/types/migraine';
import { getMonthlyData, getYearlyData } from '../src/utils/chartData';
import { MigraineProvider } from '../src/context/MigraineContext';

describe('DayCell', () => {
    describe('Indicator emoji display', () => {
        it('displays toothPain emoji when toothPain is true', () => {
            const entry: MigraineEntry = {
                id: '1',
                date: '2023-01-01',
                intensity: 5,
                toothPain: true,
            };

            render(
                <DayCell
                    day={1}
                    date="2023-01-01"
                    entry={entry}
                    onClick={vi.fn()}
                />
            );

            const emoji = screen.getByTitle('Dolor de dientes');
            expect(emoji).toBeInTheDocument();
            expect(emoji.textContent).toBe('🦷');
        });

        it('displays goodSleep emoji when goodSleep is true', () => {
            const entry: MigraineEntry = {
                id: '2',
                date: '2023-01-02',
                intensity: 3,
                goodSleep: true,
            };

            render(
                <DayCell
                    day={2}
                    date="2023-01-02"
                    entry={entry}
                    onClick={vi.fn()}
                />
            );

            const emoji = screen.getByTitle('Durmió bien');
            expect(emoji).toBeInTheDocument();
            expect(emoji.textContent).toBe('🛏️');
        });

        it('displays period emoji when period is true', () => {
            const entry: MigraineEntry = {
                id: '3',
                date: '2023-01-03',
                intensity: 7,
                period: true,
            };

            render(
                <DayCell
                    day={3}
                    date="2023-01-03"
                    entry={entry}
                    onClick={vi.fn()}
                />
            );

            const emoji = screen.getByTitle('Menstruación');
            expect(emoji).toBeInTheDocument();
            expect(emoji.textContent).toBe('🩸');
        });

        it('displays hydration emoji when hydration is true', () => {
            const entry: MigraineEntry = {
                id: '4',
                date: '2023-01-04',
                intensity: 2,
                hydration: true,
            };

            render(
                <DayCell
                    day={4}
                    date="2023-01-04"
                    entry={entry}
                    onClick={vi.fn()}
                />
            );

            const emoji = screen.getByTitle('Hidratación');
            expect(emoji).toBeInTheDocument();
            expect(emoji.textContent).toBe('💧');
        });

        it('displays caffeine emoji when caffeine is true', () => {
            const entry: MigraineEntry = {
                id: '5',
                date: '2023-01-05',
                intensity: 4,
                caffeine: true,
            };

            render(
                <DayCell
                    day={5}
                    date="2023-01-05"
                    entry={entry}
                    onClick={vi.fn()}
                />
            );

            const emoji = screen.getByTitle('Cafeína');
            expect(emoji).toBeInTheDocument();
            expect(emoji.textContent).toBe('☕');
        });

        it('displays exercise emoji when exercise is true', () => {
            const entry: MigraineEntry = {
                id: '6',
                date: '2023-01-06',
                intensity: 1,
                exercise: true,
            };

            render(
                <DayCell
                    day={6}
                    date="2023-01-06"
                    entry={entry}
                    onClick={vi.fn()}
                />
            );

            const emoji = screen.getByTitle('Ejercicio');
            expect(emoji).toBeInTheDocument();
            expect(emoji.textContent).toBe('🏃');
        });

        it('displays stress emoji when stress is true', () => {
            const entry: MigraineEntry = {
                id: '7',
                date: '2023-01-07',
                intensity: 8,
                stress: true,
            };

            render(
                <DayCell
                    day={7}
                    date="2023-01-07"
                    entry={entry}
                    onClick={vi.fn()}
                />
            );

            const emoji = screen.getByTitle('Estrés');
            expect(emoji).toBeInTheDocument();
            expect(emoji.textContent).toBe('😰');
        });

        it('displays weather emoji when weather is true', () => {
            const entry: MigraineEntry = {
                id: '8',
                date: '2023-01-08',
                intensity: 6,
                weather: true,
            };

            render(
                <DayCell
                    day={8}
                    date="2023-01-08"
                    entry={entry}
                    onClick={vi.fn()}
                />
            );

            const emoji = screen.getByTitle('Cambios de clima');
            expect(emoji).toBeInTheDocument();
            expect(emoji.textContent).toBe('🌤️');
        });

        it('displays multiple indicator emojis when multiple are true', () => {
            const entry: MigraineEntry = {
                id: '9',
                date: '2023-01-09',
                intensity: 5,
                toothPain: true,
                period: true,
                stress: true,
            };

            render(
                <DayCell
                    day={9}
                    date="2023-01-09"
                    entry={entry}
                    onClick={vi.fn()}
                />
            );

            expect(screen.getByTitle('Dolor de dientes')).toBeInTheDocument();
            expect(screen.getByTitle('Menstruación')).toBeInTheDocument();
            expect(screen.getByTitle('Estrés')).toBeInTheDocument();
        });

        it('does not display any indicator emojis when none are true', () => {
            const entry: MigraineEntry = {
                id: '10',
                date: '2023-01-10',
                intensity: 3,
            };

            render(
                <DayCell
                    day={10}
                    date="2023-01-10"
                    entry={entry}
                    onClick={vi.fn()}
                />
            );

            expect(screen.queryByTitle('Dolor de dientes')).not.toBeInTheDocument();
            expect(screen.queryByTitle('Durmió bien')).not.toBeInTheDocument();
            expect(screen.queryByTitle('Menstruación')).not.toBeInTheDocument();
            expect(screen.queryByTitle('Hidratación')).not.toBeInTheDocument();
            expect(screen.queryByTitle('Cafeína')).not.toBeInTheDocument();
            expect(screen.queryByTitle('Ejercicio')).not.toBeInTheDocument();
            expect(screen.queryByTitle('Estrés')).not.toBeInTheDocument();
            expect(screen.queryByTitle('Cambios de clima')).not.toBeInTheDocument();
        });
    });
});

describe('EntryModal', () => {
    describe('New entry initialization', () => {
        it('initializes all indicator states to false for a new entry', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-01-15"
                />
            );

            // All indicator buttons should have the inactive state (gray styling)
            const toothPainButton = screen.getByText('Dientes').closest('button');
            const goodSleepButton = screen.getByText('Sueño').closest('button');
            const periodButton = screen.getByText('Regla').closest('button');
            const hydrationButton = screen.getByText('Agua').closest('button');
            const caffeineButton = screen.getByText('Café').closest('button');
            const exerciseButton = screen.getByText('Ejercicio').closest('button');
            const stressButton = screen.getByText('Estrés').closest('button');
            const weatherButton = screen.getByText('Clima').closest('button');

            expect(toothPainButton).toHaveClass('bg-gray-50');
            expect(goodSleepButton).toHaveClass('bg-gray-50');
            expect(periodButton).toHaveClass('bg-gray-50');
            expect(hydrationButton).toHaveClass('bg-gray-50');
            expect(caffeineButton).toHaveClass('bg-gray-50');
            expect(exerciseButton).toHaveClass('bg-gray-50');
            expect(stressButton).toHaveClass('bg-gray-50');
            expect(weatherButton).toHaveClass('bg-gray-50');
        });
    });

    describe('Existing entry loading', () => {
        it('correctly loads existing indicator states when editing an entry', () => {
            const existingEntry: MigraineEntry = {
                id: '1',
                date: '2023-01-20',
                intensity: 7,
                notes: 'Bad day',
                toothPain: true,
                goodSleep: false,
                period: true,
                hydration: false,
                caffeine: true,
                exercise: false,
                stress: true,
                weather: false,
            };

            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-01-20"
                    existingEntry={existingEntry}
                />
            );

            // Buttons that should be active (red, pink, amber, orange styling)
            const toothPainButton = screen.getByText('Dientes').closest('button');
            const periodButton = screen.getByText('Regla').closest('button');
            const caffeineButton = screen.getByText('Café').closest('button');
            const stressButton = screen.getByText('Estrés').closest('button');

            expect(toothPainButton).toHaveClass('bg-red-50');
            expect(periodButton).toHaveClass('bg-pink-50');
            expect(caffeineButton).toHaveClass('bg-amber-50');
            expect(stressButton).toHaveClass('bg-orange-50');

            // Buttons that should be inactive (gray styling)
            const goodSleepButton = screen.getByText('Sueño').closest('button');
            const hydrationButton = screen.getByText('Agua').closest('button');
            const exerciseButton = screen.getByText('Ejercicio').closest('button');
            const weatherButton = screen.getByText('Clima').closest('button');

            expect(goodSleepButton).toHaveClass('bg-gray-50');
            expect(hydrationButton).toHaveClass('bg-gray-50');
            expect(exerciseButton).toHaveClass('bg-gray-50');
            expect(weatherButton).toHaveClass('bg-gray-50');
        });

        it('loads all indicators as active when all are true in existing entry', () => {
            const existingEntry: MigraineEntry = {
                id: '2',
                date: '2023-01-21',
                intensity: 9,
                toothPain: true,
                goodSleep: true,
                period: true,
                hydration: true,
                caffeine: true,
                exercise: true,
                stress: true,
                weather: true,
            };

            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-01-21"
                    existingEntry={existingEntry}
                />
            );

            const toothPainButton = screen.getByText('Dientes').closest('button');
            const goodSleepButton = screen.getByText('Sueño').closest('button');
            const periodButton = screen.getByText('Regla').closest('button');
            const hydrationButton = screen.getByText('Agua').closest('button');
            const caffeineButton = screen.getByText('Café').closest('button');
            const exerciseButton = screen.getByText('Ejercicio').closest('button');
            const stressButton = screen.getByText('Estrés').closest('button');
            const weatherButton = screen.getByText('Clima').closest('button');

            expect(toothPainButton).toHaveClass('bg-red-50');
            expect(goodSleepButton).toHaveClass('bg-green-50');
            expect(periodButton).toHaveClass('bg-pink-50');
            expect(hydrationButton).toHaveClass('bg-blue-50');
            expect(caffeineButton).toHaveClass('bg-amber-50');
            expect(exerciseButton).toHaveClass('bg-purple-50');
            expect(stressButton).toHaveClass('bg-orange-50');
            expect(weatherButton).toHaveClass('bg-cyan-50');
        });
    });

    describe('handleSubmit functionality', () => {
        it('correctly saves the state of all new indicators when submitting', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-02-01"
                />
            );

            // Click intensity 6
            const intensityButton = screen.getByRole('button', { name: '6' });
            fireEvent.click(intensityButton);

            // Click some indicator buttons to activate them
            const toothPainButton = screen.getByText('Dientes').closest('button');
            const hydrationButton = screen.getByText('Agua').closest('button');
            const exerciseButton = screen.getByText('Ejercicio').closest('button');

            fireEvent.click(toothPainButton!);
            fireEvent.click(hydrationButton!);
            fireEvent.click(exerciseButton!);

            // Fill notes
            const notesInput = screen.getByPlaceholderText('How are you feeling?');
            fireEvent.change(notesInput, { target: { value: 'Test notes' } });

            // Submit the form
            const saveButton = screen.getByRole('button', { name: 'Save Entry' });
            fireEvent.click(saveButton);

            // Verify onSave was called with correct data
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(onSave).toHaveBeenCalledWith({
                date: '2023-02-01',
                intensity: 6,
                notes: 'Test notes',
                medicationCount: undefined,
                toothPain: true,
                goodSleep: undefined,
                period: undefined,
                hydration: true,
                caffeine: undefined,
                exercise: true,
                stress: undefined,
                weather: undefined,
            });
        });

        it('saves all indicators as true when all are selected', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-02-02"
                />
            );

            // Click intensity 10
            fireEvent.click(screen.getByRole('button', { name: '10' }));

            // Click all indicator buttons
            fireEvent.click(screen.getByText('Dientes').closest('button')!);
            fireEvent.click(screen.getByText('Sueño').closest('button')!);
            fireEvent.click(screen.getByText('Regla').closest('button')!);
            fireEvent.click(screen.getByText('Agua').closest('button')!);
            fireEvent.click(screen.getByText('Café').closest('button')!);
            fireEvent.click(screen.getByText('Ejercicio').closest('button')!);
            fireEvent.click(screen.getByText('Estrés').closest('button')!);
            fireEvent.click(screen.getByText('Clima').closest('button')!);

            // Submit
            fireEvent.click(screen.getByRole('button', { name: 'Save Entry' }));

            expect(onSave).toHaveBeenCalledWith({
                date: '2023-02-02',
                intensity: 10,
                notes: '',
                medicationCount: undefined,
                toothPain: true,
                goodSleep: true,
                period: true,
                hydration: true,
                caffeine: true,
                exercise: true,
                stress: true,
                weather: true,
            });
        });

        it('saves indicators as undefined when none are selected', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-02-03"
                />
            );

            // Click intensity 0
            fireEvent.click(screen.getByRole('button', { name: '0' }));

            // Don't click any indicators

            // Submit
            fireEvent.click(screen.getByRole('button', { name: 'Save Entry' }));

            expect(onSave).toHaveBeenCalledWith({
                date: '2023-02-03',
                intensity: 0,
                notes: '',
                medicationCount: undefined,
                toothPain: undefined,
                goodSleep: undefined,
                period: undefined,
                hydration: undefined,
                caffeine: undefined,
                exercise: undefined,
                stress: undefined,
                weather: undefined,
            });
        });
    });

    describe('Indicator button toggle functionality', () => {
        it('toggles toothPain state when clicking the button', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-03-01"
                />
            );

            const toothPainButton = screen.getByText('Dientes').closest('button');

            // Initially inactive
            expect(toothPainButton).toHaveClass('bg-gray-50');

            // Click to activate
            fireEvent.click(toothPainButton!);
            expect(toothPainButton).toHaveClass('bg-red-50');

            // Click to deactivate
            fireEvent.click(toothPainButton!);
            expect(toothPainButton).toHaveClass('bg-gray-50');
        });

        it('toggles goodSleep state when clicking the button', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-03-02"
                />
            );

            const goodSleepButton = screen.getByText('Sueño').closest('button');

            expect(goodSleepButton).toHaveClass('bg-gray-50');
            fireEvent.click(goodSleepButton!);
            expect(goodSleepButton).toHaveClass('bg-green-50');
            fireEvent.click(goodSleepButton!);
            expect(goodSleepButton).toHaveClass('bg-gray-50');
        });

        it('toggles period state when clicking the button', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-03-03"
                />
            );

            const periodButton = screen.getByText('Regla').closest('button');

            expect(periodButton).toHaveClass('bg-gray-50');
            fireEvent.click(periodButton!);
            expect(periodButton).toHaveClass('bg-pink-50');
            fireEvent.click(periodButton!);
            expect(periodButton).toHaveClass('bg-gray-50');
        });

        it('toggles hydration state when clicking the button', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-03-04"
                />
            );

            const hydrationButton = screen.getByText('Agua').closest('button');

            expect(hydrationButton).toHaveClass('bg-gray-50');
            fireEvent.click(hydrationButton!);
            expect(hydrationButton).toHaveClass('bg-blue-50');
            fireEvent.click(hydrationButton!);
            expect(hydrationButton).toHaveClass('bg-gray-50');
        });

        it('toggles caffeine state when clicking the button', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-03-05"
                />
            );

            const caffeineButton = screen.getByText('Café').closest('button');

            expect(caffeineButton).toHaveClass('bg-gray-50');
            fireEvent.click(caffeineButton!);
            expect(caffeineButton).toHaveClass('bg-amber-50');
            fireEvent.click(caffeineButton!);
            expect(caffeineButton).toHaveClass('bg-gray-50');
        });

        it('toggles exercise state when clicking the button', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-03-06"
                />
            );

            const exerciseButton = screen.getByText('Ejercicio').closest('button');

            expect(exerciseButton).toHaveClass('bg-gray-50');
            fireEvent.click(exerciseButton!);
            expect(exerciseButton).toHaveClass('bg-purple-50');
            fireEvent.click(exerciseButton!);
            expect(exerciseButton).toHaveClass('bg-gray-50');
        });

        it('toggles stress state when clicking the button', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-03-07"
                />
            );

            const stressButton = screen.getByText('Estrés').closest('button');

            expect(stressButton).toHaveClass('bg-gray-50');
            fireEvent.click(stressButton!);
            expect(stressButton).toHaveClass('bg-orange-50');
            fireEvent.click(stressButton!);
            expect(stressButton).toHaveClass('bg-gray-50');
        });

        it('toggles weather state when clicking the button', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-03-08"
                />
            );

            const weatherButton = screen.getByText('Clima').closest('button');

            expect(weatherButton).toHaveClass('bg-gray-50');
            fireEvent.click(weatherButton!);
            expect(weatherButton).toHaveClass('bg-cyan-50');
            fireEvent.click(weatherButton!);
            expect(weatherButton).toHaveClass('bg-gray-50');
        });

        it('can toggle multiple indicators independently', () => {
            const onSave = vi.fn();
            const onClose = vi.fn();

            render(
                <EntryModal
                    isOpen={true}
                    onClose={onClose}
                    onSave={onSave}
                    date="2023-03-09"
                />
            );

            const toothPainButton = screen.getByText('Dientes').closest('button');
            const stressButton = screen.getByText('Estrés').closest('button');
            const weatherButton = screen.getByText('Clima').closest('button');

            // Activate tooth pain and stress
            fireEvent.click(toothPainButton!);
            fireEvent.click(stressButton!);

            expect(toothPainButton).toHaveClass('bg-red-50');
            expect(stressButton).toHaveClass('bg-orange-50');
            expect(weatherButton).toHaveClass('bg-gray-50');

            // Toggle stress off, weather on
            fireEvent.click(stressButton!);
            fireEvent.click(weatherButton!);

            expect(toothPainButton).toHaveClass('bg-red-50'); // Still active
            expect(stressButton).toHaveClass('bg-gray-50'); // Now inactive
            expect(weatherButton).toHaveClass('bg-cyan-50'); // Now active
        });
    });
});

describe('chartData utilities', () => {
    describe('getMonthlyData', () => {
        it('correctly processes migraine entries for a given month', () => {
            const entries: Record<string, MigraineEntry> = {
                '2024-01-05': {
                    id: '1',
                    date: '2024-01-05',
                    intensity: 7,
                    medicationCount: 2,
                },
                '2024-01-10': {
                    id: '2',
                    date: '2024-01-10',
                    intensity: 5,
                    medicationCount: 1,
                },
                '2024-01-15': {
                    id: '3',
                    date: '2024-01-15',
                    intensity: 8,
                    medicationCount: 3,
                },
            };

            const monthDate = new Date('2024-01-15');
            const result = getMonthlyData(entries, monthDate);

            // Should have 31 days for January
            expect(result).toHaveLength(31);

            // Check day 5
            const day5 = result.find((d) => d.day === 5);
            expect(day5).toBeDefined();
            expect(day5?.intensity).toBe(7);
            expect(day5?.medicationCount).toBe(2);
            expect(day5?.hasEntry).toBe(true);
            expect(day5?.date).toBe('2024-01-05');

            // Check day 10
            const day10 = result.find((d) => d.day === 10);
            expect(day10?.intensity).toBe(5);
            expect(day10?.medicationCount).toBe(1);
            expect(day10?.hasEntry).toBe(true);

            // Check day 15
            const day15 = result.find((d) => d.day === 15);
            expect(day15?.intensity).toBe(8);
            expect(day15?.medicationCount).toBe(3);
            expect(day15?.hasEntry).toBe(true);

            // Check a day without entry
            const day1 = result.find((d) => d.day === 1);
            expect(day1?.intensity).toBe(0);
            expect(day1?.medicationCount).toBe(0);
            expect(day1?.hasEntry).toBe(false);
        });

        it('handles a month with no entries', () => {
            const entries: Record<string, MigraineEntry> = {};
            const monthDate = new Date('2024-02-15');
            const result = getMonthlyData(entries, monthDate);

            // February 2024 has 29 days (leap year)
            expect(result).toHaveLength(29);

            // All days should have default values
            result.forEach((day) => {
                expect(day.intensity).toBe(0);
                expect(day.medicationCount).toBe(0);
                expect(day.hasEntry).toBe(false);
            });
        });

        it('calculates intensity and medication counts correctly', () => {
            const entries: Record<string, MigraineEntry> = {
                '2024-03-01': { id: '1', date: '2024-03-01', intensity: 0, medicationCount: 0 },
                '2024-03-02': { id: '2', date: '2024-03-02', intensity: 10, medicationCount: 5 },
                '2024-03-03': { id: '3', date: '2024-03-03', intensity: 3, medicationCount: undefined },
            };

            const result = getMonthlyData(entries, new Date('2024-03-01'));

            const day1 = result.find((d) => d.day === 1);
            expect(day1?.intensity).toBe(0);
            expect(day1?.medicationCount).toBe(0);

            const day2 = result.find((d) => d.day === 2);
            expect(day2?.intensity).toBe(10);
            expect(day2?.medicationCount).toBe(5);

            const day3 = result.find((d) => d.day === 3);
            expect(day3?.intensity).toBe(3);
            expect(day3?.medicationCount).toBe(0); // undefined should default to 0
        });
    });

    describe('getYearlyData', () => {
        it('correctly aggregates migraine entries by month for a given year', () => {
            const entries: Record<string, MigraineEntry> = {
                '2024-01-05': { id: '1', date: '2024-01-05', intensity: 6, medicationCount: 2 },
                '2024-01-10': { id: '2', date: '2024-01-10', intensity: 8, medicationCount: 1 },
                '2024-02-15': { id: '3', date: '2024-02-15', intensity: 4, medicationCount: 3 },
                '2024-03-20': { id: '4', date: '2024-03-20', intensity: 7, medicationCount: 2 },
                '2024-03-25': { id: '5', date: '2024-03-25', intensity: 9, medicationCount: 1 },
            };

            const yearDate = new Date('2024-06-15');
            const result = getYearlyData(entries, yearDate);

            // Should have 12 months
            expect(result).toHaveLength(12);

            // Check January (2 entries: intensity 6 and 8, avg = 7)
            const january = result[0];
            expect(january.month).toBe('Jan');
            expect(january.monthNumber).toBe(0);
            expect(january.daysWithMigraines).toBe(2);
            expect(january.averageIntensity).toBe(7); // (6 + 8) / 2 = 7
            expect(january.totalMedication).toBe(3); // 2 + 1
            expect(january.totalDays).toBe(31);

            // Check February (1 entry: intensity 4)
            const february = result[1];
            expect(february.month).toBe('Feb');
            expect(february.daysWithMigraines).toBe(1);
            expect(february.averageIntensity).toBe(4);
            expect(february.totalMedication).toBe(3);
            expect(february.totalDays).toBe(29); // 2024 is a leap year

            // Check March (2 entries: intensity 7 and 9, avg = 8)
            const march = result[2];
            expect(march.month).toBe('Mar');
            expect(march.daysWithMigraines).toBe(2);
            expect(march.averageIntensity).toBe(8); // (7 + 9) / 2 = 8
            expect(march.totalMedication).toBe(3); // 2 + 1

            // Check a month with no entries (April)
            const april = result[3];
            expect(april.month).toBe('Apr');
            expect(april.daysWithMigraines).toBe(0);
            expect(april.averageIntensity).toBe(0);
            expect(april.totalMedication).toBe(0);
            expect(april.totalDays).toBe(30);
        });

        it('handles a year with no entries', () => {
            const entries: Record<string, MigraineEntry> = {};
            const result = getYearlyData(entries, new Date('2024-01-01'));

            expect(result).toHaveLength(12);

            result.forEach((month) => {
                expect(month.daysWithMigraines).toBe(0);
                expect(month.averageIntensity).toBe(0);
                expect(month.totalMedication).toBe(0);
                expect(month.totalDays).toBeGreaterThan(0);
            });
        });

        it('rounds average intensity correctly', () => {
            const entries: Record<string, MigraineEntry> = {
                '2024-01-01': { id: '1', date: '2024-01-01', intensity: 3, medicationCount: 0 },
                '2024-01-02': { id: '2', date: '2024-01-02', intensity: 4, medicationCount: 0 },
                '2024-01-03': { id: '3', date: '2024-01-03', intensity: 5, medicationCount: 0 },
            };

            const result = getYearlyData(entries, new Date('2024-01-01'));
            const january = result[0];

            // (3 + 4 + 5) / 3 = 4.0
            expect(january.averageIntensity).toBe(4);
        });

        it('handles entries with undefined medication count', () => {
            const entries: Record<string, MigraineEntry> = {
                '2024-01-01': { id: '1', date: '2024-01-01', intensity: 5, medicationCount: undefined },
                '2024-01-02': { id: '2', date: '2024-01-02', intensity: 6, medicationCount: 2 },
            };

            const result = getYearlyData(entries, new Date('2024-01-01'));
            const january = result[0];

            expect(january.totalMedication).toBe(2); // undefined should be treated as 0
        });
    });
});

describe('MonthlyChart', () => {
    it('displays correct monthly statistics based on provided data', () => {
        const mockEntries: Record<string, MigraineEntry> = {
            '2024-01-05': { id: '1', date: '2024-01-05', intensity: 7, medicationCount: 2 },
            '2024-01-10': { id: '2', date: '2024-01-10', intensity: 5, medicationCount: 1 },
            '2024-01-20': { id: '3', date: '2024-01-20', intensity: 8, medicationCount: 3 },
        };

        // Mock the context
        const mockContext = {
            state: { entries: mockEntries },
            dispatch: vi.fn(),
        };

        // We need to mock the useContext hook
        const originalUseContext = require('react').useContext;
        vi.spyOn(require('react'), 'useContext').mockImplementation((context: any) => {
            if (context.displayName === 'MigraineContext' || context === require('../src/context/MigraineContext').MigraineContext) {
                return mockContext;
            }
            return originalUseContext(context);
        });

        // Mock date to be in January 2024
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-15'));

        render(<MonthlyChart />);

        // Check that the correct statistics are displayed
        // Days with migraines: 3
        expect(screen.getByText('Days with Migraines')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();

        // Average intensity: (7 + 5 + 8) / 3 = 6.7 (rounded to 6.7)
        expect(screen.getByText('Average Intensity')).toBeInTheDocument();
        expect(screen.getByText('6.7')).toBeInTheDocument();

        // Total medication: 2 + 1 + 3 = 6
        expect(screen.getByText('Total Medication')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();

        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('displays zero statistics when there are no entries', () => {
        const mockContext = {
            state: { entries: {} },
            dispatch: vi.fn(),
        };

        const originalUseContext = require('react').useContext;
        vi.spyOn(require('react'), 'useContext').mockImplementation((context: any) => {
            if (context.displayName === 'MigraineContext' || context === require('../src/context/MigraineContext').MigraineContext) {
                return mockContext;
            }
            return originalUseContext(context);
        });

        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-02-15'));

        render(<MonthlyChart />);

        // All statistics should be 0
        const allZeros = screen.getAllByText('0');
        expect(allZeros.length).toBeGreaterThanOrEqual(3);

        vi.useRealTimers();
        vi.restoreAllMocks();
    });
});

describe('YearlyChart', () => {
    it('displays correct yearly statistics based on provided data', () => {
        const mockEntries: Record<string, MigraineEntry> = {
            '2024-01-05': { id: '1', date: '2024-01-05', intensity: 6, medicationCount: 2 },
            '2024-01-10': { id: '2', date: '2024-01-10', intensity: 8, medicationCount: 1 },
            '2024-02-15': { id: '3', date: '2024-02-15', intensity: 4, medicationCount: 3 },
            '2024-03-20': { id: '4', date: '2024-03-20', intensity: 7, medicationCount: 2 },
            '2024-03-25': { id: '5', date: '2024-03-25', intensity: 9, medicationCount: 1 },
        };

        const mockContext = {
            state: { entries: mockEntries },
            dispatch: vi.fn(),
        };

        const originalUseContext = require('react').useContext;
        vi.spyOn(require('react'), 'useContext').mockImplementation((context: any) => {
            if (context.displayName === 'MigraineContext' || context === require('../src/context/MigraineContext').MigraineContext) {
                return mockContext;
            }
            return originalUseContext(context);
        });

        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-06-15'));

        render(<YearlyChart />);

        // Total days with migraines: 5 (2 in Jan, 1 in Feb, 2 in Mar)
        expect(screen.getByText('Total Days')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();

        // Average monthly intensity: (7 + 4 + 8) / 12 = 1.6 (rounded)
        // Jan: (6+8)/2=7, Feb: 4, Mar: (7+9)/2=8, others: 0
        // (7 + 4 + 8 + 0*9) / 12 = 1.6
        expect(screen.getByText('Avg Monthly Intensity')).toBeInTheDocument();
        expect(screen.getByText('1.6')).toBeInTheDocument();

        // Total medication: 2 + 1 + 3 + 2 + 1 = 9
        expect(screen.getByText('Total Medication')).toBeInTheDocument();
        expect(screen.getByText('9')).toBeInTheDocument();

        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('displays zero statistics when there are no entries', () => {
        const mockContext = {
            state: { entries: {} },
            dispatch: vi.fn(),
        };

        const originalUseContext = require('react').useContext;
        vi.spyOn(require('react'), 'useContext').mockImplementation((context: any) => {
            if (context.displayName === 'MigraineContext' || context === require('../src/context/MigraineContext').MigraineContext) {
                return mockContext;
            }
            return originalUseContext(context);
        });

        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-06-15'));

        render(<YearlyChart />);

        // All statistics should be 0
        const allZeros = screen.getAllByText('0');
        expect(allZeros.length).toBeGreaterThanOrEqual(3);

        vi.useRealTimers();
        vi.restoreAllMocks();
    });
});

describe('App component view switching', () => {
    it('correctly switches between Calendar, MonthlyChart, and YearlyChart views', () => {
        render(
            <MigraineProvider>
                <App />
            </MigraineProvider>
        );

        // Initially, Calendar view should be active
        const calendarButton = screen.getByRole('button', { name: /calendar/i });
        const monthlyButton = screen.getByRole('button', { name: /monthly/i });
        const yearlyButton = screen.getByRole('button', { name: /yearly/i });

        // Check that calendar button is active (has the active border class)
        expect(calendarButton).toHaveClass('border-indigo-600');
        expect(monthlyButton).not.toHaveClass('border-indigo-600');
        expect(yearlyButton).not.toHaveClass('border-indigo-600');

        // Click Monthly button
        fireEvent.click(monthlyButton);

        // Monthly view should now be active
        expect(calendarButton).not.toHaveClass('border-indigo-600');
        expect(monthlyButton).toHaveClass('border-indigo-600');
        expect(yearlyButton).not.toHaveClass('border-indigo-600');

        // Should display monthly statistics heading
        expect(screen.getByText('Monthly Statistics')).toBeInTheDocument();

        // Click Yearly button
        fireEvent.click(yearlyButton);

        // Yearly view should now be active
        expect(calendarButton).not.toHaveClass('border-indigo-600');
        expect(monthlyButton).not.toHaveClass('border-indigo-600');
        expect(yearlyButton).toHaveClass('border-indigo-600');

        // Should display yearly statistics heading
        expect(screen.getByText('Yearly Statistics')).toBeInTheDocument();

        // Click Calendar button to go back
        fireEvent.click(calendarButton);

        // Calendar view should be active again
        expect(calendarButton).toHaveClass('border-indigo-600');
        expect(monthlyButton).not.toHaveClass('border-indigo-600');
        expect(yearlyButton).not.toHaveClass('border-indigo-600');
    });
});
