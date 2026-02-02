export const metadata = {
  title: 'Privacy Policy - PayCheck USA',
  description: 'Privacy Policy for PayCheck USA. We prioritize user privacy and do not store personal financial data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
          <p><strong>Last Updated: January 2026</strong></p>

          <p>
            At PayCheck USA, accessible from paycheckusa.com, one of our main priorities is the privacy of our visitors. 
            This Privacy Policy document contains types of information that is collected and recorded by PayCheck USA and how we use it.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">1. No Personal Data Storage</h3>
          <p>
            We are a client-side calculator. When you enter your salary, hourly wage, or location into our tools, 
            <strong>that data stays on your device</strong>. We do not transmit, store, or save your financial inputs on our servers. 
            Once you close the browser tab, your calculation data is gone.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">2. Cookies and Web Beacons</h3>
          <p>
            Like any other website, PayCheck USA uses "cookies". These cookies are used to store information including visitors' 
            preferences (like Dark Mode settings) and the pages on the website that the visitor accessed or visited. 
            The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">3. Google DoubleClick DART Cookie</h3>
          <p>
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors 
            based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of 
            DART cookies by visiting the Google ad and content network Privacy Policy.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">4. Consent</h3>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </div>

      </div>
    </main>
  );
}