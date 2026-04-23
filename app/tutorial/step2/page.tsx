//app/tutorial/step2/page.tsx
//tutorial page 2, explains hints, difficulty levels, and the learn section
//reached by clicking NEXT on tutorial page 1

import Image from "next/image";
import Link from "next/link";

export default function TutorialStep2Page() {
  return (
    <main className="tut-page">
      {/* Header */}
      <header className="tut-header">
        <Link href="/tutorial" className="btn-back" aria-label="Back to tutorial step 1">←</Link>
        <h1 className="tut-title">HOW TO PLAY</h1>
        <div className="tut-logo">
          <Image src="/images/logo.png" alt="Kitchen Genie Logo" width={90} height={90} priority />
        </div>
      </header>

      {/* Body */}
      <section className="tut-body">
        <div className="tut-text">

          <p className="tut-lead">
            <span className="tut-bold">A few more things to know:</span>
            <br />
            Tips to help you get the most out of Kitchen Genie.
          </p>

          <div className="tut-rule">
            <h2 className="tut-rule-title">💡 Use Your Hints</h2>
            <p className="tut-rule-desc">
              Made a wrong guess? Don't worry, Kitchen Genie will give you a hint after each
              mistake telling you whether you need an <span className="tut-bold">ingredient (green card)</span> or
              an <span className="tut-bold">action (orange card)</span>. You have up to
              6 mistakes before the recipe resets, so use your hints wisely!
            </p>
          </div>

          <div className="tut-rule">
            <h2 className="tut-rule-title">📚 Learn Before You Practice</h2>
            <p className="tut-rule-desc">
              Not sure where to start? Head to the <span className="tut-bold">Learn</span> section
              first. Each recipe has a detail page showing the full ingredients list and step by step
              method so you can study it before attempting the practice game. Quick Recipes are also
              available for when you are short on time, these are simple meals that take under 10 minutes.
            </p>
          </div>

          <div className="tut-rule">
            <h2 className="tut-rule-title">🏆 Choose Your Difficulty</h2>
            <p className="tut-rule-desc">
              Kitchen Genie has three difficulty levels: <span className="tut-bold">Beginner</span>,
              {" "}<span className="tut-bold">Intermediate</span>, and <span className="tut-bold">Advanced</span>.
              Start with Beginner recipes to get comfortable with the game mechanics, then
              progress to more complex recipes as your confidence grows. Save your favourite
              completed recipes to your profile to replay them anytime!
            </p>
          </div>

        </div>

        {/* Navigation button */}
        <div className="tut-actions">
          <Link className="tut-btn" href="/dashboard">START COOKING →</Link>
        </div>
      </section>
    </main>
  );
}