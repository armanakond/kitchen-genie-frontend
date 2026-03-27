"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const QUEST_LOG = [
  { label: "Prepare Ingredients", done: true },
  { label: "Boil Pasta", done: false },
  { label: "Saute Aromatics", done: false },
  { label: "Simmer Sauce", done: false },
];

// Later this will come from Supabase based on the recipe id
const CARDS = [
  { id: "onion", type: "INGREDIENT", label: "Onion", icon: "🧅" },
  { id: "saute", type: "ACTION", label: "Saute", icon: "🍲" },
  { id: "pasta", type: "INGREDIENT", label: "Pasta", icon: "🍝" },
  { id: "chop", type: "ACTION", label: "Chop", icon: "🔪" },
  { id: "garlic", type: "INGREDIENT", label: "Garlic", icon: "🧄" },
  { id: "boil", type: "ACTION", label: "Boil", icon: "♨️" },
];

const CORRECT_ANSWER = "boil";

export default function PracticeGamePage({
  params,
}: {
  params: { recipe: string };
}) {
  const router = useRouter();
  const [dropped, setDropped] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const dragId = useRef<string | null>(null);

  // Format recipe name from url slug e.g. "garlic-butter-pasta" → "Garlic Butter Pasta"
  const recipeName = params.recipe
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const handleDragStart = (id: string) => { dragId.current = id; };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (dragId.current) setDropped(dragId.current);
  };

  const handleSubmit = () => {
    router.push("/practice/complete");
  };

  const droppedCard = CARDS.find((c) => c.id === dropped);

  return (
    <main className="game-page">
      {/* header */}
      <header className="game-header">
        <Link href="/practice" className="game-back" aria-label="Back">
          <span>←</span>
        </Link>
        <h1 className="game-title">PRACTICE MODE</h1>
        <div className="game-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

      {/* body */}
      <div className="game-body">
        {/* quest log */}
        <aside className="game-quest">
          <div className="game-quest-title">Quest log</div>
          <div className="game-quest-recipe">
            Current Recipe:<br /><strong>{recipeName}</strong>
          </div>
          <ul className="game-quest-list">
            {QUEST_LOG.map((q) => (
              <li key={q.label} className={`game-quest-item ${q.done ? "done" : ""}`}>
                <span className="game-quest-dot">{q.done ? "✓" : ""}</span>
                {q.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* challenge area */}
        <div className="game-challenge">
          <p className="game-prompt">&ldquo;Boil the water in large pot&rdquo;</p>

          <div className="game-drop-row">
            <div
              className={`game-dropzone ${dragOver ? "drag-over" : ""} ${dropped ? "has-card" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {droppedCard && (
                <div className={`game-card game-card--${droppedCard.type.toLowerCase()} placed`}>
                  <div className="game-card-type">{droppedCard.type}</div>
                  <div className="game-card-icon">{droppedCard.icon}</div>
                  <div className="game-card-label">{droppedCard.label}</div>
                </div>
              )}
            </div>
            <div className="game-drop-hint">
              <span className="game-drop-arrow">&lt;</span> DRAG THE CORRECT CARD HERE
            </div>
          </div>

          <div className="game-submit-row">
            <span className="game-submit-hint">CLICK HERE TO FINISH CHALLENGE</span>
            <button
              className="game-submit-btn"
              onClick={handleSubmit}
              disabled={!dropped}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      {/* card tray */}
      <div className="game-tray">
        {CARDS.map((card) => (
          <div
            key={card.id}
            className={`game-card game-card--${card.type.toLowerCase()} ${dropped === card.id ? "used" : ""}`}
            draggable
            onDragStart={() => handleDragStart(card.id)}
          >
            <div className="game-card-type">{card.type}</div>
            <div className="game-card-icon">{card.icon}</div>
            <div className="game-card-label">{card.label}</div>
          </div>
        ))}
      </div>
    </main>
  );
}