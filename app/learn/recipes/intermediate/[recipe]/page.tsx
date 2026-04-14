//app/learn/recipes/intermediate/[recipe]/page.tsx
//recipe detail page, shows the full step by step instructions for a recipe
//fetches recipe name, ingredients (cards) and steps from Supabase
//uses React.use() to unwrap params as required by Next.js 16

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabase";

type Step = {
  id: string;
  step_number: number;
  instruction: string;
};

type Card = {
  id: string;
  label: string;
  type: string;
};

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ recipe: string }>;
}) {
  const { recipe: recipeId } = use(params);
  const [recipeName, setRecipeName] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  //fetch recipe details, steps, and cards from supabase on load
  useEffect(() => {

    //fetch recipe name
    const fetchData = async () => {
      const { data: recipeData } = await supabase
        .from("recipes")
        .select("name")
        .eq("id", recipeId)
        .single();

      if (recipeData) setRecipeName(recipeData.name);

      //fetch steps ordered by step number
      const { data: stepsData } = await supabase
        .from("steps")
        .select("*")
        .eq("recipe_id", recipeId)
        .order("step_number");

      if (stepsData) setSteps(stepsData);

      //fetch ingredient cards only
      const { data: cardsData } = await supabase
        .from("cards")
        .select("id, label, type")
        .eq("recipe_id", recipeId)
        .eq("type", "INGREDIENT")
        .order("correct_order");

      if (cardsData) setCards(cardsData);

      setLoading(false);
    };

    fetchData();
  }, [recipeId]);

  return (
    <main className="steps-page">
      <header className="steps-header">
        <Link href="/learn/recipes/intermediate" className="steps-back" aria-label="Back">
          ←
        </Link>
        <h1 className="steps-title">RECIPE DETAIL</h1>
        <div className="steps-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

      {loading ? (
        <div className="rdr-loading">Loading recipe...</div>
      ) : (
        <>
          <h2 className="steps-recipe-name">{recipeName}</h2>

          <div className="steps-cols">
            {/* Ingredients panel */}
            <div className="steps-panel">
              <h3 className="steps-panel-title">INGREDIENTS</h3>
              <ul className="steps-list">
                {cards.map((card) => (
                  <li key={card.id}>{card.label}</li>
                ))}
              </ul>
            </div>

            {/* Steps panel */}
            <div className="steps-panel">
              <h3 className="steps-panel-title">METHOD</h3>
              <ul className="steps-list">
                {steps.map((step) => (
                  <li key={step.id}>
                    <strong>Step {step.step_number}:</strong> {step.instruction}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Link to practice this recipe */}
          <div style={{ display: "flex", justifyContent: "center", padding: "24px" }}>
            <Link
              href={`/practice/intermediate/${recipeId}`}
              style={{
                background: "#c98a1c",
                color: "#1a1207",
                fontWeight: 900,
                letterSpacing: "2px",
                padding: "12px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "13px",
              }}
            >
              PRACTICE THIS RECIPE
            </Link>
          </div>
        </>
      )}
    </main>
  );
}