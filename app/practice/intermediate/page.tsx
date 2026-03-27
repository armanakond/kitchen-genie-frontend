"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Later this will come from Supabase
const RECIPES = [
  { id: "spaghetti-bolognese", name: "Spaghetti Bolognese", time: "30 min", img: "/images/recipes/spaghetti-bolognese.jpg" },
  { id: "chicken-alfredo-pasta", name: "Chicken Alfredo Pasta", time: "25 min", img: "/images/recipes/chicken-alfredo-pasta.jpg" },
  { id: "beef-tacos", name: "Beef Tacos", time: "25 min", img: "/images/recipes/beef-tacos.jpg" },
  { id: "chicken-curry-basic", name: "Chicken Curry (Basic)", time: "35 min", img: "/images/recipes/chicken-curry.jpg" },
  { id: "baked-chicken-thighs", name: "Baked Chicken Thighs", time: "40 min", img: "/images/recipes/baked-chicken-thighs.jpg" },
  { id: "homemade-burgers", name: "Homemade Burgers", time: "30 min", img: "/images/recipes/homemade-burgers.jpg" },
  { id: "mushroom-risotto", name: "Mushroom Risotto", time: "35 min", img: "/images/recipes/mushroom-risotto.jpg" },
  { id: "fish-tacos", name: "Fish Tacos", time: "25 min", img: "/images/recipes/fish-tacos.jpg" },
  { id: "stuffed-bell-peppers", name: "Stuffed Bell Peppers", time: "45 min", img: "/images/recipes/stuffed-bell-peppers.jpg" },
];

export default function PracticeIntermediateRecipesPage() {
  const [search, setSearch] = useState("");

  const filtered = RECIPES.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="rdr-page">
      <header className="rdr-header">
        <Link href="/practice" className="rdr-home-btn" aria-label="Back">
          <span style={{ fontSize: "28px" }}>🏠</span>
          <span>BACK TO MENU</span>
        </Link>
        <h1 className="rdr-title">INTERMEDIATE — CHOOSE RECIPE</h1>
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
          <Link key={recipe.id} href={`/practice/intermediate/${recipe.id}`} className="rdr-card">
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