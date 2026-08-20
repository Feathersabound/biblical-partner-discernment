var _page = incidentPage;
incidentPage = function () {
  if (state.step !== 0) return _page();
  return "<div class=\"card\"><h2>You first</h2>" +
    "<p class=\"note\">Truth is in Scripture and in a living walk with God. Test yourself there first. Invitation, not a verdict. The aim is the mind of Christ.</p>" +
    radios("Does this line up with Scripture and with God, or only with how I feel?", "wordOrFeel", ["With Scripture and God", "Mostly with how I feel", "I am not sure yet"]) +
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
  if (state.wordOrFeel && state.wordOrFeel.indexOf("feel") >= 0) {
    plan.pattern = "This is lining up with how you feel more than with Scripture and God.";
    plan.stop = "Stop treating the feeling as the measure.";
    plan.doNow = "Name one verse or one thing God has already said. Test the feeling against that.";
  }
  return plan;
};
