"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Later these will come from Supabase
const DAILY_CHALLENGE = {
  title: "BOIL THE PASTA",
  recipe: "Tomato Pasta",
  description: "Drag the correct action card to complete today's challenge.",
  xp: 100,
};

const RECENT_RECIPES = [
  { id: "egg-fried-rice", name: "Egg Fried Rice", time: "10 min", img: "/images/recipes/egg-fried-rice.jpg" },
  { id: "grilled-cheese", name: "Grilled Cheese", time: "5 min", img: "/images/recipes/grilled-cheese.jpg" },
  { id: "instant-ramen", name: "Instant Ramen", time: "8 min", img: "/images/recipes/instant-ramen.jpg" },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <main className="dash-page">
      {/* sidebar */}
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

      {/* main */}
      <section className="dash-main">

        {/* top XP bar */}
        <div className="dash-topbar">
          <div className="dash-lvl">LVL 12</div>
          <div className="dash-xpbar">
            <div className="dash-xpfill" style={{ width: "0%" }} />
          </div>
          <div className="dash-xptext">0/1000 XP</div>
        </div>

        {/* hero + stats */}
        <div className="dash-content">
          <div className="dash-hero">
            <h1 className="dash-title">
              LEARN COOKING,<br />ONE CARD AT A TIME.
            </h1>
            <h2 className="dash-subtitle">CHALLENGE YOURSELF</h2>
            <p className="dash-desc">Choose your next mission to earn XP.</p>
          </div>

          <div className="dash-stats">
            <div className="dash-stat">
              <div className="dash-stat-label">LEVEL</div>
              <div className="dash-stat-value">12</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-label">RECIPES MASTERED</div>
              <div className="dash-stat-value">13</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-label">DAILY STREAK</div>
              <div className="dash-stat-value">5</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-label">TOTAL XP</div>
              <div className="dash-stat-value">1000</div>
            </div>
          </div>
        </div>

        {/* bottom row — daily challenge + recent recipes */}
        <div className="dash-bottom">

          {/* daily challenge */}
          <div className="dash-challenge">
            <div className="dash-challenge-tag">⚡ DAILY CHALLENGE</div>
            <div className="dash-challenge-title">{DAILY_CHALLENGE.title}</div>
            <div className="dash-challenge-recipe">Recipe: {DAILY_CHALLENGE.recipe}</div>
            <p className="dash-challenge-desc">{DAILY_CHALLENGE.description}</p>
            <div className="dash-challenge-footer">
              <span className="dash-challenge-xp">+{DAILY_CHALLENGE.xp} XP</span>
              <Link href="/practice/beginner" className="dash-challenge-btn">
                START CHALLENGE
              </Link>
            </div>
          </div>

          {/* recent recipes */}
          <div className="dash-recent">
            <div className="dash-recent-title">RECENTLY VIEWED</div>
            <div className="dash-recent-list">
              {RECENT_RECIPES.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/learn/quick/${recipe.id}`}
                  className="dash-recent-card"
                >
                  <div className="dash-recent-img-wrap">
                    <img src={recipe.img} alt={recipe.name} className="dash-recent-img" />
                  </div>
                  <div className="dash-recent-info">
                    <div className="dash-recent-name">{recipe.name}</div>
                    <div className="dash-recent-time">⏱ {recipe.time}</div>
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