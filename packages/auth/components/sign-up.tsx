"use client";

import { useState } from "react";
import { useSignUp, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// ─── helpers ────────────────────────────────────────────────────────────────

const Label = ({ children }: { children: React.ReactNode }) => (
  <label
    className="mb-2 block text-left text-[10px] uppercase tracking-[3px] text-cyan/40"
    style={{ fontFamily: "'Share Tech Mono', monospace" }}
  >
    {children}
  </label>
);

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled
}: {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) => (
  <input
    className="w-full border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm text-white/80 outline-none transition-all duration-200 placeholder:text-white/15 hover:border-white/[0.12] focus:border-cyan/40 focus:bg-white/[0.04] focus:shadow-[0_0_0_1px_rgba(0,255,255,0.08),inset_0_0_20px_rgba(0,255,255,0.02)] disabled:opacity-50"
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "12px" }}
    type={type}
    value={value}
    disabled={disabled}
  />
);

// ─── logo mark ──────────────────────────────────────────────────────────────

const LogoMark = ({ title = "ESTABLISH IDENTITY" }: { title?: string }) => (
  <div className="flex w-full flex-col items-center gap-3">
    <div className="relative">
      <h1
        className="text-2xl uppercase tracking-[6px] text-cyan"
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          textShadow: "0 0 24px rgba(0,255,255,0.35)",
        }}
      >
        FRAME
        <em
          className="not-italic"
          style={{
            color: "#f43f8e",
            textShadow: "0 0 16px rgba(244,63,142,0.35)",
          }}
        >
          //
        </em>
        NOIR
      </h1>
    </div>
    <p
      className="text-[10px] uppercase tracking-[4px] text-white/20"
      style={{ fontFamily: "'Share Tech Mono', monospace" }}
    >
      {title}
    </p>
    <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
  </div>
);

// ─── divider ────────────────────────────────────────────────────────────────

const OrDivider = () => (
  <div className="flex w-full items-center gap-3">
    <div className="h-px flex-1 bg-white/[0.06]" />
    <span
      className="text-[10px] uppercase tracking-[3px] text-white/15"
      style={{ fontFamily: "'Share Tech Mono', monospace" }}
    >
      or
    </span>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

// ─── main form ──────────────────────────────────────────────────────────────

export const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !email || !password) return;
    
    setLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setLoading(false);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "An error occurred during registration.");
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !code) return;
    
    setLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      } else {
        console.log(completeSignUp);
        setError("Verification requires further steps.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid verification token.");
      setLoading(false);
    }
  };

  const signUpWithGoogle = () => {
    return signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  if (pendingVerification) {
    return (
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <LogoMark title="VERIFY IDENTITY" />

        <p className="text-[10px] tracking-widest text-[#f43f8e] uppercase">
          {"// ENTER SECURE TOKEN SENT TO YOUR INBOX"}
        </p>

        <form onSubmit={handleVerify} className="flex w-full flex-col gap-4 text-left">
          <div>
            <Label>Security Token [OTP]</Label>
            <input
              className="w-full border border-cyan/20 bg-cyan/[0.02] px-4 py-4 text-center text-lg text-white/80 outline-none transition-all duration-200 placeholder:text-white/15 hover:border-cyan/40 focus:border-cyan focus:bg-cyan/[0.05] focus:shadow-[0_0_0_1px_rgba(0,255,255,0.08),inset_0_0_20px_rgba(0,255,255,0.02)] tracking-[10px] disabled:opacity-50"
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              type="text"
              value={code}
              disabled={!isLoaded || loading}
            />
          </div>

          {error && (
            <div className="border border-[#f43f8e]/40 bg-[#f43f8e]/10 p-3 text-center text-[10px] uppercase tracking-widest text-[#f43f8e]">
              [ERR] {error}
            </div>
          )}

          <button
            className="relative mt-2 w-full overflow-hidden border border-cyan/30 bg-cyan/[0.06] px-4 py-3 text-cyan transition-all duration-200 hover:border-cyan/50 hover:bg-cyan/[0.1] hover:shadow-[0_0_24px_rgba(0,255,255,0.08)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isLoaded || loading || !code}
            type="submit"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "11px",
              letterSpacing: "3px",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-1 w-1 animate-bounce rounded-full bg-cyan" style={{ animationDelay: "0ms" }} />
                <span className="h-1 w-1 animate-bounce rounded-full bg-cyan" style={{ animationDelay: "150ms" }} />
                <span className="h-1 w-1 animate-bounce rounded-full bg-cyan" style={{ animationDelay: "300ms" }} />
              </span>
            ) : (
              "CONFIRM ACCESS →"
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <LogoMark />

      {/* OAuth button */}
      <button
        onClick={signUpWithGoogle}
        className="flex w-full items-center justify-center gap-3 border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white/50 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.04] hover:text-white/70 active:scale-[0.99]"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "11px",
          letterSpacing: "2px",
        }}
        type="button"
      >
        <svg fill="currentColor" height="16" opacity="0.6" viewBox="0 0 24 24" width="16">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        continue with google
      </button>

      <OrDivider />

      {/* Form */}
      <form onSubmit={handleSignUp} className="flex w-full flex-col gap-4 text-left">
        <div>
          <Label>email address</Label>
          <Input
            onChange={setEmail}
            placeholder="user@domain.com"
            type="email"
            value={email}
            disabled={!isLoaded || loading}
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>password</Label>
          </div>
          <Input
            onChange={setPassword}
            placeholder="••••••••••••"
            type="password"
            value={password}
            disabled={!isLoaded || loading}
          />
        </div>

        {error && (
          <div className="border border-[#f43f8e]/40 bg-[#f43f8e]/10 p-3 text-center text-[10px] uppercase tracking-widest text-[#f43f8e]">
            [ERR] {error}
          </div>
        )}

        {/* Submit */}
        <button
          className="relative mt-2 w-full overflow-hidden border border-cyan/30 bg-cyan/[0.06] px-4 py-3 text-cyan transition-all duration-200 hover:border-cyan/50 hover:bg-cyan/[0.1] hover:shadow-[0_0_24px_rgba(0,255,255,0.08)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!isLoaded || loading || !email || !password}
          type="submit"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px",
            letterSpacing: "3px",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-1 w-1 animate-bounce rounded-full bg-cyan" style={{ animationDelay: "0ms" }} />
              <span className="h-1 w-1 animate-bounce rounded-full bg-cyan" style={{ animationDelay: "150ms" }} />
              <span className="h-1 w-1 animate-bounce rounded-full bg-cyan" style={{ animationDelay: "300ms" }} />
            </span>
          ) : (
            "CREATE PROFILE →"
          )}
        </button>
      </form>

      {/* Sign in link */}
      <p
        className="text-[10px] uppercase tracking-[2px] text-white/15"
        style={{ fontFamily: "'Share Tech Mono', monospace" }}
      >
        ALREADY IN THE NETWORK?{" "}
        <a
          className="text-cyan/40 underline decoration-cyan/20 underline-offset-4 transition-colors hover:text-cyan/70"
          href="/sign-in"
        >
          AUTH NODE
        </a>
      </p>
    </div>
  );
};
