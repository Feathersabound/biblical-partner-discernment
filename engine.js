let mode = "Home";
const state = blankIncident();

function blankIncident() {
  return {
    step: 0,
    relationship: "", believers: "", fact: "", interpretation: "", asked: "",
    belief: "", checkedPartner: "", checkedScripture: "", source: "",
    speech: "", delivery: "", triggerSources: [], triggerNow: "",
    spiritual: [], surrenderYou: "", surrenderThem: "", surrenderTogether: "",
    traits: [], angerSpeed: "", accounting: "", role: "",
    togetherWho: "", repairId: "", repairDone: "",
    blockedAsk: "", withheldObey: "", heAskedSin: "", IHarmed: "",
    constructiveAim: "", forgiveNow: "", showMore: "",
    needGod: "", thankOne: "", reconcileWanted: ""
  };
}

function loadLog() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
function saveLog(list) { localStorage.setItem(KEY, JSON.stringify(list)); }
let toast = "";
function todayKey() { return new Date().toISOString().slice(0, 10); }
function yesterdayKey() { return new Date(Date.now() - 86400000).toISOString().slice(0, 10); }
function loadWalk() {
  try { return JSON.parse(localStorage.getItem(KEY + "-walk") || "{}"); }
  catch { return {}; }
}
function markWalk() {
  const w = loadWalk();
  const t = todayKey();
  if (w.lastDay === t) w.stepsToday = (w.stepsToday || 0) + 1;
  else {
    w.streak = w.lastDay === yesterdayKey() ? (w.streak || 0) + 1 : 1;
    w.stepsToday = 1;
    w.lastDay = t;
  }
  w.total = (w.total || 0) + 1;
  localStorage.setItem(KEY + "-walk", JSON.stringify(w));
}
function addEntry(entry) {
  const list = loadLog();
  list.unshift({ id: Date.now(), at: new Date().toISOString(), ...entry });
  saveLog(list.slice(0, 200));
  markWalk();
}
function el(html) {
  const d = document.createElement("div");
  d.innerHTML = html.trim();
  return d.firstElementChild;
}
function escape(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&", "<": "<", ">": ">", '"': """, "'": "&#39;" }[c]));
}
function when(iso) {
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}
function renderTabs() {
  const nav = document.getElementById("tabs");
  nav.innerHTML = "";
  MODES.forEach(name => {
    const b = document.createElement("button");
    b.textContent = LABELS[name] || name;
    if (name === mode) b.className = "on";
    b.onclick = () => {
      mode = name;
      if (name === "Incident") Object.assign(state, blankIncident());
      render();
    };
    nav.appendChild(b);
  });
}
function field(label, key) {
  return `<label>${label}<textarea data-key="${key}">${escape(state[key] || "")}</textarea></label>`;
}
function radios(label, key, options) {
  return `<p class="note" style="margin-bottom:.35rem"><strong>${label}</strong></p>
    <div class="choices">${options.map(o => `
      <label><input type="radio" name="${key}" data-key="${key}" value="${escape(o)}" ${state[key] === o ? "checked" : ""} /> ${o}</label>
    `).join("")}</div>`;
}
function checks(label, key, options) {
  const cur = state[key] || [];
  return `<p class="note" style="margin-bottom:.35rem"><strong>${label}</strong></p>
    <div class="choices">${options.map(o => `
      <label><input type="checkbox" data-arr="${key}" value="${escape(o)}" ${cur.includes(o) ? "checked" : ""} /> ${o}</label>
    `).join("")}</div>`;
}
function bindIncident(root) {
  root.querySelectorAll("[data-key]").forEach(n => {
    const ev = n.tagName === "TEXTAREA" || n.type === "text" ? "input" : "change";
    n.addEventListener(ev, () => { state[n.dataset.key] = n.value; });
  });
  root.querySelectorAll("[data-arr]").forEach(n => {
    n.addEventListener("change", () => {
      const key = n.dataset.arr;
      const set = new Set(state[key] || []);
      if (n.checked) set.add(n.value); else set.delete(n.value);
      state[key] = [...set];
    });
  });
  const next = root.querySelector("[data-next]");
  const back = root.querySelector("[data-back]");
  if (next) next.onclick = () => { state.step = Math.min(STEPS.length - 1, state.step + 1); render(); };
  if (back) back.onclick = () => { state.step = Math.max(0, state.step - 1); render(); };
}
function actions(last = false) {
  return `<div class="actions">
    ${state.step > 0 ? `<button class="ghost" type="button" data-back>Back</button>` : ""}
    <button class="primary" type="button" data-next>${last ? "See the plan" : "Next"}</button>
  </div>`;
}
function interactionPlan() {
  const plan = {
    pattern: "Check the fact before you keep the story.",
    stop: "Stop treating your guess as if it already happened.",
    say: "I want to check something. What did you mean when you said this?",
    doNow: "Ask them. Write their answer next to yours.",
    later: "If the Bible does not say your guess is true, let it go.",
    extra: []
  };
  const married = (state.relationship || "").includes("Marriage");
  const dating = (state.relationship || "").includes("Dating");
  if (!state.fact.trim()) {
    plan.pattern = "There is no clear fact yet.";
    plan.doNow = "Write only what was said or done. Then ask.";
    return plan;
  }
  if (state.asked !== "Yes") {
    plan.pattern = "You decided what they meant without asking.";
    plan.stop = "Stop filling in their motive.";
    plan.say = "I assumed you meant ______. Is that what you meant?";
    plan.doNow = "Ask that today. Do not argue the feeling first.";
  }
  if ((state.interpretation || "").length > 8 && state.asked !== "Yes") {
    plan.pattern = "You mixed what happened with what you decided it meant.";
  }
  if (state.blockedAsk === "I was afraid") plan.extra.push("Fear of the talk is not a reason to keep a false story. Ask one calm question.");
  if (state.blockedAsk === "I was sure") plan.extra.push("Being sure is not the same as being right. Test it.");
  if (state.speech && state.speech.includes("Constructive")) {
    plan.pattern = "You were trying to correct.";
    plan.stop = "Do not let the fact become a name for who they are.";
    plan.say = "Here is the one thing I saw: ______. I want to help, not to shame you.";
    plan.doNow = "Say the fact. Check your tone. Stop after one point.";
    if (state.constructiveAim === "To win") {
      plan.pattern = "The correction was used to win.";
      plan.stop = "Stop trying to win the story.";
    }
  }
  if (state.speech && (state.speech.includes("Accusation") || state.speech.includes("Curse"))) {
    plan.pattern = "Your words blamed them or spoke harm.";
    plan.stop = "Stop naming them as a bad kind of person.";
    plan.say = "I was wrong to say ______. I take that back. What I know is this: ______.";
    plan.doNow = "Take the words back. Then say one true kind thing.";
  }
  if (state.speech === "Silence" && state.asked !== "Yes") {
    plan.extra.push("Silence kept the guess alive. A short question is kinder than a long story in your head.");
  }
  if (state.angerSpeed && state.angerSpeed.includes("quickly")) {
    plan.stop = "Stop answering while you are hot.";
    plan.doNow = "Wait. Then say one fact in a calm voice.";
  }
  if (state.accounting && state.accounting.includes("ledger")) {
    plan.pattern = "You added this to an old list of who they are.";
    plan.stop = "Stop using today’s fact as proof of the whole list.";
    plan.later = "Deal with this one fact only. Give the old list to God.";
  }
  if ((state.triggerSources || []).some(s => s !== "None I can name")) {
    plan.pattern = "An old hurt is making today’s words sound worse.";
    plan.say = "This hit an old place in me. I still need to know what you meant just now.";
    plan.extra.push("Name the old hurt. Then return to today’s words.");
  }
  if (state.forgiveNow === "No") {
    plan.pattern = "You are holding this as a right to stay bitter.";
    plan.doNow = "Forgive before God first. Then speak the one fact if it still needs to be said.";
  }
  if (dating) plan.later = "This is not marriage. Do not act as if those vows are already made.";
  if (married && state.role === "Wife") {
    plan.later = "Do not refuse a right act of obedience because of a feeling you have not checked. If he asked you to sin, refuse the sin.";
    if (state.withheldObey === "Yes") {
      plan.pattern = "You held back a right act of obedience.";
      plan.doNow = "Do the right thing as unto the Lord. Do not give a speech with it.";
    }
    if (state.heAskedSin === "Yes") {
      plan.pattern = "If he asked you to sin, you must obey God, not that command.";
      plan.doNow = "Refuse the sin. Stay clear. Get help if you are not safe.";
      plan.say = "I cannot do that. It would be sin. I will still do what is right.";
    }
  }
  if (married && state.role === "Husband") {
    plan.later = "Lead by what you do. Do not speak harm. Care for her.";
    if (state.IHarmed === "Yes") {
      plan.pattern = "You used your place to hurt.";
      plan.stop = "Stop barking, scoring, and speaking death.";
      plan.say = "I was harsh. I was wrong. Will you tell me how that landed?";
      plan.doNow = "Repent. Ask. Care for her. No lecture.";
    }
  }
  if ((state.believers || "").includes("No")) {
    plan.extra.push("You do not both follow Jesus. You still give yourself to God. Do not twist the Bible to get your way.");
  }
  if (state.needGod === "Yes — I need God") {
    plan.extra.push("You need God here. Ask Him. Then do the one small step.");
  }
  if (state.needGod === "I am not safe") {
    plan.pattern = "Safety comes first.";
    plan.stop = "Do not treat danger as a communication problem.";
    plan.doNow = "Get safe. Tell a trusted person.";
    plan.say = "I cannot stay in harm. I will do what is right.";
  }
  if (state.thankOne === "Yes") plan.extra.push("Thank God for that one true thing today.");
  if (state.reconcileWanted === "Yes") plan.extra.push("If it is safe, go to them. Own your part.");
  if (state.reconcileWanted === "It is not safe") plan.extra.push("Do not force a talk. Get safe.");
  return plan;
}
function extraQuestions() {
  const q = [];
  if (state.asked !== "Yes") q.push(["blockedAsk", "What stopped you asking?", ["I was afraid", "I was sure", "I did not think of it", "Not sure"]]);
  if (state.speech && state.speech.includes("Constructive")) q.push(["constructiveAim", "What was the aim of the correction?", ["To help", "To win", "To vent", "Not sure"]]);
  if ((state.relationship || "").includes("Marriage") && state.role === "Wife") {
    q.push(["withheldObey", "Did you hold back a right act of obedience?", ["Yes", "No", "Not sure"]]);
    q.push(["heAskedSin", "Did he ask you to sin?", ["Yes", "No", "Not sure"]]);
  }
  if ((state.relationship || "").includes("Marriage") && state.role === "Husband") {
    q.push(["IHarmed", "Did you use your place to hurt or speak harm?", ["Yes", "No", "Not sure"]]);
  }
  q.push(["forgiveNow", "Have you forgiven this before God?", ["Yes", "No", "Not yet"]]);
  q.push(["needGod", "Is this too big for you alone?", ["Yes — I need God", "I can do the next step", "I am not safe"]]);
  q.push(["thankOne", "Can you thank God for one true thing in this?", ["Yes", "Not yet"]]);
  q.push(["reconcileWanted", "Do you want to make peace, if it is safe?", ["Yes", "Not yet", "It is not safe"]]);
  return q;
}
function incidentPage() {
  switch (state.step) {
    case 0:
      return `<div class="card"><h2>Who is this?</h2>
        ${radios("Relationship", "relationship", ["Marriage (a promise before God)", "Dating (not that promise)", "Separated / not sure"])}
        ${radios("I am the", "role", ["Husband", "Wife", "Boyfriend", "Girlfriend", "Other"])}
        ${radios("Do you both follow Jesus?", "believers", ["Yes", "No — one does not", "Not sure"])}
        ${actions()}</div>`;
    case 1:
      return `<div class="card"><h2>What happened?</h2>
        ${field("What was said or done?", "fact")}
        ${field("What did you decide it meant?", "interpretation")}
        ${field("The belief in one line", "belief")}
        ${radios("Did you ask what they meant?", "asked", ["Yes", "No", "Not yet"])}
        <p class="note">A different way of thinking is not an attack. A feeling is not proof.</p>
        ${actions()}</div>`;
    case 2:
      return `<div class="card"><h2>A little more (optional)</h2>
        ${radios("Your words", "speech", ["Blessing", "Prayer for them", "Constructive criticism (facts, to help)", "Accusation / I guessed their motive", "Curse / I named them as a bad person", "Silence"])}
        ${radios("Anger", "angerSpeed", ["I waited", "I was quickly angry", "Not sure"])}
        ${radios("Old list?", "accounting", ["This one fact only", "I added it to a ledger of who they are", "Not sure"])}
        ${checks("Old hurt that may have flared", "triggerSources", ["Rejection", "Abuse", "Bad parenting", "Divorce", "Wrong teaching", "None I can name"])}
        ${actions(true)}</div>`;
    default:
      return incidentReport();
  }
}
function buildHits() {
  const hits = [];
  if ((state.relationship || "").includes("Dating")) hits.push(["hit", "This is not marriage. Do not treat it as if those vows were made."]);
  if ((state.relationship || "").includes("Marriage")) hits.push(["ok", "You are married before God. A wife obeys as unto the Lord. A husband must not hurt her or tell her to sin."]);
  if (state.asked === "No" || state.checkedPartner === "No") hits.push(["warn", "You did not ask them what they meant."]);
  if (state.speech && (state.speech.includes("Accusation") || state.speech.includes("Curse"))) hits.push(["warn", "Your words blamed them or spoke harm."]);
  if ((state.triggerSources || []).some(s => s !== "None I can name")) hits.push(["hit", "An old hurt may be making today sound worse."]);
  if (state.angerSpeed && state.angerSpeed.includes("quickly")) hits.push(["warn", "Love does not snap."]);
  if (state.accounting && state.accounting.includes("ledger")) hits.push(["warn", "Love does not keep a list of wrongs."]);
  if (!state.fact.trim()) hits.push(["warn", "You have not written what actually happened."]);
  return hits;
}
function incidentReport() {
  const p = interactionPlan();
  const hits = buildHits();
  const more = extraQuestions();
  return `<div class="card report">
    <h2>How to talk now</h2>
    <p class="hit"><strong>What is going on:</strong> ${escape(p.pattern)}</p>
    <p class="warn"><strong>Stop:</strong> ${escape(p.stop)}</p>
    <p class="ok"><strong>Say this:</strong> ${escape(p.say)}</p>
    <p><strong>Do now:</strong> ${escape(p.doNow)}</p>
    <p class="note">${escape(p.later)}</p>
    ${(p.extra || []).map(t => `<p class="hit">${escape(t)}</p>`).join("")}
    <h3>See yourself</h3>
    <p>Old hurt can teach a lie. Truth is what God says and what actually happened.</p>
    <p>Your part: ask, stop harm in your words, do the next right thing. God’s part: change the heart, heal, give power to obey and forgive.</p>
    <p><strong>Fact:</strong> ${escape(state.fact || "—")}</p>
    ${hits.map(([k, t]) => `<p class="${k}">${t}</p>`).join("")}
    <h3>Want a sharper plan?</h3>
    <p class="note">Answer any of these. The engine will update.</p>
    ${more.map(([key, label, opts]) => radios(label, key, opts)).join("")}
    <div class="actions">
      <button class="ghost" type="button" data-back>Back</button>
      <button class="primary" type="button" id="save-incident">Save this plan</button>
      <button class="ghost" type="button" data-go="Repair">Fix it next</button>
    </div>
  </div>`;
}
function kindsToday() {
  const t = todayKey();
  return new Set(loadLog().filter(e => (e.at || "").startsWith(t)).map(e => e.kind));
}
