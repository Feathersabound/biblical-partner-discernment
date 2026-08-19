const STEPS = [
  "Start",
  "Relationship",
  "Facts",
  "Belief",
  "Test",
  "Speech",
  "Triggers",
  "Spiritual",
  "Surrender",
  "Traits",
  "Love",
  "Report"
];

const state = {
  step: 0,
  relationship: "",
  believers: "",
  fact: "",
  interpretation: "",
  asked: "",
  belief: "",
  checkedPartner: "",
  checkedScripture: "",
  source: "",
  speech: "",
  delivery: "",
  triggerSources: [],
  triggerNow: "",
  spiritual: [],
  surrenderYou: "",
  surrenderThem: "",
  surrenderTogether: "",
  traits: [],
  angerSpeed: "",
  accounting: "",
  role: ""
};

function el(html) {
  const d = document.createElement("div");
  d.innerHTML = html.trim();
  return d.firstElementChild;
}

function renderProgress() {
  const nav = document.getElementById("progress");
  nav.innerHTML = "";
  STEPS.forEach((name, i) => {
    const b = document.createElement("button");
    b.textContent = `${i + 1}`;
    b.title = name;
    if (i === state.step) b.className = "on";
    b.onclick = () => { state.step = i; render(); };
    nav.appendChild(b);
  });
}

function field(label, key, type = "textarea") {
  if (type === "textarea") {
    return `<label>${label}<textarea data-key="${key}">${escape(state[key] || "")}</textarea></label>`;
  }
  return `<label>${label}<input type="text" data-key="${key}" value="${escape(state[key] || "")}" /></label>`;
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

function escape(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function bind(root) {
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
    <button class="primary" type="button" data-next>${last ? "See report" : "Next"}</button>
  </div>`;
}

function page() {
  switch (state.step) {
    case 0:
      return `<div class="card">
        <h2>How this works</h2>
        <p class="note">Work one incident. Do not start with the theory. Separate what happened from what you decided it meant. Then test the belief against the partner, Scripture, and the Lord.</p>
        <ul>
          <li>Marriage is covenant. Dating is not.</li>
          <li>A wife obeys her husband as unto the Lord. That is obedience to God, not a verdict that he is better. If she refuses lawful obedience, she disobeys the Lord.</li>
          <li>A husband must not abuse her or deliberately cause her to sin.</li>
          <li>Constructive criticism from both is useful when it is fact-first and the delivery builds.</li>
          <li>A trigger explains intensity. It does not make the premise true.</li>
        </ul>
        ${actions()}
      </div>`;
    case 1:
      return `<div class="card">
        <h2>1. Relationship</h2>
        ${radios("What is this relationship?", "relationship", ["Marriage (covenant)", "Dating (not covenant)", "Separated / unclear"])}
        ${radios("Who is filling this in?", "role", ["Husband", "Wife", "Boyfriend", "Girlfriend", "Other"])}
        ${radios("Are both believers?", "believers", ["Yes", "No / unequally yoked", "Unsure"])}
        <p class="note">Do not apply marriage headship language to dating. Unequally yoked or immature couples struggle because they stay on self. Maturity looks to Jesus.</p>
        ${actions()}
      </div>`;
    case 2:
      return `<div class="card">
        <h2>2. Fact from interpretation</h2>
        ${field("What was actually said or done? (observable fact)", "fact")}
        ${field("What did you conclude it meant?", "interpretation")}
        ${radios("Did you ask the other person what they meant?", "asked", ["Yes", "No", "Not yet"])}
        ${actions()}
      </div>`;
    case 3:
      return `<div class="card">
        <h2>3. Name the belief</h2>
        ${field("The belief in one sentence (e.g. She is criticising me. He does not care. My feeling proves it.)", "belief")}
        <p class="note">Difference in processing is not rebellion. A feeling is not evidence.</p>
        ${actions()}
      </div>`;
    case 4:
      return `<div class="card">
        <h2>4. Test the belief</h2>
        ${radios("Have you checked this with the partner?", "checkedPartner", ["Yes", "No"])}
        ${radios("Does Scripture require this conclusion?", "checkedScripture", ["Yes", "No", "Unsure"])}
        ${radios("Where is this coming from?", "source", [
          "Jesus, the Word, and the Spirit",
          "My desire, reasoning, experience, or understanding",
          "A mix — not yet sorted"
        ])}
        <p class="scripture">He who trusts in his own heart is a fool. Proverbs 28:26</p>
        ${actions()}
      </div>`;
    case 5:
      return `<div class="card">
        <h2>5. Name the speech</h2>
        ${radios("What did you speak (or refuse to speak)?", "speech", [
          "Blessing",
          "Intercession",
          "Constructive criticism (facts, to build)",
          "Accusation / assumed motive",
          "Curse / character verdict",
          "Silence"
        ])}
        ${field("How was it delivered? Tone, timing, aim.", "delivery")}
        <p class="note">Fact without love can still be a weapon. Feeling without fact is not criticism.</p>
        ${actions()}
      </div>`;
    case 6:
      return `<div class="card">
        <h2>6. Triggers and history</h2>
        ${checks("What history may be interpreting this? (not an excuse)", "triggerSources", [
          "Rejection",
          "Abuse",
          "Bad parenting",
          "Divorce",
          "Incorrect training",
          "False or one-sided teaching",
          "None I can name"
        ])}
        ${field("What fired now? (tone, being told what to do, comparison, sudden challenge…)", "triggerNow")}
        <p class="note">A history of rejection can make any leading, direction, or challenge land as criticism. Name it. Still test the present fact. Do not stop all leading to manage the wound.</p>
        ${actions()}
      </div>`;
    case 7:
      return `<div class="card">
        <h2>7. Spiritual issues</h2>
        ${checks("What may be present?", "spiritual", [
          "Accuser / assumed motive",
          "Spirit of criticism or gossip",
          "Strife",
          "Unforgiveness / bitterness",
          "Ungodly soul tie",
          "Self-focus / immaturity",
          "Unequal yoke",
          "Refusal to surrender to the Lord",
          "None clear yet"
        ])}
        <p class="note">Do not take up a reproach. Words can bless or curse. Bitterness gives legal ground. Intercede instead of accusing.</p>
        ${actions()}
      </div>`;
    case 8:
      return `<div class="card">
        <h2>8. Surrender</h2>
        ${radios("Have you surrendered this to the Lord?", "surrenderYou", ["Yes", "No", "Partly"])}
        ${radios("Has the other person, as far as you know?", "surrenderThem", ["Yes", "No", "Unsure"])}
        ${radios("Have you both surrendered this together?", "surrenderTogether", ["Yes", "No", "We have not tried"])}
        <p class="note">True marital obedience as a living walk needs both to surrender individually and together. That does not cancel the wife’s duty if he will not surrender. It explains why the walk breaks down.</p>
        ${actions()}
      </div>`;
    case 9:
      return `<div class="card">
        <h2>9. Trait flags (not a diagnosis)</h2>
        ${checks("Possible traits to consider for how you speak — get proper assessment if needed", "traits", [
          "DID / dissociation",
          "Bipolar",
          "ADHD",
          "Autism",
          "None of these"
        ])}
        <p class="note">Traits change structure: one issue, written agreements, time to process, no ambush. They do not excuse sin or refusal of facts.</p>
        ${actions()}
      </div>`;
    case 10:
      return `<div class="card">
        <h2>10. 1 Corinthians 13</h2>
        ${radios("Was your reaction long-tempered (makrothymei) or quickly heated?", "angerSpeed", [
          "I waited",
          "I was quickly provoked (paroxunetai)",
          "Unsure"
        ])}
        ${radios("Did you keep an account of evil (logizetai to kakon)?", "accounting", [
          "I dealt with this one fact",
          "I added it to a ledger of who they are",
          "Unsure"
        ])}
        <p class="note">Agape is kind in action, not provoked, and rejoices with the truth. Do not call the speed of anger discernment. Do not call stored slights love. Do not walk on eggshells instead of speaking the fact.</p>
        ${actions(true)}
      </div>`;
    default:
      return report();
  }
}

function report() {
  const hits = [];

  if (state.relationship.includes("Dating")) {
    hits.push(["hit", "This is not a marriage covenant. Do not apply headship and one-flesh duty as if vows were made."]);
  }
  if (state.relationship.includes("Marriage")) {
    hits.push(["ok", "Marriage is covenant. Wife obeys her husband as unto the Lord — not because he is better. Husband must not abuse or command sin. His failure does not cancel her lawful duty."]);
  }
  if (state.asked === "No" || state.checkedPartner === "No") {
    hits.push(["warn", "The premise was not checked with the partner. Test all things. Ask what they meant before treating your conclusion as fact."]);
  }
  if (state.source && state.source.includes("desire")) {
    hits.push(["warn", "The source named is desire, reasoning, experience, or understanding — not Jesus, the Word, and the Spirit. Immaturity stays here."]);
  }
  if (state.speech && (state.speech.includes("Accusation") || state.speech.includes("Curse"))) {
    hits.push(["warn", "Speech functioned as accusation or curse. Replace it with blessing, intercession, or fact-based constructive criticism delivered to build."]);
  }
  if (state.speech && state.speech.includes("Constructive")) {
    hits.push(["ok", "Constructive criticism is allowed from both. Keep it on facts. Watch delivery."]);
  }
  if ((state.triggerSources || []).some(s => s !== "None I can name")) {
    hits.push(["hit", "A known history may be interpreting leading, direction, or challenge as criticism. Name the wound. Check the present words. Do not stop all leading. Do not use the wound to refuse correction."]);
  }
  if (state.angerSpeed && state.angerSpeed.includes("quickly")) {
    hits.push(["warn", "ou paroxunetai — love is not provoked. Quick heat is not discernment."]);
  }
  if (state.accounting && state.accounting.includes("ledger")) {
    hits.push(["warn", "ou logizetai to kakon — love does not keep the account. You added this to a running verdict."]);
  }
  if (state.believers && state.believers.includes("unequally")) {
    hits.push(["hit", "Unequal yoke will strain the walk. Both still submit to God. Do not twist Scripture to suit an end."]);
  }
  if (state.surrenderTogether === "No" || state.surrenderTogether.includes("not tried")) {
    hits.push(["hit", "Joint surrender is missing. A living walk needs both to the Lord, individually and together."]);
  }
  if ((state.traits || []).length && !state.traits.includes("None of these")) {
    hits.push(["hit", "Trait flags are noted for structure only. This app does not diagnose. Seek qualified assessment if the pattern is persistent."]);
  }
  if (!state.fact.trim()) {
    hits.push(["warn", "No clear fact was entered. Start again from what was said or done."]);
  }

  const next = [];
  if (state.asked !== "Yes") next.push("Ask the other person what they meant. Write their answer next to your interpretation.");
  next.push("Take the belief to Scripture. If Scripture does not require the conclusion, drop it.");
  if (state.speech && (state.speech.includes("Accusation") || state.speech.includes("Curse"))) {
    next.push("Repent of agreement with the accuser. Speak a blessing or a single fact without a character verdict.");
  }
  next.push("If a trigger fired, name it aloud, then return to the one present fact.");
  next.push("Surrender this to the Lord yourself. Invite the other to do the same, together if they will.");
  if (state.relationship.includes("Marriage") && state.role === "Wife") {
    next.push("Lawful obedience to your husband is obedience to the Lord. Do not withhold it because of an untested feeling.");
  }
  if (state.relationship.includes("Marriage") && state.role === "Husband") {
    next.push("Lead by example. Do not curse, accuse, or harm. Nourish. When weak, rely on the Spirit.");
  }

  return `<div class="card report">
    <h2>Discernment report</h2>
    <p class="note">This is a mirror, not a verdict on the other person’s soul.</p>
    <h3>What you entered</h3>
    <p><strong>Fact:</strong> ${escape(state.fact || "—")}</p>
    <p><strong>Interpretation:</strong> ${escape(state.interpretation || "—")}</p>
    <p><strong>Belief:</strong> ${escape(state.belief || "—")}</p>
    <h3>What this likely is</h3>
    ${hits.map(([k, t]) => `<p class="${k}">${t}</p>`).join("") || "<p>Not enough entered to name a pattern.</p>"}
    <h3>Next step</h3>
    <ol>${next.map(t => `<li>${t}</li>`).join("")}</ol>
    <p class="scripture">Love is patient, love is kind… it is not provoked, it does not reckon up evil, it rejoices with the truth. 1 Corinthians 13:4–6</p>
    <div class="actions">
      <button class="ghost" type="button" data-back>Back</button>
      <button class="primary" type="button" id="copy">Copy report</button>
    </div>
  </div>`;
}

function render() {
  renderProgress();
  const app = document.getElementById("app");
  app.innerHTML = "";
  const node = el(page());
  app.appendChild(node);
  bind(node);
  const copy = node.querySelector("#copy");
  if (copy) {
    copy.onclick = () => {
      const text = node.innerText;
      navigator.clipboard.writeText(text).then(() => { copy.textContent = "Copied"; });
    };
  }
}

render();
