import Link from 'next/link';

export const metadata = {
  title: 'About PayCheck USA - Our Mission',
  description: 'Learn about PayCheck USA, the free tool helping American workers calculate their true take-home pay with updated 2026 tax data.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Financial Clarity for <br/>
            <span className="text-indigo-600 dark:text-indigo-400">Every Worker</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            We believe you shouldn't need an accounting degree to understand your paycheck. 
            PayCheck USA is a free, privacy-focused tool built to help you negotiate better salaries.
          </p>
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700 space-y-12">
          
          {/* Mission */}
          <section>
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Job offers can be deceptive. A "$30/hour" job sounds great, but after federal tax, state tax, and FICA, the reality is different. 
              Our mission is to show you the <strong>Net Pay</strong>—the actual money that hits your bank account—so you can budget accurately and make informed career decisions.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* Why Trust Us */}
          <section>
             <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.748 3.748 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why Trust Our Data?</h2>
            <ul className="space-y-4 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Updated for 2026:</strong> We monitor IRS and State tax brackets to ensure our data reflects the latest tax year changes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>State-Specific Logic:</strong> We don't just use a flat rate. Our calculator accounts for specific state income tax variations (like California's progressive system vs. Texas's zero income tax).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Privacy First:</strong> We do not store your salary data. All calculations happen instantly on your device.</span>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Have a question or suggestion?</h3>
            <p className="text-slate-500 mb-6">We are constantly improving our tool based on user feedback.</p>
            <Link 
              href="/contact" 
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}