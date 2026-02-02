"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// @ts-expect-error - ignoring type check for simplicity
import { stateTaxData } from '../data/stateTaxData';

export default function Home() {
  const router = useRouter();
  
  // Toggle State: 'hourly' or 'annual'
  const [inputType, setInputType] = useState('hourly'); 
  
  const [amount, setAmount] = useState('25');
  const [selectedState, setSelectedState] = useState('texas'); // Default
  const [hours, setHours] = useState('40');
  const [overtime, setOvertime] = useState('0');
  const [deductions, setDeductions] = useState('0');
  const [status, setStatus] = useState('single');
  const [isDetecting, setIsDetecting] = useState(true); // Loading state for location

  // --- AUTO-DETECT LOCATION (NEW) ---
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // 1. Fetch user data from free IP API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data && data.region) {
          const userRegion = data.region; // e.g., "California" or "New York"
          
          // 2. Find the matching key in our stateTaxData
          // We look for a state name that matches the API region
          const matchingKey = Object.keys(stateTaxData).find((key) => 
            stateTaxData[key].name.toLowerCase() === userRegion.toLowerCase()
          );

          // 3. Update the state if found
          if (matchingKey) {
            setSelectedState(matchingKey);
          }
        }
      } catch (error) {
        console.log("Auto-detect failed, using default.");
      } finally {
        setIsDetecting(false);
      }
    };

    detectLocation();
  }, []);

  const handleCalculate = () => {
    let finalHourlyRate = amount;

    // THE SMART CONVERSION LOGIC
    if (inputType === 'annual') {
      const annualSalary = parseFloat(amount);
      const weeklyHours = parseFloat(hours);
      if (annualSalary > 0 && weeklyHours > 0) {
        // Formula: Salary / 52 Weeks / Hours Per Week
        finalHourlyRate = (annualSalary / 52 / weeklyHours).toFixed(2);
      }
    }

    // Navigate to the existing result page
    router.push(`/salary/${selectedState}/${finalHourlyRate}?hours=${hours}&overtime=${overtime}&deductions=${deductions}&status=${status}`);
  };

  return (
    <main className="min-h-screen font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/50 text-slate-900 dark:text-white pb-20">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1000px] h-[500px] bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-normal"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800">
            Professional Grade • 2026 Data
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            PayCheck <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">Calculator</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed hidden md:block">
            Calculate your true take-home pay. Convert Salary to Hourly, check overtime rates, and see real net pay.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-white/5 ring-1 ring-black/5 dark:ring-white/10 max-w-3xl mx-auto">
          
          {/* TOGGLE SWITCH */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl inline-flex relative">
              <div 
                className={`absolute top-1.5 bottom-1.5 w-[50%] bg-white dark:bg-slate-700 rounded-lg shadow-sm transition-all duration-300 ease-in-out ${inputType === 'hourly' ? 'left-1.5' : 'left-[calc(50%-6px)] translate-x-1.5'}`}
              ></div>
              <button 
                onClick={() => { setInputType('hourly'); setAmount('25'); }}
                className={`relative z-10 px-6 py-2 text-sm font-bold rounded-lg transition-colors ${inputType === 'hourly' ? 'text-indigo-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              >
                Hourly Wage
              </button>
              <button 
                onClick={() => { setInputType('annual'); setAmount('55000'); }}
                className={`relative z-10 px-6 py-2 text-sm font-bold rounded-lg transition-colors ${inputType === 'annual' ? 'text-indigo-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              >
                Annual Salary
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            
            {/* Input 1: Amount */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                    <label className="block text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                      {inputType === 'hourly' ? 'Hourly Rate' : 'Annual Salary'}
                    </label>
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">$</span>
                        <input 
                          type="number" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 md:py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xl font-bold text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 transition-all outline-none"
                          placeholder={inputType === 'hourly' ? "25.00" : "65000"}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 flex justify-between">
                       <span>Location</span>
                       {/* Subtle Location Badge */}
                       {isDetecting ? (
                         <span className="text-indigo-500 animate-pulse">Locating...</span>
                       ) : (
                         <span className="text-green-500">✓ Auto-detected</span>
                       )}
                    </label>
                    <select 
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full px-4 py-3 md:py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-lg font-semibold text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 transition-all outline-none cursor-pointer"
                    >
                        {/* @ts-expect-error - ignoring js keys */}
                        {Object.keys(stateTaxData).map((key: string) => (
                        <option key={key} value={key}>{stateTaxData[key].name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Row 2: Hours */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Regular Hours/Week</label>
              <input 
                type="number" 
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-lg font-bold text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mb-2">Overtime Hrs/Week</label>
              <input 
                type="number" 
                value={overtime}
                onChange={(e) => setOvertime(e.target.value)}
                className="w-full px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-800 rounded-xl text-lg font-bold text-indigo-700 dark:text-indigo-300 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            {/* Row 3: Deductions & Status */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Monthly Benefits ($)</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                    type="number" 
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 md:py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-lg font-semibold text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 transition-all outline-none"
                    placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Filing Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 md:py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-lg font-semibold text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 transition-all outline-none cursor-pointer"
              >
                <option value="single">Single Filer</option>
                <option value="married">Married (Joint)</option>
              </select>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleCalculate}
              className="md:col-span-2 w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white font-bold py-4 md:py-5 rounded-xl text-lg md:text-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98] mt-2"
            >
              {inputType === 'hourly' ? 'Calculate Net Pay →' : 'Convert to Hourly & Calculate →'}
            </button>
          </div>
        </div>
        
        {/* Quick Links Footer */}
        <div className="mt-16 text-center">
            <Link href="/states" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                View all 50 State Tables
            </Link>
        </div>

      </div>
    </main>
  );
}