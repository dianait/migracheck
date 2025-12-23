import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DayCell } from '../src/components/DayCell';
import { EntryModal } from '../src/components/EntryModal';
import { type MigraineEntry } from '../src/types/migraine';

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
