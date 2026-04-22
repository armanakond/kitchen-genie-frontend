//practice mode selection page, allows users to select difficulty
//each difficulty routes to recipe selection page thjen to the game
//each difficulty routes to a recipe selection page and then the game after
//hearts = difficulty indicator

import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";

export default function PracticePage() {

  //difficulty paths
  const paths = [
    {
      title: "BEGINNER",
      desc: "Simple recipes & basics. Perfect for beginners.",
      hearts: 1,
      available: true,
      href: "/practice/beginner",
    },
    {
      title: "INTERMEDIATE",
      desc: "Knife skills, sauces and balanced 30 minute meals.",
      hearts: 2,
      available: true,
      href: "/practice/intermediate",
    },
    {
      title: "ADVANCED",
      desc: "Complex flavours & dinner party showstoppers.",
      hearts: 3,
      available: true,
      href: "/practice/advanced",
    },
  ];

  return (

    <main className="prac-page">
      <PageHeader title="PRACTICE MODE" backHref="/dashboard" />
      {/*difficulty selection cards */}
      <section className="prac-cards">
        {paths.map((p) => (
          <div key={p.title} className="prac-card">
            <div className="prac-card-title">{p.title}</div>
            <p className="prac-card-desc">{p.desc}</p>

            {/*hearts showing difficulty (more hearts = harder) */}
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
            {p.available ? (
              <Link href={p.href} className="prac-card-btn">
                CHOOSE PATH
              </Link>
            ) : (
              <button className="prac-card-btn prac-card-btn--locked" disabled>
                N/A
              </button>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}