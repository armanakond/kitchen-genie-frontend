"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Later this will come from Supabase
const RECIPES = [
  { id: "garlic-butter-pasta", name: "Garlic Butter Pasta", time: "15 min", img: "/images/recipes/garlic-butter-pasta.jpg" },
  { id: "cheese-omelette", name: "Cheese Omelette", time: "10 min", img: "/images/recipes/cheese-omelette.jpg" },
  { id: "scrambled-eggs", name: "Scrambled Eggs", time: "5-7 min", img: "/images/recipes/scrambled-eggs.jpg" },
  { id: "chicken-stir-fry", name: "Chicken Stir Fry", time: "20 min", img: "/images/recipes/chicken-stir-fry.jpg" },
  { id: "vegetable-fried-rice", name: "Vegetable Fried Rice", time: "20 min", img: "/images/recipes/vegetable-fried-rice.jpg" },
  { id: "pancakes-basic", name: "Pancakes (Basic)", time: "15 min", img: "/images/recipes/pancakes.jpg" },
  { id: "tomato-soup-basic", name: "Tomato Soup (Basic)", time: "15 min", img: "/images/recipes/tomato-soup.jpg" },
  { id: "pan-fried-fish", name: "Pan-Fried Fish", time: "15 min", img: "/images/recipes/pan-fried-fish.jpg" },
  { id: "roasted-vegetables", name: "Roasted Vegetables", time: "20 min", img: "/images/recipes/roasted-vegetables.jpg" },
  { id: "avocado-toast", name: "Avocado Toast", time: "5 min", img: "/images/recipes/avocado-toast.jpg" },
];

export default function BeginnerRecipesPage() {
  const [search, setSearch] = useState("");

  const filtered = RECIPES.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="rdr-page">
      <header className="rdr-header">
        <Link href="/learn/recipes" className="rdr-home-btn" aria-label="Back to menu">
          <span style={{ fontSize: "28px" }}>🏠</span>
          <span>BACK TO MENU</span>
        </Link>
        <h1 className="rdr-title">BEGINNER RECIPES</h1>
        <div className="rdr-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

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

      <div className="rdr-grid">
        {filtered.map((recipe) => (
          <Link key={recipe.id} href={`/learn/recipes/beginner/${recipe.id}`} className="rdr-card">
            <div className="rdr-card-img-wrap">
              <img src={recipe.img} alt={recipe.name} className="rdr-card-img" />
            </div>
            <div className="rdr-card-name">{recipe.name}</div>
            <div className="rdr-card-time">Time: &nbsp;{recipe.time}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}