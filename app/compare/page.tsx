"use client";

import { useState } from 'react';
// FIX: Added one extra '../' to reach the root data folder from /app/compare/
// @ts-expect-error - ignoring type check
import { stateTaxData } from '../../data/stateTaxData';

export default function ComparePage() {
  const [amount, setAmount] = useState('50000'); // Annual Salary
  const [stateA, setStateA] = useState('california');
  const [stateB, setStateB] = useState('texas');

  // Math Helper
  const calculateNet = (salary: number, stateKey: string) => {
    // Safety check: ensure the state exists in your data object
    const stateInfo = stateTaxData[stateKey];
    if (!stateInfo) return 0;

    const federalTax = salary * 0.12; // Simplified logic for demo
    const ficaTax = salary * 0.0765;
    const stateTax = salary * (stateInfo.taxRate || 0);
    return salary - federalTax - ficaTax - stateTax;
  };

  // Ensure 'amount' is a valid number to prevent "NaN" errors
  const salaryNum = parseFloat(amount) || 0;
  const netA = calculateNet(salaryNum, stateA);
  const netB = calculateNet(salaryNum, stateB);
  const difference = netB - netA;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-slate-900 dark:text-white mb-8">
          State vs. State <span className="text-indigo-600">Payoff</span>
        </h1>

        {/* INPUTS */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8">
          <div className="grid md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">Annual Salary</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border rounded-xl text-lg font-bold bg-slate-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">Moving From</label>
              <select 
                value={stateA} 
                onChange={(e) => setStateA(e.target.value)}
                className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
              >
                {/* @ts-expect-error - ignoring types */}
                {Object.keys(stateTaxData).map(k => <option key={k} value={k}>{stateTaxData[k].name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">Moving To</label>
              <select 
                value={stateB} 
                onChange={(e) => setStateB(e.target.value)}
                className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
              >
                 {/* @ts-expect-error - ignoring types */}
                {Object.keys(stateTaxData).map(k => <option key={k} value={k}>{stateTaxData[k].name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* RESULTS SPLIT */}
        <div className="grid md:grid-cols-2 gap-4">
          
          {/* STATE A */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-500 mb-2">{stateTaxData[stateA]?.name}</h2>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              ${Math.floor(netA).toLocaleString()}
            </div>
            <p className="text-sm text-slate-400">Net Pay / Year</p>
          </div>

          {/* STATE B */}
          <div className={`bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 ${difference > 0 ? 'border-green-500' : 'border-red-500'}`}>
            <h2 className="text-xl font-bold text-slate-500 mb-2">{stateTaxData[stateB]?.name}</h2>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              ${Math.floor(netB).toLocaleString()}
            </div>
            <p className={`font-bold ${difference >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {difference > 0 ? '+' : ''}{Math.floor(difference).toLocaleString()} difference
            </p>
          </div>

        </div>

        {/* SUMMARY */}
        <div className="mt-8 text-center p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300">
              Moving to {stateTaxData[stateB]?.name} is {difference >= 0 ? 'Profitable!' : 'Costly!'}
            </h3>
            <p className="text-indigo-700 dark:text-indigo-400 mt-2">
              You would {difference >= 0 ? 'keep' : 'lose'} an extra <strong>${Math.abs(Math.floor(difference)).toLocaleString()}</strong> per year in taxes.
            </p>
        </div>

      </div>
    </main>
  );
}