"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import veloceLogo from "@/app/assets/veloceLogo.png";
import { loginWebUser } from "@/app/api/auth";

export default function SignInPage() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await loginWebUser({ email, password });
      if (res.success) {
        router.push('/dashboard');
      } else {
        setErrorMsg(res.message || "Invalid credentials.");
      }
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      bgRef.current.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(184, 255, 0, 0.12) 0%, transparent 45%),
        radial-gradient(circle at 0% 0%, rgba(184, 255, 0, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 100% 100%, rgba(184, 255, 0, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(10, 10, 11, 1) 0%, rgba(0, 0, 0, 1) 100%)
      `;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-on-surface">
      {/* Atmospheric Background */}
      <div
        ref={bgRef}
        className="atmospheric-bg"
        style={{ background: 'radial-gradient(circle at 39.375% 98.6328%, rgba(184, 255, 0, 0.12) 0%, transparent 45%), radial-gradient(circle at 0% 0%, rgba(184, 255, 0, 0.08) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(184, 255, 0, 0.08) 0%, transparent 40%), radial-gradient(circle, rgb(10, 10, 11) 0%, rgb(0, 0, 0) 100%)' }}
      ></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-3">
          <img
            alt="VELOCE Logo"
            src={veloceLogo.src}
            className="w-40 sm:w-48 h-auto object-contain"
          />
        </div>
        <div className="flex items-center gap-6 text-on-surface-variant/60">
          <span className="material-symbols-outlined hover:text-secondary transition-colors cursor-pointer text-2xl">verified_user</span>
          <span className="material-symbols-outlined hover:text-secondary transition-colors cursor-pointer text-2xl">support</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-[480px] animate-in fade-in zoom-in-95 duration-1000">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-12">
            <h1 className="font-display text-2xl font-bold tracking-widest text-white/90 uppercase">System Authentication</h1>
            <div className="h-[1px] w-12 bg-secondary/30 mt-4"></div>
          </div>

            {/* Login Card */}
            <div className="premium-glass rounded-2xl p-10">
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}
              <form onSubmit={handleLogin} className="space-y-8">
                {/* Email Field */}
                <div className="space-y-3">
                  <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 ml-1" htmlFor="email">Uplink Identity</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/40">alternate_email</span>
                    <input 
                      className="input-premium w-full rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/30 text-sm tracking-wide" 
                      id="email" 
                      name="email" 
                      placeholder="ADMIN_CREDENTIALS" 
                      required 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 ml-1" htmlFor="password">Security Cipher</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/40">lock</span>
                    <input 
                      className="input-premium w-full rounded-xl py-4 pl-12 pr-12 text-on-surface placeholder:text-outline/30 text-sm tracking-wide" 
                      id="password" 
                      name="password" 
                      placeholder="••••••••••••" 
                      required 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-secondary transition-colors"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Action Section */}
                <div className="pt-4">
                  <button 
                    className="neon-glow-btn w-full bg-secondary text-on-secondary font-display font-bold text-sm tracking-[0.15em] py-5 rounded-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-on-secondary border-t-transparent rounded-full animate-spin"></span>
                        AUTHENTICATING...
                      </>
                    ) : (
                      "INITIALIZE SESSION"
                    )}
                  </button>
                </div>
              </form>

            <div className="mt-10 flex flex-col items-center gap-6">
              <a className="text-xs text-on-surface-variant/50 hover:text-secondary transition-colors tracking-widest uppercase" href="#">Reset Credentials</a>
              <div className="w-full flex items-center gap-4">
                <div className="h-[0.5px] flex-grow bg-white/5"></div>
                <span className="text-[10px] text-on-surface-variant/30 uppercase tracking-[0.3em]">Secure Zone</span>
                <div className="h-[0.5px] flex-grow bg-white/5"></div>
              </div>
              <p className="text-[11px] text-on-surface-variant/60 text-center leading-relaxed">
                Access strictly restricted to authorized personnel.<br />
                <a className="text-secondary/80 hover:text-secondary underline decoration-secondary/30 underline-offset-4 ml-1" href="#">Request Encrypted Access</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/[0.03] bg-background/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50">
            © 2026 VELOCE • A Product by Blue 9 Technologies
          </span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <a className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50 hover:text-secondary transition-colors" href="#">Privacy</a>
          <a className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50 hover:text-secondary transition-colors" href="#">Terms</a>
          <a className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50 hover:text-secondary transition-colors" href="#">Security Protocol</a>
        </nav>
      </footer>
    </div>
  );
}
