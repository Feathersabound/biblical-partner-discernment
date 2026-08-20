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
    needGod: "", thankOne: "", reconcileWanted: "",
    spokeCurse: "", receivedCurse: ""
  };
}

function loadLog() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch (e) { return []; }
}
function saveLog(list) { localStorage.setItem(KEY, JSON.stringify(list)); }
let toast = "";
function todayKey() { return new Date().toISOString().slice(0, 10); }
function yesterdayKey() { return new Date(Date.now() - 86400000).toISOString().slice(0, 10); }
function loadWalk() {
  try { return JSON.parse(localStorage.getItem(KEY + "-walk") || "{}"); }
  catch (e) { return {}; }
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
  return String(s)
    .replace(/&/g, "&#38;")
    .replace(/</g, "&#60;")
    .replace(/>/g, "&#62;")
    .replace(/"/g, "&#34;")
    .replace(/'/g, "&#39;");
}
function when(iso) {
  try { return new Date(iso).toLocaleString(); } catch (e) { return iso; }
}
function renderTabs() {
  const nav = document.getElementById("tabs");
  if (!nav) return;
  nav.innerHTML = "";
  MODES.forEach(name => {
    const b = document.createElement("button");
    b.textContent = LABELS[name] || name;
    if (name === mode) b.className = "on";
    b.onclick = function () {
      mode = name;
      if (name === "Incident") Object.assign(state, blankIncident());
      render();
    };
    nav.appendChild(b);
  });
}
function field(label, key) {
  return "<label>" + label + "<textarea data-key=\"" + key + "\">" + escape(state[key] || "") + "</textarea></label>";
}
function radios(label, key, options) {
  return "<p class=\"note\" style=\"margin-bottom:.35rem\"><strong>" + label + "</strong></p><div class=\"choices\">" +
    options.map(function (o) {
      var on = state[key] === o ? " checked" : "";
      return "<label><input type=\"radio\" name=\"" + key + "\" data-key=\"" + key + "\" value=\"" + escape(o) + "\"" + on + " /> " + o + "</label>";
    }).join("") + "</div>";
}
function checks(label, key, options) {
  var cur = state[key] || [];
  return "<p class=\"note\" style=\"margin-bottom:.35rem\"><strong>" + label + "</strong></p><div class=\"choices\">" +
    options.map(function (o) {
      var on = cur.indexOf(o) >= 0 ? " checked" : "";
      return "<label><input type=\"checkbox\" data-arr=\"" + key + "\" value=\"" + escape(o) + "\"" + on + " /> " + o + "</label>";
    }).join("") + "</div>";
}
function bindIncident(root) {
  root.querySelectorAll("[data-key]").forEach(function (n) {
    var ev = n.tagName === "TEXTAREA" || n.type === "text" ? "input" : "change";
    n.addEventListener(ev, function () { state[n.dataset.key] = n.value; });
  });
  root.querySelectorAll("[data-arr]").forEach(function (n) {
    n.addEventListener("change", function () {
      var key = n.dataset.arr;
      var set = new Set(state[key] || []);
      if (n.checked) set.add(n.value); else set.delete(n.value);
      state[key] = Array.from(set);
    });
  });
  var next = root.querySelector("[data-next]");
  var back = root.querySelector("[data-back]");
  if (next) next.onclick = function () { state.step = Math.min(STEPS.length - 1, state.step + 1); render(); };
  if (back) back.onclick = function () { state.step = Math.max(0, state.step - 1); render(); };
}
function actions(last) {
  var html = "<div class=\"actions\">";
  if (state.step > 0) html += "<button class=\"ghost\" type=\"button\" data-back>Back</button>";
  html += "<button class=\"primary\" type=\"button\" data-next>" + (last ? "See the plan" : "Next") + "</button></div>";
  return html;
}
function interactionPlan() {
  var plan = {
    pattern: "Check the fact before you keep the story.",
    stop: "Stop treating your guess as if it already happened.",
    say: "I want to check something. What did you mean when you said this?",
    doNow: "Ask them. Write their answer next to yours.",
    later: "If the Bible does not say your guess is true, let it go.",
    extra: []
  };
  var married = (state.relationship || "").indexOf("Marriage") >= 0;
  var dating = (state.relationship || "").indexOf("Dating") >= 0;
  if (!String(state.fact || "").trim()) {
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
  if (state.speech && (state.speech.indexOf("Accusation") >= 0 || state.speech.indexOf("Curse") >= 0 || state.spokeCurse === "Yes")) {
    plan.pattern = "Your mouth spoke death or a curse.";
    plan.stop = "Stop speaking death. Blessing and cursing must not come from the same mouth.";
    plan.say = "Lord, I take those words back. I bless them instead.";
    plan.doNow = "Take the words back out loud. Then speak a blessing.";
  }
  if (state.angerSpeed && state.angerSpeed.indexOf("quickly") >= 0) {
    plan.stop = "Stop answering while you are hot.";
    plan.doNow = "Wait. Then say one fact in a calm voice.";
  }
  if (state.accounting && state.accounting.indexOf("ledger") >= 0) {
    plan.pattern = "You added this to an old list of who they are.";
    plan.later = "Deal with this one fact only. Give the old list to God.";
  }
  if ((state.triggerSources || []).some(function (s) { return s !== "None I can name"; })) {
    plan.pattern = "An old hurt is making today sound worse.";
    plan.say = "This hit an old place in me. I still need to know what you meant just now.";
  }
  if (dating) plan.later = "This is not marriage. Do not act as if those vows are already made.";
  if (married && state.role === "Wife") {
    plan.later = "Do not refuse a right act of obedience because of a feeling you have not checked. If he asked you to sin, refuse the sin.";
  }
  if (married && state.role === "Husband") {
    plan.later = "Lead by what you do. Do not speak harm. Care for her.";
  }
  if (state.needGod === "I am not safe") {
    plan.pattern = "Safety comes first.";
    plan.doNow = "Get safe. Tell a trusted person.";
  }
  return plan;
}
function extraQuestions() {
  var q = [];
  if (state.asked !== "Yes") q.push(["blockedAsk", "What stopped you asking?", ["I was afraid", "I was sure", "I did not think of it", "Not sure"]]);
  if (marriedRole("Wife")) {
    q.push(["withheldObey", "Did you hold back a right act of obedience?", ["Yes", "No", "Not sure"]]);
    q.push(["heAskedSin", "Did he ask you to sin?", ["Yes", "No", "Not sure"]]);
  }
  if (marriedRole("Husband")) q.push(["IHarmed", "Did you use your place to hurt or speak harm?", ["Yes", "No", "Not sure"]]);
  q.push(["forgiveNow", "Have you forgiven this before God?", ["Yes", "No", "Not yet"]]);
  q.push(["needGod", "Is this too big for you alone?", ["Yes — I need God", "I can do the next step", "I am not safe"]]);
  q.push(["thankOne", "Can you thank God for one true thing in this?", ["Yes", "Not yet"]]);
  q.push(["spokeCurse", "Did you speak a curse or death over them?", ["Yes", "No", "Not sure"]]);
  q.push(["reconcileWanted", "Do you want to make peace, if it is safe?", ["Yes", "Not yet", "It is not safe"]]);
  return q;
}
function marriedRole(role) {
  return (state.relationship || "").indexOf("Marriage") >= 0 && state.role === role;
}
