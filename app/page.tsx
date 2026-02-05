
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="screen">
      <header className="brand">
        <div>
          <Image
            src="/images/logo.png"
            alt="Kitchen Genie logo"
            width={200}
            height={200}
            priority
          />
        </div>
      </header>

      <section className="panel">
        <h1 className="headline">
          MASTER THE KITCHEN
          <span className="gold">ONE CARD AT A TIME</span>
        </h1>

        <p className="subtext">
          The gamified cooking platform for students with limited time and a hunger for learning
        </p>

        <div className="actions">
          <Link href="/signup" className="btn">SIGN UP</Link>

          <div className="divider">OR</div>

          <Link href="/login" className="btn">LOGIN</Link>
        </div>
      </section>
    </main>
  );
}
