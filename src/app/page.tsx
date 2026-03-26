import Link from "next/link";

const portals = [
  {
    id: "student",
    title: "Student Portal",
    description: "Access your courses, grades, assignments, and academic progress",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: "from-[#F59E0B] to-[#FBBF24]",
    borderColor: "#F59E0B",
    loginHref: "/login",
  },
  {
    id: "teacher",
    title: "Teacher Portal",
    description: "Manage classes, grade assignments, and communicate with students",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: "from-[#EF4444] to-[#F97316]",
    borderColor: "#EF4444",
    loginHref: "/login",
  },
  {
    id: "admin",
    title: "Admin Portal",
    description: "Manage schools, teachers, students, and platform subscriptions",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: "from-[#06B6D4] to-[#3B82F6]",
    borderColor: "#06B6D4",
    loginHref: "/admin",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-200/20 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-cyan-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-slate-800 font-['Outfit']">Geleza Mzansi</span>
        </div>
      </header>

      <main className="relative z-10 px-8 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-4 font-['Outfit']">
            Welcome to <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 bg-clip-text text-transparent">Geleza Mzansi</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Select your portal to access personalized academic information and resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {portals.map((portal) => (
            <Link
              key={portal.id}
              href={portal.loginHref}
              className="group relative p-8 rounded-2xl bg-white shadow-lg border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${portal.borderColor}20, ${portal.borderColor}40)` }}
                >
                  <div style={{ color: portal.borderColor }}>{portal.icon}</div>
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-3 font-['Outfit']">{portal.title}</h2>
                <p className="text-slate-500 leading-relaxed">{portal.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-sm font-medium" style={{ color: portal.borderColor }}>
                    Click to Login →
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transparent group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, ${portal.borderColor}, transparent)` }} />
            </Link>
          ))}
        </div>
      </main>

      <footer className="relative z-10 px-8 py-6 text-center text-slate-400 text-sm">
        <div className="flex justify-center gap-6 mb-2">
          <a href="/terms" className="hover:text-slate-600 transition-colors">Terms & Conditions</a>
          <a href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
        </div>
        <p>Enzokuhle Holdings - Established 2026</p>
      </footer>
    </div>
  );
}