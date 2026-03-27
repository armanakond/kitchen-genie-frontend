"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email ?? "");
        setDisplayName(user.user_metadata?.display_name ?? "");
      }
    };
    getUser();
  }, []);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 3000);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setNewPassword("");
    setConfirmPassword("");
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <main className="profile-page">
      <header className="profile-header">
        <Link href="/dashboard" className="profile-back" aria-label="Back">
          <span>←</span>
        </Link>
        <h1 className="profile-title">PROFILE SETTINGS</h1>
        <div className="profile-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

      <div className="profile-body">

        {/* account info */}
        <div className="profile-section">
          <h2 className="profile-section-title">ACCOUNT INFO</h2>
          <div className="profile-email-row">
            <span className="profile-label">EMAIL</span>
            <span className="profile-email">{email}</span>
          </div>
        </div>

        {/* display name */}
        <div className="profile-section">
          <h2 className="profile-section-title">DISPLAY NAME</h2>
          <form className="profile-form" onSubmit={handleUpdateName}>
            <input
              className="profile-input"
              type="text"
              placeholder="Enter display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            <button className="profile-btn" type="submit" disabled={loading}>
              {nameSaved ? "✓ SAVED!" : "UPDATE NAME"}
            </button>
          </form>
        </div>

        {/* change password */}
        <div className="profile-section">
          <h2 className="profile-section-title">CHANGE PASSWORD</h2>
          <form className="profile-form" onSubmit={handleUpdatePassword}>
            <input
              className="profile-input"
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              className="profile-input"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="profile-btn" type="submit" disabled={loading}>
              {passwordSaved ? "✓ SAVED!" : "UPDATE PASSWORD"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}