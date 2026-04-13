"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Card = {
  id: string;
  label: string;
  type: string;
  icon_url: string;
  correct_order: number;
};

type Step = {
  id: string;
  step_number: number;
  instruction: string;
};

export default function PracticeGamePage({
  params,
}: {
  params: Promise<{ recipe: string }>;
}) {
  const { recipe: recipeId } = use(params);
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [recipeName, setRecipeName] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayedCards, setDisplayedCards] = useState<Card[]>([]);
  const [dropped, setDropped] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFail, setShowFail] = useState(false);
  const dragId = useRef<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: recipeData } = await supabase
        .from("recipes")
        .select("name")
        .eq("id", recipeId)
        .single();

      if (recipeData) setRecipeName(recipeData.name);

      const { data: stepsData } = await supabase
        .from("steps")
        .select("*")
        .eq("recipe_id", recipeId)
        .order("step_number");

      if (stepsData) setSteps(stepsData);

      const { data: cardsData } = await supabase
        .from("cards")
        .select("*")
        .eq("recipe_id", recipeId)
        .order("correct_order");

      if (cardsData) {
        setCards(cardsData);
        setDisplayedCards(pickCards(cardsData, 0));
      }

      setLoading(false);
    };

    fetchData();
  }, [recipeId]);

  const pickCards = (allCards: Card[], stepIdx: number) => {
    const correctCard = allCards.find((c) => c.correct_order === stepIdx + 1) ?? allCards[0];
    const decoys = allCards
      .filter((c) => c.id !== correctCard.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    return [...decoys, correctCard].sort(() => Math.random() - 0.5);
  };

  const currentStep = steps[currentStepIndex];
  const correctCard = cards.find((c) => c.correct_order === currentStepIndex + 1) ?? cards[0];
  const droppedCard = displayedCards.find((c) => c.id === dropped);

  const handleDragStart = (id: string) => { dragId.current = id; };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (!dragId.current || !correctCard) return;

    const droppedCardId = dragId.current;
    setDropped(droppedCardId);

    if (droppedCardId === correctCard.id) {
      setFeedback("correct");
      setTimeout(() => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex >= steps.length) {
          router.push(`/practice/complete?recipe=${recipeId}&mistakes=${mistakes}`);
        } else {
          setCurrentStepIndex(nextIndex);
          setDisplayedCards(pickCards(cards, nextIndex));
          setDropped(null);
          setFeedback(null);
        }
      }, 800);
    } else {
      const newMistakes = mistakes + 1;
      setFeedback("wrong");
      setMistakes(newMistakes);

      if (newMistakes >= 6) {
        setTimeout(() => {
          setCurrentStepIndex(0);
          setDisplayedCards(pickCards(cards, 0));
          setDropped(null);
          setFeedback(null);
          setMistakes(0);
          setShowFail(true);
        }, 800);
      } else {
        setTimeout(() => {
          setDropped(null);
          setFeedback(null);
        }, 1000);
      }
    }
  };

  if (loading) {
    return (
      <main className="game-page">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, color: "rgba(255,255,255,0.5)", fontSize: "14px", letterSpacing: "2px" }}>
          LOADING...
        </div>
      </main>
    );
  }

  return (
    <main className="game-page">
      {/* fail banner */}
      {showFail && (
        <div className="game-fail-overlay">
          <div className="game-fail-box">
            <div className="game-fail-icon">💀</div>
            <h2 className="game-fail-title">OOPS!</h2>
            <p className="game-fail-desc">RECIPE RESET YOU MADE 6 MISTAKES 😔</p>
            <div className="game-fail-actions">
              <button className="game-fail-btn game-fail-btn--retry" onClick={() => setShowFail(false)}>
                🔄 RETRY
              </button>
              <Link href="/practice/advanced" className="game-fail-btn game-fail-btn--back">
                ← BACK TO RECIPES
              </Link>
            </div>
          </div>
        </div>
      )}

      <header className="game-header">
        <Link href="/practice" className="game-back" aria-label="Back">
          <span>←</span>
        </Link>
        <h1 className="game-title">PRACTICE MODE</h1>
        <div className="game-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

      <div className="game-body">
        <aside className="game-quest">
          <div className="game-quest-title">Quest log</div>
          <div className="game-quest-recipe">
            Current Recipe:<br /><strong>{recipeName}</strong>
          </div>
          <ul className="game-quest-list">
            {steps.map((step, i) => (
              <li key={step.id} className={`game-quest-item ${i < currentStepIndex ? "done" : ""}`}>
                <span className="game-quest-dot">{i < currentStepIndex ? "✓" : ""}</span>
                Step {step.step_number}
              </li>
            ))}
          </ul>
        </aside>

        <div className="game-challenge">
          {currentStep && (
            <p className="game-prompt">{currentStep.instruction}</p>
          )}

          <div className="game-drop-row">
            <div
              className={`game-dropzone ${dragOver ? "drag-over" : ""} ${dropped ? "has-card" : ""} ${feedback === "correct" ? "correct" : ""} ${feedback === "wrong" ? "wrong" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {droppedCard ? (
                <div className={`game-card game-card--${droppedCard.type.toLowerCase()} placed`}>
                  <div className="game-card-type">{droppedCard.type}</div>
                  <div className="game-card-icon">
                    <img src={droppedCard.icon_url} alt={droppedCard.label} style={{ width: 40, height: 40, objectFit: "contain" }} />
                  </div>
                  <div className="game-card-label">{droppedCard.label}</div>
                </div>
              ) : (
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "1px" }}>
                  DROP HERE
                </span>
              )}
            </div>
            <div className="game-drop-hint">
              {feedback === "correct" && <span style={{ color: "#4caf50", fontSize: "22px" }}>✓ Correct!</span>}
              {feedback === "wrong" && <span style={{ color: "#f44336", fontSize: "22px" }}>✗ Try again!</span>}
              {!feedback && <span>&lt; DRAG THE CORRECT CARD HERE</span>}
            </div>
          </div>

          <div className="game-progress">
            Step {currentStepIndex + 1} of {steps.length}
            {mistakes > 0 && (
              <span style={{ marginLeft: "16px", color: "#f44336" }}>
                {mistakes} mistake{mistakes > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="game-tray">
        {displayedCards.map((card) => (
          <div
            key={card.id}
            className={`game-card game-card--${card.type.toLowerCase()} ${dropped === card.id ? "used" : ""}`}
            draggable={!dropped}
            onDragStart={() => handleDragStart(card.id)}
          >
            <div className="game-card-type">{card.type}</div>
            <div className="game-card-icon">
              <img src={card.icon_url} alt={card.label} style={{ width: 40, height: 40, objectFit: "contain" }} />
            </div>
            <div className="game-card-label">{card.label}</div>
          </div>
        ))}
      </div>
    </main>
  );
}