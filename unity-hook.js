const _plan2 = interactionPlan;
interactionPlan = function () {
  var plan = _plan2();
  plan.extra = plan.extra || [];
  plan.extra.push("This is not a battle of the sexes. The same sinful nature that destroys people is at work in a marriage when either person will not submit themselves to God.");
  plan.extra.push("Both will get it wrong while they are still aiming at what is right. A wife may believe a wrong thing. A husband may miss how she feels. He is to be kind and gentle. The aim is not the mistake. The aim is healing, clearer speech, unity, and appreciation.");
  if (state.battleSexes === "Yes") {
    plan.pattern = "You treated this as him versus her.";
    plan.stop = "Stop the battle of the sexes. Submit yourself to God first.";
  }
  if (state.selfToGod === "No") {
    plan.doNow = "Submit this to God yourself before you demand they change.";
  }
  return plan;
};

var _extra2 = extraQuestions;
extraQuestions = function () {
  var q = _extra2();
  q.push(["selfToGod", "Did I submit myself to God in this, or only ask them to change?", ["I submitted myself", "I only asked them to change", "A mix"]]);
  q.push(["battleSexes", "Did I treat this as a battle of the sexes?", ["Yes", "No", "Not sure"]]);
  return q;
};
