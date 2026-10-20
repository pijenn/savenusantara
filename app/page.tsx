"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface StoryItem {
  img: string;
  alt: string;
  title: string;
  desc: string;
}

const STORY_ITEMS: StoryItem[] = [
  {
    img: "/assets/n1.png",
    alt: "Burning forest in Kalimantan",
    title: "Forests in Flames",
    desc: "Karhutla in Kalimantan is devouring ecosystems faster than emergency teams can contain it.",
  },
  {
    img: "/assets/n2.png",
    alt: "Terrified wildlife fleeing forest fire",
    title: "Nowhere Left to Cling",
    desc: "Countless native animals lose their homes, choking in the heat with nowhere left to run.",
  },
  {
    img: "/assets/n8.png",
    alt: "Lungs filled with toxic smoke",
    title: "Every Breath Hurts",
    desc: "Thick toxic haze fills the lungs of residents day and night, triggering severe health crises.",
  },
  {
    img: "/assets/n3.png",
    alt: "Citizen wearing a mask in distress",
    title: "Trapped Behind Masks",
    desc: "Families live under grey skies and recurring earthquakes, waiting for aid that takes too long to arrive.",
  },
  {
    img: "/assets/n9.png",
    alt: "Crying infant affected by disaster",
    title: "The Most Vulnerable Cry Out",
    desc: "Infants and children bear the heaviest pain while relief gets stuck in long bureaucratic chains.",
  },
];

const HERO_LINE_1 = "Nusantara is Hurting.";
const HERO_LINE_2_PRE = "Your Repost Won't Put Out the ";
const HERO_LINE_2_FIRE = "Fire";
const HERO_LINE_2_POST = ".";
const TOTAL_CHARS =
  HERO_LINE_1.length +
  HERO_LINE_2_PRE.length +
  HERO_LINE_2_FIRE.length +
  HERO_LINE_2_POST.length;

export default function HomePage() {
  // 8. Organic First-Load Splash State
  const [isLoading, setIsLoading] = useState(true);
  const [removeLoaderDom, setRemoveLoaderDom] = useState(false);

  // 2. Hero Writing Animation State
  const [typedCount, setTypedCount] = useState(0);

  // 4. Section 3 Dramatic Scroll-Reveal State
  const whySectionRef = useRef<HTMLElement | null>(null);
  const [whyInView, setWhyInView] = useState(false);

  // 7. Background Firewood Audio State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const userManuallyPausedRef = useRef(false);

  // Handle initial organic loading animation timing
  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);

    const removeTimer = setTimeout(() => {
      setRemoveLoaderDom(true);
    }, 3350);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Start Hero title writing animation once loader begins exiting
  useEffect(() => {
    if (isLoading) return;

    let current = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNextChar = () => {
      current += 1;
      setTypedCount(current);

      if (current < TOTAL_CHARS) {
        // Organic human writing cadence: slight pause after period/line break
        const isPausePoint = current === HERO_LINE_1.length;
        const jitter = Math.floor(Math.random() * 28);
        const delay = isPausePoint ? 420 : 48 + jitter;
        timeoutId = setTimeout(typeNextChar, delay);
      }
    };

    timeoutId = setTimeout(typeNextChar, 250);
    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  // Observe Section 3 (#why) for dramatic entrance + continuous animations
  useEffect(() => {
    const el = whySectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWhyInView(true);
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Background firewood audio initialization & first-interaction fallback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;

    const tryPlay = () => {
      if (!audioRef.current || userManuallyPausedRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingAudio(true);
        })
        .catch(() => {
          // Waiting for first user gesture if autoplay blocked by browser
        });
    };

    tryPlay();

    const handleFirstInteraction = () => {
      if (!userManuallyPausedRef.current && audioRef.current?.paused) {
        tryPlay();
      }
    };

    window.addEventListener("pointerdown", handleFirstInteraction, {
      passive: true,
    });
    window.addEventListener("keydown", handleFirstInteraction, {
      passive: true,
    });
    window.addEventListener("scroll", handleFirstInteraction, {
      passive: true,
      once: true,
    });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userManuallyPausedRef.current = false;
      audio.volume = 0.45;
      audio
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => setIsPlayingAudio(false));
    } else {
      userManuallyPausedRef.current = true;
      audio.pause();
      setIsPlayingAudio(false);
    }
  };

  // Compute slices for the Hero writing animation
  const line1Text = HERO_LINE_1.slice(0, Math.min(typedCount, HERO_LINE_1.length));
  const afterLine1 = Math.max(0, typedCount - HERO_LINE_1.length);
  const line2PreText = HERO_LINE_2_PRE.slice(
    0,
    Math.min(afterLine1, HERO_LINE_2_PRE.length)
  );
  const afterPre = Math.max(0, afterLine1 - HERO_LINE_2_PRE.length);
  const line2FireText = HERO_LINE_2_FIRE.slice(
    0,
    Math.min(afterPre, HERO_LINE_2_FIRE.length)
  );
  const afterFire = Math.max(0, afterPre - HERO_LINE_2_FIRE.length);
  const line2PostText = HERO_LINE_2_POST.slice(
    0,
    Math.min(afterFire, HERO_LINE_2_POST.length)
  );

  return (
    <>
      {/* Background Firewood Audio */}
      <audio
        ref={audioRef}
        src="/audio/Fire Wood Burning Sound Effect.mp3"
        loop
        preload="auto"
      />

      {/* 8. ORGANIC FIRST-LOAD SPLASH OVERLAY */}
      {!removeLoaderDom && (
        <div
          className={`loader-overlay ${!isLoading ? "loader-exit" : ""}`}
          onClick={() => setIsLoading(false)}
          role="status"
          aria-label="Loading Save Nusantara"
        >
          <div className="loader-stage">
            {/* Organic Hand-Drawn SVG Brush/Sketch Rings */}
            <svg
              className="loader-svg-rings"
              viewBox="0 0 220 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="loader-ring-1"
                d="M110 14C164 11 206 53 204 109C202 165 159 205 107 206C54 207 13 163 15 108C17 55 58 17 110 14Z"
                stroke="#121212"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 6"
              />
              <path
                className="loader-ring-2"
                d="M112 24C158 26 195 62 193 112C191 161 151 195 105 193C59 191 24 155 26 106C28 59 67 22 112 24Z"
                stroke="#D61C1C"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>

            {/* Floating Organic Ember Particles */}
            <span
              className="loader-ember"
              style={{
                width: "7px",
                height: "7px",
                left: "28%",
                bottom: "25%",
                animationDelay: "0.1s",
              }}
            />
            <span
              className="loader-ember"
              style={{
                width: "5px",
                height: "5px",
                right: "24%",
                bottom: "30%",
                animationDelay: "0.6s",
              }}
            />
            <span
              className="loader-ember"
              style={{
                width: "6px",
                height: "6px",
                left: "48%",
                bottom: "18%",
                animationDelay: "1.1s",
              }}
            />

            {/* Logo of Nusantara */}
            <div className="loader-logo-wrap">
              <img
                src="/assets/Logo.png"
                alt="Save Nusantara Logo"
                className="loader-logo-img"
              />
            </div>
          </div>

          <div className="loader-caption">
            <p className="handwritten red-accent" style={{ fontSize: "1.75rem" }}>
              Work from your Heart...
            </p>
            <div className="loader-ink-bar">
              <div className="loader-ink-fill" />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Header with Logo Long */}
      <nav>
        <a href="#" className="logo-link" aria-label="Save Nusantara Home">
          <img
            src="/assets/Logo Long.png"
            alt="Save Nusantara"
            className="logo-long-img"
          />
        </a>
        <div className="nav-links">
          <a href="#happening">What&apos;s Happening</a>
          <a href="#why">Why Us</a>
          <a href="#about">S.A.V.E</a>
          <a href="#solution">Our Action</a>
          <Link
            href="/coming-soon"
            className="btn-sketch"
            style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }}
          >
            Help Now
          </Link>
        </div>
      </nav>

      {/* 1. HERO: A SIGN FOR HELP */}
      <header className="hero">
        {/* n6.png: Bloodshot Eye */}
        <img
          src="/assets/n6.png"
          alt="Bloodshot eye witnessing Indonesia's disasters"
          className="hero-eye"
        />
        <p className="handwritten red-accent">
          Are we just going to keep watching through our screens?
        </p>

        {/* Animated Writing Title */}
        <h1 aria-label="Nusantara is Hurting. Your Repost Won't Put Out the Fire.">
          <span>{line1Text}</span>
          {typedCount > HERO_LINE_1.length && <br />}
          <span>{line2PreText}</span>
          {line2FireText && (
            <span className="red-underline">{line2FireText}</span>
          )}
          <span>{line2PostText}</span>
          <span className="writing-cursor" aria-hidden="true" />
        </h1>

        <p className="hero-desc">
          An independent, student-led non-profit movement delivering rapid,
          direct-to-victim emergency relief across Indonesia. Work from your
          heart.
        </p>
        <div className="hero-ctas">
          <Link href="/coming-soon" className="btn-sketch">
            Send Direct Aid
          </Link>
          <Link href="/coming-soon" className="btn-sketch outline">
            Need Emergency Aid?
          </Link>
        </div>
      </header>

      <hr className="section-divider" />

      {/* 2. WHAT IS HAPPENING IN INDONESIA? (LEFT-TO-RIGHT ON DESKTOP, STATIC ON MOBILE) */}
      <section id="happening" className="container">
        <div className="pain-header">
          <span className="handwritten red-accent">
            What is happening in Indonesia?
          </span>
          <h2>The Air is Turning to Ash. The Ground Keeps Shaking.</h2>
          <p
            style={{
              maxWidth: "660px",
              margin: "0 auto",
              color: "var(--ink-muted)",
            }}
          >
            Escalating ecological disasters—especially massive forest and land
            fires (Karhutla) in Kalimantan—and recurring earthquakes are pushing
            thousands into a fight for survival.
          </p>
        </div>

        <div className="story-marquee-viewport">
          <div className="story-track">
            {/* First set of cards (visible on both desktop and mobile) */}
            {STORY_ITEMS.map((item, idx) => (
              <div className="story-card" key={`story-primary-${idx}`}>
                <img src={item.img} alt={item.alt} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}

            {/* Second set of cards for seamless Left-to-Right loop on desktop (hidden on mobile) */}
            {STORY_ITEMS.map((item, idx) => (
              <div
                className="story-card marquee-duplicate"
                key={`story-dup-${idx}`}
                aria-hidden="true"
              >
                <img src={item.img} alt={item.alt} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* 3. WHY SAVE NUSANTARA? (DRAMATIC ANIMATIONS BEYOND HOVER) */}
      <section
        id="why"
        ref={whySectionRef}
        className="container dramatic-section"
      >
        <div className="pain-header">
          <span className="handwritten red-accent">Why Save Nusantara?</span>
          <h2 className="dramatic-header-Highlight">
            Because Empathy Without Action is Just an{" "}
            <span className="red-underline">Illusion</span>.
          </h2>
          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "var(--ink-muted)",
            }}
          >
            There is a massive gap between urgent disaster needs and how fast
            direct help arrives on the ground. We exist to break four broken
            realities:
          </p>
        </div>

        <div className="wakeup-grid">
          <div
            className={`sketch-box dramatic-card card-drama-1 ${
              whyInView ? "in-view" : ""
            }`}
            style={{ transitionDelay: "0.05s" }}
          >
            <div className="problem-header-row">
              <span className="problem-number">#1 Late Response</span>
            </div>
            <h3>Fast Disasters vs. Slow Aid</h3>
            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--ink-muted)",
                marginTop: "0.5rem",
              }}
            >
              Disasters escalate in hours, while emergency response capacities on
              the ground remain overwhelmed.
            </p>
            <div className="drama-meter">
              <div
                className="drama-meter-fill"
                style={{ animationDelay: "0s" }}
              />
            </div>
          </div>

          <div
            className={`sketch-box dramatic-card card-drama-2 ${
              whyInView ? "in-view" : ""
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="problem-header-row">
              <span className="problem-number">#2 Red Tape</span>
            </div>
            <h3>Long Distribution Chains</h3>
            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--ink-muted)",
                marginTop: "0.5rem",
              }}
            >
              Layered intermediaries and heavy bureaucracy keep donations from
              reaching victims immediately.
            </p>
            <div className="drama-meter">
              <div
                className="drama-meter-fill"
                style={{ animationDelay: "0.6s" }}
              />
            </div>
          </div>

          <div
            className={`sketch-box urgent dramatic-card card-drama-3 ${
              whyInView ? "in-view" : ""
            }`}
            style={{ transitionDelay: "0.35s" }}
          >
            <div className="problem-header-row">
              <span className="problem-number">#3 Passive Trap</span>
            </div>
            <h3>The Repost Illusion</h3>
            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--ink-muted)",
                marginTop: "0.5rem",
              }}
            >
              Social media traps us into feeling like we&apos;ve helped just by
              reposting a story, while victims still wait for real aid.
            </p>
            <div className="drama-meter">
              <div
                className="drama-meter-fill"
                style={{ animationDelay: "0.3s" }}
              />
            </div>
          </div>

          <div
            className={`sketch-box dramatic-card card-drama-4 ${
              whyInView ? "in-view" : ""
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            <div className="problem-header-row">
              <span className="problem-number">#4 Fear of Starting</span>
            </div>
            <h3>&quot;It Has to Be Big&quot; Stigma</h3>
            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--ink-muted)",
                marginTop: "0.5rem",
              }}
            >
              Campus organizations hesitate to act because they think a movement
              must be huge to matter.
            </p>
            <div className="drama-meter">
              <div
                className="drama-meter-fill"
                style={{ animationDelay: "0.9s" }}
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* 4. WHAT IS SAVE NUSANTARA & S.A.V.E */}
      <section id="about" className="container">
        <div className="identity-wrap">
          <div className="identity-doodle">
            {/* n7.png: Clasping Hands */}
            <img
              src="/assets/n7.png"
              alt="Two hands reaching out to help"
            />
            <p className="handwritten" style={{ marginTop: "1rem" }}>
              &quot;Work from your Heart.&quot;
            </p>
          </div>

          <div>
            <span className="handwritten red-accent">
              What is Save Nusantara?
            </span>
            <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              Small Real Actions. Direct to Those in Pain.
            </h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: "1rem" }}>
              <strong>Save Nusantara</strong> is an independent non-profit
              movement focused on <strong>Direct Repressive Relief</strong>
              —delivering rapid emergency aid straight to disaster victims while
              inspiring campus organizations to turn online sympathy into real
              micro-actions.
            </p>

            <div className="save-pillars">
              <div className="pillar-item">
                <div className="pillar-letter">S</div>
                <strong>Student-led Movement</strong>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>
                  Driven by youth and university students.
                </p>
              </div>
              <div className="pillar-item">
                <div className="pillar-letter">A</div>
                <strong>Access for Everyone</strong>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>
                  Open for anyone to join, donate, and act.
                </p>
              </div>
              <div className="pillar-item">
                <div className="pillar-letter">V</div>
                <strong>Voluntary</strong>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>
                  Powered by pure volunteerism from the heart.
                </p>
              </div>
              <div className="pillar-item">
                <div className="pillar-letter">E</div>
                <strong>Execute with Little Things</strong>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>
                  Every small real step saves lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* 5. LET'S SAVE OUR NUSANTARA */}
      <section id="solution" className="container">
        <div className="solution-grid">
          <div>
            <span className="handwritten red-accent">
              Let’s Save Our Nusantara.
            </span>
            <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              How We Turn Pity Into Relief.
            </h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: "1.5rem" }}>
              In our first 3 months, we aim to spark a{" "}
              <strong>Domino Effect</strong> that moves at least 3–4 campus
              organizations and local communities from passive awareness to
              direct action:
            </p>
            <ul style={{ listStyle: "none", display: "grid", gap: "0.9rem" }}>
              <li>
                <strong>1. Micro-Action &amp; Rapid Crowdfunding:</strong>{" "}
                Weekly Donations that anyone can afford.
              </li>
              <li>
                <strong>2. Direct-to-Victim Distribution:</strong> Cutting red
                tape so medicine, masks, and supplies arrive fast.
              </li>
              <li>
                <strong>3. Radical Transparency:</strong> Bi-weekly public
                reports (Every 2 Weeks) and weekly content updates.
              </li>
              <li>
                <strong>4. Sparking the Domino Effect:</strong> Proving
                independent student movements can lead real relief.
              </li>
            </ul>
          </div>

          <div className="sketch-box" style={{ textAlign: "center" }}>
            <div className="doodle-pair">
              {/* n4.png: First Aid Kit & n5.png: Supply Boxes */}
              <img src="/assets/n4.png" alt="Emergency First Aid Kit" />
              <img src="/assets/n5.png" alt="Direct Relief Supply Boxes" />
            </div>
            <h3 style={{ marginTop: "1rem" }}>Direct Repressive Aid</h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--ink-muted)",
                marginTop: "0.4rem",
              }}
            >
              Medical kits, clean air protection, and essential relief boxes
              sent directly to affected families in Kalimantan and disaster
              zones.
            </p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* 6. JOIN US & 7. NEED AID? CONTACT US */}
      <section id="join" className="container">
        <div className="action-split">
          {/* Join Us Card — Separate QRIS and Join Volunteer Buttons */}
          <div className="sketch-box urgent">
            <span className="handwritten red-accent">Join Us!</span>
            <h2 style={{ fontSize: "1.9rem", marginBottom: "0.75rem" }}>
              Be Part of the Domino Effect
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-muted)",
                marginBottom: "1.25rem",
              }}
            >
              You don&apos;t need millions to make a difference. Start with what
              you have today:
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "grid",
                gap: "0.75rem",
                marginBottom: "1.75rem",
                fontSize: "0.95rem",
              }}
            >
              <li>
                ✦ <strong>Weekly Donations via QRIS:</strong> Scan &amp; send
                direct emergency funds.
              </li>
              <li>
                ✦ <strong>Open Volunteer in Kalimantan:</strong> Join our ground
                relief deployment (Nov W2–W4).
              </li>
              <li>
                ✦ <strong>Campus &amp; Community Partners:</strong> Bring your
                organization into the movement.
              </li>
            </ul>
            <div className="join-btn-group">
              <Link
                href="/coming-soon"
                className="btn-sketch red"
                style={{ width: "100%", textAlign: "center", padding: "0.85rem 1rem" }}
              >
                Donate via QRIS
              </Link>
              <Link
                href="/coming-soon"
                className="btn-sketch"
                style={{ width: "100%", textAlign: "center", padding: "0.85rem 1rem" }}
              >
                Join Volunteer
              </Link>
            </div>
          </div>

          {/* Need Aid Card */}
          <div id="aid" className="sketch-box">
            <span className="handwritten">Need Aid? Contact Us</span>
            <h2 style={{ fontSize: "1.9rem", marginBottom: "0.75rem" }}>
              A Sign for Help
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-muted)",
                marginBottom: "1.25rem",
              }}
            >
              Are you or your community impacted by Karhutla, earthquakes, or
              ecological crises? Our team actively researches ground needs to
              deliver direct aid.
            </p>
            <div
              style={{
                display: "grid",
                gap: "0.65rem",
                marginBottom: "1.75rem",
                fontSize: "0.95rem",
              }}
            >
              <div>
                <strong>WhatsApp Hotline:</strong> +62856 9447 7190 (Rafie)
              </div>
              <div>
                <strong>Instagram:</strong> @saveournusantara
              </div>
              <div>
                <strong>Official Email:</strong> our@savenusantara.my.id
              </div>
            </div>
            <Link
              href="/coming-soon"
              className="btn-sketch outline"
              style={{ width: "100%", textAlign: "center" }}
            >
              Request Emergency Aid
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FOOTER WITH @saveournusantara */}
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
        <p style={{ marginTop: "0.5rem" }}>
          <a
            href="https://instagram.com/saveournusantara"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>@saveournusantara</span>
          </a>
        </p>
      </footer>

    </>
  );
}
