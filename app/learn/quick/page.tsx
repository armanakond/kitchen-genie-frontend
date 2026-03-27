"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Later this will come from Supabase
const RECIPES = [
  { id: "egg-fried-rice", name: "Egg Fried Rice", time: "10 min", img: "/images/recipes/egg-fried-rice.jpg" },
  { id: "grilled-cheese", name: "Grilled Cheese", time: "5 min", img: "/images/recipes/grilled-cheese.jpg" },
  { id: "instant-ramen", name: "Instant Ramen", time: "8 min", img: "/images/recipes/instant-ramen.jpg" },
  { id: "tuna-mayo-wrap", name: "Tuna Mayo Wrap", time: "5 min", img: "/images/recipes/tuna-wrap.jpg" },
  { id: "microwave-omelette", name: "Microwave Omelette", time: "4 min", img: "/images/recipes/omelette.jpg" },
];

export default function QuickRecipesPage() {
  const [search, setSearch] = useState("");

  const filtered = RECIPES.filter((r) =>
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

      <div className="qr-grid">
        {filtered.map((recipe) => (
          <Link key={recipe.id} href={`/learn/quick/${recipe.id}`} className="qr-card">
            <div className="qr-card-img-wrap">
              <img src={recipe.img} alt={recipe.name} className="qr-card-img" />
            </div>
            <div className="qr-card-name">{recipe.name}</div>
            <div className="qr-card-time">Time: &nbsp;{recipe.time}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}