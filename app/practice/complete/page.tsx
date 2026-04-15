//app/practice/complete/page.tsx
//quest complete page, shows score and mistakes, links to replay or dashboard
//reads recipe id and mistake count from url search params
//calculates stars and xp based on mistakes, saves to supabase
//wrapped in suspense because useSearchParams needs it next.js

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
  const difficulty = searchParams.get("difficulty") ?? "beginner";
  const [recipeName, setRecipeName] = useState("");
  const [saved, setSaved] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);

  //calculate stars and xp based on mistakes
  //0 mistakes = 3 stars, 1-3 mistakes = 2 stars, 4-5 mistakes = 1 star, 6 mistakes = 0 stars
  const stars = mistakes === 0 ? 3 : mistakes <= 3 ? 2 : mistakes <= 5 ? 1 : 0; //so 3 stars = 0 mistakes, 2 stars = 1-3 mistakes and 1 star = 4-5 mistakes, anything above = 0
  const xp = stars === 3 ? 100 : stars === 2 ? 75 : stars === 1 ? 50 : 0;

  //fetch recipe name and save progress to supabase on load
  useEffect(() => {
    const saveProgress = async () => {
      if (saved) return;
      //fetch recipe name from supabase using recipeId
      const { data: recipeData } = await supabase
        .from("recipes")
        .select("name")
        .eq("id", recipeId)
        .single();

      if (recipeData) setRecipeName(recipeData.name);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !recipeId) return;

      //save progress to supabase, upsert to user_progress, updates if recipe already completed before, otherwise inserts new record
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

      //update user stats - add xp to total_xp, recalculate level (every 1000 xp = 1 level), and update last_active date to today
      //might change  xp system so its more dynamic instead of it being 1000 i would increment xp per level so 1000 lvl 1 then 1200 for lvl 2 etc
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

  // Saves recipe to saved_recipes table — upsert prevents duplicates
  const handleSave = async () => {
    setBookmarking(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("saved_recipes")
      .upsert({
        user_id: user.id,
        recipe_id: recipeId,
      }, { onConflict: "user_id,recipe_id" });

    setBookmarked(true);
    setBookmarking(false);
  };



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

      {/* actions/navigation buttons */}
      <div className="complete-actions">
        <Link href="/dashboard" className="complete-btn">MENU</Link>
        <button
          onClick={handleSave}
          className="complete-btn"
          disabled={bookmarked || bookmarking}
          style={{
            background: bookmarked ? "#2a7a2a" : "rgba(255,255,255,0.08)",
            border: bookmarked ? "1px solid #2a7a2a" : "1px solid rgba(255,255,255,0.18)",
            color: "white",
            cursor: bookmarked ? "default" : "pointer",
            fontWeight: 900,
            letterSpacing: "2px",
            fontSize: "13px",
          }}
        >
          {bookmarked ? "✓ SAVED!" : bookmarking ? "SAVING..." : "SAVE"}
        </button>
        <Link href={`/practice/${difficulty}/${recipeId}`} className="complete-btn complete-btn--gold">REPLAY</Link>
      </div>
    </main>
  );
}

//suspense wrapper required for useSearchparams in Next.js app router
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