"use client";

import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Password updated successfully!");
    router.push("/login");
  };

  return (
    <main className="screen authScreen">
      <header className="brand">
        <Image src="/images/logo.png" alt="Kitchen Genie logo" width={200} height={200} priority />
      </header>

      <section className="authCard">
        <div className="authCardHeader">
          <h1 className="authTitle">RESET PASSWORD</h1>
          <p className="authSubtitle">Enter your new password below.</p>
        </div>

        <form className="authForm" onSubmit={handleSubmit}>
          <input
            className="authInput"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="authInput"
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button className="authBtn" type="submit" disabled={loading}>
            {loading ? "UPDATING..." : "UPDATE PASSWORD"}
          </button>
        </form>
      </section>
    </main>
  );
}