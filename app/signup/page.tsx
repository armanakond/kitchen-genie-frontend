//signup page allows users to create an account with email and password
//supabase auth signUp and redirects to verify email page on success
//saves display_name to supabase user_metadata and redirects to verify email

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  //handles form submission, registers new user with supabase auth
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const displayName = (form.elements[0] as HTMLInputElement).value;
    const email = (form.elements[1] as HTMLInputElement).value;
    const password = (form.elements[2] as HTMLInputElement).value;
    const confirm = (form.elements[3] as HTMLInputElement).value;

    //client side password match validation
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    //signup with supabase, display_name stored in user_metadata
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    //redirect email verification page after successful signup
    router.push("/verify-email");
  };

  //handles google oauth signup, redirects to dashboard on success
  const handleGoogleSignup = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/tutorial`,
      },
    });
  };

  return (
    <main className="screen authScreen">

      {/*logo */}
      <header className="brand">
        <Image src="/images/logo.png" alt="Kitchen Genie logo" width={200} height={200} priority />
      </header>
      {/*Signup form */}
      <section className="authCard" aria-label="Create your account">
        <div className="authCardHeader">
          <h1 className="authTitle">CREATE ACCOUNT</h1>
          <p className="authSubtitle">Sign up to start your cooking journey.</p>
        </div>

        <form className="authForm" onSubmit={handleSubmit}>
          <input
            className="authInput"
            type="text"
            placeholder="Display name"
            required
          />
          <input
            className="authInput"
            type="email"
            placeholder="Email address"
            required
          />
          <input
            className="authInput"
            type="password"
            placeholder="Password"
            required
          />
          <input
            className="authInput"
            type="password"
            placeholder="Confirm password"
            required
          />
          <button className="authBtn" type="submit">
            SIGN UP
          </button>
        </form>

        {/*divider between email signup and google signup */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
          <span className="divider">OR</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/*google oauth signup button, will allow you to sign up with google */}
        <button
          onClick={handleGoogleSignup}
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

        {/*link to login page for users who already have an account */}
        <p className="authFooter">
          Already have an account?{" "}
          <Link className="authLink" href="/login">
            Login here
          </Link>
        </p>
      </section>
    </main>
  );
}