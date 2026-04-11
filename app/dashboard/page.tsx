"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Stats = {
  level: number;
  total_xp: number;
  daily_streak: number;
};

type RecentRecipe = {
  id: string;
  name: string;
  time_minutes: number;
  image_url: string;
};

type DailyChallenge = {
  id: string;
  name: string;
  difficulty: string;
};

const DAILY_CHALLENGE_DESC = "Drag the correct cards in order to complete today's challenge and earn XP!";

export default function DashboardPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("Chef");
  const [stats, setStats] = useState<Stats>({ level: 1, total_xp: 0, daily_streak: 0 });
  const [recipesCount, setRecipesCount] = useState(0);
  const [recentRecipes, setRecentRecipes] = useState<RecentRecipe[]>([]);
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setDisplayName(user.user_metadata?.display_name ?? "Chef");

      const { data: statsData } = await supabase
        .from("user_stats")
        .select("level, total_xp, daily_streak")
        .eq("user_id", user.id)
        .single();

      if (statsData) setStats(statsData);

      const { count } = await supabase
        .from("user_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", true);

      setRecipesCount(count ?? 0);

      const { data: progressData } = await supabase
        .from("user_progress")
        .select("recipe_id, completed_at")
        .eq("user_id", user.id)
        .eq("completed", true)
        .order("completed_at", { ascending: false })
        .limit(3);

      if (progressData && progressData.length > 0) {
        const recipeIds = progressData.map((p) => p.recipe_id);
        const { data: recipesData } = await supabase
          .from("recipes")
          .select("id, name, time_minutes, image_url")
          .in("id", recipeIds);

        if (recipesData) setRecentRecipes(recipesData);
      }

      const { data: challengeData } = await supabase
        .from("recipes")
        .select("id, name, difficulty")
        .eq("difficulty", "BEGINNER")
        .limit(5);

      if (challengeData && challengeData.length > 0) {
        const random = challengeData[Math.floor(Math.random() * challengeData.length)];
        setDailyChallenge(random);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const xpInLevel = stats.total_xp % 1000;
  const xpPercent = (xpInLevel / 1000) * 100;

  return (
    <main className="dash-page">
      <aside className="dash-sidebar">
        <div className="dash-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={160} height={160} priority />
        </div>
        <nav className="dash-nav">
          <Link className="dash-btn" href="/learn">LEARN</Link>
          <Link className="dash-btn" href="/practice">PRACTICE</Link>
          <Link className="dash-btn" href="/saved">SAVED RECIPES</Link>
          <Link className="dash-btn" href="/profile">PROFILE</Link>
          <button className="dash-btn" onClick={handleLogout}>LOG OUT</button>
        </nav>
      </aside>

      <section className="dash-main">
        <div className="dash-topbar">
          <div className="dash-lvl">LVL {stats.level}</div>
          <div className="dash-xpbar">
            <div className="dash-xpfill" style={{ width: `${xpPercent}%` }} />
          </div>
          <div className="dash-xptext">{xpInLevel}/1000 XP</div>
        </div>

        <div className="dash-content">
          <div className="dash-hero">
            <h1 className="dash-title">
              WELCOME BACK,<br />{displayName.toUpperCase()}!
            </h1>
            <h2 className="dash-subtitle">CHALLENGE YOURSELF</h2>
            <p className="dash-desc">Choose your next mission to earn XP.</p>
          </div>

          <div className="dash-stats">
            <div className="dash-stat">
              <div className="dash-stat-label">LEVEL</div>
              <div className="dash-stat-value">{loading ? "—" : stats.level}</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-label">RECIPES MASTERED</div>
              <div className="dash-stat-value">{loading ? "—" : recipesCount}</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-label">DAILY STREAK</div>
              <div className="dash-stat-value">{loading ? "—" : `${stats.daily_streak}🔥`}</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-label">TOTAL XP</div>
              <div className="dash-stat-value">{loading ? "—" : stats.total_xp}</div>
            </div>
          </div>
        </div>

        <div className="dash-bottom">
          <div className="dash-challenge">
            <div className="dash-challenge-tag">⚡ DAILY CHALLENGE</div>
            <div className="dash-challenge-title">
              {dailyChallenge ? dailyChallenge.name.toUpperCase() : "LOADING..."}
            </div>
            <div className="dash-challenge-recipe">
              Difficulty: {dailyChallenge?.difficulty ?? "—"}
            </div>
            <p className="dash-challenge-desc">{DAILY_CHALLENGE_DESC}</p>
            <div className="dash-challenge-footer">
              <span className="dash-challenge-xp">+100 XP</span>
              {dailyChallenge && (
                <Link href={`/practice/beginner/${dailyChallenge.id}`} className="dash-challenge-btn">
                  START CHALLENGE
                </Link>
              )}
            </div>
          </div>

          <div className="dash-recent">
            <div className="dash-recent-title">RECENTLY COMPLETED</div>
            <div className="dash-recent-list">
              {recentRecipes.length === 0 && !loading && (
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: 0 }}>
                  No recipes completed yet. Start practising!
                </p>
              )}
              {recentRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/practice/beginner/${recipe.id}`}
                  className="dash-recent-card"
                >
                  <div className="dash-recent-img-wrap">
                    <img src={recipe.image_url} alt={recipe.name} className="dash-recent-img" />
                  </div>
                  <div className="dash-recent-info">
                    <div className="dash-recent-name">{recipe.name}</div>
                    <div className="dash-recent-time">⏱ {recipe.time_minutes} min</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}