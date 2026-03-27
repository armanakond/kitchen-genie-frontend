"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Later this will come from Supabase
const RECIPES = [
  { id: "beef-wellington", name: "Beef Wellington", time: "90 min", img: "/images/recipes/beef-wellington.jpg" },
  { id: "homemade-lasagna", name: "Homemade Lasagna", time: "75 min", img: "/images/recipes/homemade-lasagna.jpg" },
  { id: "chicken-parmesan", name: "Chicken Parmesan", time: "45 min", img: "/images/recipes/chicken-parmesan.jpg" },
  { id: "lamb-curry", name: "Lamb Curry", time: "60 min", img: "/images/recipes/lamb-curry.jpg" },
  { id: "seafood-paella", name: "Seafood Paella", time: "50 min", img: "/images/recipes/seafood-paella.jpg" },
  { id: "ramen", name: "Ramen", time: "2-3 hrs", img: "/images/recipes/ramen.jpg" },
  { id: "salmon-en-croute", name: "Salmon en Croute", time: "45 min", img: "/images/recipes/salmon-en-croute.jpg" },
  { id: "chocolate-souffle", name: "Chocolate Souffle", time: "40 min", img: "/images/recipes/chocolate-souffle.jpg" },
  { id: "homemade-gnocchi", name: "Homemade Gnocchi", time: "60 min", img: "/images/recipes/homemade-gnocchi.jpg" },
];

export default function AdvancedRecipesPage() {
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
        <h1 className="rdr-title">ADVANCED RECIPES</h1>
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
          <Link key={recipe.id} href={`/learn/recipes/advanced/${recipe.id}`} className="rdr-card">
            <div className="rdr-card-img-wrap">
              <img src={recipe.img} alt={recipe.name} className="rdr-card-img" />
            </div>
            <div className="rdr-card-name">{recipe.name}</div>
            <div className="rdr-card-time">Time: &nbsp;{recipe.time}</div>
          </Link>
        ))}
      </div>

      <div className="rdr-coming-soon">
        CHALLENGE MODE N/A FOR ADVANCED CURRENTLY BUT WILL BE ADDED IN CODE
      </div>
    </main>
  );
}