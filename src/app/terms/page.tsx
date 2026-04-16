import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 font-['Outfit']">Terms & Conditions</h1>
        <div className="prose prose-invert prose-amber">
          <p className="text-slate-300 mb-4">Last updated: April 2026</p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">1. Acceptance of Terms</h2>
          <p className="text-slate-400">
            By accessing and using Geleza Mzansi, you agree to be bound by these Terms & Conditions. 
            If you do not agree to these terms, please do not use this platform.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">2. Use of Services</h2>
          <p className="text-slate-400">
            Geleza Mzansi provides educational management services for schools, teachers, and students. 
            You agree to use these services only for lawful educational purposes.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">3. User Accounts</h2>
          <p className="text-slate-400">
            Users are responsible for maintaining the confidentiality of their login credentials. 
            Any activity under your account is your responsibility.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">4. Privacy & Data</h2>
          <p className="text-slate-400">
            We collect and process personal data in accordance with our Privacy Policy. 
            By using Geleza Mzansi, you consent to such processing.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">5. Subscription & Payments</h2>
          <p className="text-slate-400">
            Schools subscribing to Geleza Mzansi agree to the terms of their subscription plan. 
            Payment terms and conditions apply as per the subscription agreement.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">6. Intellectual Property</h2>
          <p className="text-slate-400">
            All content, features, and functionality of Geleza Mzansi are owned by Rodney Thando Sibuyi 
            and are protected by South African and international copyright laws.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">7. Limitation of Liability</h2>
          <p className="text-slate-400">
            Geleza Mzansi is provided &quot;as is&quot; without warranties of any kind. We shall not be liable 
            for any indirect, incidental, or consequential damages.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">8. Contact</h2>
          <p className="text-slate-400">
            For questions about these Terms & Conditions, please contact us at support@gelezamzansi.co.za
          </p>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-amber-500 hover:text-amber-400">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}