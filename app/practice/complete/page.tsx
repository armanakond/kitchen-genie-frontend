"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";

function QuestCompleteContent() {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("recipe") ?? "";
  const mistakes = parseInt(searchParams.get("mistakes") ?? "0");
  const [recipeName, setRecipeName] = useState("");
  const [saved, setSaved] = useState(false);

  const stars = mistakes === 0 ? 3 : mistakes <= 3 ? 2 : mistakes <= 5 ? 1 : 0; //so 3 stars = 0 mistakes, 2 stars = 1-3 mistakes and 1 star = 4-5 mistakes, anything above = 0
  const xp = stars === 3 ? 100 : stars === 2 ? 75 : stars === 1 ? 50 : 0;

  useEffect(() => {
    const saveProgress = async () => {
      if (saved) return;

      const { data: recipeData } = await supabase
        .from("recipes")
        .select("name")
        .eq("id", recipeId)
        .single();

      if (recipeData) setRecipeName(recipeData.name);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !recipeId) return;

      await supabase
        .from("user_progress")
        .upsert({
          user_id: user.id,
          recipe_id: recipeId,
          completed: true,
          stars,
          xp_earned: xp,
          completed_at: new Date().toISOString(),
        }, { onConflict: "user_id,recipe_id" });

      const { data: statsData } = await supabase
        .from("user_stats")
        .select("total_xp, level")
        .eq("user_id", user.id)
        .single();

      if (statsData) {
        const newXp = statsData.total_xp + xp;
        const newLevel = Math.floor(newXp / 1000) + 1;
        await supabase
          .from("user_stats")
          .update({ total_xp: newXp, level: newLevel, last_active: new Date().toISOString().split("T")[0] })
          .eq("user_id", user.id);
      }

      setSaved(true);
    };

    if (recipeId) saveProgress();
  }, [recipeId]);

  return (
    <main className="complete-page">
      {/* logo */}
      <div className="complete-logo">
        <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
      </div>

      {/* title */}
      <h1 className="complete-title">QUEST COMPLETE</h1>

      {/* recipe name */}
      {recipeName && (
        <p className="complete-recipe-name">{recipeName}</p>
      )}

      {/* stars */}
      <div className="complete-stars">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className={`complete-star ${i < stars ? "filled" : "empty"}`}>
            {i < stars ? "★" : "☆"}
          </span>
        ))}
      </div>

      {/* score box */}
      <div className="complete-score-box">
        <span className="complete-score-label">SCORE:</span>
        <span className="complete-score-value">{xp} XP</span>
      </div>

      {/* mistakes */}
      <p className="complete-mistakes">
        {mistakes === 0 ? "🏆 Perfect — no mistakes!" : `${mistakes} mistake${mistakes > 1 ? "s" : ""} made`}
      </p>

      {/* actions */}
      <div className="complete-actions">
        <Link href="/dashboard" className="complete-btn">MENU</Link>
        <Link href={`/practice/beginner/${recipeId}`} className="complete-btn complete-btn--gold">REPLAY</Link>
      </div>
    </main>
  );
}

export default function QuestCompletePage() {
  return (
    <Suspense fallback={
      <main className="complete-page">
        <div style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "2px" }}>LOADING...</div>
      </main>
    }>
      <QuestCompleteContent />
    </Suspense>
  );
}