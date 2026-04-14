// app/learn/quick/[recipe]/page.tsx
// Quick recipe detail page — shows ingredients and steps for a quick recipe
// Fetches recipe name, ingredients and steps from Supabase using the recipe UUID
// Uses React.use() to unwrap params as required by Next.js 16

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabase";

//types for steps and ingredient cards
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

export default function QuickRecipeDetailPage({
  params,
}: {
  params: Promise<{ recipe: string }>;
}) {
  const { recipe: recipeId } = use(params);
  const [recipeName, setRecipeName] = useState("");
  const [timeMinutes, setTimeMinutes] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const [ingredients, setIngredients] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //fetch recipe name and time
      const { data: recipeData } = await supabase
        .from("recipes")
        .select("name, time_minutes")
        .eq("id", recipeId)
        .single();

      if (recipeData) {
        setRecipeName(recipeData.name);
        setTimeMinutes(recipeData.time_minutes);
      }

      //fetch steps ordered by step number
      const { data: stepsData } = await supabase
        .from("steps")
        .select("*")
        .eq("recipe_id", recipeId)
        .order("step_number");

      if (stepsData) setSteps(stepsData);

      //fetch only ingredient type cards
      const { data: cardsData } = await supabase
        .from("cards")
        .select("id, label, type")
        .eq("recipe_id", recipeId)
        .eq("type", "INGREDIENT")
        .order("correct_order");

      if (cardsData) setIngredients(cardsData);

      setLoading(false);
    };

    fetchData();
  }, [recipeId]);

  return (
    <main className="steps-page">
      <header className="steps-header">
        <Link href="/learn/quick" className="steps-back" aria-label="Back">
          ←
        </Link>
        <h1 className="steps-title">QUICK RECIPE</h1>
        <div className="steps-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

      {loading ? (
        <div className="rdr-loading">Loading recipe...</div>
      ) : (
        <>
          <h2 className="steps-recipe-name">{recipeName}</h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: "0", letterSpacing: "1px" }}>
            ⏱ {timeMinutes} min
          </p>

          <div className="steps-cols">
            {/* Ingredients panel */}
            <div className="steps-panel">
              <h3 className="steps-panel-title">INGREDIENTS</h3>
              <ul className="steps-list">
                {ingredients.map((item) => (
                  <li key={item.id}>{item.label}</li>
                ))}
              </ul>
            </div>

            {/* Method steps panel */}
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

          {/* Link to practice this recipe in the game */}
          <div style={{ display: "flex", justifyContent: "center", padding: "24px" }}>
            <Link
              href={`/practice/beginner/${recipeId}`}
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