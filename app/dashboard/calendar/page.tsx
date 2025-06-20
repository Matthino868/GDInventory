'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { data } from '@/lib/data';
import { getStatusColor } from '@/lib/utils';
import { daysUntilReorder } from '@/lib/utils';

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const today = new Date();

    // Compute selected items based on reorder date matching selectedDate
    const selectedItems = selectedDate
        ? data.filter((item) => {
            const daysLeft = daysUntilReorder(item.stockLeft, item.itemsSoldPerDay, item.deliveryTimeInDays);
            const reorderDate = new Date(today);
            reorderDate.setDate(today.getDate() + daysLeft);

            return (
                reorderDate.getDate() === selectedDate.getDate() &&
                reorderDate.getMonth() === selectedDate.getMonth() &&
                reorderDate.getFullYear() === selectedDate.getFullYear()
            );
        })
        : [];

    return (
        <div className="bg-white rounded-xl shadow p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-6">📅 Kalender</h2>
            <Calendar
                onClickDay={setSelectedDate}
                tileContent={({ date }) => {
                    const itemsForDate = data.filter((item) => {
                        const daysLeft = daysUntilReorder(item.stockLeft, item.itemsSoldPerDay, item.deliveryTimeInDays);
                        const reorderDate = new Date(today);
                        reorderDate.setDate(today.getDate() + daysLeft);

                        return (
                            reorderDate.getDate() === date.getDate() &&
                            reorderDate.getMonth() === date.getMonth() &&
                            reorderDate.getFullYear() === date.getFullYear()
                        );
                    });

                    return itemsForDate.length > 0 ? (
                        <div className="flex justify-center mt-1">
                            <div
                                className={`h-2.5 w-2.5 rounded-full ${getStatusColor(
                                    daysUntilReorder(
                                        itemsForDate[0].stockLeft,
                                        itemsForDate[0].itemsSoldPerDay,
                                        itemsForDate[0].deliveryTimeInDays
                                    )
                                )}`}
                            />
                        </div>
                    ) : null;
                }}
            />

            {selectedDate && (
                <section className="mt-6 border border-gray-200 rounded-md p-4">
                    <h3 className="font-semibold mb-2">
                        📌 Bestellingen op{' '}
                        {selectedDate.toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </h3>
                    {selectedItems.length === 0 ? (
                        <p className="text-gray-600">Geen bestellingen voor deze datum.</p>
                    ) : (
                        <ul className="space-y-2 max-h-48 overflow-auto">
                            {selectedItems.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="border border-gray-300 rounded p-2 hover:shadow transition"
                                >
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-gray-600">
                                        Dagen tot bestellen: {daysUntilReorder(
                                            item.stockLeft,
                                            item.itemsSoldPerDay,
                                            item.deliveryTimeInDays
                                        )}
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">
                                        Voorraad: {item.stockLeft} | Verkocht per dag: {item.itemsSoldPerDay} | Levertijd: {item.deliveryTimeInDays} dagen
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button
                        onClick={() => setSelectedDate(null)}
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    >
                        Sluit
                    </button>
                </section>
            )}
        </div>
    );
}
