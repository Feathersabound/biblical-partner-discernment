function incidentPage() {
  if (state.step === 0) {
    return "<div class=\"card\"><h2>Who is this?</h2>" +
      radios("Relationship", "relationship", ["Marriage (a promise before God)", "Dating (not that promise)", "Separated / not sure"]) +
      radios("I am the", "role", ["Husband", "Wife", "Boyfriend", "Girlfriend", "Other"]) +
      radios("Do you both follow Jesus?", "believers", ["Yes", "No — one does not", "Not sure"]) +
      actions() + "</div>";
  }
  if (state.step === 1) {
    return "<div class=\"card\"><h2>What happened?</h2>" +
      field("What was said or done?", "fact") +
      field("What did you decide it meant?", "interpretation") +
      field("The belief in one line", "belief") +
      radios("Did you ask what they meant?", "asked", ["Yes", "No", "Not yet"]) +
      "<p class=\"note\">A different way of thinking is not an attack. A feeling is not proof.</p>" +
      actions() + "</div>";
  }
  if (state.step === 2) {
    return "<div class=\"card\"><h2>A little more (optional)</h2>" +
      radios("Your words", "speech", ["Blessing", "Prayer for them", "Constructive criticism (facts, to help)", "Accusation / I guessed their motive", "Curse / I named them as a bad person", "Silence"]) +
      radios("Anger", "angerSpeed", ["I waited", "I was quickly angry", "Not sure"]) +
      radios("Old list?", "accounting", ["This one fact only", "I added it to a ledger of who they are", "Not sure"]) +
      checks("Old hurt that may have flared", "triggerSources", ["Rejection", "Abuse", "Bad parenting", "Divorce", "Wrong teaching", "None I can name"]) +
      actions(true) + "</div>";
  }
  return incidentReport();
}
function incidentReport() {
  var p = interactionPlan();
  var more = extraQuestions();
  var extra = (p.extra || []).map(function (t) { return "<p class=\"hit\">" + escape(t) + "</p>"; }).join("");
  var asks = more.map(function (row) { return radios(row[1], row[0], row[2]); }).join("");
  return "<div class=\"card report\"><h2>How to talk now</h2>" +
    "<p class=\"hit\"><strong>What is going on:</strong> " + escape(p.pattern) + "</p>" +
    "<p class=\"warn\"><strong>Stop:</strong> " + escape(p.stop) + "</p>" +
    "<p class=\"ok\"><strong>Say this:</strong> " + escape(p.say) + "</p>" +
    "<p><strong>Do now:</strong> " + escape(p.doNow) + "</p>" +
    "<p class=\"note\">" + escape(p.later) + "</p>" + extra +
    "<h3>See yourself</h3><p>Old hurt can teach a lie. Truth is what God says and what actually happened.</p>" +
    "<p><strong>Fact:</strong> " + escape(state.fact || "—") + "</p>" +
    "<h3>Want a sharper plan?</h3><p class=\"note\">Answer any of these. The engine will update.</p>" + asks +
    "<div class=\"actions\"><button class=\"ghost\" type=\"button\" data-back>Back</button>" +
    "<button class=\"primary\" type=\"button\" id=\"save-incident\">Save this plan</button>" +
    "<button class=\"ghost\" type=\"button\" data-go=\"Repair\">Fix it next</button></div></div>";
}
function kindsToday() {
  var t = todayKey();
  return new Set(loadLog().filter(function (e) { return (e.at || "").indexOf(t) === 0; }).map(function (e) { return e.kind; }));
}
