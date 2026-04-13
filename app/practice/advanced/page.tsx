//practice advanced selection page
//fetches all advanced recipes from supabase and displays in grid
//each card links to game page for that recipe using its supabase UUID


"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Recipe = {
  id: string;
  name: string;
  time_minutes: number;
  image_url: string;
  difficulty: string;
};

export default function PracticeAdvancedPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  //fetch advanced recipes from supabase on load
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("difficulty", "ADVANCED")
        .order("name");

      if (error) {
        console.error(error);
        return;
      }

      setRecipes(data ?? []);
      setLoading(false);
    };

    fetchRecipes();
  }, []);
  //filter recipes based on search query
  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="rdr-page">
      <header className="rdr-header">
        <Link href="/practice" className="rdr-home-btn" aria-label="Back">
          <span style={{ fontSize: "28px" }}>←</span>
          <span>BACK TO MENU</span>
        </Link>
        <h1 className="rdr-title">ADVANCED — CHOOSE RECIPE</h1>
        <div className="rdr-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>
      {/*search bar to filter recipes by name */}
      <div className="rdr-search-row">
        <span className="rdr-search-icon">🔍</span>
        <input
          className="rdr-search"
          type="text"
          placeholder="Search recipes . . ."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/*recipe grid, showing filtered recipes */}
      {loading ? (
        <div className="rdr-loading">Loading recipes...</div>
      ) : (
        <div className="rdr-grid">
          {filtered.map((recipe) => (
            //each card links to /practice/advanced/[recipe id]
            <Link
              key={recipe.id}
              href={`/practice/advanced/${recipe.id}`}
              className="rdr-card"
            >
              <div className="rdr-card-img-wrap">
                <img src={recipe.image_url} alt={recipe.name} className="rdr-card-img" />
              </div>
              <div className="rdr-card-name">{recipe.name}</div>
              <div className="rdr-card-time">Time: &nbsp;{recipe.time_minutes} min</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}