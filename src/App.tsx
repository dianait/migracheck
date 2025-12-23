import { useState, useContext } from 'react';
import { Calendar } from './components/Calendar';
import { EntryModal } from './components/EntryModal';
import { MigraineContext } from './context/MigraineContext';
import { type MigraineEntry } from './types/migraine';

export default function App() {
  const { state, dispatch } = useContext(MigraineContext);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleSaveEntry = (entryData: Omit<MigraineEntry, 'id'>) => {
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
    setSelectedDate(null); // Close modal
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-10 backdrop-blur-md bg-white/80">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent tracking-tight">MigraCheck</h1>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto py-8 px-4">
        <Calendar onDayClick={handleDayClick} />
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
