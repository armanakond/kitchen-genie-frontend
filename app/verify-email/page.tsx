import Image from "next/image";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <main className="screen authScreen">
      <header className="brand">
        <Image src="/images/logo.png" alt="Kitchen Genie logo" width={200} height={200} priority />
      </header>

      <section className="authCard">
        <div className="authCardHeader">
          <h1 className="authTitle">CHECK YOUR EMAIL</h1>
          <p className="authSubtitle">
            We've sent a verification link to your email address.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <p style={{ color: "rgba(243,241,255,0.7)", fontSize: "13px", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
            Click the link in your email to verify your account before logging in.
          </p>

          <div style={{ fontSize: "48px" }}>📧</div>

          <p style={{ color: "rgba(243,241,255,0.45)", fontSize: "12px", textAlign: "center", margin: 0 }}>
            Didn't receive it? Check your spam folder.
          </p>
        </div>

        <p className="authFooter">
          Already verified?{" "}
          <Link className="authLink" href="/login">
            Login here
          </Link>
        </p>
      </section>
    </main>
  );
}
