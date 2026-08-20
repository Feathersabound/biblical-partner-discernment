var _extraI = extraQuestions;
extraQuestions = function () {
  var q = _extraI();
  q.push(["inviteGod", "Will I invite God into this hurt, this mind, this feeling, this past, this family?", ["Yes", "Not yet"]]);
  q.push(["chooseGod", "Do I choose God here?", ["Yes", "I am struggling to"]]);
  q.push(["declareWord", "Will I say His Word out loud, repeat it, and believe it?", ["Yes", "Not yet"]]);
  q.push(["forgiveWalk", "Have I received His forgiveness, and will I give it?", ["I receive and I give", "I receive, I have not given", "I have not received yet"]]);
  q.push(["healWalk", "Will I acknowledge His healing, receive it, and declare it?", ["Yes", "Not yet"]]);
  return q;
};
var _planI = interactionPlan;
interactionPlan = function () {
  var plan = _planI();
  plan.extra.push("Most people take a long time to receive God\u2019s love fully. Acknowledge it anyway. Invite Him in — hurt, mind, emotion, past, family — so His authority can change what you cannot. Declare His Word. Repeat it. Believe it. Learn the authority He has given you. Receive forgiveness. Give it. Acknowledge His healing. Receive it. Declare it. That feeds the mind, the feelings, and the marriage.");
  if (state.inviteGod === "Yes") {
    plan.say = "Lord, I invite You into this. I choose You. Your Word is true. I receive Your love. I receive forgiveness. I give it. I receive Your healing.";
  }
  return plan;
};
