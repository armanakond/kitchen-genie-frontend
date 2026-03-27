import Image from "next/image";
import Link from "next/link";

const PATHS = [
  {
    title: "BEGINNER",
    desc: "Simple recipes & basics. Perfect for beginners.",
    hearts: 1,
    href: "/learn/recipes/beginner",
  },
  {
    title: "INTERMEDIATE",
    desc: "Knife skills, sauces and balanced 30 minute meals.",
    hearts: 2,
    href: "/learn/recipes/intermediate",
  },
  {
    title: "ADVANCED",
    desc: "Complex flavours & dinner party showstoppers.",
    hearts: 3,
    href: "/learn/recipes/advanced",
  },
];

export default function RecipeDetailSelectionPage() {
  return (
    <main className="prac-page">
      <header className="prac-header">
        <Link href="/learn" className="prac-home-btn" aria-label="Back">
          <span style={{ fontSize: "22px" }}>←</span>
        </Link>

        <h1 className="prac-title">RECIPE DETAIL SELECTION</h1>

        <div className="prac-logo">
          <Image src="/images/Logo.png" alt="Kitchen Genie" width={90} height={90} priority />
        </div>
      </header>

      <section className="prac-cards">
        {PATHS.map((p) => (
          <div key={p.title} className="prac-card">
            <div className="prac-card-title">{p.title}</div>
            <p className="prac-card-desc">{p.desc}</p>
            <div className="prac-hearts">
              {Array.from({ length: p.hearts }).map((_, i) => (
                <Image
                  key={i}
                  src="/images/redpixelheart.png"
                  alt="Heart"
                  width={38}
                  height={38}
                />
              ))}
            </div>
            <Link href={p.href} className="prac-card-btn">
              CHOOSE PATH
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}