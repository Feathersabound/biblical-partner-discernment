function interactionPlan() {
  var plan = {
    pattern: "See yourself before God. Then test their words. Then take one step toward peace.",
    stop: "Stop treating an untested thought as if God had said it.",
    say: "Lord, I choose You. What did they actually mean?",
    doNow: "Test this with Scripture and God. Then ask them.",
    later: "You are loved. Submit yourself to God. They are not the enemy.",
    extra: []
  };

  if (state.heAskedSin === "Yes") {
    plan.pattern = "If he is leading you into sin or away from Christ, that lead is not to be followed.";
    plan.stop = "Do not call sin obedience.";
    plan.say = "I cannot do that. It would be sin. I will still do what is right.";
    plan.doNow = "Obey God. Stay clear.";
    return plan;
  }
  if (state.spokeCurse === "Yes") {
    plan.pattern = "Death was spoken. That gives the enemy a place.";
    plan.stop = "Stop speaking death.";
    plan.say = "Lord, I take those words back. I bless them.";
    plan.doNow = "Take the words back out loud. Speak life. Do not say it again.";
    return plan;
  }
  if (state.IHarmed === "I used my place wrongly") {
    plan.pattern = "Headship was used to push, not to lead like Christ.";
    plan.stop = "Stop using your place that way.";
    plan.say = "I was not kind. I was wrong.";
    plan.doNow = "Be gentle. Lead by what you do.";
    return plan;
  }
  if ((state.wordOrFeel || "").indexOf("not tested") >= 0 || (state.wordOrFeel || "").indexOf("past") >= 0 || (state.wordOrFeel || "").indexOf("stuck") >= 0) {
    plan.pattern = "A thought has been given a place that belongs to God.";
    plan.stop = "Stop agreeing with what He has not said.";
    plan.say = "Lord, I take this thought captive.";
    plan.doNow = "Name it. Test it by the Word. One thought, with Him.";
    return plan;
  }
  if (state.loved === "I have put my experience first" || state.loved === "I struggle to believe it") {
    plan.pattern = "Experience has been set above His Word and His nature.";
    plan.stop = "Stop using your story as the measure of His love.";
    plan.say = "Father, You love me. I receive it.";
    plan.doNow = "Acknowledge His love. Invite Him in. Then look at them.";
    return plan;
  }
  if (state.selfToGod && state.selfToGod.indexOf("only asked") >= 0) {
    plan.pattern = "You asked them to change before you submitted yourself to God.";
    plan.stop = "Stop making this a fight with them.";
    plan.say = "Lord, I give myself to You in this.";
    plan.doNow = "Choose God first. Then speak.";
    return plan;
  }
  if ((state.wifeChallenge || "").indexOf("win") >= 0) {
    plan.pattern = "This was trying to win, not calling him toward God.";
    plan.stop = "Stop competing with him.";
    plan.say = "I want to encourage you toward God.";
    plan.doNow = "Challenge him with honour, a quiet and noble spirit.";
    return plan;
  }
  if ((state.husbandHear || "").indexOf("threat") >= 0) {
    plan.pattern = "Her challenge was heard as a threat to your place.";
    plan.stop = "Stop defending a place Christ already gave you.";
    plan.say = "I will hear this as a call toward God.";
    plan.doNow = "Receive what is true. Lead with care.";
    return plan;
  }
  if (state.asked !== "Yes" && String(state.fact || "").trim()) {
    plan.pattern = "You decided what they meant without asking.";
    plan.stop = "Stop filling in their motive.";
    plan.say = "I assumed you meant ______. Is that what you meant?";
    plan.doNow = "Ask. Write their answer next to yours.";
    return plan;
  }
  if (state.leadBy === "Emotions usually lead") {
    plan.pattern = "Desire and feeling are leading. That is a door.";
    plan.stop = "Stop letting the old nature decide.";
    plan.say = "Lord, let Your Word lead this feeling.";
    plan.doNow = "Name one true thing God has said. Walk that.";
    return plan;
  }
  if (state.forgiveWalk === "I receive, I have not given" || state.forgiveWalk === "I have not received yet") {
    plan.pattern = "Forgiveness has not been finished.";
    plan.stop = "Stop holding what He has already dealt with, or what you have not yet received.";
    plan.say = "Lord, I receive Your forgiveness. I give it.";
    plan.doNow = "Receive. Give. Then speak one true word.";
    return plan;
  }
  if ((state.relationship || "").indexOf("Dating") >= 0) {
    plan.later = "This is not marriage. Do not act as if those vows are already made.";
  } else if (marriedRole("Wife")) {
    plan.later = "Obey as unto the Lord. If he leads you into sin or away from Christ, obey God.";
  } else if (marriedRole("Husband")) {
    plan.later = "Lead, protect, guide, present her. Be kind and gentle.";
  }
  return plan;
}
