import React, { useContext, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MigraineContext } from '../context/MigraineContext';
import { getYearlyData } from '../utils/chartData';
import { format, startOfYear, addYears, subYears, isSameYear } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const YearlyChart: React.FC = () => {
    const { state } = useContext(MigraineContext);
    const [currentYear, setCurrentYear] = useState(new Date());
    const today = new Date();
    const isCurrentOrFutureYear = isSameYear(currentYear, today) || currentYear > today;

    const yearlyData = getYearlyData(state.entries, currentYear);

    const nextYear = () => setCurrentYear(addYears(currentYear, 1));
    const prevYear = () => setCurrentYear(subYears(currentYear, 1));

    const totalDaysWithMigraines = yearlyData.reduce((sum, month) => sum + month.daysWithMigraines, 0);
    const averageMonthlyIntensity = yearlyData.length > 0
        ? Math.round((yearlyData.reduce((sum, month) => sum + month.averageIntensity, 0) / yearlyData.length) * 10) / 10
        : 0;
    const totalMedication = yearlyData.reduce((sum, month) => sum + month.totalMedication, 0);

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Yearly Statistics</h2>
                <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-1">
                    <button
                        onClick={prevYear}
                        className="p-2 rounded-full hover:bg-white hover:shadow-sm text-gray-600 transition-all duration-200"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="px-4 text-sm font-medium text-gray-700 min-w-[80px] text-center">
                        {format(currentYear, 'yyyy')}
                    </span>
                    <button
                        onClick={nextYear}
                        disabled={isCurrentOrFutureYear}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            isCurrentOrFutureYear
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
                    <div className="text-sm text-indigo-600 font-medium mb-1">Total Days</div>
                    <div className="text-3xl font-bold text-indigo-700">{totalDaysWithMigraines}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                    <div className="text-sm text-purple-600 font-medium mb-1">Avg Monthly Intensity</div>
                    <div className="text-3xl font-bold text-purple-700">{averageMonthlyIntensity}</div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
                    <div className="text-sm text-pink-600 font-medium mb-1">Total Medication</div>
                    <div className="text-3xl font-bold text-pink-700">{totalMedication}</div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Days with Migraines per Month</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={yearlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                }}
                            />
                            <Legend />
                            <Bar dataKey="daysWithMigraines" fill="#6366f1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Average Intensity per Month</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={yearlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#6b7280" />
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
                                dataKey="averageIntensity"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                dot={{ fill: '#8b5cf6', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

