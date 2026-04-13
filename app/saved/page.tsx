//saved recipes page, shows all the recipes the user has saved/mastered, with stats and progress towards next level
//currently hardcoded with placeholder data

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// placeholder username, wil lcome from supabase user_metadata
const USERNAME = "Your Username";

type SavedRecipe = {
  id: string;
  name: string;
  time_minutes: number;
  image_url: string;
  difficulty: string;
}


//colour coding based on difficulty
const DIFFICULTY_COLOUR: Record<string, string> = {
  BEGINNER: "#2a7a2a",
  INTERMEDIATE: "#c98a1c",
  ADVANCED: "#8b1a1a",
};

export default function SavedRecipesPage() {
  const [username, setUsername] = useState("Your Username");
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUsername(user.user_metadata?.display_name ?? "Your Username");

      const { data: progressData } = await supabase
        .from("user_progress")
        .select("recipe_id")
        .eq("user_id", user.id)
        .eq("completed", true);

      if (!progressData || progressData.length === 0) {
        setLoading(false);
        return;
      }

      const recipeIds = progressData.map((p) => p.recipe_id);
      const { data: recipesData } = await supabase
        .from("recipes")
        .select("id, name, time_minutes, image_url, difficulty")
        .in("id", recipeIds)
        .order("name");

      if (recipesData) setRecipes(recipesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const beginnerCount = recipes.filter((r) => r.difficulty === "BEGINNER").length;
  const intermediateCount = recipes.filter((r) => r.difficulty === "INTERMEDIATE").length;
  const advancedCount = recipes.filter((r) => r.difficulty === "ADVANCED").length;

  const getPracticeLink = (recipe: SavedRecipe) => {
    const diff = recipe.difficulty.toLowerCase();
    return `/practice/${diff}/${recipe.id}`;
  };

  return (
    <main className="saved-page">
      {/* header */}
      <header className="saved-header">
        <Link href="/dashboard" className="saved-home-btn" aria-label="Back to menu">
          <span className="saved-home-icon">←</span>
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
          <div className="saved-username">{username}</div>

          {/* stats row with total mastered recipes, and breakdown by difficulty */}
          <div className="saved-stats-row">
            <div className="saved-stat">
              <span className="saved-stat-value">{recipes.length}</span>
              <span className="saved-stat-label">MASTERED</span>
            </div>
            <div className="saved-stat">
              <span className="saved-stat-value">{beginnerCount}</span>
              <span className="saved-stat-label">BEGINNER</span>
            </div>
            <div className="saved-stat">
              <span className="saved-stat-value">{intermediateCount}</span>
              <span className="saved-stat-label">INTERMEDIATE</span>
            </div>
            {/*stats will eventually come from supabase user_progress counts */}
            <div className="saved-stat">
              <span className="saved-stat-value">{advancedCount}</span>
              <span className="saved-stat-label">ADVANCED</span>
            </div>
          </div>
        </div>

        {/* mastered recipes panel */}
        <div className="saved-panel">
          <div className="saved-panel-header">
            <h2 className="saved-panel-title">MASTERED RECIPES</h2>
            <span className="saved-panel-count">{recipes.length} recipes</span>
          </div>


          {loading ? (
            <div className="saved-loading">Loading recipes...</div>
          ) : (
            //recipe grid, shows all mastered recipes with image, name, time and difficulty badge, links to practice page for that recipe
            < div className="saved-grid">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={getPracticeLink(recipe)}
                  className="saved-card"
                >
                  <div className="saved-card-img-wrap">
                    <img src={recipe.image_url} alt={recipe.name} className="saved-card-img" />
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
                    <div className="saved-card-time">⏱ {recipe.time_minutes}</div>
                  </div>
                </Link>
              ))}
            </div>

          )}
          {/*empty state shown when no recipes are saved */}
          {!loading && recipes.length === 0 && (
            <div className="saved-empty">
              No mastered recipes yet. Complete challenges to earn them!
            </div>
          )}
        </div>
      </div>
    </main >
  );
}