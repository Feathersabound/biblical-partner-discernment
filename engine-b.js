function incidentPage() {
  if (state.step === 0) {
    return "<div class=\"card\"><h2>You first</h2>" +
      "<p class=\"note\">Look at how you hear, before we look at them. This is not a verdict. It is an invitation toward the mind of Christ.</p>" +
      radios("When someone points out something you could do differently, what is your first inner reaction — before you speak?", "firstReact", ["I tighten or shut down", "I defend", "I hit back", "I listen and test it", "Not sure"]) +
      radios("Have you often found it hard to receive feedback from people close to you, even when you now think they meant well?", "hardFeedback", ["Yes", "Sometimes", "No", "Not sure"]) +
      radios("Do you find it easier to believe the negative things said about you than the positive?", "believeNeg", ["Yes", "Sometimes", "No"]) +
      radios("When you feel hurt in your marriage, do you tend to go quiet, defend yourself, or go on the attack?", "whenHurt", ["Go quiet", "Defend myself", "Go on the attack", "It depends"]) +
      radios("Would you say your emotions usually lead your decisions, or does truth lead your emotions?", "leadBy", ["Emotions usually lead", "Truth usually leads", "It depends"]) +
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
    return "<div class=\"card\"><h2>What did they actually say?</h2>" +
      "<p class=\"note\">Now bring one real thing. Write their words, not your story.</p>" +
      field("What was said or done?", "fact") +
      field("What did you decide it meant?", "interpretation") +
      radios("Did you ask what they meant?", "asked", ["Yes", "No", "Not yet"]) +
      actions(true) + "</div>";
  }
  return incidentReport();
}
function incidentReport() {
  var p = interactionPlan();
  var more = extraQuestions();
  var extra = (p.extra || []).map(function (t) { return "<p class=\"hit\">" + escape(t) + "</p>"; }).join("");
  var asks = more.map(function (row) { return radios(row[1], row[0], row[2]); }).join("");
  return "<div class=\"card report\"><h2>How to walk now</h2>" +
    "<p class=\"hit\"><strong>What is going on:</strong> " + escape(p.pattern) + "</p>" +
    "<p class=\"warn\"><strong>Stop:</strong> " + escape(p.stop) + "</p>" +
    "<p class=\"ok\"><strong>Say this:</strong> " + escape(p.say) + "</p>" +
    "<p><strong>Do now:</strong> " + escape(p.doNow) + "</p>" +
    "<p class=\"note\">" + escape(p.later) + "</p>" + extra +
    "<h3>A little more, if you want</h3>" + asks +
    "<div class=\"actions\"><button class=\"ghost\" type=\"button\" data-back>Back</button>" +
    "<button class=\"primary\" type=\"button\" id=\"save-incident\">Save this</button>" +
    "<button class=\"ghost\" type=\"button\" data-go=\"Repair\">Fix it next</button></div></div>";
}
function kindsToday() {
  var t = todayKey();
  return new Set(loadLog().filter(function (e) { return (e.at || "").indexOf(t) === 0; }).map(function (e) { return e.kind; }));
}
