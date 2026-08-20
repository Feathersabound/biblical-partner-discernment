var _page = incidentPage;
incidentPage = function () {
  if (state.step !== 0) return _page();
  return "<div class=\"card\"><h2>You first</h2>" +
    "<p class=\"note\">This is spiritual. An untested thought can become a hold. Sometimes fear, old rejection, or betrayal makes it too painful to look. Pain is real. It is not permission to leave a lie in place. Ask God for courage to examine one thought with Him. You do not have to reopen everything.</p>" +
    radios("What am I treating as true that I have not tested against Scripture and God?", "wordOrFeel", ["I have tested this with the Word and with God", "A thought I have not tested", "Something from the past I have not checked", "An old fact now stuck to a dark feeling", "I am not sure yet"]) +
    radios("If it is hard to look, what makes it hard?", "hardLook", ["Fear", "Old rejection, betrayal, or a wound", "It is not hard", "I do not know"]) +
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
    plan.pattern = "A thought or old story has been given a spiritual place. It is being treated as truth.";
    plan.stop = "Stop agreeing with what God has not said.";
    plan.say = "Lord, I take this thought captive. I will not call it truth until it stands with Your Word.";
    plan.doNow = "Name the lie. Refuse it. Ask God what is true. Then look at what they actually said today. 2 Corinthians 10:4-5.";
  }
  if (state.hardLook === "Fear" || (state.hardLook || "").indexOf("rejection") >= 0) {
    plan.extra.push("It may be too painful to look. Ask God for courage to examine one thought with Him. You do not reopen the whole past. You do not leave the lie standing.");
  }
  return plan;
};
