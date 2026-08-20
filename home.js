function homeView() {
  var w = loadWalk();
  var done = kindsToday();
  var todayN = w.lastDay === todayKey() ? (w.stepsToday || 0) : 0;
  var streak = w.lastDay === todayKey() || w.lastDay === yesterdayKey() ? (w.streak || 0) : 0;
  return "<div class=\"card\">" +
    (toast ? "<p class=\"ok\">" + escape(toast) + "</p>" : "") +
    "<h2>Start here</h2>" +
    "<p>You are in a war. Jesus said so. The thief comes to steal, kill, and destroy. That is why life is not always fair. <strong>The person next to you is not the enemy.</strong> Jesus came that you may have life, and have it abundantly.</p>" +
    "<p>A feeling is not proof. A guess is not a fact. A curse is not prayer. Silence is not peace.</p>" +
    "<p>Name what happened. Ask what they meant. Take back a curse. Bless. Obey God. Come to the blood of the new covenant.</p>" +
    "<div class=\"grid two\">" +
    "<div class=\"stat\"><b>" + streak + "</b><span>days you came back</span></div>" +
    "<div class=\"stat\"><b>" + todayN + "</b><span>steps today</span></div>" +
    "</div>" +
    "<div class=\"path\">" +
    pathCard("Incident", "Name what happened", "Split the fact from the story. Ask them.", done.has("incident")) +
    pathCard("Repair", "Repent and repair", "Stop it. Do the opposite. Take back a curse.", done.has("repair")) +
    pathCard("Together", "Sit before God together", "Hear the Word. Obey. Heal. Bless. Remember His blood.", done.has("together")) +
    pathCard("Practice", "Do one small act", "Ask. Bless. Thank God. Make peace.", done.has("practice")) +
    pathCard("Check-in", "A short honest look", "How did you speak today? Did you surrender?", done.has("checkin")) +
    "</div>" +
    "<p class=\"scripture\">Love is patient and kind. It does not snap. It does not keep a list of wrongs. It is glad when the truth wins.</p>" +
    "</div>";
}
function pathCard(modeName, title, why, isDone) {
  return "<button type=\"button\" class=\"path-card" + (isDone ? " done" : "") + "\" data-go=\"" + modeName + "\">" +
    "<strong>" + (isDone ? "Done · " : "") + title + "</strong><span>" + why + "</span></button>";
}
