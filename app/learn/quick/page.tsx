//app/learn/quick/page.tsx
//quick recipes page, shows all quick type recipes from Supabase
//fetches recipes filtered by type = 'QUICK' from supabase
//search filters client-side for performance
//these are fast meals under 10 minutes, aimed towards students

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import PageHeader from "@/app/components/PageHeader";

//types for recipe data fetched from supabase
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

  //fetch quick recipes from supabase on load
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

  //filter recipes based on search query
  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="qr-page">
      <PageHeader title="QUICK RECIPES" backHref="/learn" />

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
      {/* Show loading state then render filtered recipes grid */}
      {loading ? (
        <div className="rdr-loading">Loading recipes...</div>
      ) : (
        <div className="qr-grid">
          {filtered.map((recipe) => (
            //link to quick recip detail page [/learn/quick/[recipe UUID] where id is recipe.id]
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