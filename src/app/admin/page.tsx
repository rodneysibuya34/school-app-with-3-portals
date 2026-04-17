"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

const ADMIN_PASSWORD = "Admin.manager@2026!Geleza";

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1C1917] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 p-8 rounded-2xl bg-[#1E293B] shadow-2xl border border-slate-200 w-full max-w-md">
          <div className="text-center mb-8">
            <Logo size={64} />
            <h1 className="text-2xl font-bold text-slate-800 font-['Outfit']">Geleza Mzansi Admin</h1>
            <p className="text-slate-500 mt-2">Enter admin password to continue</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Admin Password"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-cyan-500 focus:outline-none"
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button onClick={handleLogin} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1C1917] flex flex-col">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700">
              Logout
            </button>
          </div>

          <div className="bg-[#1E293B]/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-4">Database Configuration Required</h2>
            <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <p className="text-orange-300 font-medium">Redis Database Not Configured</p>
                  <p className="text-orange-200 text-sm">
                    To enable multi-device functionality, you need to configure Upstash Redis.
                    Schools, teachers, and students created here won't persist across devices until Redis is set up.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Setup Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Go to <a href="https://upstash.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">upstash.com</a> and create a free account</li>
                <li>Click "Create Database" and choose the free tier</li>
                <li>Copy the <code className="bg-slate-800 px-2 py-1 rounded text-sm">UPSTASH_REDIS_REST_URL</code> and <code className="bg-slate-800 px-2 py-1 rounded text-sm">UPSTASH_REDIS_REST_TOKEN</code></li>
                <li>In your Vercel project settings, add these as Environment Variables</li>
                <li>Redeploy your app</li>
              </ol>
            </div>

            <div className="mt-8 p-4 bg-slate-800/50 rounded-xl">
              <p className="text-slate-400 text-sm">
                <strong>Current Status:</strong> Data is stored locally in your browser. Other users on different devices won't see the schools/teachers/students you create until Redis is configured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}