import Image from "next/image";
import Link from "next/link";

export default function LearnPage() {
  return (
    <main className="learn-page">
      <header className="learn-header">
        <Link href="/dashboard" className="learn-home-btn" aria-label="Back to menu">
          <span className="learn-home-icon">🏠</span>
          <span>BACK TO MENU</span>
        </Link>
        <h1 className="learn-title">LEARN TO COOK</h1>
        <div className="learn-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

      <section className="learn-cards">
        <div className="learn-card">
          <div className="learn-card-title">RECIPE DETAIL</div>
          <p className="learn-card-desc">
            Step-by-step guided recipe instructions.
          </p>
          <Link href="/learn/recipes" className="learn-card-btn">
            CHOOSE PATH
          </Link>
        </div>

        <div className="learn-card">
          <div className="learn-card-title">QUICK RECIPES</div>
          <p className="learn-card-desc">
            Quick meals, perfect for busy university schedules.
          </p>
          <Link href="/learn/quick" className="learn-card-btn">
            CHOOSE PATH
          </Link>
        </div>
      </section>
    </main>
  );
}