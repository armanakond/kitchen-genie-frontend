//app/tutorial/page.tsx
//tutorial page 1, introduces the app and explains the core game mechanics
//new users are redirected here after signing up before reaching the dashboard

import Image from "next/image";
import Link from "next/link";

export default function TutorialPage() {
  return (
    <main className="tut-page">
      {/* Header */}
      <header className="tut-header">
        <h1 className="tut-title">HOW TO PLAY</h1>
        <div className="tut-logo">
          <Image src="/images/logo.png" alt="Kitchen Genie Logo" width={100} height={100} priority />
        </div>
      </header>

      {/* Body */}
      <section className="tut-body">
        <div className="tut-text">

          <p className="tut-lead">
            <span className="tut-bold">Welcome to Kitchen Genie!</span>
            <br />
            Your gamified cooking companion. Here's everything you need to know before you start.
          </p>

          <div className="tut-rule">
            <h2 className="tut-rule-title">🍳 How the Game Works</h2>
            <p className="tut-rule-desc">
              Each recipe is broken down into individual steps. For every step, you will be shown
              an instruction e.g. <span className="tut-bold">"Boil the pasta"</span>,
              you must drag the correct card from the tray at the bottom of the screen into the drop
              zone. Cards come in two types: <span className="tut-bold">green INGREDIENT cards</span> for
              ingredients you need, and <span className="tut-bold">orange ACTION cards</span> for
              cooking techniques and methods.
            </p>
          </div>

          <div className="tut-rule">
            <h2 className="tut-rule-title">🎯 Earning Stars and XP</h2>
            <p className="tut-rule-desc">
              Your performance is rated with up to 3 stars at the end of each recipe.
              Complete a recipe with <span className="tut-bold">no mistakes</span> to earn 3 stars and
              100 XP. Make 1–3 mistakes for 2 stars and 75 XP, or 4–5 mistakes for 1 star and 50 XP.
              XP accumulates to increase your player level — the more you cook, the higher you climb!
            </p>
          </div>

          <div className="tut-rule">
            <h2 className="tut-rule-title">⏱ Beat the Clock</h2>
            <p className="tut-rule-desc">
              Each recipe has a countdown timer. Beginner recipes give you 3 minutes,
              intermediate gives you 2 minutes, and advanced gives you just 90 seconds.
              If the timer runs out before you finish, the recipe resets, so think fast!
            </p>
          </div>

        </div>

        {/* Navigation buttons */}
        <div className="tut-actions">
          <Link className="tut-btn" href="/tutorial/step2">NEXT →</Link>
          <Link className="tut-btn" href="/dashboard">SKIP TUTORIAL</Link>
        </div>
      </section>
    </main>
  );
}