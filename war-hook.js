const _interactionPlan = interactionPlan;
interactionPlan = function () {
  const plan = _interactionPlan();
  plan.extra = plan.extra || [];
  plan.extra.push("This is a war. Jesus said we would have trouble. The thief comes to steal, kill, and destroy. Life is not always fair. Do not treat your spouse as the enemy. Jesus came that you may have life, and have it to the full.");
  return plan;
};
