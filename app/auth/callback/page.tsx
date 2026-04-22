"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // This exchanges the ?code=... for a session
      // const { error } = await supabase.auth.exchangeCodeForSession(
      //   window.location.href
      // );

      // if (error) {
      //   console.error(error.message);
      //   router.replace("/login");
      //   return;
      // }

      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        router.replace("/dashboard"); // or /tutorial
      } else {
        router.replace("/login");
      }
    };

    handleAuth();
  }, [router]);

  return <p>Signing you in...</p>;
}