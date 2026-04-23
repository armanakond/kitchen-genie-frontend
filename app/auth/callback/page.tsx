//this page is the callback URL for supabase auth, it handles the redirect after login/signup and sets the session
//it checks for the session and redirects to dashboard if found, otherwise back to login

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {

      const { data: { session } } = await supabase.auth.getSession(); //get session from supabase auth

      if (session) {
        router.replace("/dashboard"); //if session exists, redirect to dashboard
      } else {
        router.replace("/login"); //no session => back to login
      }
    };

    handleAuth(); //call the async function to handle auth on component mount
  }, [router]);

  return <p>Signing you in...</p>;
}