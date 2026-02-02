import Link from 'next/link';
// Ensure path reaches root data folder
import { stateTaxData } from '../../data/stateTaxData';

export const metadata = {
  title: 'Salary Calculator by US State - 2026 Tax Rates',
  description: 'Select your state to calculate accurate take-home pay with updated 2026 tax tables.',
};

export default function StatesDirectory() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Browse by State
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Select your location to see specific salary breakdowns, tax rates, and take-home pay calculations for 2026.
          </p>
        </div>

        {/* The Grid of States */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(stateTaxData).map((key) => {
            // FIX: Explicitly cast data to prevent indexing errors during build
            const state = (stateTaxData as any)[key];
            
            return (
              <Link 
                key={key} 
                href={`/salary/${key}/25`} 
                className="group bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* State Letter Circle */}
                  <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-sm">
                    {state.code}
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                    {state.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </main>
  );
}