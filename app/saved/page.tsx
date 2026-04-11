//saved recipes page, shows all the recipes the user has saved/mastered, with stats and progress towards next level
//currently hardcoded with placeholder data

"use client";

import Image from "next/image";
import Link from "next/link";

// placeholder username, wil lcome from supabase user_metadata
const USERNAME = "Your Username";

//still hardcoded, need to implement the fetched data from supabase saved_recipes joined with recipes

const MASTERED_RECIPES = [
  { id: "scrambled-eggs", name: "Scrambled Eggs", time: "5-7 min", img: "/images/recipes/scrambled-eggs.jpg", difficulty: "BEGINNER" },
  { id: "cheese-omelette", name: "Cheese Omelette", time: "10 min", img: "/images/recipes/cheese-omelette.jpg", difficulty: "BEGINNER" },
  { id: "chicken-stir-fry", name: "Chicken Stir Fry", time: "20 min", img: "/images/recipes/chicken-stir-fry.jpg", difficulty: "BEGINNER" },
  { id: "garlic-butter-pasta", name: "Garlic Butter Pasta", time: "15 min", img: "/images/recipes/garlic-butter-pasta.jpg", difficulty: "BEGINNER" },
  { id: "spaghetti-bolognese", name: "Spaghetti Bolognese", time: "30 min", img: "/images/recipes/spaghetti-bolognese.jpg", difficulty: "INTERMEDIATE" },
];


//colour coding based on difficulty
const DIFFICULTY_COLOUR: Record<string, string> = {
  BEGINNER: "#2a7a2a",
  INTERMEDIATE: "#c98a1c",
  ADVANCED: "#8b1a1a",
};

export default function SavedRecipesPage() {
  return (
    <main className="saved-page">
      {/* header */}
      <header className="saved-header">
        <Link href="/dashboard" className="saved-home-btn" aria-label="Back to menu">
          <span className="saved-home-icon">🏠</span>
          <span>BACK TO MENU</span>
        </Link>
        <h1 className="saved-title">SAVED RECIPES</h1>
        <div className="saved-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

      {/* body */}
      <div className="saved-body">
        {/* username + stats row */}
        <div className="saved-top">
          <div className="saved-username">{USERNAME}</div>

          {/* stats row with total mastered recipes, and breakdown by difficulty */}
          <div className="saved-stats-row">
            <div className="saved-stat">
              <span className="saved-stat-value">{MASTERED_RECIPES.length}</span>
              <span className="saved-stat-label">MASTERED</span>
            </div>
            <div className="saved-stat">
              <span className="saved-stat-value">3</span>
              <span className="saved-stat-label">BEGINNER</span>
            </div>
            <div className="saved-stat">
              <span className="saved-stat-value">1</span>
              <span className="saved-stat-label">INTERMEDIATE</span>
            </div>
            {/*stats will eventually come from supabase user_progress counts */}
            <div className="saved-stat">
              <span className="saved-stat-value">0</span>
              <span className="saved-stat-label">ADVANCED</span>
            </div>
          </div>
        </div>

        {/* mastered recipes panel */}
        <div className="saved-panel">
          <div className="saved-panel-header">
            <h2 className="saved-panel-title">MASTERED RECIPES</h2>
            <span className="saved-panel-count">{MASTERED_RECIPES.length} recipes</span>
          </div>

          {/*recipe cards grid */}
          <div className="saved-grid">
            {MASTERED_RECIPES.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/learn/recipes/beginner/${recipe.id}`}
                className="saved-card"
              >
                <div className="saved-card-img-wrap">
                  <img src={recipe.img} alt={recipe.name} className="saved-card-img" />
                  {/* difficulty badge, colour coded */}
                  <span
                    className="saved-card-badge"
                    style={{ background: DIFFICULTY_COLOUR[recipe.difficulty] }}
                  >
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="saved-card-info">
                  <div className="saved-card-name">{recipe.name}</div>
                  <div className="saved-card-time">⏱ {recipe.time}</div>
                </div>
              </Link>
            ))}
          </div>
          {/*empty state shown when no recipes are saved */}
          {MASTERED_RECIPES.length === 0 && (
            <div className="saved-empty">
              No mastered recipes yet. Complete challenges to earn them!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}