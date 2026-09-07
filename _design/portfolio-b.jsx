// Direction B — "Editorial Grid"
// Warmer paper tone, Space Grotesk, larger display type, horizontal rules, more magazine-feeling.

const bTokens = {
  bg: "#f1ece1",
  panel: "#f7f3e8",
  ink: "#1a1814",
  inkSoft: "#3d3a32",
  inkMute: "#857f6f",
  line: "#d6cfbb",
  accent: "#b34e2a", // warm terracotta — distinct from Stanford red but in same warm family
  accentDeep: "#7d3219",
  font: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

const BStyle = () => (
  <style>{`
    .b-root { font-family: ${bTokens.font}; color: ${bTokens.ink}; background: ${bTokens.bg}; }
    .b-root *, .b-root *::before, .b-root *::after { box-sizing: border-box; }
    .b-root h1, .b-root h2, .b-root h3, .b-root h4 { margin: 0; font-weight: 500; letter-spacing: -0.02em; }
    .b-root p { margin: 0; }
    .b-root a { color: inherit; text-decoration: none; }
    .b-root ::selection { background: ${bTokens.ink}; color: ${bTokens.bg}; }

    .b-mono { font-family: ${bTokens.mono}; font-feature-settings: "ss01"; letter-spacing: 0.02em; }
    .b-label { font-family: ${bTokens.mono}; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${bTokens.inkMute}; }
    .b-rule { height: 1px; background: ${bTokens.ink}; opacity: 0.18; }
    .b-rule-thick { height: 2px; background: ${bTokens.ink}; }
    .b-display { font-weight: 500; letter-spacing: -0.035em; line-height: 0.95; }

    .b-mark-spin { animation: b-spin 22s linear infinite; transform-origin: center; }
    @keyframes b-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .b-mark-pulse { transform-origin: center; animation: b-pulse 4.5s ease-in-out infinite; }
    @keyframes b-pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50%      { transform: scale(1.18); opacity: 0.7; }
    }

    .b-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border: 1px solid ${bTokens.ink}; border-radius: 999px; font-size: 12px; font-family: ${bTokens.mono}; letter-spacing: 0.02em; }
    .b-link { border-bottom: 1px solid ${bTokens.ink}; padding-bottom: 1px; }
    .b-link-accent { color: ${bTokens.accent}; border-bottom: 1px solid ${bTokens.accent}; padding-bottom: 1px; }
  `}</style>
);

// Logo mark — same concept as Direction A's AMark, styled editorial:
// a hard-bordered square (the image canvas), a dense central node, and an
// accent satellite connected by a faint trace line. References the research
// thesis of mapping biological signal into spatial images.
function BMark({ size = 28 }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <rect x="1.5" y="1.5" width="37" height="37" fill="none" stroke={bTokens.ink} strokeWidth="2.2" />
      <line x1="20" y1="20" x2="31" y2="9" stroke={bTokens.ink} strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="20" cy="20" r="6.5" fill={bTokens.ink} />
      <circle cx="31" cy="9" r="3" fill={bTokens.accent} />
    </svg>
  );
}

// Large editorial mark for the hero — same vocabulary, more nodes, faint grid
// behind, treated like a figure plate from a paper.
function BMarkLarge() {
  // 5x5 grid of subtle guide dots, with a few highlighted nodes forming a
  // sparse pattern (a single accent node + a primary cluster).
  const cells = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      cells.push({ x: 40 + c * 50, y: 40 + r * 50 });
    }
  }
  const filled = new Set(["2,2", "2,1", "1,2", "3,2", "2,3"]); // plus-sign cluster at center
  const accentIdx = "4,0"; // top-right corner satellite
  return (
    <svg viewBox="0 0 280 280" width="280" height="280" style={{ display: "block" }}>
      {/* Outer frame */}
      <rect x="4" y="4" width="272" height="272" fill="none" stroke={bTokens.ink} strokeWidth="2.5" />
      {/* Inner registration marks (corner ticks) */}
      {[[16, 16, 28, 16], [16, 16, 16, 28], [264, 16, 252, 16], [264, 16, 264, 28],
        [16, 264, 28, 264], [16, 264, 16, 252], [264, 264, 252, 264], [264, 264, 264, 252]
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={bTokens.ink} strokeWidth="1.2" />
      ))}
      {/* Trace line from cluster center to accent satellite */}
      <line x1="140" y1="140" x2="240" y2="40" stroke={bTokens.ink} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 4" className="b-mark-spin" style={{ transformOrigin: "140px 140px", animationDuration: "40s" }} />
      {/* Guide dots */}
      {cells.map((p, i) => {
        const key = `${Math.floor((p.x - 40) / 50)},${Math.floor((p.y - 40) / 50)}`;
        if (filled.has(key) || key === accentIdx) return null;
        return <circle key={i} cx={p.x} cy={p.y} r="2.2" fill={bTokens.ink} fillOpacity="0.18" />;
      })}
      {/* Primary cluster */}
      {[...filled].map((k, i) => {
        const [c, r] = k.split(",").map(Number);
        const isCenter = k === "2,2";
        return (
          <circle key={i} cx={40 + c * 50} cy={40 + r * 50}
                  r={isCenter ? 14 : 8} fill={bTokens.ink} />
        );
      })}
      {/* Accent satellite */}
      <g className="b-mark-pulse" style={{ transformOrigin: "240px 40px" }}>
        <circle cx="240" cy="40" r="10" fill={bTokens.accent} />
      </g>
    </svg>
  );
}

function BNav({ page }) {
  const items = ["Home", "Research", "Publications", "Teaching", "CV", "Contact"];
  return (
    <nav style={{
      display: "grid", gridTemplateColumns: "180px 1fr auto", alignItems: "center",
      padding: "20px 64px", borderBottom: `2px solid ${bTokens.ink}`,
      background: bTokens.bg, position: "relative",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <BMark size={28} />
        <span style={{ fontWeight: 500, fontSize: 17, letterSpacing: "-0.02em" }}>Mostafa</span>
      </div>
      <ul style={{ display: "flex", gap: 0, listStyle: "none", margin: 0, padding: 0, justifyContent: "center" }}>
        {items.map((it, i) => (
          <li key={it} style={{ padding: "0 18px", borderLeft: i === 0 ? "none" : `1px solid ${bTokens.line}` }}>
            <a className="b-mono"
               style={{
                 fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase",
                 color: page === it ? bTokens.accent : bTokens.inkSoft,
                 fontWeight: page === it ? 600 : 400,
               }}>
              {String(i + 1).padStart(2, "0")} · {it}
            </a>
          </li>
        ))}
      </ul>
      <div className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute, letterSpacing: "0.08em" }}>
        STANFORD · CA · 2026
      </div>
    </nav>
  );
}

function BFooter() {
  return (
    <footer style={{ borderTop: `2px solid ${bTokens.ink}` }}>
      <div style={{ padding: "28px 64px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 32, fontSize: 13 }}>
        <div>
          <div className="b-label">Email</div>
          <div style={{ marginTop: 6 }}>{CV.email}</div>
        </div>
        <div>
          <div className="b-label">Affiliation</div>
          <div style={{ marginTop: 6 }}>Stanford School of Medicine</div>
          <div style={{ color: bTokens.inkMute, fontSize: 12 }}>Radiation Oncology</div>
        </div>
        <div>
          <div className="b-label">Profiles</div>
          <div style={{ marginTop: 6 }}><a className="b-link">Google Scholar</a> · <a className="b-link">LinkedIn</a></div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="b-label">© 2026</div>
          <div style={{ marginTop: 6, color: bTokens.inkMute }}>Last updated May 2026</div>
        </div>
      </div>
    </footer>
  );
}

// ---- Pages ----

function BHome() {
  return (
    <section>
      {/* Masthead */}
      <div style={{ padding: "32px 64px", borderBottom: `1px solid ${bTokens.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute, letterSpacing: "0.16em" }}>
          PORTFOLIO · STANFORD SCHOOL OF MEDICINE
        </div>
        <div className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute, letterSpacing: "0.16em" }}>
          VOLUME 01 · NO. 01
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "72px 64px 64px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 56, alignItems: "start" }}>
        <div>
          <h1 className="b-display" style={{ fontSize: 116 }}>
            Sakib<br />Mostafa<span style={{ color: bTokens.accent }}>.</span>
          </h1>
          <p style={{ marginTop: 32, fontSize: 22, lineHeight: 1.32, maxWidth: 640, color: bTokens.inkSoft }}>
            {CV.tagline}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 24 }}>
          <BMarkLarge />
          <div className="b-mono" style={{ fontSize: 10.5, color: bTokens.inkMute, letterSpacing: "0.1em", textAlign: "right" }}>
            FIG. 01 — SIGNAL IN A FIELD,<br />DATA-TO-IMAGE CARTOGRAPHY
          </div>
        </div>
      </div>

      <div className="b-rule-thick"></div>

      {/* Bio + stats */}
      <div style={{ padding: "48px 64px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64 }}>
        <div>
          <div className="b-label">Abstract</div>
          <p style={{ marginTop: 14, fontSize: 17, lineHeight: 1.55, color: bTokens.ink, maxWidth: 640 }}>
            {CV.shortBio}
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="b-pill" style={{ background: bTokens.ink, color: bTokens.bg, borderColor: bTokens.ink, padding: "8px 18px" }}>
              Read research →
            </a>
            <a className="b-pill" style={{ padding: "8px 18px" }}>Download CV.pdf</a>
            <a className="b-pill" style={{ padding: "8px 18px" }}>{CV.email}</a>
          </div>
        </div>
        <div>
          <div className="b-label">Highlights · 2026</div>
          <div style={{ marginTop: 14, display: "grid", gap: 0 }}>
            {CV.highlights.slice(0, 6).map((h, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "auto 1fr",
                gap: 18, padding: "10px 0",
                borderBottom: i < 5 ? `1px solid ${bTokens.line}` : "none",
                alignItems: "baseline",
              }}>
                <span className="b-mono" style={{ fontSize: 22, color: bTokens.accent, fontWeight: 500, minWidth: 64 }}>{h.value}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{h.label}</div>
                  <div style={{ marginTop: 2, fontSize: 11.5, color: bTokens.inkMute }}>{h.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="b-rule-thick"></div>

      {/* Featured Nature submissions */}
      <div style={{ padding: "48px 64px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <div className="b-label">Featured</div>
            <h2 style={{ marginTop: 8, fontSize: 32, letterSpacing: "-0.025em" }}>Five current manuscripts targeting Nature-family journals.</h2>
          </div>
          <a className="b-link b-mono" style={{ fontSize: 12, letterSpacing: "0.08em" }}>SEE ALL RESEARCH →</a>
        </div>
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: `1px solid ${bTokens.ink}` }}>
          {CV.natureSubmissions.map((m, i) => (
            <div key={i} style={{
              padding: "24px 24px 28px",
              borderRight: i < 2 ? `1px solid ${bTokens.line}` : "none",
              borderBottom: `1px solid ${bTokens.ink}`,
            }}>
              <div className="b-mono" style={{ fontSize: 11, color: bTokens.accent, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {String(i + 1).padStart(2, "0")} · {m.venue}
              </div>
              <div style={{ marginTop: 12, fontSize: 16, lineHeight: 1.36, fontWeight: 500 }}>{m.title}</div>
              <div style={{ marginTop: 18, fontSize: 12, color: bTokens.inkMute }}>{m.status}</div>
              <div style={{ marginTop: 4, fontSize: 11.5, color: bTokens.inkSoft }} className="b-mono">{m.preprint}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BResearch() {
  return (
    <section style={{ padding: "56px 64px 80px" }}>
      <div className="b-label">Section · 02</div>
      <h1 className="b-display" style={{ marginTop: 12, fontSize: 80 }}>Research.</h1>
      <p style={{ marginTop: 24, fontSize: 19, lineHeight: 1.45, maxWidth: 720, color: bTokens.inkSoft }}>
        Translating biological signals — cfRNA, multi-omics, networks — into image representations so vision foundation models can read them.
      </p>

      <div className="b-rule" style={{ marginTop: 40 }}></div>

      {/* Research areas in 2x2 */}
      <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: `1px solid ${bTokens.ink}` }}>
        {CV.researchAreas.map((r, i) => (
          <div key={i} style={{
            padding: "28px 32px",
            borderRight: i % 2 === 0 ? `1px solid ${bTokens.line}` : "none",
            borderBottom: `1px solid ${bTokens.ink}`,
            background: i % 3 === 1 ? bTokens.panel : "transparent",
          }}>
            <div className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute, letterSpacing: "0.1em" }}>
              AREA {String(i + 1).padStart(2, "0")}
            </div>
            <h3 style={{ marginTop: 10, fontSize: 24, letterSpacing: "-0.02em" }}>{r.title}</h3>
            <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.55, color: bTokens.inkSoft }}>{r.body}</p>
          </div>
        ))}
      </div>

      {/* Current position */}
      <div style={{ marginTop: 56 }}>
        <div className="b-label">Current position</div>
        <div style={{ marginTop: 16, padding: "24px 28px", border: `2px solid ${bTokens.ink}`, background: bTokens.panel }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24 }}>
            <h3 style={{ fontSize: 22 }}>{CV.positions[0].role} — {CV.positions[0].where}</h3>
            <span className="b-mono" style={{ fontSize: 12, color: bTokens.accent, whiteSpace: "nowrap" }}>{CV.positions[0].dates}</span>
          </div>
          <div style={{ marginTop: 6, fontSize: 13, color: bTokens.inkMute }}>Supervisor: {CV.positions[0].advisor}</div>
          <ul style={{ marginTop: 14, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
            {CV.positions[0].bullets.map((b, i) => (
              <li key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr", fontSize: 14, lineHeight: 1.55, color: bTokens.inkSoft }}>
                <span className="b-mono" style={{ color: bTokens.accent }}>{String(i + 1).padStart(2, "0")}</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* In prep */}
      <div style={{ marginTop: 48 }}>
        <div className="b-label">In preparation</div>
        <div style={{ marginTop: 16, display: "grid", gap: 0, borderTop: `1px solid ${bTokens.line}` }}>
          {CV.inPrep.map((p, i) => (
            <div key={i} style={{ padding: "14px 0", borderBottom: `1px solid ${bTokens.line}`, display: "grid", gridTemplateColumns: "60px 1fr", gap: 16 }}>
              <span className="b-mono" style={{ fontSize: 12, color: bTokens.inkMute }}>{String(i + 1).padStart(2, "0")} →</span>
              <span style={{ fontSize: 14.5, lineHeight: 1.5, color: bTokens.inkSoft }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BPublications() {
  const sections = Object.entries(CV.publications);
  return (
    <section style={{ padding: "56px 64px 80px" }}>
      <div className="b-label">Section · 03</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 12 }}>
        <h1 className="b-display" style={{ fontSize: 80 }}>Publications.</h1>
        <div style={{ display: "flex", gap: 24 }}>
          <div>
            <div className="b-mono" style={{ fontSize: 32, color: bTokens.accent }}>19</div>
            <div className="b-label" style={{ marginTop: 2 }}>Papers</div>
          </div>
          <div>
            <div className="b-mono" style={{ fontSize: 32, color: bTokens.accent }}>01</div>
            <div className="b-label" style={{ marginTop: 2 }}>Book chapter</div>
          </div>
          <div>
            <div className="b-mono" style={{ fontSize: 32, color: bTokens.accent }}>425+</div>
            <div className="b-label" style={{ marginTop: 2 }}>Citations</div>
          </div>
        </div>
      </div>

      <p style={{ marginTop: 24, fontSize: 14, color: bTokens.inkMute, maxWidth: 640 }}>
        Author name in <strong style={{ color: bTokens.ink }}>bold</strong>. Citation counts and impact factors current as of 2026.
      </p>

      <div className="b-rule-thick" style={{ marginTop: 32 }}></div>

      <div style={{ marginTop: 40, display: "grid", gap: 56 }}>
        {sections.map(([label, papers], si) => (
          <div key={label}>
            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40 }}>
              <div>
                <div className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute, letterSpacing: "0.1em" }}>
                  GROUP {String(si + 1).padStart(2, "0")}
                </div>
                <h3 style={{ marginTop: 8, fontSize: 18, letterSpacing: "-0.015em", lineHeight: 1.25 }}>{label}</h3>
                <div className="b-mono" style={{ marginTop: 12, fontSize: 12, color: bTokens.accent }}>
                  {String(papers.length).padStart(2, "0")} {papers.length === 1 ? "PAPER" : "PAPERS"}
                </div>
              </div>
              <div>
                <ol style={{ padding: 0, listStyle: "none", display: "grid", gap: 0 }}>
                  {papers.map((p, i) => (
                    <li key={i} style={{ padding: "16px 0", borderBottom: `1px solid ${bTokens.line}`, borderTop: i === 0 ? `1px solid ${bTokens.ink}` : "none" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 80px", gap: 16, alignItems: "baseline" }}>
                        <span className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute }}>{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <div style={{ fontSize: 15, color: bTokens.ink, lineHeight: 1.4 }}>{p.title}</div>
                          <div style={{ marginTop: 6, fontSize: 12.5, color: bTokens.inkSoft }}>
                            {p.authors.split(", ").map((a, j, arr) => (
                              <React.Fragment key={j}>
                                <span style={a.includes("Mostafa") ? { color: bTokens.ink, fontWeight: 600 } : {}}>{a}</span>
                                {j < arr.length - 1 ? ", " : ""}
                              </React.Fragment>
                            ))}
                          </div>
                          <div style={{ marginTop: 6, fontSize: 12, color: bTokens.inkMute, display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ fontStyle: "italic" }}>{p.venue}</span>
                            {p.citations ? <span style={{ color: bTokens.accent }}>· {p.citations} cit.</span> : null}
                            {p.impact ? <span>· {p.impact}</span> : null}
                            {p.note ? <span style={{ color: bTokens.accent }}>· {p.note}</span> : null}
                          </div>
                        </div>
                        <div className="b-mono" style={{ fontSize: 12, color: bTokens.inkMute, textAlign: "right" }}>{p.year}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BTeaching() {
  return (
    <section style={{ padding: "56px 64px 80px" }}>
      <div className="b-label">Section · 04</div>
      <h1 className="b-display" style={{ marginTop: 12, fontSize: 80 }}>Teaching.</h1>
      <p style={{ marginTop: 24, fontSize: 19, lineHeight: 1.4, maxWidth: 720, color: bTokens.inkSoft }}>
        Six years of university teaching — a lecturer post, a 13-TA coordination role for a 250-student course, and seven trainees supervised.
      </p>

      <div className="b-rule-thick" style={{ marginTop: 36 }}></div>

      <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48 }}>
        {/* Lecturer column */}
        <div>
          <div className="b-label">Lectureship &amp; coordination</div>
          <div style={{ marginTop: 16, display: "grid", gap: 0, borderTop: `1px solid ${bTokens.ink}` }}>
            {CV.teaching.lecturer.map((c, i) => (
              <div key={i} style={{ padding: "20px 0", borderBottom: `1px solid ${bTokens.line}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <h3 style={{ fontSize: 16, maxWidth: 460, lineHeight: 1.3 }}>{c.course}</h3>
                  <span className="b-mono" style={{ fontSize: 12, color: bTokens.accent, whiteSpace: "nowrap" }}>{c.year}</span>
                </div>
                <div style={{ marginTop: 6, fontSize: 13, color: bTokens.inkMute }}>{c.where}</div>
                <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.55, color: bTokens.inkSoft }}>{c.body}</p>
              </div>
            ))}
          </div>

          <div className="b-label" style={{ marginTop: 32 }}>Teaching assistantships</div>
          <ul style={{ marginTop: 14, padding: 0, listStyle: "none", display: "grid", gap: 0 }}>
            {CV.teaching.ta.map((t, i) => (
              <li key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${bTokens.line}`, fontSize: 13.5, color: bTokens.inkSoft, display: "grid", gridTemplateColumns: "40px 1fr", gap: 12 }}>
                <span className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute }}>TA {String(i + 1).padStart(2, "0")}</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mentoring column */}
        <div>
          <div className="b-label">Mentoring · 11 trainees</div>
          <div style={{ marginTop: 16, padding: "20px 22px", border: `2px solid ${bTokens.ink}`, background: bTokens.panel }}>
            <div style={{ display: "grid", gap: 14 }}>
              {CV.teaching.mentoring.map((m, i) => (
                <div key={i} style={{ paddingBottom: 12, borderBottom: i < CV.teaching.mentoring.length - 1 ? `1px solid ${bTokens.line}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                    <h4 style={{ fontSize: 15 }}>{m.name}</h4>
                    <span className="b-mono" style={{ fontSize: 10.5, color: bTokens.inkMute, letterSpacing: "0.06em", textTransform: "uppercase" }}>{m.level}</span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: 12, color: bTokens.inkSoft }}>{m.where}</div>
                  <div style={{ marginTop: 2, fontSize: 11.5, color: bTokens.inkMute }}>Advisor: {m.advisor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BCV() {
  return (
    <section style={{ padding: "56px 64px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="b-label">Section · 05</div>
          <h1 className="b-display" style={{ marginTop: 12, fontSize: 80 }}>CV.</h1>
        </div>
        <a className="b-pill" style={{ background: bTokens.ink, color: bTokens.bg, borderColor: bTokens.ink, padding: "10px 22px" }}>Download CV.pdf →</a>
      </div>

      <div className="b-rule-thick" style={{ marginTop: 32 }}></div>

      <div style={{ marginTop: 32, display: "grid", gap: 56 }}>
        {/* Education */}
        <div>
          <div className="b-label">Education</div>
          <div style={{ marginTop: 14, display: "grid", gap: 0, borderTop: `1px solid ${bTokens.line}` }}>
            {CV.education.map((e, i) => (
              <div key={i} style={{ padding: "18px 0", borderBottom: `1px solid ${bTokens.line}`, display: "grid", gridTemplateColumns: "100px 1fr 140px", gap: 24 }}>
                <span className="b-mono" style={{ fontSize: 12, color: bTokens.accent }}>{e.year}</span>
                <div>
                  <h3 style={{ fontSize: 16 }}>{e.degree}</h3>
                  <div style={{ marginTop: 4, fontSize: 13, color: bTokens.inkSoft }}>{e.school}</div>
                  <div style={{ marginTop: 2, fontSize: 12, color: bTokens.inkMute, fontStyle: "italic" }}>{e.thesis}</div>
                </div>
                <div style={{ fontSize: 12, color: bTokens.inkMute, textAlign: "right" }}>{e.advisor}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <div className="b-label">Experience</div>
          <div style={{ marginTop: 14, display: "grid", gap: 0, borderTop: `1px solid ${bTokens.line}` }}>
            {CV.positions.map((p, i) => (
              <div key={i} style={{ padding: "20px 0", borderBottom: `1px solid ${bTokens.line}`, display: "grid", gridTemplateColumns: "180px 1fr", gap: 24 }}>
                <span className="b-mono" style={{ fontSize: 12, color: bTokens.accent }}>{p.dates}</span>
                <div>
                  <h3 style={{ fontSize: 16 }}>{p.role} — <span style={{ color: bTokens.inkSoft, fontWeight: 400 }}>{p.where}</span></h3>
                  <div style={{ marginTop: 4, fontSize: 12, color: bTokens.inkMute }}>Supervisor: {p.advisor}</div>
                  <ul style={{ marginTop: 10, padding: 0, listStyle: "none", display: "grid", gap: 5 }}>
                    {p.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 13, color: bTokens.inkSoft, lineHeight: 1.55, display: "grid", gridTemplateColumns: "16px 1fr" }}>
                        <span className="b-mono" style={{ color: bTokens.accent }}>—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards in a clean table */}
        <div>
          <div className="b-label">Awards &amp; funding</div>
          <div style={{ marginTop: 14, display: "grid", gap: 0, borderTop: `1px solid ${bTokens.line}` }}>
            {CV.awards.map((a, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${bTokens.line}`, display: "grid", gridTemplateColumns: "100px 1fr 1fr 130px", gap: 16, alignItems: "baseline", fontSize: 13 }}>
                <span className="b-mono" style={{ fontSize: 11.5, color: bTokens.accent }}>{a.amount}</span>
                <span style={{ color: bTokens.ink }}>{a.name}</span>
                <span style={{ color: bTokens.inkSoft }}>{a.where}</span>
                <span className="b-mono" style={{ fontSize: 11.5, color: bTokens.inkMute, textAlign: "right" }}>{a.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Patents + Talks side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <div className="b-label">Patents</div>
            <div style={{ marginTop: 14, display: "grid", gap: 16 }}>
              {CV.patents.map((p, i) => (
                <div key={i} style={{ padding: "14px 16px", border: `1px solid ${bTokens.line}`, background: bTokens.panel }}>
                  <h4 style={{ fontSize: 14, lineHeight: 1.4 }}>{p.title}</h4>
                  <div style={{ marginTop: 8, fontSize: 11.5, color: bTokens.inkMute }} className="b-mono">{p.docket} · {p.date}</div>
                  <div style={{ marginTop: 2, fontSize: 11.5, color: bTokens.inkSoft }}>{p.inventors}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="b-label">Selected talks</div>
            <div style={{ marginTop: 14, display: "grid", gap: 0, borderTop: `1px solid ${bTokens.line}` }}>
              {CV.talks.slice(0, 5).map((t, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${bTokens.line}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span className="b-mono" style={{ fontSize: 10.5, color: bTokens.accent, letterSpacing: "0.06em" }}>{t.kind.toUpperCase()}</span>
                    <span className="b-mono" style={{ fontSize: 10.5, color: bTokens.inkMute }}>{t.date}</span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.4 }}>{t.title}</div>
                  <div style={{ marginTop: 2, fontSize: 11.5, color: bTokens.inkMute }}>{t.venue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="b-label">Technical skills</div>
          <div style={{ marginTop: 14, display: "grid", gap: 0, borderTop: `1px solid ${bTokens.line}` }}>
            {Object.entries(CV.skills).map(([k, v]) => (
              <div key={k} style={{ padding: "12px 0", borderBottom: `1px solid ${bTokens.line}`, display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}>
                <span className="b-mono" style={{ fontSize: 11.5, color: bTokens.accent, letterSpacing: "0.04em", textTransform: "uppercase" }}>{k}</span>
                <span style={{ fontSize: 13.5, color: bTokens.inkSoft }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service + media in two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <div className="b-label">Service &amp; leadership</div>
            <div style={{ marginTop: 14, fontSize: 13, color: bTokens.inkSoft, lineHeight: 1.55, display: "grid", gap: 12 }}>
              <div><strong style={{ color: bTokens.ink, fontWeight: 600 }}>Journal reviews. </strong>{CV.service.journals}</div>
              <div><strong style={{ color: bTokens.ink, fontWeight: 600 }}>Conferences. </strong>{CV.service.conferences}</div>
              <div>
                <strong style={{ color: bTokens.ink, fontWeight: 600 }}>Organization &amp; leadership.</strong>
                <ul style={{ marginTop: 6, padding: 0, listStyle: "none", display: "grid", gap: 4 }}>
                  {[...CV.service.organization, ...CV.service.leadership].map((s, i) => (
                    <li key={i} style={{ display: "grid", gridTemplateColumns: "16px 1fr" }}><span style={{ color: bTokens.accent }}>—</span>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="b-label">Media coverage</div>
            <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
              {CV.media.map((m, i) => (
                <div key={i} style={{ paddingBottom: 12, borderBottom: i < CV.media.length - 1 ? `1px solid ${bTokens.line}` : "none" }}>
                  <h4 style={{ fontSize: 13.5, lineHeight: 1.4 }}><a href={m.url} target="_blank" rel="noopener noreferrer">{m.headline}</a></h4>
                  <div style={{ marginTop: 4, fontSize: 11.5, color: bTokens.inkMute }} className="b-mono">{m.outlet.toUpperCase()} · {m.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* References */}
        <div>
          <div className="b-label">References</div>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: `1px solid ${bTokens.line}` }}>
            {CV.references.map((r, i) => (
              <div key={i} style={{
                padding: "16px 0",
                borderBottom: `1px solid ${bTokens.line}`,
                borderRight: i % 2 === 0 ? `1px solid ${bTokens.line}` : "none",
                paddingLeft: i % 2 === 1 ? 24 : 0,
                paddingRight: i % 2 === 0 ? 24 : 0,
              }}>
                <h4 style={{ fontSize: 15 }}>{r.name}</h4>
                <div style={{ marginTop: 4, fontSize: 12, color: bTokens.inkSoft }}>{r.role}</div>
                <div style={{ marginTop: 2, fontSize: 12, color: bTokens.inkMute }}>{r.where}</div>
                <div style={{ marginTop: 6, fontSize: 12, color: bTokens.accent }} className="b-mono">{r.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BCollabMap() {
  // Editorial-style: a horizontal sankey-ish grid
  const clusters = CV.collabClusters;
  const positions = [
    { x: 50, y: 14 },
    { x: 84, y: 32 },
    { x: 90, y: 64 },
    { x: 68, y: 88 },
    { x: 32, y: 88 },
    { x: 10, y: 64 },
    { x: 16, y: 32 },
  ];
  return (
    <div style={{
      position: "relative", height: 540, background: bTokens.panel,
      border: `2px solid ${bTokens.ink}`, overflow: "hidden",
    }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {positions.map((pos, i) => (
          <line key={i} x1="50%" y1="50%" x2={`${pos.x}%`} y2={`${pos.y}%`}
                stroke={bTokens.ink} strokeWidth="1" strokeOpacity="0.25" />
        ))}
      </svg>
      <div style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        background: bTokens.ink, color: bTokens.bg, padding: "18px 26px",
        fontSize: 16, fontWeight: 500, whiteSpace: "nowrap", letterSpacing: "-0.01em",
      }}>
        Sakib Mostafa<span style={{ color: bTokens.accent }}>.</span>
      </div>
      {clusters.map((c, i) => {
        const pos = positions[i];
        return (
          <div key={i} style={{
            position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
            transform: "translate(-50%, -50%)", textAlign: "center", width: 190,
          }}>
            <div className="b-mono" style={{
              display: "inline-block", padding: "5px 12px",
              background: bTokens.bg, border: `1px solid ${bTokens.ink}`,
              fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
            }}>{c.label}</div>
            <div style={{ marginTop: 4, fontSize: 10.5, color: bTokens.inkMute }} className="b-mono">{c.city}</div>
            <div style={{ marginTop: 6, fontSize: 11.5, color: bTokens.inkSoft, lineHeight: 1.5 }}>
              {c.people.slice(0, 4).join(" · ")}
              {c.people.length > 4 ? ` · +${c.people.length - 4}` : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BContact() {
  return (
    <section style={{ padding: "56px 64px 80px" }}>
      <div className="b-label">Section · 06</div>
      <h1 className="b-display" style={{ marginTop: 12, fontSize: 80 }}>Contact.</h1>
      <p style={{ marginTop: 24, fontSize: 19, lineHeight: 1.4, maxWidth: 720, color: bTokens.inkSoft }}>
        Open to research conversations across cancer AI, computational biology, and biomedical informatics.
      </p>

      <div className="b-rule-thick" style={{ marginTop: 36 }}></div>

      <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48 }}>
        <div>
          <div className="b-label">Reach me directly</div>
          <div style={{ marginTop: 16, display: "grid", gap: 0, border: `2px solid ${bTokens.ink}` }}>
            <div style={{ padding: "20px 22px", borderBottom: `1px solid ${bTokens.line}`, display: "grid", gridTemplateColumns: "100px 1fr", gap: 20 }}>
              <span className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute, letterSpacing: "0.08em" }}>EMAIL</span>
              <span style={{ fontSize: 18 }}>{CV.email}</span>
            </div>
            <div style={{ padding: "16px 22px", borderBottom: `1px solid ${bTokens.line}`, display: "grid", gridTemplateColumns: "100px 1fr", gap: 20 }}>
              <span className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute, letterSpacing: "0.08em" }}>SCHOLAR</span>
              <a className="b-link-accent" style={{ fontSize: 14 }}>scholar.google.com →</a>
            </div>
            <div style={{ padding: "16px 22px", borderBottom: `1px solid ${bTokens.line}`, display: "grid", gridTemplateColumns: "100px 1fr", gap: 20 }}>
              <span className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute, letterSpacing: "0.08em" }}>LINKEDIN</span>
              <a className="b-link-accent" style={{ fontSize: 14 }}>linkedin.com →</a>
            </div>
            <div style={{ padding: "16px 22px", display: "grid", gridTemplateColumns: "100px 1fr", gap: 20 }}>
              <span className="b-mono" style={{ fontSize: 11, color: bTokens.inkMute, letterSpacing: "0.08em" }}>OFFICE</span>
              <span style={{ fontSize: 13, color: bTokens.inkSoft, lineHeight: 1.45 }}>
                Department of Radiation Oncology<br />Stanford School of Medicine<br />Stanford, CA 94305 · USA
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="b-label">Stanford cancer collaborators</div>
          <div style={{ marginTop: 16, display: "grid", gap: 0, borderTop: `1px solid ${bTokens.line}` }}>
            {CV.stanfordCollaborators.slice(0, 6).map((c, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${bTokens.line}` }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</div>
                <div style={{ marginTop: 2, fontSize: 11.5, color: bTokens.inkMute }}>{c.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <div className="b-label">Collaborator network · Stanford · Saskatchewan · Calgary · Manitoba · International</div>
        <div style={{ marginTop: 16 }}>
          <BCollabMap />
        </div>
      </div>
    </section>
  );
}

function BPortfolio({ page }) {
  return (
    <div className="b-root" style={{ minHeight: 900, display: "flex", flexDirection: "column" }}>
      <BStyle />
      <BNav page={page} />
      <div style={{ flex: 1 }}>
        {page === "Home" && <BHome />}
        {page === "Research" && <BResearch />}
        {page === "Publications" && <BPublications />}
        {page === "Teaching" && <BTeaching />}
        {page === "CV" && <BCV />}
        {page === "Contact" && <BContact />}
      </div>
      <BFooter />
    </div>
  );
}

window.BPortfolio = BPortfolio;
