import { useState, useContext, Suspense, lazy } from 'react';
import { Calendar } from './components/Calendar';
import { EntryModal } from './components/EntryModal';
import { MigraineContext } from './context/MigraineContext';
import { type MigraineEntry } from './types/migraine';
import { Calendar as CalendarIcon, BarChart3, TrendingUp } from 'lucide-react';

// Lazy load chart components for code splitting
const MonthlyChart = lazy(() => import('./components/MonthlyChart').then(module => ({ default: module.MonthlyChart })));
const YearlyChart = lazy(() => import('./components/YearlyChart').then(module => ({ default: module.YearlyChart })));

type ViewType = 'calendar' | 'monthly' | 'yearly';

const ChartLoader = () => (
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex items-center justify-center min-h-[400px]">
    <div className="text-gray-500">Loading chart...</div>
  </div>
);

export default function App() {
  const { state, dispatch } = useContext(MigraineContext);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('calendar');

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

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <Calendar onDayClick={handleDayClick} />;
      case 'monthly':
        return (
          <Suspense fallback={<ChartLoader />}>
            <MonthlyChart />
          </Suspense>
        );
      case 'yearly':
        return (
          <Suspense fallback={<ChartLoader />}>
            <YearlyChart />
          </Suspense>
        );
      default:
        return <Calendar onDayClick={handleDayClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-10 backdrop-blur-md bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
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
          
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setCurrentView('calendar')}
              className={`px-4 py-2 flex items-center gap-2 font-medium text-sm transition-colors border-b-2 ${
                currentView === 'calendar'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              Calendar
            </button>
            <button
              onClick={() => setCurrentView('monthly')}
              className={`px-4 py-2 flex items-center gap-2 font-medium text-sm transition-colors border-b-2 ${
                currentView === 'monthly'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Monthly
            </button>
            <button
              onClick={() => setCurrentView('yearly')}
              className={`px-4 py-2 flex items-center gap-2 font-medium text-sm transition-colors border-b-2 ${
                currentView === 'yearly'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Yearly
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto py-8 px-4">
        {renderView()}
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
