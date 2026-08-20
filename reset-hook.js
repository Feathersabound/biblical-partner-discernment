var _extra3 = extraQuestions;
extraQuestions = function () {
  var q = [];
  q.push(["thinkError", "What was off in my thinking before I spoke to them?", ["I assumed what they meant", "I treated a feeling as proof", "I treated being different as an attack", "I kept an old list", "I cannot see an error yet"]]);
  q.push(["doError", "What was off in what I did?", ["I did not ask", "I spoke harm or a curse", "I tried to win", "I held back a right thing", "I cannot see an error yet"]]);
  q.push(["feelError", "What was off in what I felt?", ["I snapped", "I used the feeling as if it were a fact", "I felt rejected when they led or corrected", "I cannot see an error yet"]]);
  q.push(["resetSelf", "Have I reset that with God before I go to them?", ["Yes", "Not yet", "I need help to see it"]]);
  q.push(["theirWords", "Have I written what they actually said, not my story about it?", ["Yes", "Not yet"]]);
  q.push(["hearThem", "When I add their words, what might be off in how I heard them?", ["I heard an attack that may not be there", "They may have been different, not against me", "Their words were actually wrong and I need to test that", "I have not added their words yet"]]);
  return q.concat(_extra3());
};

var _plan3 = interactionPlan;
interactionPlan = function () {
  var plan = _plan3();
  if (state.resetSelf !== "Yes") {
    plan.pattern = "Deal with yourself first. An untested thought, act, or feeling will spill onto them.";
    plan.stop = "Do not go to them until you have named what was off in you.";
    plan.say = "Lord, this is what was off in me. I give it to You. Then I will ask them what they meant.";
    plan.doNow = "Name the error. Reset it with God. Then write what they actually said.";
  } else if (state.theirWords !== "Yes") {
    plan.pattern = "You have looked at yourself. Now add their words, not your story.";
    plan.doNow = "Write only what they said or did. Test it the same way you tested yourself.";
  } else if (state.hearThem && state.hearThem.indexOf("attack") >= 0) {
    plan.pattern = "You may have heard an attack that was not there.";
    plan.say = "I think I heard this as against me. Is that what you meant?";
    plan.doNow = "Ask. If they were not against you, take that charge back.";
  } else {
    plan.extra.push("You have started resolution: you first, then their words, then one true next step together.");
  }
  return plan;
};
