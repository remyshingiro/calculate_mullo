export const metadata = {
  title: 'Terms of Service - PayCheck USA',
  description: 'Terms and Conditions for using PayCheck USA salary calculators.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-8">
          Terms of Service
        </h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
          <p><strong>Last Updated: January 2026</strong></p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">1. Acceptance of Terms</h3>
          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use PayCheck USA 
            if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">2. Disclaimer (Not Financial Advice)</h3>
          <p>
            The content provided on PayCheck USA is for <strong>informational and educational purposes only</strong>. 
            While we strive to keep our tax data updated for the 2026 tax year, tax laws change frequently and vary by complex personal circumstances.
          </p>
          <p>
            This tool does not constitute professional financial, legal, or tax advice. You should consult with a certified 
            accountant (CPA) or tax professional before making any financial decisions. We are not liable for any losses 
            or damages in connection with the use of our website.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">3. License</h3>
          <p>
            Unless otherwise stated, PayCheck USA and/or its licensors own the intellectual property rights for all material on PayCheck USA. 
            All intellectual property rights are reserved. You may access this from PayCheck USA for your own personal use subjected to restrictions set in these terms and conditions.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">4. Modifications</h3>
          <p>
            We reserve the right to revise these terms of service for our website at any time without notice. By using this website 
            you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </div>

      </div>
    </main>
  );
}