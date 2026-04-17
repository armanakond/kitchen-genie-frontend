//app/login/page.tsx
//login page allows users to sign in with email and password
//supabase auth signInWithPassword and redirects to dashboard on success

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  //handles form submission 
  //authenticates user with supabase and redirects to dashboard on success
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements[0] as HTMLInputElement).value;
    const password = (form.elements[1] as HTMLInputElement).value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
      return;
    }
    //redirect to dashboard on successful login
    router.push("/dashboard");
  };

  //handles google oauth login, redirects to dashboard on success
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <main className="screen authScreen">
      {/*logo */}
      <header className="brand">
        <Image src="/images/logo.png" alt="Kitchen Genie logo" width={200} height={200} priority />
      </header>
      {/*Login form */}
      <section className="authCard" aria-label="Log into your account">
        <div className="authCardHeader">
          <h1 className="authTitle">WELCOME BACK</h1>
          <p className="authSubtitle">Welcome back. Please enter your details.</p>
        </div>
        {/*Form with email and password fields, submit button, and forgot password link */}
        <form className="authForm" onSubmit={handleSubmit}>
          <input
            className="authInput"
            type="email"
            placeholder="Email address"
            required
          />
          {/* Password field and forgot password link */}
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

        {/*divider between email login and google login */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
          <span className="divider">OR</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/*google oauth login button, this will allow you to login with google */}
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
            transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
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