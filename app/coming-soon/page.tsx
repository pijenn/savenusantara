import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header with Logo Long */}
      <nav>
        <Link href="/" className="logo-link">
          <img
            src="/assets/Logo Long.png"
            alt="Save Nusantara"
            className="logo-long-img"
          />
        </Link>
        <div className="nav-links">
          <Link
            href="/"
            className="btn-sketch outline"
            style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }}
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Coming Soon Content */}
      <main
        className="container"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          className="sketch-box urgent"
          style={{ maxWidth: "600px", width: "100%", padding: "3rem 2rem" }}
        >
          <img
            src="/assets/Logo.png"
            alt="Save Nusantara Logo"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              margin: "0 auto 1.25rem",
              display: "block",
            }}
          />
          <span className="handwritten red-accent">
            Preparing Direct Ground Relief...
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              margin: "0.5rem 0 1rem",
            }}
          >
            Coming <span className="red-underline">Soon</span>.
          </h1>
          <p
            style={{
              color: "var(--ink-muted)",
              fontSize: "1.05rem",
              marginBottom: "2rem",
            }}
          >
            Our direct QRIS donation portal, Kalimantan volunteer deployment
            registration, and emergency aid dispatch line are being finalized.
            Follow our journey and updates on our official social media.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/" className="btn-sketch">
              ← Return to Home
            </Link>
            <a
              href="https://instagram.com/saveournusantara"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sketch outline"
            >
              Follow @saveournusantara
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <p
          className="typewriter"
          style={{
            fontSize: "1.1rem",
            color: "var(--ink-black)",
            marginBottom: "0.4rem",
          }}
        >
          SAVE NUSANTARA — WORK FROM YOUR HEART.
        </p>
        <a
          href="https://instagram.com/saveournusantara"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
        >
          <span>Our Social Media: @saveournusantara</span>
        </a>
      </footer>
    </div>
  );
}
