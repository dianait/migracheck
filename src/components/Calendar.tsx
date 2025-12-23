import React, { useContext, useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { MigraineContext } from '../context/MigraineContext';
import { DayCell } from './DayCell';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
    onDayClick: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onDayClick }) => {
    const { state } = useContext(MigraineContext);
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 animate-[fadeIn_0.5s_ease-in-out]">
            <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-3xl font-bold text-gray-800 capitalize tracking-tight">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-1">
                    <button onClick={prevMonth} className="p-2 rounded-full hover:bg-white hover:shadow-sm text-gray-600 transition-all duration-200">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextMonth} className="p-2 rounded-full hover:bg-white hover:shadow-sm text-gray-600 transition-all duration-200">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-gray-400 text-xs uppercase tracking-widest">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-3">
                {days.map((day) => {
                    const formattedDate = format(day, 'yyyy-MM-dd');
                    const entry = state.entries[formattedDate];
                    const isCurrentMonth = isSameMonth(day, monthStart);

                    if (!isCurrentMonth) return <div key={formattedDate} className="h-24 opacity-0 pointer-events-none" />;

                    return (
                        <DayCell
                            key={formattedDate}
                            day={day.getDate()}
                            date={formattedDate}
                            entry={entry}
                            isToday={isToday(day)}
                            onClick={onDayClick}
                        />
                    );
                })}
            </div>
        </div>
    );
};
