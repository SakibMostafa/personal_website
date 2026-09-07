// Direction A — "Quiet Scholar"
// Off-white, near-black, restrained Stanford-cardinal accent, Inter, generous whitespace.

const aTokens = {
  bg: "#fafaf7",
  panel: "#ffffff",
  ink: "#15151a",
  inkSoft: "#4a4a52",
  inkMute: "#8a8a92",
  line: "#e6e4dc",
  accent: "#8c1515", // Stanford cardinal
  accentSoft: "#f4e9e9",
  font: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif"
};

const AStyle = () =>
<style>{`
    .a-root { font-family: ${aTokens.font}; color: ${aTokens.ink}; background: ${aTokens.bg}; }
    .a-root *, .a-root *::before, .a-root *::after { box-sizing: border-box; }
    .a-root p { margin: 0; }
    .a-root h1, .a-root h2, .a-root h3, .a-root h4 { margin: 0; font-weight: 600; letter-spacing: -0.02em; }
    .a-root a { color: inherit; text-decoration: none; }
    .a-root ::selection { background: ${aTokens.accentSoft}; color: ${aTokens.accent}; }

    .a-hat-wrap { position: absolute; right: 88px; top: 96px; width: 280px; height: 280px; pointer-events: none; }
    /* Gentle cap float — mid-air feel without spinning */
    .a-cap-float { transform-origin: center; animation: a-float 6s ease-in-out infinite; }
    @keyframes a-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50%      { transform: translateY(-8px) rotate(2deg); }
    }
    .a-logo-mark { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; }

    .a-link-underline { background-image: linear-gradient(${aTokens.ink}, ${aTokens.ink}); background-size: 100% 1px; background-repeat: no-repeat; background-position: 0 100%; padding-bottom: 2px; }
    .a-link-accent { color: ${aTokens.accent}; background-image: linear-gradient(${aTokens.accent}, ${aTokens.accent}); background-size: 100% 1px; background-repeat: no-repeat; background-position: 0 100%; padding-bottom: 2px; }

    .a-card { background: ${aTokens.panel}; border: 1px solid ${aTokens.line}; border-radius: 10px; }
    .a-chip { display: inline-flex; align-items: center; gap: 8px; padding: 4px 10px; border-radius: 999px; background: ${aTokens.accentSoft}; color: ${aTokens.accent}; font-size: 12px; font-weight: 500; letter-spacing: 0.02em; }
    .a-tag { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; border: 1px solid ${aTokens.line}; font-size: 11.5px; color: ${aTokens.inkSoft}; }

    .a-rule { height: 1px; background: ${aTokens.line}; }
    .a-section-label { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: ${aTokens.inkMute}; font-weight: 500; }
  `}</style>;


// Mortarboard cap in 3/4 view — diamond top + ellipse brim + tassel.
function ACap({ cx, cy, size = 60, rotate = 0, tassel = "right", accent = false, className }) {
  const s = size / 60;
  const color = aTokens.ink;
  const tc = accent ? aTokens.accent : color;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`} className={className}>
      <g transform={`scale(${s})`}>
        {/* Brim ellipse (the cap base seen from 3/4) */}
        <ellipse cx="0" cy="9" rx="26" ry="7" fill={color} />
        {/* Mortarboard diamond top */}
        <polygon points="0,-18 34,0 0,18 -34,0" fill={color} />
        {/* Button at center */}
        <circle cx="0" cy="0" r="3" fill={accent ? aTokens.accent : "#fafaf7"} fillOpacity={accent ? 1 : 0.5} />
        {/* Tassel: 2 line segments + a small blob */}
        {tassel === "right" ? (
          <g>
            <line x1="0" y1="0" x2="24" y2="6" stroke={tc} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="24" y1="6" x2="28" y2="20" stroke={tc} strokeWidth="1.8" strokeLinecap="round" />
            <ellipse cx="28" cy="26" rx="3" ry="7" fill={tc} />
          </g>
        ) : (
          <g>
            <line x1="0" y1="0" x2="-24" y2="6" stroke={tc} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="-24" y1="6" x2="-28" y2="20" stroke={tc} strokeWidth="1.8" strokeLinecap="round" />
            <ellipse cx="-28" cy="26" rx="3" ry="7" fill={tc} />
          </g>
        )}
      </g>
    </g>
  );
}

// Raised hand silhouette — refined with ellipse-based fingers of varying length,
// proper finger proportions (pinky < ring < middle ≈ index), oval palm.
function AHand({ cx, cy, scale = 1, lean = 0 }) {
  const c = aTokens.ink;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${lean}) scale(${scale})`}>
      {/* Forearm — solid taper to the bottom of the scene */}
      <rect x="-19" y="4" width="38" height="80" rx="6" fill={c} />
      {/* Wrist — narrower than palm, wider than forearm */}
      <ellipse cx="0" cy="4" rx="22" ry="10" fill={c} />
      {/* Palm — oval, slightly wider than tall */}
      <ellipse cx="0" cy="-8" rx="24" ry="22" fill={c} />

      {/* Fingers — ellipses with varying length, rotated to fan slightly.
          Order (left to right): pinky, ring, middle, index. */}
      <ellipse cx="-18" cy="-32" rx="5.5" ry="14" fill={c} transform="rotate(-20 -18 -32)" />
      <ellipse cx="-7"  cy="-40" rx="6"   ry="20" fill={c} transform="rotate(-7 -7 -40)"  />
      <ellipse cx="5"   cy="-42" rx="6"   ry="22" fill={c} transform="rotate(4 5 -42)"    />
      <ellipse cx="16"  cy="-36" rx="5.5" ry="18" fill={c} transform="rotate(16 16 -36)"  />

      {/* Thumb — angled out from the base of the palm */}
      <ellipse cx="-22" cy="0" rx="6.5" ry="15" fill={c} transform="rotate(-55 -22 0)" />
    </g>
  );
}

// Hero scene: a single tossed cap + a single raised hand reaching toward it.
function AHat() {
  return (
    <div className="a-hat-wrap">
      <svg viewBox="0 0 380 360" width="100%" height="100%">
        {/* The tossed cap — large, slightly off-center, slow float */}
        <g className="a-cap-float">
          <ACap cx={232} cy={110} size={140} rotate={-14} tassel="right" accent />
        </g>
        {/* The raised hand — large, reaching up toward the cap */}
        <AHand cx={158} cy={278} scale={1.7} lean={-6} />
      </svg>
    </div>
  );
}

// Logo mark — the "Aperture".
// A thin scholarly ring (microscope field / cell membrane) contains a small
// asymmetric cluster of three connected nodes — two navy (structural
// relationships), one warm-gold (the focal signal). One interior edge is
// rendered in teal to suggest the interpretable connection.
function AMark({ size = 28 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="none" stroke={aTokens.ink} strokeWidth="2" />
      <line x1="38" y1="56" x2="60" y2="62" stroke={aTokens.ink} strokeWidth="1.4" />
      <line x1="38" y1="56" x2="56" y2="34" stroke={aTokens.ink} strokeWidth="1.4" />
      <line x1="60" y1="62" x2="56" y2="34" stroke="#4e8a8c" strokeWidth="1.4" />
      <circle cx="38" cy="56" r="5.2" fill={aTokens.ink} />
      <circle cx="60" cy="62" r="3.8" fill={aTokens.ink} />
      <circle cx="56" cy="34" r="4.4" fill="#b9883c" />
    </svg>
  );
}

// Large hero variant of the Aperture — sits beside the name in the Home hero.
// Same composition as the small mark, just scaled up with a faint inner ring
// for depth and slightly heavier strokes that read well at display size.
function AAperture() {
  return (
    <div className="a-hat-wrap">
      <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="none" stroke={aTokens.ink} strokeWidth="1.1" />
        <circle cx="50" cy="50" r="38.5" fill="none" stroke={aTokens.ink} strokeWidth="0.4" strokeOpacity="0.3" />
        <line x1="38" y1="56" x2="60" y2="62" stroke={aTokens.ink} strokeWidth="0.85" />
        <line x1="38" y1="56" x2="56" y2="34" stroke={aTokens.ink} strokeWidth="0.85" />
        <line x1="60" y1="62" x2="56" y2="34" stroke="#4e8a8c" strokeWidth="0.85" />
        <circle cx="38" cy="56" r="4.6" fill={aTokens.ink} />
        <circle cx="60" cy="62" r="3.4" fill={aTokens.ink} />
        <circle cx="56" cy="34" r="3.8" fill="#b9883c" />
      </svg>
    </div>
  );
}

function ANav({ page, onPage }) {
  const items = ["Home", "Research", "Publications", "Teaching", "CV", "Contact"];
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "26px 88px", borderBottom: `1px solid ${aTokens.line}`
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="a-logo-mark"><AMark size={30} /></div>
        <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em" }}>Sakib Mostafa</span>
        <span style={{ color: aTokens.inkMute, fontSize: 13, marginLeft: 2 }}>· Postdoctoral Scholar · Stanford</span>
      </div>
      <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((it) =>
        <li key={it}>
            <a onClick={() => onPage && onPage(it)}
          style={{
            fontSize: 14, cursor: onPage ? "pointer" : "default",
            color: page === it ? aTokens.ink : aTokens.inkSoft,
            fontWeight: page === it ? 600 : 400,
            borderBottom: page === it ? `1.5px solid ${aTokens.accent}` : "1.5px solid transparent",
            paddingBottom: 4
          }}>
              {it}
            </a>
          </li>
        )}
      </ul>
    </nav>);

}

function AFooter() {
  return (
    <footer style={{
      padding: "32px 88px", borderTop: `1px solid ${aTokens.line}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontSize: 13, color: aTokens.inkMute
    }}>
      <span>© 2026 Sakib Mostafa · Stanford School of Medicine</span>
      <div style={{ display: "flex", gap: 22 }}>
        <a href={`mailto:${CV.email}`} className="a-link-underline">{CV.email}</a>
        <a className="a-link-underline">Google Scholar</a>
        <a className="a-link-underline">LinkedIn</a>
      </div>
    </footer>);

}

// ---- Pages ----

function AHome() {
  return (
    <section style={{ position: "relative", padding: "104px 88px 96px" }}>
      <AAperture />
      <div style={{ maxWidth: 680 }}>
        <h1 style={{ fontSize: 64, lineHeight: 1.04, letterSpacing: "-0.035em" }}>
          Sakib Mostafa
        </h1>
        <p style={{ marginTop: 18, fontSize: 22, lineHeight: 1.45, color: aTokens.inkSoft, maxWidth: 620 }}>
          {CV.tagline}
        </p>
        <p style={{ marginTop: 22, fontSize: 15.5, lineHeight: 1.65, color: aTokens.inkSoft, maxWidth: 620 }}>
          {CV.shortBio}
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a className="a-tag" style={{ background: aTokens.ink, color: aTokens.bg, border: "none", padding: "10px 18px", fontSize: 13 }}>
            View research →
          </a>
          <a className="a-tag" style={{ padding: "10px 18px", fontSize: 13 }}>Download CV (PDF)</a>
          <a className="a-tag" style={{ padding: "10px 18px", fontSize: 13 }}>{CV.email}</a>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ marginTop: 88, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: `1px solid ${aTokens.line}`, borderBottom: `1px solid ${aTokens.line}` }}>
        {CV.highlights.slice(0, 6).map((h, i) =>
        <div key={i} style={{
          padding: "28px 28px",
          borderRight: i % 3 !== 2 ? `1px solid ${aTokens.line}` : "none",
          borderBottom: i < 3 ? `1px solid ${aTokens.line}` : "none"
        }}>
            <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em" }}>
              {h.value}<span style={{ color: aTokens.accent }}>.</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 13.5, fontWeight: 500 }}>{h.label}</div>
            <div style={{ marginTop: 4, fontSize: 12.5, color: aTokens.inkMute }}>{h.note}</div>
          </div>
        )}
      </div>
    </section>);

}

function AResearch() {
  return (
    <section style={{ padding: "72px 88px 96px" }}>
      <div className="a-section-label">Currently · April 2025 — Present</div>
      <h1 style={{ marginTop: 14, fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 820 }}>
        Building interpretable AI to read the biology hidden inside high-dimensional clinical data.
      </h1>

      {/* Nature submissions */}
      <div style={{ marginTop: 56 }}>
        <div className="a-section-label">Under review · Nature-family journals</div>
        <div style={{ marginTop: 22, display: "grid", gap: 1, background: aTokens.line, border: `1px solid ${aTokens.line}`, borderRadius: 12, overflow: "hidden" }}>
          {CV.natureSubmissions.map((m, i) =>
          <div key={i} style={{ background: aTokens.panel, padding: "26px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 32 }}>
                <div style={{ fontSize: 18, lineHeight: 1.32, fontWeight: 500, maxWidth: 820 }}>{m.title}</div>
                <div style={{ fontSize: 12, color: aTokens.accent, fontWeight: 600, whiteSpace: "nowrap", letterSpacing: "0.04em", textTransform: "uppercase" }}>{m.venue}</div>
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 18, alignItems: "center", fontSize: 13, color: aTokens.inkMute }}>
                <span>{m.status}</span>
                <span style={{ width: 3, height: 3, borderRadius: 999, background: aTokens.inkMute }}></span>
                <a className="a-link-underline" style={{ color: aTokens.inkSoft }}>{m.preprint}</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Research areas */}
      <div style={{ marginTop: 56 }}>
        <div className="a-section-label">Research areas</div>
        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {CV.researchAreas.map((r, i) =>
          <div key={i}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 12, color: aTokens.inkMute, fontFamily: "ui-monospace, monospace" }}>0{i + 1}</span>
                <h3 style={{ fontSize: 19 }}>{r.title}</h3>
              </div>
              <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.6, color: aTokens.inkSoft, maxWidth: 520 }}>{r.body}</p>
            </div>
          )}
        </div>
      </div>

      {/* In preparation */}
      <div style={{ marginTop: 56 }}>
        <div className="a-section-label">In preparation</div>
        <ul style={{ marginTop: 18, padding: 0, listStyle: "none", display: "grid", gap: 14 }}>
          {CV.inPrep.map((p, i) =>
          <li key={i} style={{ display: "flex", gap: 14, fontSize: 14, color: aTokens.inkSoft, lineHeight: 1.55 }}>
              <span style={{ color: aTokens.accent, fontFamily: "ui-monospace, monospace", fontSize: 12 }}>·</span>
              <span>{p}</span>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

function APublications() {
  const sections = Object.entries(CV.publications);
  return (
    <section style={{ padding: "72px 88px 96px" }}>
      <div className="a-section-label">Publications</div>
      <h1 style={{ marginTop: 14, fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
        19 peer-reviewed papers <span style={{ color: aTokens.inkMute }}>· 1 book chapter · 425+ citations</span>
      </h1>
      <p style={{ marginTop: 14, fontSize: 14.5, color: aTokens.inkSoft, maxWidth: 640 }}>
        Author name in bold. Citation counts and impact factors current as of 2026.
      </p>

      <div style={{ marginTop: 48, display: "grid", gap: 44 }}>
        {sections.map(([label, papers]) =>
        <div key={label}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, paddingBottom: 12, borderBottom: `1px solid ${aTokens.line}` }}>
              <h3 style={{ fontSize: 18 }}>{label}</h3>
              <span style={{ fontSize: 12, color: aTokens.inkMute }}>{papers.length} {papers.length === 1 ? "paper" : "papers"}</span>
            </div>
            <ol style={{ marginTop: 20, padding: 0, listStyle: "none", display: "grid", gap: 22 }}>
              {papers.map((p, i) =>
            <li key={i} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 16 }}>
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: aTokens.inkMute, paddingTop: 3 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, color: aTokens.inkSoft }}>
                      {p.authors.split(", ").map((a, j, arr) =>
                  <React.Fragment key={j}>
                          <span style={a.includes("Mostafa") ? { color: aTokens.ink, fontWeight: 600 } : {}}>{a}</span>
                          {j < arr.length - 1 ? ", " : ""}
                        </React.Fragment>
                  )}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 15, color: aTokens.ink, lineHeight: 1.45, maxWidth: 820 }}>{p.title}</div>
                    <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", fontSize: 12.5, color: aTokens.inkMute }}>
                      <span style={{ fontStyle: "italic" }}>{p.venue}</span>
                      <span>· {p.year}</span>
                      {p.citations ? <span className="a-tag" style={{ fontSize: 11 }}>{p.citations} citations</span> : null}
                      {p.impact ? <span className="a-tag" style={{ fontSize: 11 }}>{p.impact}</span> : null}
                      {p.note ? <span style={{ color: aTokens.accent, fontWeight: 500 }}>{p.note}</span> : null}
                    </div>
                  </div>
                </li>
            )}
            </ol>
          </div>
        )}
      </div>
    </section>);

}

function ATeaching() {
  return (
    <section style={{ padding: "72px 88px 96px" }}>
      <div className="a-section-label">Teaching & Mentoring</div>
      <h1 style={{ marginTop: 14, fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 760 }}>
        Six years of university teaching, including a lecturer post and a 13-TA team for a 250-student course.
      </h1>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56 }}>
        <div>
          <div className="a-section-label">Courses & lectureship</div>
          <div style={{ marginTop: 18, display: "grid", gap: 22 }}>
            {CV.teaching.lecturer.map((c, i) =>
            <div key={i} style={{ paddingBottom: 18, borderBottom: i < CV.teaching.lecturer.length - 1 ? `1px solid ${aTokens.line}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14 }}>
                  <h3 style={{ fontSize: 16, maxWidth: 480 }}>{c.course}</h3>
                  <span style={{ fontSize: 12, color: aTokens.inkMute, whiteSpace: "nowrap" }}>{c.year}</span>
                </div>
                <div style={{ marginTop: 4, fontSize: 13, color: aTokens.accent }}>{c.where}</div>
                <p style={{ marginTop: 8, fontSize: 14, color: aTokens.inkSoft, lineHeight: 1.55 }}>{c.body}</p>
              </div>
            )}
          </div>

          <div className="a-section-label" style={{ marginTop: 36 }}>Teaching assistantships · University of Saskatchewan</div>
          <ul style={{ marginTop: 16, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
            {CV.teaching.ta.map((t, i) =>
            <li key={i} style={{ fontSize: 13.5, color: aTokens.inkSoft, display: "flex", gap: 12 }}>
                <span style={{ color: aTokens.accent }}>·</span>{t}
              </li>
            )}
          </ul>
        </div>

        <div>
          <div className="a-section-label">Mentoring</div>
          <div style={{ marginTop: 18, display: "grid", gap: 14 }}>
            {CV.teaching.mentoring.map((m, i) =>
            <div key={i} className="a-card" style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <h4 style={{ fontSize: 14.5 }}>{m.name}</h4>
                  <span style={{ fontSize: 11.5, color: aTokens.inkMute }}>{m.level}</span>
                </div>
                <div style={{ marginTop: 4, fontSize: 12.5, color: aTokens.inkSoft }}>{m.where}</div>
                <div style={{ marginTop: 2, fontSize: 11.5, color: aTokens.inkMute }}>Advisor: {m.advisor}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function ACV() {
  return (
    <section style={{ padding: "72px 88px 96px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <div className="a-section-label">Curriculum Vitae</div>
          <h1 style={{ marginTop: 14, fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
            Full record
          </h1>
        </div>
        <a className="a-tag" style={{ background: aTokens.ink, color: aTokens.bg, border: "none", padding: "10px 18px", fontSize: 13 }}>Download PDF →</a>
      </div>

      <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "200px 1fr", gap: 48 }}>
        {/* Education */}
        <div className="a-section-label" style={{ paddingTop: 6 }}>Education</div>
        <div style={{ display: "grid", gap: 22 }}>
          {CV.education.map((e, i) =>
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 110px", gap: 16, paddingBottom: 18, borderBottom: i < CV.education.length - 1 ? `1px solid ${aTokens.line}` : "none" }}>
              <div>
                <h3 style={{ fontSize: 16 }}>{e.degree}</h3>
                <div style={{ marginTop: 4, fontSize: 13.5, color: aTokens.inkSoft }}>{e.school}</div>
                <div style={{ marginTop: 4, fontSize: 12.5, color: aTokens.inkMute }}>Advisor: {e.advisor}</div>
                <div style={{ marginTop: 6, fontSize: 13, color: aTokens.inkSoft, fontStyle: "italic" }}>{e.thesis}</div>
              </div>
              <div style={{ fontSize: 12, color: aTokens.inkMute, textAlign: "right" }}>{e.year}</div>
            </div>
          )}
        </div>

        <div className="a-rule" style={{ gridColumn: "1 / -1" }}></div>

        {/* Experience */}
        <div className="a-section-label" style={{ paddingTop: 6 }}>Experience</div>
        <div style={{ display: "grid", gap: 22 }}>
          {CV.positions.map((p, i) =>
          <div key={i} style={{ paddingBottom: 18, borderBottom: i < CV.positions.length - 1 ? `1px solid ${aTokens.line}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <div>
                  <h3 style={{ fontSize: 16 }}>{p.role}</h3>
                  <div style={{ marginTop: 4, fontSize: 13.5, color: aTokens.inkSoft }}>{p.where}</div>
                  <div style={{ marginTop: 4, fontSize: 12, color: aTokens.inkMute }}>Supervisor: {p.advisor}</div>
                </div>
                <div style={{ fontSize: 12, color: aTokens.inkMute, whiteSpace: "nowrap" }}>{p.dates}</div>
              </div>
              <ul style={{ marginTop: 10, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
                {p.bullets.map((b, j) =>
              <li key={j} style={{ fontSize: 13.5, color: aTokens.inkSoft, lineHeight: 1.55, display: "flex", gap: 10 }}>
                    <span style={{ color: aTokens.accent }}>·</span>{b}
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        <div className="a-rule" style={{ gridColumn: "1 / -1" }}></div>

        {/* Awards */}
        <div className="a-section-label" style={{ paddingTop: 6 }}>Awards & funding</div>
        <div style={{ display: "grid", gap: 10 }}>
          {CV.awards.map((a, i) =>
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 140px 110px", gap: 16, fontSize: 13.5, color: aTokens.inkSoft, alignItems: "baseline" }}>
              <div>
                <span style={{ color: aTokens.ink, fontWeight: 500 }}>{a.name}</span>
                <span style={{ color: aTokens.inkMute }}> · {a.where}</span>
              </div>
              <div style={{ color: aTokens.accent, fontWeight: 500 }}>{a.amount}</div>
              <div style={{ color: aTokens.inkMute, textAlign: "right" }}>{a.year}</div>
            </div>
          )}
        </div>

        <div className="a-rule" style={{ gridColumn: "1 / -1" }}></div>

        {/* Patents */}
        <div className="a-section-label" style={{ paddingTop: 6 }}>Patents</div>
        <div style={{ display: "grid", gap: 18 }}>
          {CV.patents.map((p, i) =>
          <div key={i}>
              <h3 style={{ fontSize: 15, lineHeight: 1.4 }}>{p.title}</h3>
              <div style={{ marginTop: 6, fontSize: 12.5, color: aTokens.inkMute }}>{p.inventors} · {p.docket} · {p.date}</div>
            </div>
          )}
        </div>

        <div className="a-rule" style={{ gridColumn: "1 / -1" }}></div>

        {/* Talks */}
        <div className="a-section-label" style={{ paddingTop: 6 }}>Selected talks</div>
        <div style={{ display: "grid", gap: 14 }}>
          {CV.talks.map((t, i) =>
          <div key={i} style={{ display: "grid", gridTemplateColumns: "70px 1fr 120px", gap: 14, fontSize: 13.5 }}>
              <span className="a-tag" style={{ fontSize: 11, justifySelf: "start" }}>{t.kind}</span>
              <div>
                <div style={{ color: aTokens.ink }}>{t.title}</div>
                <div style={{ marginTop: 3, fontSize: 12.5, color: aTokens.inkMute }}>{t.venue}</div>
              </div>
              <div style={{ fontSize: 12, color: aTokens.inkMute, textAlign: "right" }}>{t.date}</div>
            </div>
          )}
        </div>

        <div className="a-rule" style={{ gridColumn: "1 / -1" }}></div>

        {/* Skills */}
        <div className="a-section-label" style={{ paddingTop: 6 }}>Technical skills</div>
        <div style={{ display: "grid", gap: 12 }}>
          {Object.entries(CV.skills).map(([k, v]) =>
          <div key={k} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, fontSize: 13.5 }}>
              <div style={{ color: aTokens.inkMute }}>{k}</div>
              <div style={{ color: aTokens.inkSoft }}>{v}</div>
            </div>
          )}
        </div>

        <div className="a-rule" style={{ gridColumn: "1 / -1" }}></div>

        {/* Service */}
        <div className="a-section-label" style={{ paddingTop: 6 }}>Service & leadership</div>
        <div style={{ display: "grid", gap: 14, fontSize: 13.5, color: aTokens.inkSoft }}>
          <div><span style={{ color: aTokens.ink, fontWeight: 500 }}>Journal reviews. </span>{CV.service.journals}</div>
          <div><span style={{ color: aTokens.ink, fontWeight: 500 }}>Conference reviews. </span>{CV.service.conferences}</div>
          <div>
            <div style={{ color: aTokens.ink, fontWeight: 500, marginBottom: 4 }}>Organization & leadership.</div>
            <ul style={{ padding: 0, listStyle: "none", display: "grid", gap: 4 }}>
              {[...CV.service.organization, ...CV.service.leadership].map((s, i) =>
              <li key={i} style={{ display: "flex", gap: 10 }}><span style={{ color: aTokens.accent }}>·</span>{s}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="a-rule" style={{ gridColumn: "1 / -1" }}></div>

        {/* Media */}
        <div className="a-section-label" style={{ paddingTop: 6 }}>Media coverage</div>
        <div style={{ display: "grid", gap: 10 }}>
          {CV.media.map((m, i) =>
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 220px 100px", gap: 16, fontSize: 13.5 }}>
              <div style={{ color: aTokens.ink }}><a href={m.url} target="_blank" rel="noopener noreferrer">{m.headline}</a></div>
              <div style={{ color: aTokens.inkSoft, fontStyle: "italic" }}>{m.outlet}</div>
              <div style={{ color: aTokens.inkMute, textAlign: "right" }}>{m.year}</div>
            </div>
          )}
        </div>

        <div className="a-rule" style={{ gridColumn: "1 / -1" }}></div>

        {/* References */}
        <div className="a-section-label" style={{ paddingTop: 6 }}>References</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {CV.references.map((r, i) =>
          <div key={i} className="a-card" style={{ padding: "16px 18px" }}>
              <h4 style={{ fontSize: 14.5 }}>{r.name}</h4>
              <div style={{ marginTop: 4, fontSize: 12.5, color: aTokens.inkSoft }}>{r.role}</div>
              <div style={{ marginTop: 2, fontSize: 12.5, color: aTokens.inkMute }}>{r.where}</div>
              <div style={{ marginTop: 6, fontSize: 12.5, color: aTokens.accent }}>{r.email}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function ACollabMap() {
  // Radial cluster: Sakib center, institution clusters around. Pure absolutely-positioned divs.
  const clusters = CV.collabClusters;
  const positions = [
  { x: 50, y: 12 }, // Stanford top
  { x: 86, y: 30 }, // Saskatchewan upper right
  { x: 92, y: 62 }, // NRC right
  { x: 70, y: 88 }, // Calgary lower right
  { x: 30, y: 88 }, // Manitoba lower left
  { x: 8, y: 62 }, // Industry left
  { x: 14, y: 30 } // International upper left
  ];
  return (
    <div style={{
      position: "relative", height: 520, background: aTokens.panel,
      border: `1px solid ${aTokens.line}`, borderRadius: 14, overflow: "hidden"
    }}>
      {/* Connecting lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {positions.map((pos, i) =>
        <line key={i} x1="50%" y1="50%" x2={`${pos.x}%`} y2={`${pos.y}%`}
        stroke={aTokens.line} strokeWidth="1" strokeDasharray="3 4" />
        )}
      </svg>
      {/* Center node */}
      <div style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        background: aTokens.ink, color: aTokens.bg, padding: "14px 22px", borderRadius: 999,
        fontSize: 14, fontWeight: 600, whiteSpace: "nowrap",
        boxShadow: `0 0 0 8px ${aTokens.bg}, 0 0 0 9px ${aTokens.line}`
      }}>
        Sakib Mostafa
      </div>
      {/* Cluster nodes */}
      {clusters.map((c, i) => {
        const pos = positions[i];
        return (
          <div key={i} style={{
            position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
            transform: "translate(-50%, -50%)", textAlign: "center", width: 180
          }}>
            <div style={{
              display: "inline-block", padding: "6px 12px", background: aTokens.accentSoft,
              color: aTokens.accent, borderRadius: 999, fontSize: 11.5, fontWeight: 600,
              letterSpacing: "0.04em", textTransform: "uppercase"
            }}>{c.label}</div>
            <div style={{ marginTop: 6, fontSize: 10.5, color: aTokens.inkMute }}>{c.city}</div>
            <div style={{ marginTop: 6, fontSize: 11.5, color: aTokens.inkSoft, lineHeight: 1.5 }}>
              {c.people.slice(0, 4).join(" · ")}
              {c.people.length > 4 ? ` · +${c.people.length - 4}` : ""}
            </div>
          </div>);

      })}
    </div>);

}

function AContact() {
  return (
    <section style={{ padding: "72px 88px 96px" }}>
      <div className="a-section-label">Contact</div>
      <h1 style={{ marginTop: 14, fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 760 }}>
        Open to research conversations across cancer AI, computational biology, and biomedical informatics.
      </h1>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48 }}>
        <div>
          <div className="a-section-label">Reach me</div>
          <div style={{ marginTop: 18, display: "grid", gap: 14 }}>
            <div className="a-card" style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: 11.5, color: aTokens.inkMute, letterSpacing: "0.08em", textTransform: "uppercase" }}>Email</div>
              <div style={{ marginTop: 6, fontSize: 17, color: aTokens.ink }}>{CV.email}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="a-card" style={{ padding: "16px 18px" }}>
                <div style={{ fontSize: 11.5, color: aTokens.inkMute, letterSpacing: "0.08em", textTransform: "uppercase" }}>Google Scholar</div>
                <div style={{ marginTop: 6, fontSize: 14, color: aTokens.accent }}>scholar.google.com →</div>
              </div>
              <div className="a-card" style={{ padding: "16px 18px" }}>
                <div style={{ fontSize: 11.5, color: aTokens.inkMute, letterSpacing: "0.08em", textTransform: "uppercase" }}>LinkedIn</div>
                <div style={{ marginTop: 6, fontSize: 14, color: aTokens.accent }}>linkedin.com →</div>
              </div>
            </div>
            <div className="a-card" style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: 11.5, color: aTokens.inkMute, letterSpacing: "0.08em", textTransform: "uppercase" }}>Location</div>
              <div style={{ marginTop: 6, fontSize: 15, color: aTokens.ink }}>{CV.affiliation}</div>
              <div style={{ marginTop: 2, fontSize: 13, color: aTokens.inkSoft }}>Stanford, CA · USA</div>
            </div>
          </div>
        </div>

        <div>
          <div className="a-section-label">Stanford cancer collaborators</div>
          <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
            {CV.stanfordCollaborators.slice(0, 6).map((c, i) =>
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, paddingBottom: 10, borderBottom: i < 5 ? `1px solid ${aTokens.line}` : "none" }}>
                <div style={{ fontSize: 14, color: aTokens.ink, fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: aTokens.inkSoft }}>{c.role}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 56 }}>
        <div className="a-section-label">Collaborator map · academic + industrial</div>
        <div style={{ marginTop: 18 }}>
          <ACollabMap />
        </div>
      </div>
    </section>);

}

// ---- Frame wrapper ----

function APortfolio({ page }) {
  return (
    <div className="a-root" style={{ minHeight: 900, display: "flex", flexDirection: "column" }}>
      <AStyle />
      <ANav page={page} />
      <div style={{ flex: 1 }}>
        {page === "Home" && <AHome />}
        {page === "Research" && <AResearch />}
        {page === "Publications" && <APublications />}
        {page === "Teaching" && <ATeaching />}
        {page === "CV" && <ACV />}
        {page === "Contact" && <AContact />}
      </div>
      <AFooter />
    </div>);

}

window.APortfolio = APortfolio;
