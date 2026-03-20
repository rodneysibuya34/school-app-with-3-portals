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
    gradient: "from-[#1E3A5F] to-[#2E5A8F]",
    borderColor: "#3B82F6",
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
    gradient: "from-[#7C3AED] to-[#A855F7]",
    borderColor: "#A855F7",
  },
  {
    id: "parent",
    title: "Parent Portal",
    description: "Monitor your child's progress, attendance, and communicate with teachers",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: "from-[#059669] to-[#10B981]",
    borderColor: "#10B981",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-white font-['Outfit']">EduHub</span>
        </div>
        <span className="text-slate-400 text-sm">Spring Semester 2026</span>
      </header>

      <main className="relative z-10 px-8 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 font-['Outfit']">
            Welcome to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">EduHub</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select your portal to access personalized academic information and resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {portals.map((portal) => (
            <Link
              key={portal.id}
              href={`/${portal.id}`}
              className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${portal.borderColor}20, ${portal.borderColor}40)` }}
                >
                  <div style={{ color: portal.borderColor }}>{portal.icon}</div>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-3 font-['Outfit']">{portal.title}</h2>
                <p className="text-slate-400 leading-relaxed">{portal.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transparent group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, ${portal.borderColor}, transparent)` }} />
            </Link>
          ))}
        </div>
      </main>

      <footer className="relative z-10 px-8 py-6 text-center text-slate-500 text-sm">
        <p>Oakridge Preparatory Academy • Established 1985</p>
      </footer>
    </div>
  );
}
