STEPS.length = 0;
STEPS.push("You", "Who", "What", "Plan");
LABELS.Incident = "The walk";

(function fixPractices() {
  for (var i = 0; i < PRACTICES.length; i++) {
    var p = PRACTICES[i];
    if (p.id === "trigger") {
      p.title = "Name what you have not tested";
      p.text = "If an old thought or old story is being treated as today\u2019s truth, name it. If you cannot name it, you cannot deal with it. Then test it with God. Then look at what they said.";
    }
    if (p.id === "need-god") {
      p.title = "Forgiveness, or a lead into sin";
      p.text = "These are two different things. Forgiveness is for healing and for any real relationship. Leading someone into sin or away from Christ is another. Either spouse can do that.";
    }
    if (p.id === "reconcile") {
      p.text = "Go to them. Own your part. Do not wait for them to own theirs first.";
    }
  }
})();

let mode = "Home";
const state = blankIncident();
let toast = "";

function blankIncident() {
  return {
    step: 0, relationship: "", believers: "", fact: "", interpretation: "", asked: "", role: "",
    firstReact: "", hardFeedback: "", believeNeg: "", whenHurt: "", leadBy: "",
    wordOrFeel: "", hardLook: "", loved: "",
    wifeChallenge: "", husbandHear: "", wifeDirect: "", selfToGod: "", spokeCurse: "",
    ILedSin: "", theyLedSin: "", forgiveWalk: "", inviteGod: "", chooseGod: "", declareWord: "", healWalk: ""
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
    return "<div class=\"card\"><h2>You first</h2>" +
      "<p class=\"note\">Truth is in Scripture and in a walk with God. God loves you. An untested thought can become a hold. If you cannot name it, you cannot deal with it.</p>" +
      radios("Do I receive that God loves me, or have I put my experience above His Word and His nature?", "loved", ["I receive that He loves me", "I struggle to believe it", "I have put my experience first", "I am not sure"]) +
      radios("What am I treating as true that I have not tested against Scripture and God?", "wordOrFeel", ["I have tested this with the Word and with God", "A thought I have not tested", "Something from the past I have not checked", "An old fact now stuck to a dark feeling", "I am not sure yet"]) +
      radios("If it is hard to look, what makes it hard?", "hardLook", ["Fear", "Old rejection, betrayal, or a wound", "It is not hard", "I do not know"]) +
      radios("When someone points out something I could do differently, what is my first inner reaction?", "firstReact", ["I tighten or shut down", "I defend", "I hit back", "I listen and test it", "Not sure"]) +
      radios("Do my emotions usually lead, or does truth lead my emotions?", "leadBy", ["Emotions usually lead", "Truth usually leads", "It depends"]) +
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
  q.push(["ILedSin", "Did I use my place or my strengths to lead them into sin or away from Christ?", ["Yes", "No", "Not sure"]]);
  q.push(["theyLedSin", "Did they lead me into sin or away from Christ?", ["Yes", "No", "Not sure"]]);
  q.push(["forgiveWalk", "Have I received His forgiveness, and will I give it?", ["I receive and I give", "I receive, I have not given", "I have not received yet"]]);
  if (marriedRole("Wife")) {
    q.push(["wifeChallenge", "Was this a loving provocation toward godliness, or was I trying to win?", ["Toward godliness", "Trying to win", "A mix"]]);
    q.push(["wifeDirect", "Was I directing him rather than encouraging him?", ["Yes", "No", "Not sure"]]);
  }
  if (marriedRole("Husband")) {
    q.push(["husbandHear", "Did I receive her challenge as help toward God, or as a threat to my place?", ["Help toward God", "A threat to my place", "I did not hear a challenge"]]);
  }
  q.push(["spokeCurse", "Did I speak death over them?", ["Yes", "No"]]);
  q.push(["inviteGod", "Will I invite God into this — mind, feeling, past, family?", ["Yes", "Not yet"]]);
  q.push(["declareWord", "Will I say His Word, repeat it, and believe it?", ["Yes", "Not yet"]]);
  return q;
}
function interactionPlan() {
  var plan = {
    pattern: "See yourself before God. Then test their words. Then take one step toward peace.",
    stop: "Stop treating an untested thought as if God had said it.",
    say: "Lord, I choose You. What did they actually mean?",
    doNow: "Test this with Scripture and God. Then ask them.",
    later: "You are loved. Submit yourself to God. They are not the enemy.",
    extra: []
  };
  if (state.ILedSin === "Yes") {
    plan.pattern = "You used what you have been given to pull them off the path.";
    plan.stop = "Stop that lead.";
    plan.say = "I was wrong to pull you away from Christ.";
    plan.doNow = "Repent to God. Then to them.";
    return plan;
  }
  if (state.theyLedSin === "Yes") {
    plan.pattern = "They are leading you into sin or away from Christ.";
    plan.stop = "Do not call that obedience.";
    plan.say = "I cannot go that way. I will obey God.";
    plan.doNow = "Obey God. Do not follow that lead.";
    return plan;
  }
  if (state.spokeCurse === "Yes") {
    plan.pattern = "Death was spoken.";
    plan.stop = "Stop speaking death.";
    plan.say = "Lord, I take those words back. I bless them.";
    plan.doNow = "Take the words back. Speak life.";
    return plan;
  }
  if ((state.wordOrFeel || "").indexOf("not tested") >= 0 || (state.wordOrFeel || "").indexOf("past") >= 0 || (state.wordOrFeel || "").indexOf("stuck") >= 0) {
    plan.pattern = "A thought has been given a place that belongs to God.";
    plan.stop = "Stop agreeing with what He has not said.";
    plan.say = "Lord, I take this thought captive.";
    plan.doNow = "Name it. If you cannot name it, you cannot deal with it. Test it by the Word.";
    return plan;
  }
  if (state.loved === "I have put my experience first" || state.loved === "I struggle to believe it") {
    plan.pattern = "Experience has been set above His Word and His nature.";
    plan.stop = "Stop using your story as the measure of His love.";
    plan.say = "Father, You love me. I receive it.";
    plan.doNow = "Acknowledge His love. Invite Him in. Then look at them.";
    return plan;
  }
  if (state.forgiveWalk === "I receive, I have not given" || state.forgiveWalk === "I have not received yet") {
    plan.pattern = "Forgiveness is unfinished. You cannot walk with someone you will not forgive.";
    plan.stop = "Stop holding it as a right.";
    plan.say = "Lord, I receive Your forgiveness. I give it.";
    plan.doNow = "Receive. Give. That is for healing and for the relationship.";
    return plan;
  }
  if (state.selfToGod && state.selfToGod.indexOf("only asked") >= 0) {
    plan.pattern = "You asked them to change before you submitted yourself to God.";
    plan.doNow = "Choose God first. Then speak.";
    return plan;
  }
  if ((state.wifeChallenge || "").indexOf("win") >= 0) {
    plan.pattern = "This was trying to win, not calling him toward God.";
    plan.doNow = "Challenge him with honour, a quiet and noble spirit.";
    return plan;
  }
  if ((state.husbandHear || "").indexOf("threat") >= 0) {
    plan.pattern = "Her challenge was heard as a threat to your place.";
    plan.doNow = "Receive what is true. Lead with care.";
    return plan;
  }
  if (state.asked !== "Yes" && String(state.fact || "").trim()) {
    plan.pattern = "You decided what they meant without asking.";
    plan.say = "I assumed you meant ______. Is that what you meant?";
    plan.doNow = "Ask. Write their answer next to yours.";
    return plan;
  }
  if (state.leadBy === "Emotions usually lead") {
    plan.pattern = "Desire and feeling are leading.";
    plan.doNow = "Let the Word lead this feeling.";
    return plan;
  }
  if ((state.relationship || "").indexOf("Dating") >= 0) plan.later = "This is not marriage. Do not act as if those vows are already made.";
  else if (marriedRole("Wife")) plan.later = "Obey as unto the Lord. If he leads you into sin or away from Christ, obey God.";
  else if (marriedRole("Husband")) plan.later = "Lead, protect, guide, present her toward Christ. Be kind and gentle. Do not lead her into sin.";
  return plan;
}
function incidentReport() {
  var p = interactionPlan();
  var extra = (p.extra || []).map(function (t) { return "<p class=\"hit\">" + escape(t) + "</p>"; }).join("");
  var asks = extraQuestions().map(function (row) { return radios(row[1], row[0], row[2]); }).join("");
  return "<div class=\"card report\"><h2>How to walk now</h2>" +
    "<p class=\"note\">Invitation, not a verdict. The aim is the mind of Christ.</p>" +
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
