"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // mock login working for now
    router.push("/tutorial");
  };

  return (
    <main className="screen authScreen">
      <header className="brand">
        <Image
          src="/images/logo.png"
          alt="Kitchen Genie logo"
          width={200}
          height={200}
          priority
        />
      </header>

      <section className="authCard" aria-label="Log into your account">
        <h1 className="authTitle">LOG INTO YOUR ACCOUNT</h1>

        <form className="authForm" onSubmit={handleSubmit}>
          <input
            className="authInput"
            type="text"
            placeholder="ENTER FAKE NAME"
            required
          />

          <input
            className="authInput"
            type="password"
            placeholder="ENTER PASSWORD"
            required
          />

          <button className="authBtn" type="submit">
            LOGIN
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link className="authLink" href="/signup">
            <u>SIGN UP HERE</u>
          </Link>
        </p>
      </section>
    </main>
  );
}
