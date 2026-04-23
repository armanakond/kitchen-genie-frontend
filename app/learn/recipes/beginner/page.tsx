// app/learn/recipes/beginner/page.tsx
// Beginner recipe detail page for the learn section
// Fetches all BEGINNER recipes from Supabase and displays them as a grid

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import PageHeader from "@/app/components/PageHeader";

type Recipe = {
  id: string;
  name: string;
  time_minutes: number;
  image_url: string;
};

//fetches beginner recipes from supabase on load
export default function LearnBeginnerPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  //fetch beginner recipes from supabase on load
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("id, name, time_minutes, image_url")
        .eq("difficulty", "BEGINNER")
        .order("name");

      if (error) { console.error(error); return; }
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
      <PageHeader title="BEGINNER RECIPES" backHref="/learn/recipes" />

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

      {/* Filtered recipes */}
      {loading ? (
        <div className="rdr-loading">Loading recipes...</div>
      ) : (
        <div className="rdr-grid">
          {filtered.map((recipe) => (
            <Link key={recipe.id} href={`/learn/recipes/beginner/${recipe.id}`} className="rdr-card">
              <div className="rdr-card-img-wrap">
                <img src={recipe.image_url} alt={recipe.name} className="rdr-card-img" />
              </div>
              <div className="rdr-card-name">{recipe.name}</div>
              <div className="rdr-card-time">⏱ {recipe.time_minutes} min</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}