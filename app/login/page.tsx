"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  // ✅ EMAIL LOGIN
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements[0] as HTMLInputElement).value;
    const password = (form.elements[1] as HTMLInputElement).value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.session) {
      router.replace("/dashboard");
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // 🔥 FIX: handle OAuth/session return (THIS WAS MISSING)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        router.replace("/dashboard"); // or "/tutorial"
      }
    };

    checkSession();
  }, [router]);

  return (
    <main className="screen authScreen">
      {/* logo */}
      <header className="brand">
        <Image
          src="/images/logo.png"
          alt="Kitchen Genie logo"
          width={200}
          height={200}
          priority
        />
      </header>

      {/* login form */}
      <section className="authCard" aria-label="Log into your account">
        <div className="authCardHeader">
          <h1 className="authTitle">WELCOME BACK</h1>
          <p className="authSubtitle">Welcome back. Please enter your details.</p>
        </div>

        <form className="authForm" onSubmit={handleSubmit}>
          <input
            className="authInput"
            type="email"
            placeholder="Email address"
            required
          />

          <div className="authPasswordGroup">
            <input
              className="authInput"
              type="password"
              placeholder="Password"
              required
            />

            <Link className="authForgot" href="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <button className="authBtn" type="submit">
            LOGIN
          </button>
        </form>

        {/* divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
          <span className="divider">OR</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/* google login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            fontWeight: 900,
            letterSpacing: "1px",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <img src="/images/icons/google.png" width={20} height={20} alt="Google" />
          CONTINUE WITH GOOGLE
        </button>

        <p className="authFooter">
          Don't have an account?{" "}
          <Link className="authLink" href="/signup">
            Sign up here
          </Link>
        </p>
      </section>
    </main>
  );
}