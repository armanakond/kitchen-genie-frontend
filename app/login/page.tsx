"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

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

    router.push("/dashboard");
  };

  return (
    <main className="screen authScreen">
      <header className="brand">
        <Image src="/images/logo.png" alt="Kitchen Genie logo" width={200} height={200} priority />
      </header>

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