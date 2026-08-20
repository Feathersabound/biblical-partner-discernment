STEPS.length = 0;
STEPS.push("You", "Who", "What", "Plan");
LABELS.Incident = "The walk";

let mode = "Home";
const state = blankIncident();
let toast = "";

function blankIncident() {
  return {
    step: 0, relationship: "", believers: "", fact: "", interpretation: "", asked: "",
    speech: "", role: "", firstReact: "", hardFeedback: "", believeNeg: "", whenHurt: "", leadBy: "",
    wifeChallenge: "", husbandHear: "", wifeDirect: "", withheldObey: "", heAskedSin: "", IHarmed: "",
    selfToGod: "", spokeCurse: "", forgiveNow: ""
  };
}
function loadLog() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
}
function saveLog(list) { localStorage.setItem(KEY, JSON.stringify(list)); }
function todayKey() { return new Date().toISOString().slice(0, 10); }
function yesterdayKey() { return new Date(Date.now() - 86400000).toISOString().slice(0, 10); }
function loadWalk() {
  try { return JSON.parse(localStorage.getItem(KEY + "-walk") || "{}"); } catch (e) { return {}; }
}
function markWalk() {
  var w = loadWalk(), t = todayKey();
  if (w.lastDay === t) w.stepsToday = (w.stepsToday || 0) + 1;
  else { w.streak = w.lastDay === yesterdayKey() ? (w.streak || 0) + 1 : 1; w.stepsToday = 1; w.lastDay = t; }
  w.total = (w.total || 0) + 1;
  localStorage.setItem(KEY + "-walk", JSON.stringify(w));
}
function addEntry(entry) {
  var list = loadLog();
  list.unshift({ id: Date.now(), at: new Date().toISOString(), ...entry });
  saveLog(list.slice(0, 200));
  markWalk();
}
function el(html) {
  var d = document.createElement("div");
  d.innerHTML = html.trim();
  return d.firstElementChild;
}
function escape(s) {
  return String(s).replace(/&/g, "&#38;").replace(/</g, "&#60;").replace(/>/g, "&#62;").replace(/"/g, "&#34;").replace(/'/g, "&#39;");
}
function when(iso) {
  try { return new Date(iso).toLocaleString(); } catch (e) { return iso; }
}
function renderTabs() {
  var nav = document.getElementById("tabs");
  if (!nav) return;
  nav.innerHTML = "";
  MODES.forEach(function (name) {
    var b = document.createElement("button");
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
      return "<label><input type=\"radio\" name=\"" + key + "\" data-key=\"" + key + "\" value=\"" + escape(o) + "\"" + (state[key] === o ? " checked" : "") + " /> " + o + "</label>";
    }).join("") + "</div>";
}
function bindIncident(root) {
  root.querySelectorAll("[data-key]").forEach(function (n) {
    n.addEventListener(n.tagName === "TEXTAREA" ? "input" : "change", function () { state[n.dataset.key] = n.value; });
  });
  var next = root.querySelector("[data-next]");
  var back = root.querySelector("[data-back]");
  if (next) next.onclick = function () { state.step = Math.min(STEPS.length - 1, state.step + 1); render(); };
  if (back) back.onclick = function () { state.step = Math.max(0, state.step - 1); render(); };
}
function actions(last) {
  var html = "<div class=\"actions\">";
  if (state.step > 0) html += "<button class=\"ghost\" type=\"button\" data-back>Back</button>";
  return html + "<button class=\"primary\" type=\"button\" data-next>" + (last ? "See the plan" : "Next") + "</button></div>";
}
function marriedRole(role) {
  return (state.relationship || "").indexOf("Marriage") >= 0 && state.role === role;
}
function incidentPage() {
  if (state.step === 0) {
    return "<div class=\"card\"><h2>You first</h2><p class=\"note\">Look at how you hear before we look at them. Invitation, not a verdict. The aim is the mind of Christ.</p>" +
      radios("When someone points out something you could do differently, what is your first inner reaction — before you speak?", "firstReact", ["I tighten or shut down", "I defend", "I hit back", "I listen and test it", "Not sure"]) +
      radios("Have you often found it hard to receive feedback from people close to you, even when you now think they meant well?", "hardFeedback", ["Yes", "Sometimes", "No"]) +
      radios("Do you find it easier to believe the negative things said about you than the positive?", "believeNeg", ["Yes", "Sometimes", "No"]) +
      radios("When you feel hurt in your marriage, do you tend to go quiet, defend yourself, or go on the attack?", "whenHurt", ["Go quiet", "Defend myself", "Go on the attack", "It depends"]) +
      radios("Do your emotions usually lead your decisions, or does truth lead your emotions?", "leadBy", ["Emotions usually lead", "Truth usually leads", "It depends"]) +
      actions() + "</div>";
  }
  if (state.step === 1) {
    return "<div class=\"card\"><h2>Who is this?</h2>" +
      radios("Relationship", "relationship", ["Marriage (a promise before God)", "Dating (not that promise)", "Separated / not sure"]) +
      radios("I am the", "role", ["Husband", "Wife", "Boyfriend", "Girlfriend", "Other"]) +
      radios("Do you both follow Jesus?", "believers", ["Yes", "No — one does not", "Not sure"]) +
      actions() + "</div>";
  }
  if (state.step === 2) {
    return "<div class=\"card\"><h2>What did they actually say?</h2><p class=\"note\">Their words, not your story.</p>" +
      field("What was said or done?", "fact") +
      field("What did you decide it meant?", "interpretation") +
      radios("Did you ask what they meant?", "asked", ["Yes", "No", "Not yet"]) +
      actions(true) + "</div>";
  }
  return incidentReport();
}
function extraQuestions() {
  var q = [];
  q.push(["selfToGod", "Did I submit myself to God in this, or only ask them to change?", ["I submitted myself", "I only asked them to change", "A mix"]]);
  if (marriedRole("Wife")) {
    q.push(["wifeChallenge", "Was this a loving provocation toward godliness, or was I trying to win?", ["Toward godliness", "Trying to win", "A mix"]]);
    q.push(["wifeDirect", "Was I directing him rather than encouraging him?", ["Yes", "No", "Not sure"]]);
    q.push(["heAskedSin", "Did he lead me into sin or away from Christ-centred obedience?", ["Yes", "No", "Not sure"]]);
  }
  if (marriedRole("Husband")) {
    q.push(["husbandHear", "Did I receive her challenge as help toward God, or as a threat to my place?", ["Help toward God", "A threat to my place", "I did not hear a challenge"]]);
    q.push(["IHarmed", "Was I kind and gentle, or did I use my place to push her off the path?", ["Kind and gentle", "I used my place wrongly", "A mix"]]);
  }
  q.push(["spokeCurse", "Did I speak death over them?", ["Yes", "No"]]);
  return q;
}
function interactionPlan() {
  var plan = {
    pattern: "See yourself first. Then test their words. Then take one step toward peace.",
    stop: "Stop treating a guess or a feeling as if it were already true.",
    say: "I want to check something. What did you mean?",
    doNow: "Ask. Write their answer next to yours.",
    later: "This is not a battle of the sexes. Submit yourself to God. Both will miss. The aim is healing, clearer speech, unity, and appreciation.",
    extra: []
  };
  if (state.firstReact && state.firstReact !== "I listen and test it" && state.firstReact !== "Not sure") {
    plan.extra.push("Your first move is to protect, not to test. That can make even a kind word sound like a blow.");
  }
  if (state.hardFeedback === "Yes" || state.hardFeedback === "Sometimes") {
    plan.extra.push("It may be hard to receive from people close to you. See that before you judge what they meant.");
  }
  if (state.believeNeg === "Yes" || state.believeNeg === "Sometimes") {
    plan.extra.push("You may take the dark word as true faster than the good one.");
  }
  if (state.leadBy === "Emotions usually lead") {
    plan.extra.push("Let what is true lead the feeling.");
  }
  if (state.asked !== "Yes") {
    plan.pattern = "You decided what they meant without asking.";
    plan.say = "I assumed you meant ______. Is that what you meant?";
  }
  if (state.wifeChallenge && state.wifeChallenge.indexOf("win") >= 0) {
    plan.stop = "Stop trying to win. A quiet, noble challenge toward God moves a man more than that.";
  }
  if (state.wifeDirect === "Yes") {
    plan.extra.push("Directing him is not the same as encouraging him. He can let you run a thing without giving away his place.");
  }
  if (state.husbandHear && state.husbandHear.indexOf("threat") >= 0) {
    plan.stop = "She may be calling you toward God. That is not a threat to your place.";
  }
  if (state.selfToGod && state.selfToGod.indexOf("only asked") >= 0) {
    plan.doNow = "Submit this to God yourself before you ask them to change.";
  }
  if (state.spokeCurse === "Yes") {
    plan.say = "Lord, I take those words back. I bless them instead.";
    plan.doNow = "Take the words back. Speak life.";
  }
  if ((state.relationship || "").indexOf("Dating") >= 0) {
    plan.later = "This is not marriage. Do not act as if those vows are already made.";
  }
  if (marriedRole("Wife")) {
    plan.later = "Obey as unto the Lord, not because he is better. If he leads you into sin or away from Christ, obey God, not that lead.";
  }
  if (marriedRole("Husband")) {
    plan.later = "Lead, protect, guide, present her to God. Be kind and gentle. Do not use your place to push her into sin.";
  }
  plan.extra.push("The thief comes to steal, kill, and destroy. Jesus came that you may have life. They are not the enemy.");
  return plan;
}
function incidentReport() {
  var p = interactionPlan();
  var extra = (p.extra || []).map(function (t) { return "<p class=\"hit\">" + escape(t) + "</p>"; }).join("");
  var asks = extraQuestions().map(function (row) { return radios(row[1], row[0], row[2]); }).join("");
  return "<div class=\"card report\"><h2>How to walk now</h2>" +
    "<p class=\"note\">There may be a pattern here worth seeing. The aim is the mind of Christ, not shame.</p>" +
    "<p class=\"hit\"><strong>What is going on:</strong> " + escape(p.pattern) + "</p>" +
    "<p class=\"warn\"><strong>Stop:</strong> " + escape(p.stop) + "</p>" +
    "<p class=\"ok\"><strong>Say this:</strong> " + escape(p.say) + "</p>" +
    "<p><strong>Do now:</strong> " + escape(p.doNow) + "</p>" +
    "<p class=\"note\">" + escape(p.later) + "</p>" + extra +
    "<h3>A little more</h3>" + asks +
    "<div class=\"actions\"><button class=\"ghost\" type=\"button\" data-back>Back</button>" +
    "<button class=\"primary\" type=\"button\" id=\"save-incident\">Save this</button>" +
    "<button class=\"ghost\" type=\"button\" data-go=\"Repair\">Fix it next</button></div></div>";
}
function kindsToday() {
  var t = todayKey();
  return new Set(loadLog().filter(function (e) { return (e.at || "").indexOf(t) === 0; }).map(function (e) { return e.kind; }));
}
