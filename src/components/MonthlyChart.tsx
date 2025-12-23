import { useContext, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MigraineContext } from '../context/MigraineContext';
import { getMonthlyData } from '../utils/chartData';
import { format, addMonths, subMonths, isSameMonth } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const MonthlyChart = () => {
    const { state } = useContext(MigraineContext);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = new Date();
    const isCurrentOrFutureMonth = isSameMonth(currentMonth, today) || currentMonth > today;

    const monthlyData = getMonthlyData(state.entries, currentMonth);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    // Prepare data for intensity line chart
    const intensityData = monthlyData.map((point) => ({
        day: point.day,
        intensity: point.intensity,
        date: point.date,
    }));

    // Prepare data for medication bar chart
    const medicationData = monthlyData
        .filter((point) => point.medicationCount > 0)
        .map((point) => ({
            day: point.day,
            medication: point.medicationCount,
            date: point.date,
        }));

    const daysWithEntries = monthlyData.filter((point) => point.hasEntry).length;
    const averageIntensity = daysWithEntries > 0
        ? Math.round((monthlyData.reduce((sum, point) => sum + point.intensity, 0) / daysWithEntries) * 10) / 10
        : 0;
    const totalMedication = monthlyData.reduce((sum, point) => sum + point.medicationCount, 0);

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Monthly Statistics</h2>
                <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-1">
                    <button
                        onClick={prevMonth}
                        className="p-2 rounded-full hover:bg-white hover:shadow-sm text-gray-600 transition-all duration-200"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="px-4 text-sm font-medium text-gray-700 min-w-[120px] text-center">
                        {format(currentMonth, 'MMMM yyyy')}
                    </span>
                    <button
                        onClick={nextMonth}
                        disabled={isCurrentOrFutureMonth}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            isCurrentOrFutureMonth
                                ? 'text-gray-300 cursor-not-allowed opacity-50'
                                : 'hover:bg-white hover:shadow-sm text-gray-600'
                        }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
                    <div className="text-sm text-indigo-600 font-medium mb-1">Days with Migraines</div>
                    <div className="text-3xl font-bold text-indigo-700">{daysWithEntries}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                    <div className="text-sm text-purple-600 font-medium mb-1">Average Intensity</div>
                    <div className="text-3xl font-bold text-purple-700">{averageIntensity}</div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
                    <div className="text-sm text-pink-600 font-medium mb-1">Total Medication</div>
                    <div className="text-3xl font-bold text-pink-700">{totalMedication}</div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Intensity Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={intensityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="day" stroke="#6b7280" />
                            <YAxis domain={[0, 10]} stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="intensity"
                                stroke="#6366f1"
                                strokeWidth={2}
                                dot={{ fill: '#6366f1', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {medicationData.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Medication Usage</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={medicationData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="day" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Bar dataKey="medication" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

