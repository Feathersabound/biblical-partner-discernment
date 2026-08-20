function homeView() {
  const w = loadWalk();
  const done = kindsToday();
  const goal = 3;
  const todayN = w.lastDay === todayKey() ? (w.stepsToday || 0) : 0;
  const streak = w.lastDay === todayKey() || w.lastDay === yesterdayKey() ? (w.streak || 0) : 0;
  const path = [
    { mode: "Check-in", kind: "checkin", title: "1. Today", why: "A short honest look" },
    { mode: "Incident", kind: "incident", title: "2. What happened", why: "Name one fact" },
    { mode: "Repair", kind: "repair", title: "3. Fix it", why: "Stop it. Do the opposite." },
    { mode: "Together", kind: "together", title: "4. Together", why: "Give it to God together" },
    { mode: "Practice", kind: "practice", title: "5. Practice", why: "Ask, thank God, or make peace" }
  ];
  const next = path.find(p => !done.has(p.kind)) || path[0];
  const pct = Math.min(100, Math.round((todayN / goal) * 100));
  return `<div class="card">
    ${toast ? `<p class="ok">${escape(toast)}</p>` : ""}
    <h2>Today’s walk</h2>
    <p class="note">Do three steps today. Healing is doing the next right thing, then the next.</p>
    <div class="grid two">
      <div class="stat"><b>${streak}</b><span>day streak</span></div>
      <div class="stat"><b>${todayN}/${goal}</b><span>steps today</span></div>
    </div>
    <div class="bar"><span style="width:${pct}%"></span></div>
    <div class="path">
      ${path.map(p => `
        <button type="button" class="path-card ${done.has(p.kind) ? "done" : ""}" data-go="${p.mode}">
          <strong>${done.has(p.kind) ? "Done · " : ""}${escape(p.title)}</strong>
          <span>${escape(p.why)}</span>
        </button>
      `).join("")}
    </div>
    <div class="actions">
      <button class="primary" type="button" data-go="${next.mode}">Next: ${escape(LABELS[next.mode] || next.title)}</button>
    </div>
    <p class="scripture">Love is patient and kind. It does not snap. It does not keep a list of wrongs. It is glad when the truth wins.</p>
  </div>`;
}

function checkinView() {
  return `<div class="card">
    <h2>Check-in</h2>
    <p class="note">Short. Honest. Toward the Lord, then toward each other.</p>
    <form id="checkin">
      ${radios("Today I mostly spoke", "speech", ["Blessing", "Intercession", "Constructive criticism", "Accusation", "Silence"])}
      ${radios("When I was unsure I", "asked", ["Asked them", "Assumed", "Did not notice"])}
      ${radios("Anger", "angerSpeed", ["Waited", "Quickly provoked", "No issue today"])}
      ${radios("I surrendered this day to the Lord", "surrenderYou", ["Yes", "Partly", "No"])}
      ${radios("We sought the Lord together", "surrenderTogether", ["Yes", "No", "They would not / could not"])}
      <label>One fact from today<textarea name="fact"></textarea></label>
      <label>One thing to repair or bless<textarea name="repair"></textarea></label>
      <div class="actions"><button class="primary" type="submit">Save check-in</button></div>
    </form>
  </div>`;
}

function verses(kind) {
  return (WORD[kind] || []).map(v => `<p class="scripture"><strong>${escape(v.ref)}</strong> — ${escape(v.text)}</p>`).join("");
}

function togetherView() {
  return `<div class="card">
    <h2>Together before the Lord</h2>
    <p class="note">Sit together. Read the Bible out loud. A feeling is not God if it goes against the Bible.</p>
    <form id="together">
      ${radios("Who is here?", "togetherWho", ["Husband and wife", "Two believers not in covenant marriage", "One willing, one not present"])}
      <h3>1. Direction</h3>
      ${verses("direction")}
      <label>What does the Word say about direction?<textarea name="heardDirection"></textarea></label>
      <h3>2. Obedience</h3>
      ${verses("obedience")}
      <p class="note">Wife: obeying your husband in what is right is obeying the Lord. Husband: you must not hurt her or tell her to sin.</p>
      <label>What does God want each of us to do?<textarea name="heardObedience"></textarea></label>
      <h3>3. Healing</h3>
      ${verses("healing")}
      <label>What must be confessed, forgiven, or bound up?<textarea name="heardHealing"></textarea></label>
      <h3>4. Blessing, not cursing</h3>
      ${verses("blessing")}
      <p class="note">If you spoke death, take the words back. Speak life. Do not repeat the curse.</p>
      <h3>5. The new covenant</h3>
      ${verses("covenant")}
      <p class="note">Luke shows a cup, then the bread, then a cup after the meal. Christ is the true Passover. Discern the body: Jesus, and those who believe.</p>
      <h3>6. We are in a war</h3>
      ${verses("war")}
      <p class="note">The thief comes to steal, kill, and destroy. Life is not always fair. Do not make your spouse the enemy. Jesus came that we may have life abundantly.</p>
      ${radios("I surrender this to the Lord", "surrenderYou", ["Yes", "Partly", "No"])}
      ${radios("The other surrenders", "surrenderThem", ["Yes", "Partly", "No", "Not present"])}
      ${radios("We agree to walk this together", "surrenderTogether", ["Yes", "Not yet", "One refuses"])}
      <label>One next step we will actually do<textarea name="nextStep"></textarea></label>
      <div class="actions"><button class="primary" type="submit">Save this time together</button></div>
    </form>
  </div>`;
}

function repairView() {
  const id = state.repairId || "";
  const r = REPAIRS[id];
  const picker = Object.entries(REPAIRS).map(([k, v]) =>
    `<label><input type="radio" name="repairId" data-key="repairId" value="${k}" ${id === k ? "checked" : ""} /> ${escape(v.title)}</label>`
  ).join("");
  return `<div class="card">
    <h2>Fix it</h2>
    <p class="note">Pick it. Stop it. Do the opposite.</p>
    <div class="choices">${picker}</div>
    ${r ? `
      <h3>${escape(r.title)}</h3>
      <p class="warn"><strong>Stop:</strong> ${escape(r.stop)}</p>
      <p class="hit"><strong>Do now:</strong> ${escape(r.doNow)}</p>
      <p class="ok"><strong>Opposite:</strong> ${escape(r.opposite)}</p>
      <p class="scripture">${escape(r.word)}</p>
      <form id="repair">
        <label>The one fact<textarea name="fact"></textarea></label>
        <label>What I will say to God<textarea name="toGod"></textarea></label>
        <label>What I will say to them<textarea name="toThem"></textarea></label>
        <label>The opposite I will do in 24 hours<textarea name="opposite"></textarea></label>
        ${radios("Have you done the do now step?", "repairDone", ["I have done it", "I will do it today", "I am not willing yet"])}
        <div class="actions"><button class="primary" type="submit">Save this repair</button></div>
      </form>
    ` : `<p class="note">Choose one. Then the steps appear.</p>`}
  </div>`;
}

function practiceView() {
  return `<div class="card">
    <h2>Practices</h2>
    ${PRACTICES.map(p => `
      <div class="log-item">
        <strong>${p.title}</strong>
        <p>${p.text}</p>
        <button class="ghost" type="button" data-practice="${p.id}">I did this</button>
      </div>
    `).join("")}
  </div>`;
}

function historyView() {
  const log = loadLog();
  if (!log.length) return `<div class="card"><h2>Saved</h2><p class="note">Nothing stored yet.</p></div>`;
  return `<div class="card">
    <h2>Saved</h2>
    ${log.map(e => `
      <div class="log-item">
        <small>${escape(e.kind)} · ${escape(when(e.at))}</small>
        <div>${escape(e.title || e.belief || e.fact || e.practiceTitle || "")}</div>
      </div>
    `).join("")}
    <div class="actions"><button class="ghost" type="button" id="wipe">Clear this device</button></div>
  </div>`;
}

function renderProgress() {
  const nav = document.getElementById("progress");
  if (mode !== "Incident") { nav.hidden = true; nav.innerHTML = ""; return; }
  nav.hidden = false;
  nav.innerHTML = "";
  STEPS.forEach((name, i) => {
    const b = document.createElement("button");
    b.textContent = String(i + 1);
    b.title = name;
    if (i === state.step) b.className = "on";
    b.onclick = () => { state.step = i; render(); };
    nav.appendChild(b);
  });
}

function render() {
  renderTabs();
  renderProgress();
  const app = document.getElementById("app");
  app.innerHTML = "";
  let node;
  if (mode === "Home") node = el(homeView());
  else if (mode === "Incident") node = el(incidentPage());
  else if (mode === "Check-in") node = el(checkinView());
  else if (mode === "Together") node = el(togetherView());
  else if (mode === "Repair") node = el(repairView());
  else if (mode === "Practice") node = el(practiceView());
  else node = el(historyView());
  app.appendChild(node);
  node.querySelectorAll("[data-go]").forEach(b => {
    b.onclick = () => {
      mode = b.dataset.go;
      if (mode === "Incident") Object.assign(state, blankIncident());
      render();
    };
  });
  if (mode === "Incident") {
    bindIncident(node);
    if (state.step >= STEPS.length - 1) {
      node.querySelectorAll("[data-key]").forEach(n => n.addEventListener("change", () => render()));
    }
    const save = node.querySelector("#save-incident");
    if (save) save.onclick = () => {
      addEntry({ kind: "incident", title: state.belief || state.fact, asked: state.asked, speech: state.speech, angerSpeed: state.angerSpeed, fact: state.fact, belief: state.belief });
      toast = "Saved. Now go to Fix it, or take today’s next step.";
      mode = "Home";
      render();
    };
  }
  if (mode === "Check-in") {
    const form = node.querySelector("#checkin");
    bindIncident(form);
    form.addEventListener("submit", ev => {
      ev.preventDefault();
      addEntry({ kind: "checkin", title: "Check-in", speech: state.speech, asked: state.asked, angerSpeed: state.angerSpeed, surrenderYou: state.surrenderYou, surrenderTogether: state.surrenderTogether, fact: form.fact.value, repair: form.repair.value });
      toast = "Today is saved. Take the next step.";
      mode = "Home";
      render();
    });
  }
  if (mode === "Repair") {
    node.querySelectorAll("[data-key=repairId]").forEach(n => {
      n.addEventListener("change", () => { state.repairId = n.value; render(); });
    });
    const form = node.querySelector("#repair");
    if (form) {
      bindIncident(form);
      form.addEventListener("submit", ev => {
        ev.preventDefault();
        const r = REPAIRS[state.repairId];
        addEntry({ kind: "repair", title: r ? r.title : "Repair", repairId: state.repairId, fact: form.fact.value, toGod: form.toGod.value, toThem: form.toThem.value, opposite: form.opposite.value, repairDone: state.repairDone });
        toast = "Repair saved. Do the opposite within a day.";
        mode = "Home";
        render();
      });
    }
  }
  if (mode === "Together") {
    const form = node.querySelector("#together");
    bindIncident(form);
    form.addEventListener("submit", ev => {
      ev.preventDefault();
      addEntry({ kind: "together", title: "Together: " + (form.nextStep.value || "surrender"), togetherWho: state.togetherWho, heardDirection: form.heardDirection.value, heardObedience: form.heardObedience.value, heardHealing: form.heardHealing.value, surrenderYou: state.surrenderYou, surrenderThem: state.surrenderThem, surrenderTogether: state.surrenderTogether, nextStep: form.nextStep.value });
      toast = "Together is saved. Do the one next step.";
      mode = "Home";
      render();
    });
  }
  if (mode === "Practice") {
    node.querySelectorAll("[data-practice]").forEach(b => {
      b.onclick = () => {
        const p = PRACTICES.find(x => x.id === b.dataset.practice);
        addEntry({ kind: "practice", title: p.title, practiceTitle: p.title, practiceId: p.id });
        toast = "Practice done. That is one step.";
        mode = "Home";
        render();
      };
    });
  }
  const wipe = node.querySelector("#wipe");
  if (wipe) wipe.onclick = () => {
    if (confirm("Clear all records on this device?")) { saveLog([]); render(); }
  };
}

render();
