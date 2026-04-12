// app/learn/quick/page.tsx
// Quick recipes page — shows all QUICK type recipes from Supabase
// Fetches recipes filtered by type = 'QUICK' instead of hardcoded array
// Search filters client-side for performance

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
};

export default function QuickRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("id, name, time_minutes, image_url")
        .eq("type", "QUICK")
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
    <main className="qr-page">
      <header className="qr-header">
        <Link href="/learn" className="qr-back" aria-label="Back">
          <span>←</span>
        </Link>
        <h1 className="qr-title">QUICK RECIPES</h1>
        <div className="qr-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

      <div className="qr-search-row">
        <span className="qr-search-icon">🔍</span>
        <input
          className="qr-search"
          type="text"
          placeholder="Search recipes . . ."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="rdr-loading">Loading recipes...</div>
      ) : (
        <div className="qr-grid">
          {filtered.map((recipe) => (
            <Link key={recipe.id} href={`/learn/quick/${recipe.id}`} className="qr-card">
              <div className="qr-card-img-wrap">
                <img src={recipe.image_url} alt={recipe.name} className="qr-card-img" />
              </div>
              <div className="qr-card-name">{recipe.name}</div>
              <div className="qr-card-time">⏱ {recipe.time_minutes} min</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}