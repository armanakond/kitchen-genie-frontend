//app/learn/recipes/intermediate/page.tsx
//intermediate recipe detail page for the learn section
//fetches all intermediate recipes from Supabase and displays them as a grid
//search filter for recipe name

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

export default function LearnIntermediatePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("id, name, time_minutes, image_url")
        .eq("difficulty", "INTERMEDIATE")
        .order("name");

      if (error) { console.error(error); return; }
      setRecipes(data ?? []);
      setLoading(false);
    };
    fetchRecipes();
  }, []);

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="rdr-page">
      <PageHeader title="INTERMEDIATE RECIPES" backHref="/learn/recipes" />

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

      {loading ? (
        <div className="rdr-loading">Loading recipes...</div>
      ) : (
        <div className="rdr-grid">
          {filtered.map((recipe) => (
            <Link key={recipe.id} href={`/learn/recipes/intermediate/${recipe.id}`} className="rdr-card">
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