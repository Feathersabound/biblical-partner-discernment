function homeView() {
  var w = loadWalk();
  var done = kindsToday();
  var todayN = w.lastDay === todayKey() ? (w.stepsToday || 0) : 0;
  var streak = w.lastDay === todayKey() || w.lastDay === yesterdayKey() ? (w.streak || 0) : 0;
  return "<div class=\"card\">" +
    (toast ? "<p class=\"ok\">" + escape(toast) + "</p>" : "") +
    "<h2>Walk in Truth</h2>" +
    "<p>See yourself first. Then look at what they said. Then take one step toward peace.</p>" +
    "<div class=\"grid two\">" +
    "<div class=\"stat\"><b>" + streak + "</b><span>days you came back</span></div>" +
    "<div class=\"stat\"><b>" + todayN + "</b><span>steps today</span></div>" +
    "</div>" +
    "<div class=\"path\">" +
    pathCard("Incident", "See yourself", "How you hear. How you react. Then their words.", done.has("incident")) +
    pathCard("Repair", "Fix it", "Stop the false story. Do the opposite.", done.has("repair")) +
    pathCard("Together", "Together", "Word. Obedience. Healing. Blessing. His blood.", done.has("together")) +
    pathCard("Practice", "Practice", "One act: ask, bless, thank, or make peace.", done.has("practice")) +
    pathCard("Check-in", "Today", "How did you speak? Did you give it to God?", done.has("checkin")) +
    "</div>" +
    "<p class=\"scripture\">Love is patient and kind. It does not snap. It does not keep a list of wrongs. It is glad when the truth wins.</p>" +
    "</div>";
}
function pathCard(modeName, title, why, isDone) {
  return "<button type=\"button\" class=\"path-card" + (isDone ? " done" : "") + "\" data-go=\"" + modeName + "\">" +
    "<strong>" + (isDone ? "Done · " : "") + title + "</strong><span>" + why + "</span></button>";
}
