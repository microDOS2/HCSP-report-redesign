// ═══ §5 verdict: plain-language decision board + regulatory catalyst horizon (P3 wall chart) ═══

/* ────────────────────────────────────────────────────────────
   10 · The bottom line — what to do, in what order.
   A plain decision board: three groups, one sentence per market,
   every score/condition drillable to its dated K-source.
   (Replaces the old balance-scale graphic; scores and sources unchanged.)
──────────────────────────────────────────────────────────── */
(function () {
  const host = document.getElementById("verdict-chart");
  if (!host) return;
  const body = U.frame(host, {
    title: "The bottom line: start with three markets, prove reliability, then expand.",
    sub: "A PLAIN DECISION BOARD · SCORE OUT OF 10 FROM THE FIFTEEN-INDUSTRY RANKING · CLICK ANY ROW FOR THE FULL EVIDENCE AND ITS DATED SOURCES",
    src: "Research compilation — report Ch. 10 synthesis (2026-09); every score and condition traces to a K anchor",
  });

  const byKey = {};
  RPT.league.forEach(d => { byKey[d.key] = d; });

  // Board content: plain-English names, one-sentence whys, and "what has to
  // happen first" conditions — all drawn from the existing ranking data (RPT.league).
  const GROUPS = [
    {
      cls: "go", head: "1 · GO NOW — strongest fit",
      note: "Enter these three markets directly, selling a destruction service priced well under what disposal costs today.",
      rows: [
        { key: "pfas", name: "PFAS destruction & landfill leachate",
          why: "Regulation forces the cleanup, federally witnessed tests show 99.9993% destruction, and today's disposal costs $1–28 per gallon." },
        { key: "defense", name: "Defense, maritime & remote sites",
          why: "The Defense Department alone owes more than $9.3B of PFAS cleanup across 718 installations, and remote sites pay 2–5× normal prices." },
        { key: "textile", name: "Textile & dyeing clusters — India",
          why: "Courts already force these clusters to run zero-discharge plants that still cannot destroy the leftover brine and sludge." },
      ],
    },
    {
      cls: "next", head: "2 · GO NEXT — after prototypes and pilot results",
      note: "Strong scores, but the money waits until working prototypes and published pilot data prove the machines run reliably.",
      rows: [
        { key: "chem", name: "Chemical & hazardous waste",
          why: "Getting rid of halogenated solvents costs $15–50+ per gallon, and the existing incinerators are running almost full." },
        { key: "pharma", name: "Pharma & biotech",
          why: "Solvent and drug-ingredient disposal costs $1.5–15 per gallon, and new rules make proven destruction worth paying for." },
        { key: "distill", name: "Distillery & ethanol vinasse",
          why: "Spent wash is strong enough to power its own treatment and export electricity, and India is forcing about 270 distilleries to comply." },
        { key: "semi", name: "Semiconductor side-streams",
          why: "New fabs face PFAS permit fights and pay $1.8–4 per gallon to get rid of solvent and polishing side-streams.",
          first: "Side-streams only — the fabs' bulk wastewater is far too dilute to pay." },
        { key: "bio", name: "Municipal biosolids — crisis regions",
          why: "US cities spend $4.8B a year on sludge disposal, and PFAS worries are closing the cheap routes.",
          first: "Only where disposal costs are already high — the Northeast, Florida, California." },
        { key: "fnb", name: "Food & beverage side-streams",
          why: "Concentrated side-streams already cost $45–120 per 1,000 gallons to haul away.",
          first: "Stick to concentrated side-streams; digesters own the bulk wastewater." },
        { key: "islands", name: "Islands & resorts",
          why: "The only market where power, water, and cooling all sell at near world-maximum prices.",
          first: "The waste arrives too weak — fats, oil, and food waste must be blended in." },
      ],
    },
    {
      cls: "cond", head: "3 · ONLY IF CONDITIONS ARE RIGHT",
      note: "No revenue plan by default — pursue only where the stated condition holds.",
      rows: [
        { key: "og", name: "Produced water — Marcellus hub niche",
          why: "Real only where trucking disposal costs $3–15 a barrel (the Marcellus region); cheap Permian pipelines kill the idea elsewhere.",
          first: "Only large 50–100K barrel-a-day hub projects in the Marcellus region qualify." },
        { key: "cea", name: "Indoor agriculture (CEA)",
          why: "The wastewater is 99.8% water — too weak to power the process — and most customers are short of cash.",
          first: "A regulatory showcase under California's zero-waste invitation — never count on it for revenue." },
        { key: "cafo", name: "Factory-farm manure (CAFO)",
          why: "Manure is 85–92% water, and subsidized digesters already monetize the same story better.",
          first: "Only where spreading land runs out — crowded dairy belts." },
        { key: "mining", name: "Mining & remote camps",
          why: "Remote sites pay high prices per unit, but each site is small and buys on the commodity cycle.",
          first: "Opportunistic only — take the work when a site comes to you." },
        { key: "dc", name: "Data centers — as an energy customer, not a host",
          why: "Their on-site waste cannot be treated by this process — but they wait 4–7 years for a grid connection.",
          first: "Build the plant next door at a waste-rich site and sell them power, cooling, and water across the fence." },
      ],
    },
  ];

  const board = document.createElement("div");
  board.className = "vboard";

  GROUPS.forEach(g => {
    const gEl = document.createElement("div");
    gEl.className = "vb-group vb-" + g.cls;
    const h = document.createElement("h3");
    h.className = "vb-head"; h.textContent = g.head;
    const n = document.createElement("p");
    n.className = "vb-note"; n.textContent = g.note;
    gEl.appendChild(h); gEl.appendChild(n);

    g.rows.forEach(r => {
      const d = byKey[r.key];
      if (!d) return;
      const row = document.createElement("div");
      row.className = "vb-row";
      row.setAttribute("data-drill-keep", "");
      const score = document.createElement("span");
      score.className = "vb-score";
      score.textContent = Number.isInteger(d.score) ? d.score.toFixed(1) : String(d.score);
      const txt = document.createElement("span");
      txt.className = "vb-body";
      const nm = document.createElement("span");
      nm.className = "vb-name"; nm.textContent = r.name;
      const wy = document.createElement("span");
      wy.className = "vb-why"; wy.textContent = r.why;
      txt.appendChild(nm); txt.appendChild(wy);
      if (r.first) {
        const f = document.createElement("span");
        f.className = "vb-first"; f.textContent = "First: " + r.first;
        txt.appendChild(f);
      }
      row.appendChild(score); row.appendChild(txt);
      row.addEventListener("click", e => {
        e.stopPropagation();
        U.showDrill({
          title: r.name.toUpperCase(),
          value: d.score + " / 10 · " + g.head.replace(/^\d · /, ""),
          sub: r.why + (r.first ? " What has to happen first: " + r.first : "")
            + " Full rationale: " + d.why + " " + RPT.tiers[d.tier - 1].posture,
          source: CH.srcLink(d.src), x: e.clientX, y: e.clientY,
        });
      });
      gEl.appendChild(row);
    });
    board.appendChild(gEl);
  });

  // ── boxed plain list: what would change this advice ──
  const box = document.createElement("div");
  box.className = "vb-change";
  const bh = document.createElement("h3");
  bh.className = "vb-change-h"; bh.textContent = "What would change this advice";
  box.appendChild(bh);
  const ul = document.createElement("ul");
  RPT.verdict.changes.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c.t;
    li.setAttribute("data-drill-keep", "");
    li.addEventListener("click", e => {
      e.stopPropagation();
      U.showDrill({
        title: "WHAT WOULD CHANGE THIS ADVICE", value: "Tripwire",
        sub: c.t, source: CH.srcLink(c.src), x: e.clientX, y: e.clientY,
      });
    });
    ul.appendChild(li);
  });
  box.appendChild(ul);
  board.appendChild(box);

  body.appendChild(board);
})();

/* ────────────────────────────────────────────────────────────
   11 · The demand clock — dated regulatory catalysts, 2023–2045
──────────────────────────────────────────────────────────── */
(function () {
  const host = document.getElementById("horizon-chart");
  if (!host) return;
  const body = U.frame(host, {
    title: "The demand clock: several of the risks are dated, and can be planned around",
    sub: "WALL-CHART TIMELINE 2023–2045 · INK = POLICY FRAMEWORK · BLUE = DEMAND CATALYST · RED FRAME = RISK/COMPETITION EVENT · 2026 = CURRENT WINDOW · CLICK PLAQUES",
    src: "Industry & official — US EPA, GAO, Defense Dept, WHO, EU wastewater directive 2024/3019, India's pollution board · dates as published",
  });
  const W = 880, H = 380, axisY = 316;
  // piecewise-linear time scale: dense recent decade expanded, long horizon compressed
  const x = v => v <= 2028 ? 56 + (v - 2022.5) / 5.5 * 500 : 556 + (v - 2028) / 18 * 268;
  const svg = CH.svg(body, W, H);
  const ink = "#051c2c", inkLo = "#42566a", blue = "#2251ff", neg = "#c22f4e";
  const clsCol = { policy: ink, demand: blue, risk: neg };

  // current window band (2026)
  svg.append("rect").attr("x", x(2026)).attr("y", 30).attr("width", x(2027) - x(2026)).attr("height", axisY - 26)
    .attr("fill", "rgba(34,81,255,.06)");
  svg.append("text").attr("x", (x(2026) + x(2027)) / 2).attr("y", 24).attr("text-anchor", "middle")
    .attr("font-family", CH.MONO).attr("font-size", 8.5).attr("font-weight", 700).attr("fill", blue).text("NOW");

  // double-line axis
  svg.append("line").attr("x1", 40).attr("x2", W - 16).attr("y1", axisY).attr("y2", axisY).attr("stroke", ink).attr("stroke-width", 1.6);
  svg.append("line").attr("x1", 40).attr("x2", W - 16).attr("y1", axisY + 4).attr("y2", axisY + 4).attr("stroke", ink).attr("stroke-width", 1);
  [2025, 2030, 2035, 2040, 2045].forEach(v => {
    svg.append("line").attr("x1", x(v)).attr("x2", x(v)).attr("y1", axisY - 4).attr("y2", axisY + 9).attr("stroke", ink);
    svg.append("text").attr("x", x(v)).attr("y", axisY + 24).attr("text-anchor", "middle")
      .attr("font-family", CH.MONO).attr("font-size", 9.5).attr("fill", inkLo).text(v);
  });

  // greedy layering of plaques
  const layers = []; // each: last x-end
  const placed = RPT.catalysts.map(c => {
    const wpx = Math.max(76, c.label.length * 7.6 + 20);
    const cx = x(c.y);
    let li = 0;
    for (;;) {
      if (!layers[li] || cx - wpx / 2 > layers[li] + 8) { layers[li] = cx + wpx / 2; break; }
      li++;
    }
    return { ...c, wpx, cx, li };
  });
  const layerY = li => 262 - li * 54;
  const stemG = svg.append("g");   // stems first (never pierce plaque text)
  const plqG = svg.append("g");    // plaques after

  placed.forEach((p, i) => {
    const py = layerY(p.li), col = clsCol[p.cls];
    stemG.append("line").attr("x1", p.cx).attr("x2", p.cx).attr("y1", py + 20).attr("y2", axisY - 2)
      .attr("stroke", col).attr("stroke-width", 0.9).attr("opacity", 0.55);
    stemG.append("circle").attr("cx", p.cx).attr("cy", axisY).attr("r", 2.6).attr("fill", col);
    const g = plqG.append("g").style("opacity", 0);
    g.append("rect").attr("x", p.cx - p.wpx / 2).attr("y", py - 12).attr("width", p.wpx).attr("height", 34)
      .attr("rx", 2).attr("fill", "#fff").attr("stroke", col).attr("stroke-width", p.cls === "demand" ? 1.8 : 1.2)
      .attr("stroke-dasharray", p.cls === "risk" ? "5 3" : null);
    const yr = Math.floor(p.y);
    g.append("text").attr("x", p.cx - p.wpx / 2 + 7).attr("y", py + 1)
      .attr("font-family", CH.MONO).attr("font-size", 8.5).attr("font-weight", 700).attr("fill", col).text(yr);
    g.append("text").attr("x", p.cx - p.wpx / 2 + 7).attr("y", py + 15)
      .attr("font-family", CH.SERIF).attr("font-weight", 700).attr("font-size", 10.5).attr("fill", ink).text(p.label);
    CH.drill(g, () => ({
      title: `${yr} · ${p.label.toUpperCase()}`, value: p.cls === "risk" ? "RISK EVENT" : p.cls === "demand" ? "DEMAND CATALYST" : "POLICY FRAMEWORK",
      sub: p.ev + ".", source: CH.srcLink(p.src),
    }));
    if (CH.REDUCE) g.style("opacity", 1);
    else g.transition().delay(i * 110).duration(350).style("opacity", 1);
  });

  svg.append("text").attr("x", 56).attr("y", axisY + 42)
    .attr("font-family", CH.MONO).attr("font-size", 8.5).attr("fill", inkLo)
    .text("MONEY FOLLOWS DATED CLOCKS, NOT BLIND STAGING · THE EU WASTEWATER-DIRECTIVE BUILD-OUT RUNS TO 2045 (LEGAL TIMETABLE)");
})();
