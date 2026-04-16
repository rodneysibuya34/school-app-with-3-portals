import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 font-['Outfit']">Privacy Policy</h1>
        <div className="prose prose-invert prose-amber">
          <p className="text-slate-300 mb-4">Last updated: April 2026</p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">1. Introduction</h2>
          <p className="text-slate-400">
            Geleza Mzansi (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">2. Information We Collect</h2>
          <p className="text-slate-400">
            We collect personal information including but not limited to: name, email address, 
            school affiliation, grade level, and academic data when you register and use our platform.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">3. About the Creator</h2>
          <p className="text-slate-400">
            Geleza Mzansi was created and developed by Rodney Thando Sibuyi. 
            The application is dedicated to improving educational outcomes for South African students.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">3. How We Use Your Information</h2>
          <p className="text-slate-400">
            Your information is used to: provide educational services, manage user accounts, 
            communicate updates, process subscriptions, and improve our platform.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">4. Data Protection</h2>
          <p className="text-slate-400">
            We implement appropriate technical and organizational measures to protect your personal data 
            against unauthorized access, alteration, disclosure, or destruction.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">5. Information Sharing</h2>
          <p className="text-slate-400">
            We do not sell your personal information. We may share information with schools 
            (as data controllers) and service providers who assist in operating our platform.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">6. User Rights</h2>
          <p className="text-slate-400">
            Under South African POPIA regulations, you have the right to access, correct, 
            or delete your personal information. Contact us to exercise these rights.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">7. Cookies</h2>
          <p className="text-slate-400">
            We use cookies to enhance your experience. You can control cookies through 
            your browser settings.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">8. Changes to Policy</h2>
          <p className="text-slate-400">
            We may update this Privacy Policy periodically. We will notify you of any 
            material changes by posting the new policy on this page.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-6 mb-3">9. Contact Us</h2>
          <p className="text-slate-400">
            For privacy concerns, contact us at privacy@gelezamzansi.co.za
          </p>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-amber-500 hover:text-amber-400">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}