"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function SignupPage() {
  const router = useRouter(); //  inside component

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const password = (form.elements[1] as HTMLInputElement).value;
    const confirm = (form.elements[2] as HTMLInputElement).value;

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    // mock sign up as working. Need to implement auth later.
    router.push("/tutorial");
  };


  return (
    <main className="screen authScreen">
      <header className="brand">
        <div>
          <Image
            src="/images/logo.png"
            alt="Kitchen Genie logo"
            width={200}
            height={200}
            priority
          />
        </div>
      </header>

      <section className="authCard" aria-label="Create your account">
        <h1 className="authTitle">CREATE YOUR ACCOUNT</h1>

        <form className="authForm" onSubmit={handleSubmit}>
          <input className="authInput" type="text" placeholder="ENTER FAKE NAME" required />
          <input className="authInput" type="password" placeholder="ENTER PASSWORD" required />
          <input className="authInput" type="password" placeholder="CONFIRM PASSWORD" required />

          <button className="authBtn" type="submit">
            SIGN UP
          </button>
        </form>

        <Link className="authLink" href="/login">
          <u>LOGIN HERE</u>
        </Link>
      </section>
    </main>
  );
}
