export const runtime = 'edge';

import { stateTaxData, commonWages } from '../../../../data/stateTaxData';
import { notFound } from 'next/navigation';
import ShareButton from '../../../../components/ShareButton';
import PrintButton from '../../../../components/PrintButton';

// FIX: In JavaScript files, we do not use 'as any'. 
// The parser expects standard JS syntax.
const taxData = stateTaxData;

export async function generateMetadata({ params, searchParams }) {
  const { state, amount } = await params;
  const resolvedSearchParams = await searchParams;
  
  const hours = resolvedSearchParams?.hours || '40';
  const overtime = resolvedSearchParams?.overtime || '0';
  
  const stateInfo = taxData[state];
  if (!stateInfo) return { title: 'Calculator Not Found' };
  
  const totalHours = parseFloat(hours) + parseFloat(overtime);
  return {
    title: `$${amount}/hr Paycheck Calculator - ${stateInfo.name} (${totalHours} hrs)`,
    description: `Calculate take home pay for $${amount}/hr in ${stateInfo.name}. Updated for 2026 tax tables.`,
  };
}

export default async function SalaryPage({ params, searchParams }) {
  const { state, amount } = await params;
  const resolvedSearchParams = await searchParams;
  
  const hours = resolvedSearchParams?.hours || '40';
  const overtime = resolvedSearchParams?.overtime || '0';
  const deductions = resolvedSearchParams?.deductions || '0';
  const status = resolvedSearchParams?.status || 'single';
  const stateInfo = taxData[state];

  if (!stateInfo) return notFound();

  // --- MATH ENGINE ---
  const hourlyRate = parseFloat(amount);
  const regularHours = parseFloat(hours);
  const overtimeHours = parseFloat(overtime);
  const monthlyDeductions = parseFloat(deductions);
  const regularWeeklyPay = hourlyRate * regularHours;
  const overtimeWeeklyPay = hourlyRate * 1.5 * overtimeHours;
  const grossWeekly = regularWeeklyPay + overtimeWeeklyPay;
  const grossYearly = grossWeekly * 52;
  const grossMonthly = grossYearly / 12;
  const annualDeductions = monthlyDeductions * 12;
  const taxableIncome = Math.max(0, grossYearly - annualDeductions); 
  const isMarried = status === 'married';
  
  // USA Tax Logic for 2026
  const federalRate = isMarried ? 0.08 : 0.12; 
  const effectiveStateRate = isMarried ? (stateInfo.taxRate * 0.85) : stateInfo.taxRate; 
  const federalTax = taxableIncome * federalRate;
  const stateTax = taxableIncome * effectiveStateRate;
  const ficaTax = grossYearly * 0.0765;
  const totalTax = federalTax + stateTax + ficaTax;
  
  const netYearly = grossYearly - totalTax - annualDeductions;
  const totalDeductionsAndTax = totalTax + annualDeductions;
  const taxPercent = grossYearly > 0 ? (totalDeductionsAndTax / grossYearly) * 100 : 0;
  const keepPercent = Math.max(0, 100 - taxPercent);
  const netMonthly = netYearly / 12;
  const netBiWeekly = netYearly / 26;
  const netWeekly = netYearly / 52;

  const effectiveHourly = (netWeekly / (regularHours + overtimeHours)).toFixed(2);
  const stateName = stateInfo.name;

  // --- FAQ SCHEMA ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": `How much is $${amount} an hour annually in ${stateName}?`, "acceptedAnswer": { "@type": "Answer", "text": `If you make $${amount} per hour in ${stateName}, your yearly salary would be roughly $${grossYearly.toLocaleString()} before taxes.` } },
      { "@type": "Question", "name": `What is the monthly take-home pay for $${amount}/hr in ${stateName}?`, "acceptedAnswer": { "@type": "Answer", "text": `After Federal and State taxes, your estimated monthly take-home pay is $${Math.floor(netMonthly).toLocaleString()}.` } }
    ]
  };
  
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 md:py-10 px-3 md:px-8 font-sans text-slate-900 dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-3">
                <a href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Edit Inputs
                </a>
                <ShareButton />
                <PrintButton />
            </div>
            <div className="flex gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">{isMarried ? 'Married' : 'Single'}</span>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <p className="text-slate-400 font-medium text-sm uppercase tracking-widest mb-2">Estimated Net Salary</p>
                        <h1 className="text-5xl md:text-6xl font-bold">${netYearly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h1>
                        <p className="text-slate-400 text-xs md:text-base">Working <span className="text-white font-bold">{regularHours + overtimeHours} hrs</span></p>
                    </div>
                    <div className="relative w-32 h-32">
                        <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(#22c55e ${keepPercent}%, #ef4444 0)` }}></div>
                        <div className="absolute inset-2 bg-slate-900 rounded-full flex flex-col items-center justify-center">
                            <span className="text-xl font-bold text-green-400">{Math.round(keepPercent)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 font-bold">Paycheck Breakdown</div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase text-slate-500">
                            <th className="py-4 px-6">Period</th><th className="py-4 px-6 text-right">Gross</th><th className="py-4 px-6 text-right text-red-500">Tax</th><th className="py-4 px-6 text-right text-indigo-600">Net</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        <tr><td className="py-4 px-6">Weekly</td><td className="py-4 px-6 text-right">${Math.floor(grossWeekly).toLocaleString()}</td><td className="py-4 px-6 text-right text-red-500">-${Math.floor(totalTax / 52).toLocaleString()}</td><td className="py-4 px-6 text-right font-bold">${Math.floor(netWeekly).toLocaleString()}</td></tr>
                        <tr className="bg-indigo-50/30"><td className="py-4 px-6 font-bold">Monthly</td><td className="py-4 px-6 text-right">${Math.floor(grossMonthly).toLocaleString()}</td><td className="py-4 px-6 text-right text-red-500">-${Math.floor(totalTax / 12).toLocaleString()}</td><td className="py-4 px-6 text-right font-bold">${Math.floor(netMonthly).toLocaleString()}</td></tr>
                        <tr><td className="py-4 px-6">Annually</td><td className="py-4 px-6 text-right">${Math.floor(grossYearly).toLocaleString()}</td><td className="py-4 px-6 text-right text-red-500">-${Math.floor(totalTax).toLocaleString()}</td><td className="py-4 px-6 text-right font-bold">${Math.floor(netYearly).toLocaleString()}</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
                <h2 className="text-xl font-bold mb-4">How much is ${hourlyRate} an hour in {stateName}?</h2>
                <p>If you earn <strong>${hourlyRate} per hour</strong> in {stateName}, your annual salary is <strong>${grossYearly.toLocaleString()}</strong>. Your actual take-home pay will be approximately <strong>${netYearly.toLocaleString()}</strong> per year after all taxes.</p>
            </div>
          </div>

          <div className="sidebar space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
                <h4 className="text-lg font-bold mb-4">Deductions Breakdown</h4>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span>Federal Tax</span><span className="text-red-500">-${federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                    <div className="flex justify-between"><span>State Tax ({stateInfo.code})</span><span className="text-red-500">-${stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                    <div className="flex justify-between"><span>FICA Tax</span><span className="text-red-500">-${ficaTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
                    <div className="flex justify-between font-bold text-lg"><span>Total Tax</span><span className="text-red-600">-${totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}