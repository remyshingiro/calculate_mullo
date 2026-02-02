"use client";

import { useState } from 'react';
import { stateTaxData } from '../../data/stateTaxData';

export default function ComparePage() {
  const [amount, setAmount] = useState('50000'); 
  const [stateA, setStateA] = useState('california');
  const [stateB, setStateB] = useState('texas');

  const calculateNet = (salary: number, stateKey: string) => {
    // FIX: Explicitly cast to prevent TypeScript indexing errors in production
    const stateInfo = (stateTaxData as any)[stateKey];
    
    if (!stateInfo) return 0;

    const federalTax = salary * 0.12; 
    const ficaTax = salary * 0.0765;
    const stateTax = salary * (stateInfo.taxRate || 0);
    return salary - federalTax - ficaTax - stateTax;
  };

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
                {Object.keys(stateTaxData).map(k => (
                  <option key={k} value={k}>{(stateTaxData as any)[k].name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">Moving To</label>
              <select 
                value={stateB} 
                onChange={(e) => setStateB(e.target.value)}
                className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
              >
                {Object.keys(stateTaxData).map(k => (
                  <option key={k} value={k}>{(stateTaxData as any)[k].name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-500 mb-2">{(stateTaxData as any)[stateA]?.name}</h2>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              ${Math.floor(netA).toLocaleString()}
            </div>
            <p className="text-sm text-slate-400">Net Pay / Year</p>
          </div>

          <div className={`bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 ${difference > 0 ? 'border-green-500' : 'border-red-500'}`}>
            <h2 className="text-xl font-bold text-slate-500 mb-2">{(stateTaxData as any)[stateB]?.name}</h2>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              ${Math.floor(netB).toLocaleString()}
            </div>
            <p className={`font-bold ${difference >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {difference > 0 ? '+' : ''}{Math.floor(difference).toLocaleString()} difference
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}