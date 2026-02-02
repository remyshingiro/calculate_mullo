export const runtime = 'edge';
import { stateTaxData, commonWages } from '../../../../data/stateTaxData';
import { notFound } from 'next/navigation';
import ShareButton from '../../../../components/ShareButton';
import PrintButton from '../../../../components/PrintButton';

export async function generateMetadata({ params, searchParams }) {
  const { state, amount } = await params;
  const { hours = '40', overtime = '0' } = await searchParams;
  const stateInfo = stateTaxData[state];
  if (!stateInfo) return { title: 'Calculator Not Found' };
  const totalHours = parseFloat(hours) + parseFloat(overtime);
  return {
    title: `$${amount}/hr Paycheck Calculator - ${stateInfo.name} (${totalHours} hrs)`,
    description: `Calculate take home pay for $${amount}/hr in ${stateInfo.name}. Updated for 2026 tax tables.`,
  };
}

export async function generateStaticParams() {
  const states = Object.keys(stateTaxData);
  const wages = commonWages; 
  const params = [];
  states.forEach((state) => {
    wages.forEach((amount) => { params.push({ state, amount }); });
  });
  return params;
}

export default async function SalaryPage({ params, searchParams }) {
  const { state, amount } = await params;
  const resolvedSearchParams = await searchParams;
  
  const hours = resolvedSearchParams?.hours || '40';
  const overtime = resolvedSearchParams?.overtime || '0';
  const deductions = resolvedSearchParams?.deductions || '0';
  const status = resolvedSearchParams?.status || 'single';
  const stateInfo = stateTaxData[state];

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
  const federalRate = isMarried ? 0.08 : 0.12; 
  const effectiveStateRate = isMarried ? (stateInfo.taxRate * 0.85) : stateInfo.taxRate; 
  const federalTax = taxableIncome * federalRate;
  const stateTax = taxableIncome * effectiveStateRate;
  const ficaTax = grossYearly * 0.0765;
  const totalTax = federalTax + stateTax + ficaTax;
  const netYearly = grossYearly - totalTax - annualDeductions;
  const totalDeductionsAndTax = totalTax + annualDeductions;
  const taxPercent = (totalDeductionsAndTax / grossYearly) * 100;
  const keepPercent = Math.max(0, 100 - taxPercent);
  const netMonthly = netYearly / 12;
  const netBiWeekly = netYearly / 26;
  const netWeekly = netYearly / 52;

  // SEO Text Data
  const effectiveHourly = (netWeekly / (regularHours + overtimeHours)).toFixed(2);
  const stateName = stateInfo.name;

  // --- FAQ SCHEMA ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": `How much is $${amount} an hour annually in ${stateName}?`, "acceptedAnswer": { "@type": "Answer", "text": `If you make $${amount} per hour in ${stateName}, your yearly salary would be roughly $${grossYearly.toLocaleString()} before taxes.` } },
      { "@type": "Question", "name": `What is the monthly take-home pay for $${amount}/hr in ${stateName}?`, "acceptedAnswer": { "@type": "Answer", "text": `After Federal and State taxes, your estimated monthly take-home pay is $${Math.floor(netMonthly).toLocaleString()}.` } },
      { "@type": "Question", "name": `What is the income tax rate in ${stateName}?`, "acceptedAnswer": { "@type": "Answer", "text": stateInfo.taxRate === 0 ? `${stateName} has a 0% state income tax rate on wages.` : `The estimated effective state tax rate in ${stateName} is approximately ${(stateInfo.taxRate * 100).toFixed(2)}%.` } }
    ]
  };
  
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 md:py-10 px-3 md:px-8 font-sans text-slate-900 dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-6xl mx-auto">
        
        {/* AD SLOT 1: TOP BANNER */}
        <div className="ad-space w-full h-24 bg-slate-200 dark:bg-slate-800 rounded-xl mb-8 flex items-center justify-center border border-slate-300 dark:border-slate-700 border-dashed">
            <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">Ad Space (Top Banner)</span>
        </div>

        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-3">
                <a href="/" className="edit-inputs-link inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Edit
                </a>
                <div className="share-btn"><ShareButton /></div>
                <div className="share-btn"><PrintButton /></div>
            </div>
            <div className="tags-wrapper flex flex-wrap gap-2">
                {overtimeHours > 0 && <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-green-600 bg-green-50 dark:bg-green-900/40 px-2 py-1 md:px-3 rounded-full border border-green-100 dark:border-green-800">{overtimeHours}hrs OT</span>}
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-1 md:px-3 rounded-full border border-indigo-100 dark:border-indigo-800">{isMarried ? 'Married' : 'Single'}</span>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* RESULT CARD */}
            <div className="result-card bg-slate-900 dark:bg-black/40 rounded-2xl md:rounded-3xl p-5 md:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
                <div className="blur-effect absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-indigo-500 rounded-full blur-[60px] md:blur-[80px] opacity-30 -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-8">
                    <div className="text-center md:text-left w-full">
                        <p className="text-slate-400 font-medium text-[10px] md:text-sm uppercase tracking-widest mb-1 md:mb-2">Estimated Net Salary</p>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 md:mb-0">${netYearly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h1>
                        <p className="text-slate-400 text-xs md:text-base">Working <span className="text-white font-bold">{regularHours + overtimeHours} hrs</span> (w/ {overtimeHours} OT)</p>
                    </div>
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                        <div className="w-full h-full rounded-full shadow-lg" style={{ background: `conic-gradient(#22c55e ${keepPercent}%, #ef4444 0)` }}></div>
                        <div className="absolute inset-2 bg-slate-900 dark:bg-black rounded-full flex flex-col items-center justify-center">
                            <span className="text-[10px] text-slate-400 uppercase">Keep</span>
                            <span className="text-sm md:text-xl font-bold text-green-400">{Math.round(keepPercent)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* BREAKDOWN TABLE */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700"><h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">Paycheck Breakdown</h3></div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-full">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 text-[10px] md:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                <th className="py-3 px-3 md:py-4 md:px-6">Period</th><th className="py-3 px-3 md:py-4 md:px-6 text-right">Gross</th><th className="py-3 px-3 md:py-4 md:px-6 text-right text-red-500">Tax/Ben</th><th className="py-3 px-3 md:py-4 md:px-6 text-right text-indigo-600 dark:text-indigo-400">Net</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-200 divide-y divide-slate-100 dark:divide-slate-700">
                            <tr><td className="py-3 px-3 md:py-4 md:px-6 whitespace-nowrap">Weekly</td><td className="py-3 px-3 md:py-4 md:px-6 text-right">${Math.floor(grossWeekly).toLocaleString()}</td><td className="py-3 px-3 md:py-4 md:px-6 text-right text-red-500">-${Math.floor((totalTax + annualDeductions) / 52).toLocaleString()}</td><td className="py-3 px-3 md:py-4 md:px-6 text-right font-bold text-slate-900 dark:text-white">${Math.floor(netWeekly).toLocaleString()}</td></tr>
                            <tr className="bg-indigo-50/50 dark:bg-indigo-900/10"><td className="py-3 px-3 md:py-4 md:px-6 text-indigo-900 dark:text-indigo-300 font-bold whitespace-nowrap">Bi-Weekly</td><td className="py-3 px-3 md:py-4 md:px-6 text-right text-indigo-900 dark:text-indigo-300">${Math.floor(grossWeekly * 2).toLocaleString()}</td><td className="py-3 px-3 md:py-4 md:px-6 text-right text-red-500">-${Math.floor((totalTax + annualDeductions) / 26).toLocaleString()}</td><td className="py-3 px-3 md:py-4 md:px-6 text-right font-bold text-indigo-700 dark:text-indigo-300">${Math.floor(netBiWeekly).toLocaleString()}</td></tr>
                            <tr><td className="py-3 px-3 md:py-4 md:px-6 whitespace-nowrap">Monthly</td><td className="py-3 px-3 md:py-4 md:px-6 text-right">${Math.floor(grossMonthly).toLocaleString()}</td><td className="py-3 px-3 md:py-4 md:px-6 text-right text-red-500">-${Math.floor((totalTax + annualDeductions) / 12).toLocaleString()}</td><td className="py-3 px-3 md:py-4 md:px-6 text-right font-bold text-slate-900 dark:text-white">${Math.floor(netMonthly).toLocaleString()}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* AD SLOT 2: IN-CONTENT */}
            <div className="ad-space w-full h-32 bg-slate-100 dark:bg-slate-800/50 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 border-dashed"><span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Ad Space (In-Content)</span></div>

            {/* SEO TEXT SECTION */}
            <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
               <h2 className="text-xl font-bold mb-4">How much is ${hourlyRate} an hour in {stateName}?</h2>
               <p>If you earn <strong>${hourlyRate} per hour</strong> in {stateName}, your annual salary before taxes is <strong>${grossYearly.toLocaleString()}</strong> (based on {regularHours} hours/week). However, your actual "take-home" pay will be approximately <strong>${netYearly.toLocaleString()}</strong> per year.</p>
               <p>This means that for every hour you work, you actually keep about <strong>${effectiveHourly}</strong> after Federal, State, and FICA taxes. {stateInfo.taxRate === 0 ? ` Living in ${stateName} is beneficial because there is currently NO state income tax on wages.` : ` Be aware that ${stateName} charges a state income tax of roughly ${(stateInfo.taxRate * 100).toFixed(2)}%.`}</p>
            </div>

            {/* VISIBLE FAQ SECTION */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700"><h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">How much is ${hourlyRate} an hour annually?</h4><p className="text-sm text-slate-600 dark:text-slate-300">If you work a standard 40-hour week, making ${hourlyRate} an hour is equivalent to <strong>${grossYearly.toLocaleString()} per year</strong>.</p></div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700"><h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">What is the monthly take-home pay?</h4><p className="text-sm text-slate-600 dark:text-slate-300">In {stateName}, your estimated net monthly pay is <strong>${Math.floor(netMonthly).toLocaleString()}</strong> after all tax deductions.</p></div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700"><h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Does {stateName} have income tax?</h4><p className="text-sm text-slate-600 dark:text-slate-300">{stateInfo.taxRate === 0 ? `No, ${stateName} is one of the few states with 0% state income tax.` : `Yes, ${stateName} has a state income tax rate of approximately ${(stateInfo.taxRate * 100).toFixed(2)}%.`}</p></div>
            </div>
          </div>

          <div className="sidebar space-y-6">
            <div className="bg-white dark:bg-slate-800 p-5 md:p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
               <h4 className="text-slate-900 dark:text-white text-base md:text-lg font-bold mb-4">Deductions</h4>
               <div className="space-y-3 text-xs md:text-sm">
                   <div className="flex justify-between items-center text-slate-600 dark:text-slate-400"><span>Federal Tax</span><span className="font-medium text-red-500">-${federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                   <div className="flex justify-between items-center text-slate-600 dark:text-slate-400"><span>State Tax ({stateInfo.code})</span><span className="font-medium text-red-500">-${stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                   <div className="flex justify-between items-center text-slate-600 dark:text-slate-400"><span>FICA Tax</span><span className="font-medium text-red-500">-${ficaTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                   {annualDeductions > 0 && (<div className="flex justify-between items-center text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg mt-2"><span>Benefits</span><span className="font-bold">-${annualDeductions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>)}
                   <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
                   <div className="flex justify-between font-bold text-sm md:text-lg"><span className="text-slate-900 dark:text-white">Total Out</span><span className="text-red-600">-${(totalTax + annualDeductions).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
               </div>
            </div>
            {/* AD SLOT 3: SIDEBAR (Sticky) */}
            <div className="ad-space sticky top-24 w-full h-[600px] bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-300 dark:border-slate-700 border-dashed"><span className="text-slate-400 font-bold text-sm uppercase tracking-widest transform -rotate-90">Ad Space (Vertical)</span></div>
          </div>
        </div>
      </div>
    </main>
  );
}