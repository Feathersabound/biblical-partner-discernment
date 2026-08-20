var _page = incidentPage;
incidentPage = function () {
  if (state.step !== 0) return _page();
  return "<div class=\"card\"><h2>You first</h2>" +
    "<p class=\"note\">Truth is in Scripture and in a living walk with God. An untested thought is not truth. An old experience is not this moment. A past fact glued to a dark feeling is not a new word from God.</p>" +
    radios("What am I treating as true that I have not tested against Scripture and God?", "wordOrFeel", ["I have tested this with the Word and with God", "A thought I have not tested", "Something from the past I have not checked", "An old fact now stuck to a dark feeling", "I am not sure yet"]) +
    radios("When someone points out something you could do differently, what is your first inner reaction — before you speak?", "firstReact", ["I tighten or shut down", "I defend", "I hit back", "I listen and test it", "Not sure"]) +
    radios("Have you often found it hard to receive feedback from people close to you, even when you now think they meant well?", "hardFeedback", ["Yes", "Sometimes", "No"]) +
    radios("Do you find it easier to believe the negative things said about you than the positive?", "believeNeg", ["Yes", "Sometimes", "No"]) +
    radios("When you feel hurt in your marriage, do you tend to go quiet, defend yourself, or go on the attack?", "whenHurt", ["Go quiet", "Defend myself", "Go on the attack", "It depends"]) +
    radios("Do your emotions usually lead your decisions, or does truth lead your emotions?", "leadBy", ["Emotions usually lead", "Truth usually leads", "It depends"]) +
    actions() + "</div>";
};
var _planW = interactionPlan;
interactionPlan = function () {
  var plan = _planW();
  var v = state.wordOrFeel || "";
  if (v.indexOf("not tested") >= 0 || v.indexOf("past") >= 0 || v.indexOf("stuck") >= 0) {
    plan.pattern = "You are treating something as true that has not been tested with Scripture and God.";
    plan.stop = "Stop using an untested thought, an old story, or a dark feeling as the measure.";
    plan.doNow = "Name the thought. Name the old experience. Test it against the Word. Then look at what they actually said today.";
  }
  return plan;
};
