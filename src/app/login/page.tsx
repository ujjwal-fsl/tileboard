"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import GoogleIcon from "@/components/GoogleIcon";
import { 
  LayoutGrid, 
  CheckCircle2, 
  Focus, 
  Lock, 
  Mail, 
  ArrowLeft,
  Loader2
} from "lucide-react";

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const router = useRouter();
  
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      console.log("[Auth Diagnosis] Initiating Google sign-in via signInWithGoogle()...");
      const signedInUser = await signInWithGoogle();
      console.log("[Auth Diagnosis] Google sign-in succeeded:", {
        uid: signedInUser.uid,
        emailAvailable: !!signedInUser.email,
        isAnonymous: signedInUser.isAnonymous,
      });
      if (signedInUser) {
        router.push("/");
      }
    } catch (err: any) {
      const safeCustomData = err?.customData ? {
        appName: err.customData.appName,
      } : undefined;

      console.error("[Auth Diagnosis] Google sign-in failed:", {
        code: err?.code,
        message: err?.message,
        name: err?.name,
        customData: safeCustomData,
      });

      const errorCode = err?.code ? ` (${err.code})` : "";
      if (err?.code === "auth/popup-closed-by-user") {
        setError(`Sign-in was cancelled or the popup closed before completing${errorCode}.`);
      } else if (err?.code === "auth/popup-blocked") {
        setError(`Sign-in popup was blocked by your browser. Please allow popups for localhost${errorCode}.`);
      } else if (err?.code === "auth/unauthorized-domain") {
        setError(`Domain not authorized in Firebase Authentication${errorCode}. Please add localhost to Authorized Domains.`);
      } else {
        setError(`Failed to sign in with Google${errorCode}: ${err?.message || "Unknown error"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      console.error("[Auth Diagnosis] Email auth failed:", {
        code: err?.code,
        message: err?.message,
      });
      const errorCode = err?.code ? ` (${err.code})` : "";
      setError(err?.message ? `${err.message}${errorCode}` : "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#171B22] flex flex-col justify-between relative overflow-x-hidden selection:bg-amber-100 selection:text-stone-900">
      
      {/* ========================================================================= */}
      {/* 1. BACKGROUND: Floating Pastel Task Tiles (Physical Paper Desk Aesthetic)  */}
      {/* ========================================================================= */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      >
        {/* Soft center ambient wash keeping reading and interaction zones peaceful */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,rgba(248,245,239,0.92)_0%,rgba(248,245,239,0.65)_65%,transparent_100%)] z-0" />

        {/* --- TILE 1: Soft Coral (Top-Left, extending off edge) --- */}
        <div 
          className="absolute -top-10 -left-12 sm:-left-6 lg:left-4 xl:left-8 w-64 sm:w-76 h-38 sm:h-44 p-4 sm:p-5 rounded-2xl bg-[#FFE5D9] border border-[#F7C5B2]/70 shadow-[0_12px_28px_-6px_rgba(235,140,115,0.14),0_2px_8px_rgba(0,0,0,0.03)] -rotate-6 opacity-75 sm:opacity-90"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-[#A44326] uppercase">WORK</span>
            <div className="w-4 h-4 rounded-full border-2 border-[#A44326]/30" />
          </div>
          <p className="text-sm font-semibold text-[#3D2018]">Finish project draft</p>
          <p className="text-[11px] text-[#A44326]/80 mt-1">Due today · Priority 1</p>
        </div>

        {/* --- TILE 2: Cream / Butter (Top-Center, discreetly high up) --- */}
        <div 
          className="absolute -top-12 left-[44%] w-60 h-34 p-4 rounded-2xl bg-[#FFF9E6] border border-[#F5E2A8]/70 shadow-[0_8px_20px_-4px_rgba(220,180,80,0.1),0_2px_6px_rgba(0,0,0,0.02)] rotate-3 hidden xl:block opacity-85"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold tracking-wider text-[#8A6A12] uppercase">STUDY</span>
            <div className="w-3.5 h-3.5 rounded-full border-2 border-[#8A6A12]/30" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#382C0E]">Revise Physics Notes</p>
          <p className="text-[10px] text-[#8A6A12]/75 mt-0.5">Electromagnetism</p>
        </div>

        {/* --- TILE 3: Pale Mint Green (Top-Right, extending off edge) --- */}
        <div 
          className="absolute -top-12 -right-10 sm:-right-4 lg:right-6 xl:right-12 w-68 sm:w-80 h-38 sm:h-46 p-4 sm:p-5 rounded-2xl bg-[#E2F0D9] border border-[#C5E2B8]/80 shadow-[0_12px_28px_-6px_rgba(110,175,95,0.14),0_2px_8px_rgba(0,0,0,0.03)] rotate-6 opacity-75 sm:opacity-90"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-[#356B27] uppercase">HEALTH</span>
            <div className="w-4 h-4 rounded-full border-2 border-[#356B27]/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#356B27]/60" />
            </div>
          </div>
          <p className="text-sm font-semibold text-[#1C3614]">Walk 10,000 steps</p>
          <p className="text-[11px] text-[#356B27]/80 mt-1">Evening routine · Active</p>
        </div>

        {/* --- TILE 4: Warm Peach (Mid-Far-Right, framing auth card) --- */}
        <div 
          className="absolute top-[38%] -right-16 lg:-right-8 xl:right-2 w-64 sm:w-72 h-36 sm:h-42 p-4 sm:p-5 rounded-2xl bg-[#FCE1D4] border border-[#F4C1AA]/80 shadow-[0_12px_28px_-6px_rgba(215,120,80,0.14),0_2px_8px_rgba(0,0,0,0.03)] -rotate-6 hidden lg:block opacity-85"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-[#984725] uppercase">READING</span>
            <div className="w-4 h-4 rounded-full border-2 border-[#984725]/30" />
          </div>
          <p className="text-sm font-semibold text-[#3C190C]">Read Chapter 2</p>
          <p className="text-[11px] text-[#984725]/80 mt-1">The India Way</p>
        </div>

        {/* --- TILE 5: Soft Lavender (Bottom-Left) --- */}
        <div 
          className="absolute -bottom-10 -left-8 sm:left-4 lg:left-6 xl:left-10 w-64 sm:w-74 h-36 sm:h-44 p-4 sm:p-5 rounded-2xl bg-[#EAE4F2] border border-[#D5C6E2]/80 shadow-[0_12px_28px_-6px_rgba(140,110,175,0.14),0_2px_8px_rgba(0,0,0,0.03)] -rotate-5 opacity-75 sm:opacity-90"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-[#5D3682] uppercase">STUDY</span>
            <div className="w-4 h-4 rounded-full border-2 border-[#5D3682]/30" />
          </div>
          <p className="text-sm font-semibold text-[#2C1840]">Chemistry Notes</p>
          <p className="text-[11px] text-[#5D3682]/80 mt-1">Organic mechanisms</p>
        </div>

        {/* --- TILE 6: Pale Sage / Mint (Bottom-Right) --- */}
        <div 
          className="absolute -bottom-12 -right-8 sm:right-6 lg:right-10 xl:right-16 w-64 sm:w-74 h-36 sm:h-44 p-4 sm:p-5 rounded-2xl bg-[#DCF2E4] border border-[#BDE0CA]/80 shadow-[0_10px_24px_-5px_rgba(100,165,120,0.12),0_2px_8px_rgba(0,0,0,0.03)] rotate-5 opacity-75 sm:opacity-90"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-[#2B6842] uppercase">HABIT</span>
            <div className="w-4 h-4 rounded-full border-2 border-[#2B6842]/30" />
          </div>
          <p className="text-sm font-semibold text-[#143621]">Meditation 15m</p>
          <p className="text-[11px] text-[#2B6842]/80 mt-0.5">Mindfulness</p>
        </div>

        {/* --- TILE 7: Powder Blue (Bottom-Center, tucked low) --- */}
        <div 
          className="absolute -bottom-14 left-[40%] w-68 h-36 p-4 rounded-2xl bg-[#D9E8F5] border border-[#BBD7EE]/70 shadow-sm -rotate-2 hidden xl:block opacity-80"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold tracking-wider text-[#245480] uppercase">STUDY</span>
            <div className="w-3.5 h-3.5 rounded-full border-2 border-[#245480]/30" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#122A40]">Solve Biology 30 PYQs</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT: Two-Column Desktop / Focused Linear Mobile               */}
      {/* ========================================================================= */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12 lg:py-16 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT SECTION: Brand Identity & Spacious Editorial Introduction         */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* TileBoard Official Logo (sized prominently) */}
            <div className="relative mb-4 sm:mb-6">
              <Image
                src="/tileboard-logo-512.png"
                alt="TileBoard Logo"
                width={88}
                height={88}
                priority
                className="w-18 h-18 sm:w-22 sm:h-22 object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              />
            </div>

            {/* Wordmark: Bold, Modern, Clean Sans-Serif */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-sans font-bold tracking-tight text-[#171B22] leading-[1.08] mb-3 sm:mb-4">
              TileBoard
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-[#6F737B] font-normal leading-relaxed max-w-md mb-6 sm:mb-8">
              A calmer way to plan your day.
            </p>

            {/* Feature Highlights: Spacious, Understated Editorial Lines */}
            <div className="w-full max-w-md space-y-4 text-left hidden sm:block mb-4 lg:mb-0">
              <div className="flex items-start gap-3.5">
                <LayoutGrid className="w-4 h-4 text-[#171B22] mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-[#171B22]">Visual daily planner</h3>
                  <p className="text-xs text-[#6F737B] leading-normal mt-0.5">
                    Tactile 2D tiles instead of rigid, stressful lists.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-4 h-4 text-[#171B22] mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-[#171B22]">Stay organized</h3>
                  <p className="text-xs text-[#6F737B] leading-normal mt-0.5">
                    Unfinished tasks carry forward automatically so nothing is lost.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Focus className="w-4 h-4 text-[#171B22] mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-[#171B22]">Designed for focus</h3>
                  <p className="text-xs text-[#6F737B] leading-normal mt-0.5">
                    Calm, minimal visual architecture for quiet momentum.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Feature Subtitle (ultra-compact, clean) */}
            <div className="sm:hidden mb-2 text-xs text-[#6F737B] font-medium">
              <span>Visual planner · Stay organized · Designed for focus</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT SECTION: Premium Rounded Authentication Card                      */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="w-full max-w-[460px] bg-[#FFFDFA] border border-[#E8E2D9] rounded-[28px] p-7 sm:p-9 shadow-[0_24px_60px_-12px_rgba(23,27,34,0.08),0_2px_6px_rgba(23,27,34,0.03)] transition-all">
              
              {/* Card Header */}
              <div className="text-center mb-7">
                <div className="inline-flex items-center justify-center mb-3">
                  <Image
                    src="/tileboard-logo-512.png"
                    alt="TileBoard"
                    width={56}
                    height={56}
                    className="w-13 h-13 object-contain"
                  />
                </div>
                <h2 className="text-2xl sm:text-[1.7rem] font-bold text-[#171B22] tracking-tight">
                  Welcome to TileBoard
                </h2>
                <p className="text-sm text-[#6F737B] mt-1.5">
                  Plan your day. One tile at a time.
                </p>
              </div>

              {/* User-visible error alert banner */}
              {error && (
                <div 
                  role="alert"
                  className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center font-medium leading-relaxed"
                >
                  {error}
                </div>
              )}

              {/* Primary Action: Continue with Google */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full h-12 sm:h-13 px-5 rounded-2xl border border-[#E8E2D9] bg-white hover:bg-[#F8F5EF]/80 active:bg-[#F0EBE0] text-[#171B22] font-semibold text-sm flex items-center justify-center gap-3 transition-[background-color,transform,box-shadow] shadow-xs hover:shadow-sm active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
                  aria-label="Continue with Google"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#6F737B]" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <GoogleIcon className="w-5 h-5 shrink-0" />
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                {/* Subtle Divider */}
                <div className="relative my-5 flex items-center justify-center">
                  <span className="w-full border-t border-[#E8E2D9]" />
                  <span className="absolute bg-[#FFFDFA] px-3 text-[11px] uppercase tracking-wider text-[#8C9098] font-medium">
                    or
                  </span>
                </div>

                {/* Secondary Action: Email Authentication (Clean Reveal / Collapse) */}
                {!showEmailForm ? (
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(true)}
                    className="w-full h-11 px-4 rounded-xl border border-[#E8E2D9] bg-[#F8F5EF]/50 hover:bg-[#F8F5EF] text-[#4B505A] text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#6F737B]" />
                    <span>Continue with email</span>
                  </button>
                ) : (
                  <form onSubmit={handleEmailAuth} className="space-y-3.5 pt-1">
                    <div className="space-y-2.5">
                      <div>
                        <label 
                          htmlFor="email-input" 
                          className="block text-xs font-medium text-[#4B505A] mb-1"
                        >
                          Email address
                        </label>
                        <input
                          id="email-input"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full h-10 px-3.5 rounded-xl border border-[#E8E2D9] bg-white text-[#171B22] text-sm placeholder:text-[#A0A4AC] focus:outline-none focus:ring-2 focus:ring-[#171B22]/10 focus:border-[#171B22]/40 transition-all"
                        />
                      </div>

                      <div>
                        <label 
                          htmlFor="password-input" 
                          className="block text-xs font-medium text-[#4B505A] mb-1"
                        >
                          Password
                        </label>
                        <input
                          id="password-input"
                          type="password"
                          autoComplete={isSignUp ? "new-password" : "current-password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full h-10 px-3.5 rounded-xl border border-[#E8E2D9] bg-white text-[#171B22] text-sm placeholder:text-[#A0A4AC] focus:outline-none focus:ring-2 focus:ring-[#171B22]/10 focus:border-[#171B22]/40 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-11 rounded-xl bg-[#171B22] hover:bg-black active:scale-[0.99] text-white font-medium text-sm transition-all shadow-xs disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-stone-300" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>{isSignUp ? "Create account" : "Sign in with email"}</span>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs pt-1 px-0.5">
                      <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-[#4B505A] hover:text-[#171B22] font-medium underline underline-offset-4 cursor-pointer"
                      >
                        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowEmailForm(false);
                          setError("");
                        }}
                        className="text-[#8C9098] hover:text-[#171B22] flex items-center gap-1 cursor-pointer"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Privacy Reassurance Footnote */}
              <div className="mt-7 pt-5 border-t border-[#E8E2D9]/60 flex items-center justify-center gap-2 text-xs text-[#8C9098] font-normal">
                <Lock className="w-3.5 h-3.5 text-[#8C9098] shrink-0" />
                <span>Your data is private and secure</span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer Minimal Copyright/Brand Tag */}
      <footer className="relative z-10 py-4 text-center text-xs text-[#8C9098]">
        <p>© {new Date().getFullYear()} TileBoard. Designed for calm planning.</p>
      </footer>
    </div>
  );
}
