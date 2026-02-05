import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="dash-page">
      {/* sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-logo">
          <Image
            src="/images/Logo.png"
            alt="Kitchen Genie"
            width={200}
            height={200}
            priority
          />
        </div>

        <nav className="dash-nav">
          <Link className="dash-btn" href="/learn">LEARN</Link>
          <Link className="dash-btn" href="/practice">PRACTICE</Link>
          <Link className="dash-btn" href="/saved">SAVED RECIPES</Link>
          <Link className="dash-btn" href="/">LOG OUT</Link>
        </nav>
      </aside>

      {/* main */}
      <section className="dash-main">
        {/* top XP bar */}
        <div className="dash-topbar">
          <div className="dash-lvl">LVL 12</div>
          <div className="dash-xpbar">
            <div className="dash-xpfill" style={{ width: "0%" }} />
          </div>
          <div className="dash-xptext">0/1000 XP</div>
        </div>

        {/* center hero, main headline + stats */}
        <div className="dash-content">
          {/* hero */}
          <div className="dash-hero">
            <h1 className="dash-title">
              LEARN COOKING,
              <br />
              ONE CARD AT A TIME.
            </h1>

            <h2 className="dash-subtitle">CHALLENGE YOURSELF</h2>
            <p className="dash-desc">Choose your next mission to earn XP.</p>
          </div>

          {/* Stats box */}
          <div className="dash-stats">
            <div className="dash-stat">
              <div className="dash-stat-label">LEVEL</div>
              <div className="dash-stat-value">12</div>
            </div>

            <div className="dash-stat">
              <div className="dash-stat-label">RECIPES MASTERED</div>
              <div className="dash-stat-value">13</div>
            </div>

            <div className="dash-stat">
              <div className="dash-stat-label">DAILY STREAK</div>
              <div className="dash-stat-value">5</div>
            </div>

            <div className="dash-stat">
              <div className="dash-stat-label">TOTAL XP</div>
              <div className="dash-stat-value">1000</div>
            </div>
          </div>
        </div>

        {/* Paths */}
        <div className="dash-paths">
          <div className="dash-card">
            <div className="dash-card-title">BEGINNER</div>
            <div className="dash-card-text">
              Simple recipes & basics.
              <br />
              Perfect for freshmen.
            </div>
            <div className="dash-hearts">
              <Image src="/images/redpixelheart.png" alt="Heart" width={55} height={55} />
            </div>
            <button className="dash-card-btn">CHOOSE PATH</button>
          </div>

          <div className="dash-card">
            <div className="dash-card-title">INTERMEDIATE</div>
            <div className="dash-card-text">
              Knife skills, sauces and
              <br />
              balanced 30 minute meals.
            </div>
            <div className="dash-hearts">
              <Image src="/images/redpixelheart.png" alt="Heart" width={55} height={55} />
              <Image src="/images/redpixelheart.png" alt="Heart" width={55} height={55} />
            </div>
            <button className="dash-card-btn">CHOOSE PATH</button>
          </div>

          <div className="dash-card">
            <div className="dash-card-title">ADVANCED</div>
            <div className="dash-card-text">
              Complex flavours &
              <br />
              dinner party showstoppers.
            </div>
            <div className="dash-hearts">
              <Image src="/images/redpixelheart.png" alt="Heart" width={55} height={55} />
              <Image src="/images/redpixelheart.png" alt="Heart" width={55} height={55} />
              <Image src="/images/redpixelheart.png" alt="Heart" width={55} height={55} />
            </div>
            <button className="dash-card-btn">CHOOSE PATH</button>
          </div>
        </div>
      </section>
    </main>
  );
}
