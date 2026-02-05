import Image from "next/image";
import Link from "next/link";

export default function TutorialStep2Page() {
  return (
    <main className="tut-page">
      {/* header */}
      <header className="tut-header">
        {/* back button */}
        <Link href="/tutorial" className="tut-back" aria-label="Back to tutorial step 1">
          <Image src="/images/left-arrow.png" alt="Back Arrow" width={24} height={24}></Image>
        </Link>

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

      {/* body */}
      <section className="tut-body">
        <div className="tut-text">
          <p className="tut-lead">
            <span className="tut-bold">How it works:</span>
            <br />
            Learn how to use Kitchen Genie in minutes.
          </p>

          <div className="tut-rule">
            <h2 className="tut-rule-title">RULE 4: Order Matters!</h2>
            <p className="tut-rule-desc">
              Cards must not be in the wrong order otherwise it can change the outcome.
              <br />
              Learn the logic behind cooking steps, not just the results.
            </p>
          </div>

          <div className="tut-rule">
            <h2 className="tut-rule-title">RULE 5: Learn From Mistakes</h2>
            <p className="tut-rule-desc">
              Mistakes are not failures, KitchenGenie will show you exactly where you went wrong
              so you can improve.
            </p>
          </div>
        </div>

        {/* button on bottom right */}
        <div className="tut-actions">
          <Link className="tut-btn" href="/dashboard">
            FINISH TUTORIAL
          </Link>
        </div>
      </section>
    </main>
  );
}
