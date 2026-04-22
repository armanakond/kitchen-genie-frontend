//app/forgot-password/page.tsx
//forgot password page, lets users request password reset email
//uses supabase auth resetPasswordForEmail with a redirect url to /reset-password

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  //state for email input and whether reset link has been sent
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  //handle form submission to request password reset email
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      alert(error.message);
      return;
    }

    setSent(true);
  };

  return (
    <main className="screen authScreen">
      {/*logo */}
      <header className="brand">
        <Image src="/images/logo.png" alt="Kitchen Genie logo" width={200} height={200} priority />
      </header>
      {/*Forgot password form or confirmation message */}
      <section className="authCard">
        <div className="authCardHeader">
          <h1 className="authTitle">FORGOT PASSWORD</h1>
          <p className="authSubtitle">Enter your email and we'll send you a reset link.</p>
        </div>
        {/*confirmation message sent after email submitted, otherwise show form */}
        {sent ? (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ color: "rgba(243,241,255,0.85)", fontSize: "13px", margin: 0 }}>
              ✅ Reset link sent! Please check your email.
            </p>
            <Link className="authLink" href="/login">
              Back to login
            </Link>
          </div>
        ) : (
          <form className="authForm" onSubmit={handleSubmit}>
            <input
              className="authInput"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="authBtn" type="submit">
              SEND RESET LINK
            </button>
          </form>
        )}

        <p className="authFooter">
          Remembered it?{" "}
          <Link className="authLink" href="/login">
            Back to login
          </Link>
        </p>
      </section>
    </main>
  );
}