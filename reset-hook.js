var _extra3 = extraQuestions;
extraQuestions = function () {
  var q = [];
  q.push(["firstReact", "When someone points out something you could do differently, what is your first inner reaction — before you speak?", ["I tighten or shut down", "I defend", "I hit back", "I listen and test it", "Not sure"]]);
  q.push(["hardFeedback", "Have you often found it hard to receive feedback from people close to you, even when you now think they meant well?", ["Yes", "Sometimes", "No", "Not sure"]]);
  q.push(["believeNeg", "Do you find it easier to believe the negative things said about you than the positive?", ["Yes", "Sometimes", "No"]]);
  q.push(["whenHurt", "When you feel hurt in your marriage, do you tend to go quiet, defend yourself, or go on the attack?", ["Go quiet", "Defend myself", "Go on the attack", "It depends"]]);
  q.push(["leadBy", "Would you say your emotions usually lead your decisions, or does truth lead your emotions?", ["Emotions usually lead", "Truth usually leads", "It depends"]]);
  q.push(["resetSelf", "Have I taken this to God before I go to them?", ["Yes", "Not yet"]]);
  q.push(["theirWords", "Have I written what they actually said, not my story about it?", ["Yes", "Not yet"]]);
  return q.concat(_extra3());
};

var _plan3 = interactionPlan;
interactionPlan = function () {
  var plan = _plan3();
  var notes = [];
  if (state.firstReact && state.firstReact !== "I listen and test it" && state.firstReact !== "Not sure") {
    notes.push("Your first move is to protect, not to test. That can make even a kind word sound like a blow.");
  }
  if (state.hardFeedback === "Yes" || state.hardFeedback === "Sometimes") {
    notes.push("It may be hard to receive from people close to you. Check that before you judge what your spouse meant.");
  }
  if (state.believeNeg === "Yes" || state.believeNeg === "Sometimes") {
    notes.push("You may take the dark word as true faster than the good one. Ask if that is happening here.");
  }
  if (state.whenHurt === "Go quiet" || state.whenHurt === "Defend myself" || state.whenHurt === "Go on the attack") {
    notes.push("When you are hurt you " + state.whenHurt.toLowerCase() + ". That is a pattern to see, not a verdict on your worth.");
  }
  if (state.leadBy === "Emotions usually lead") {
    notes.push("If feeling leads, truth has to catch up. Let what is true lead the feeling.");
  }
  if (notes.length) {
    plan.extra.push("There may be a pattern here worth seeing before we look at what is happening between you and your spouse. The aim is the mind of Christ, not shame.");
    notes.forEach(function (n) { plan.extra.push(n); });
  }
  if (state.resetSelf !== "Yes") {
    plan.pattern = "See yourself first.";
    plan.stop = "Do not go to them until you have named how you hear and how you react.";
    plan.say = "Lord, show me how I hear. Then I will look at what they said.";
    plan.doNow = "Answer those questions honestly. Give what you see to God.";
  } else if (state.theirWords !== "Yes") {
    plan.pattern = "You have looked at yourself. Now bring one real thing they said.";
    plan.doNow = "Write their words. Test them the same way. Then take one step toward peace.";
  }
  return plan;
};
