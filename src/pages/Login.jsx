const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, Loader2, Zap, UserCheck, ShieldCheck } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInstantDemoLogin = () => {
    const demoProfile = {
      name: "Alex Morgan",
      email: "demo@unilang.app",
      native_language: "en",
      target_languages: ["es", "ja", "fr", "te", "hi"],
      interests: ["culture", "travel", "food", "business"],
      level: "intermediate",
      xp_points: 450,
      streak_count: 7,
      onboarding_complete: true,
      isDemoUser: true
    };
    localStorage.setItem("unilang_profile", JSON.stringify(demoProfile));
    window.location.href = "/home";
  };

  const handleFillDemo = () => {
    setEmail("demo@unilang.app");
    setPassword("demo1234");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // If demo account credentials are submitted, log in directly without external blockers
    if (email.trim().toLowerCase() === "demo@unilang.app") {
      handleInstantDemoLogin();
      return;
    }

    try {
      await db.auth.loginViaEmailPassword(email, password);
      window.location.href = "/home";
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    db.auth.loginWithProvider("google", "/home");
  };

  return (
    <AuthLayout
      icon={LogIn}
      title="Welcome back"
      subtitle="Log in to your account"
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Create one
          </Link>
          <span className="mx-2">•</span>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Entry Page
          </Link>
        </>
      }
    >
      <Button
        variant="outline"
        className="w-full h-12 text-sm font-medium mb-6"
        onClick={handleGoogle}
      >
        <GoogleIcon className="w-5 h-5 mr-2" />
        Continue with Google
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">or email</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      {/* Demo Account Box at the bottom */}
      <div className="mt-6 pt-5 border-t border-border">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Demo Login Details
              </span>
            </div>
            <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Instant Access
            </span>
          </div>

          <div className="bg-background/80 rounded-xl p-3 text-xs space-y-1.5 border border-white/5 font-mono">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Demo ID:</span>
              <span className="font-semibold text-foreground select-all">demo@unilang.app</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Password:</span>
              <span className="font-semibold text-foreground select-all">demo1234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">User:</span>
              <span className="text-primary font-semibold">Alex Morgan (7d Streak • 450 XP)</span>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              onClick={handleInstantDemoLogin}
              className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white font-semibold h-11 rounded-xl text-xs shadow-lg shadow-primary/20 transition-all hover:scale-[1.01]"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              1-Click Demo Login
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleFillDemo}
              className="border-white/10 text-xs h-11 px-3 hover:bg-white/5 rounded-xl"
            >
              <UserCheck className="w-3.5 h-3.5 mr-1" />
              Auto-fill
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
