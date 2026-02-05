import Image from "next/image";
import Link from "next/link";

export default function TutorialPage() {
  return (
    <main className="tut-page">
      {/* Header */}
      <header className="tut-header">
        <h1 className="tut-title">TUTORIAL PAGE</h1>

        <div className="tut-logo">
          <Image
            src="/images/Logo.png"
            alt="Kitchen Genie Logo"
            width={200}
            height={200}
            priority
          />
        </div>
      </header>

      {/* Body */}
      <section className="tut-body">
        <div className="tut-text">
          <p className="tut-lead">
            <span className="tut-bold">How it works:</span>
            <br />
            Learn how to use Kitchen Genie in minutes.
          </p>

          <div className="tut-rule">
            <h2 className="tut-rule-title">RULE 1: Learn by Cooking</h2>
            <p className="tut-rule-desc">
              Kitchen Genie teaches cooking through step-by-step interactive cards.
              <br />
              Each card represents a cooking action
            </p>
          </div>

          <div className="tut-rule">
            <h2 className="tut-rule-title">RULE 2: Drag &amp; Drop</h2>
            <p className="tut-rule-desc">
              Combine <span className="tut-bold">INGREDIENTS</span> and{" "}
              <span className="tut-bold">ACTIONS</span> in the portal. Order matters
              for perfect combos.
            </p>
          </div>

          <div className="tut-rule">
            <h2 className="tut-rule-title">RULE 3: Earn XP</h2>
            <p className="tut-rule-desc">
              Complete quests to gain XP and unlock more recipes as you level up.
              Rise to become a grandmaster chef the kitchen!
            </p>
          </div>
        </div>

        {/* Buttons bottom-right */}
        <div className="tut-actions">
          <Link className="tut-btn" href="/tutorial/step2">
            NEXT
          </Link>

          <Link className="tut-btn" href="/dashboard">
            SKIP TUTORIAL
          </Link>
        </div>
      </section>
    </main>
  );
}
