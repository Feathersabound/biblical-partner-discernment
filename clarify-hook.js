var p;
for (var i = 0; i < PRACTICES.length; i++) {
  p = PRACTICES[i];
  if (p.id === "trigger") {
    p.title = "Name what you have not tested";
    p.text = "If an old thought or old story is being treated as today\u2019s truth, name it. If you cannot name it, you cannot deal with it. Then test it with God. Then look at what they said.";
  }
  if (p.id === "need-god") {
    p.title = "Two different things";
    p.text = "Forgiveness is one thing: you need it for healing and for any real relationship. Leading someone into sin or away from Christ is another. Either spouse can do that. Name which one this is.";
  }
  if (p.id === "reconcile") {
    p.title = "One step toward peace";
    p.text = "Go to them. Own your part. Do not wait for them to own theirs first.";
  }
}

var _exC = extraQuestions;
extraQuestions = function () {
  var q = _exC();
  q.push(["ILedSin", "Did I use my place or my strengths to lead them into sin or away from Christ?", ["Yes", "No", "Not sure"]]);
  q.push(["theyLedSin", "Did they lead me into sin or away from Christ?", ["Yes", "No", "Not sure"]]);
  return q;
};

var _kb = interactionPlan;
interactionPlan = function () {
  var plan = _kb();
  if (state.ILedSin === "Yes") {
    plan.pattern = "You used what you have been given to pull them off the path.";
    plan.stop = "Stop that lead.";
    plan.say = "I was wrong to pull you away from Christ.";
    plan.doNow = "Repent to God. Then to them. Return to what is right.";
  } else if (state.theyLedSin === "Yes") {
    plan.pattern = "They are leading you into sin or away from Christ.";
    plan.stop = "Do not call that obedience.";
    plan.say = "I cannot go that way. I will obey God.";
    plan.doNow = "Obey God. Do not follow that lead.";
  } else if (state.forgiveWalk === "I receive, I have not given" || state.forgiveNow === "No") {
    plan.pattern = "Forgiveness is unfinished. You cannot walk with someone you will not forgive.";
    plan.stop = "Stop holding it as a right.";
    plan.say = "Lord, I receive Your forgiveness. I give it.";
    plan.doNow = "Forgive. That is for healing and for the relationship.";
  }
  return plan;
};
