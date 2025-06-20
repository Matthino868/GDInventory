import { data } from '@/lib/data';
import { getStatusColor } from '@/lib/utils';
import { daysUntilReorder } from '@/lib/utils';

export default function ListPage() {
  return (
    <section className="bg-white rounded-xl shadow p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">📋 Volledige Bestellijst</h2>
      <ul className="space-y-6 max-h-[600px] overflow-auto pr-2">
        {data
          .sort((a, b) => {
            const daysLeftA = daysUntilReorder(
              a.stockLeft,
              a.itemsSoldPerDay,
              a.deliveryTimeInDays
            );
            const daysLeftB = daysUntilReorder(
              b.stockLeft,
              b.itemsSoldPerDay,
              b.deliveryTimeInDays
            );
            return daysLeftA - daysLeftB;
          })
          .map((item, idx) => {
            const daysLeft = daysUntilReorder(
              item.stockLeft,
              item.itemsSoldPerDay,
              item.deliveryTimeInDays
            );
            // Calculate how much stock is left compared to daily sales
            // For progress bar: show stockLeft / (itemsSoldPerDay * X) where X is a max days we choose, say 30 days
            const maxDays = 30;
            const stockDuration = item.stockLeft / item.itemsSoldPerDay;
            const progressPercent = Math.min(
              (stockDuration / maxDays) * 100,
              100
            );

            return (
              <li
                key={idx}
                className="p-4 rounded-md border border-gray-200 hover:shadow transition bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-lg text-white ${getStatusColor(
                      daysLeft
                    )}`}
                  >
                    Dagen tot bestellen: {daysLeft}
                  </span>
                </div>

                <div className="text-xs text-gray-600 mb-2 space-y-0.5">
                  <div>Voorraad: {item.stockLeft}</div>
                  <div>Verkocht per dag: {item.itemsSoldPerDay}</div>
                  <div>Levertijd: {item.deliveryTimeInDays} dagen</div>
                  <div>Voorraad houdt nog {stockDuration.toFixed(1)} dagen stand</div>
                </div>

                <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full ${getStatusColor(daysLeft)}`}
                    style={{ width: `${progressPercent}%` }}
                    title={`${stockDuration.toFixed(1)} dagen voorraad`}
                  />
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
