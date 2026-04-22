//profile settings page, allows users to update display name and password
//uses supabase auth updateUser to update both name and password changes
//fetches current user data from Supabase on load to populate form fields

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const router = useRouter();

  //state for display name and password fields
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //feedback states, shows success message after saving changes
  const [nameSaved, setNameSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  //fetch user data from supabase on load to populate form fields
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
  //updates display name in supabase user_metadata, shows success message on save
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

    //show saved confirmation for 3 seconds
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 3000);
  };

  //handles password update, checks for matching and length before calling supabase updateUser to change password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    //client side validation
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
    //clear password fields and show saved confirmation for 3 seconds
    setNewPassword("");
    setConfirmPassword("");
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  //deleting account calls supabase rpc function to delete user
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete account? This action cannot be reversed.")
    if (!confirmed) return;

    const { error } = await supabase.rpc('delete_user')
    if (error) {
      alert(error.message);
      return
    }
    await supabase.auth.signOut()
    router.push('/signup')
  }

  //main profile page layout, includes sections for account info, display name, password change, and account deletion
  return (
    <main className="profile-page">
      <header className="profile-header">
        <Link href="/dashboard" className="profile-back" aria-label="Back">
          <span className="btn-back">←</span>
        </Link>
        <h1 className="profile-title">PROFILE SETTINGS</h1>
        <div className="profile-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

      <div className="profile-body">

        {/* account info, read only section */}
        <div className="profile-section">
          <h2 className="profile-section-title">ACCOUNT INFO</h2>
          <div className="profile-email-row">
            <span className="profile-label">EMAIL</span>
            <span className="profile-email">{email}</span>
          </div>
        </div>

        {/* display name, editable section */}
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

        {/* change password, editable section */}
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
            {/*button toggles to show saved confirmation */}
            <button className="profile-btn" type="submit" disabled={loading}>
              {passwordSaved ? "✓ SAVED!" : "UPDATE PASSWORD"}
            </button>
          </form>
        </div>
        {/* delete account section, calls handleDeleteAccount on click */}
        <div className="profile-section">
          <h2 className="profile-section-title">DELETE YOUR ACCOUNT</h2>
          <button onClick={handleDeleteAccount}
            style={{
              background: "rgba(220, 50, 50, 0.15)",
              border: "1px solid rgba(220, 50, 50, 0.4)",
              color: "rgb(220, 50, 50)",
              padding: "12px 24px",
              fontWeight: 900,
              letterSpacing: "2px",
              fontSize: "13px",
              cursor: "pointer",
              width: "100%"
            }}>
            DELETE ACCOUNT
          </button>
        </div>

      </div>
    </main>
  );
}