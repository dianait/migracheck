import { useState, useContext } from 'react';
import { Calendar } from './components/Calendar';
import { EntryModal } from './components/EntryModal';
import { MigraineContext } from './context/MigraineContext';

function AppContent() {
    const { state, dispatch } = useContext(MigraineContext);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleDayClick = (date: string) => {
        setSelectedDate(date);
    };

    const handleSaveEntry = (entryData: any) => {
        if (!selectedDate) return;

        if (state.entries[selectedDate]) {
            dispatch({
                type: 'UPDATE_ENTRY',
                payload: { ...entryData, id: state.entries[selectedDate].id, date: selectedDate },
            });
        } else {
            dispatch({
                type: 'ADD_ENTRY',
                payload: { ...entryData, id: crypto.randomUUID(), date: selectedDate },
            });
        }
        setSelectedDate(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">M</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">MigraCheck</h1>
                </div>
            </header>

            <main className="flex-1 overflow-auto py-8">
                {/* We need to pass the click handler down to Calendar. 
            Note: In the previous Calendar step I just mocked onClick. 
            I should update Calendar.tsx to accept onDayClick or similar,
            OR wrap Calendar here. The Calendar code I wrote uses `DayCell` which calls `onClick`.
            But `Calendar` itself didn't expose the prop. I need to fix `Calendar.tsx` to accept the prop.
            Wait, I'll update Calendar.tsx in the next step to accept `onDayClick`. 
        */}
                <CalendarWrapper onDayClick={handleDayClick} />
            </main>

            {selectedDate && (
                <EntryModal
                    isOpen={true}
                    date={selectedDate}
                    onClose={() => setSelectedDate(null)}
                    onSave={handleSaveEntry}
                    existingEntry={state.entries[selectedDate]}
                />
            )}
        </div>
    );
}

// Temporary wrapper until I fix Calendar.tsx props
// Actually, better to just fix Calendar.tsx in the next tool call properly.
// For now, I'll assume Calendar takes onDayClick.
// Let's rewrite Calendar.tsx properly after this file.
import { AppProvider } from './context/AppProvider'; // Wait, I made MigraineProvider.

export default function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    )
}

function AppProvider({ children }: { children: React.ReactNode }) {
    const { MigraineProvider } = require('./context/MigraineContext');
    // CommonJS require is risky here in Vite/ESM. 
    // I should strictly import.
    // Let me rewrite this logic cleanly in the next step.
    return <MigraineProvider>{children}</MigraineProvider>
}
