const KEY = "walk-in-truth-v1";
const MODES = ["Home", "Incident", "Check-in", "Together", "Repair", "Practice", "History"];
const LABELS = {
  Home: "Home",
  Incident: "What happened",
  "Check-in": "Today",
  Together: "Together",
  Repair: "Fix it",
  Practice: "Practice",
  History: "Saved"
};

const REPAIRS = {
  difference: {
    title: "I thought they were attacking me when they were just different",
    stop: "Stop treating a different way of thinking as an attack. Stop saying your guess as if it were a fact.",
    doNow: "Ask: What did you mean? Write their answer. If they were not attacking you, say so out loud and take the charge back.",
    opposite: "Thank them for one true thing they did today. Being different is not the same as being against you.",
    word: "1 Thessalonians 5:21. Proverbs 18:13."
  },
  feeling: {
    title: "I treated a feeling as if it proved I was right",
    stop: "Stop using a feeling as proof. Stop going over it in your mind until it feels like fact.",
    doNow: "Name the feeling in one word. Name what actually happened in one sentence. Ask them. If the Bible does not say your guess is true, let it go.",
    opposite: "Say: I felt this. What happened was that. I was wrong to treat my feeling as the truth.",
    word: "Proverbs 28:26."
  },
  rejection: {
    title: "When they led or corrected me, I felt rejected",
    stop: "Stop calling every lead or correction an attack. Do not make them stop leading just to keep you calm.",
    doNow: "Name the old hurt if you know it. Then say only what was said today.",
    opposite: "Take one fair lead or one true correction without hitting back.",
    word: "1 Corinthians 13:5."
  },
  accusation: {
    title: "I blamed them or spoke harm with my words",
    stop: "Stop naming them as a bad kind of person. Stop repeating the blame.",
    doNow: "Tell God you were wrong. Then tell them. Take the words back. Speak a good word instead.",
    opposite: "Pray for their good for two minutes. Say one true good thing about them.",
    word: "Proverbs 18:21. James 3:10."
  },
  ledger: {
    title: "I keep an old list of their faults",
    stop: "Stop adding today to an old pile and calling the pile who they are.",
    doNow: "Write the old list. Give it to God. Deal with this one fact only.",
    opposite: "Forgive the old list. If a real fact remains, say it once, kindly.",
    word: "1 Corinthians 13:5."
  },
  withheld: {
    title: "I would not obey in a right thing",
    stop: "Stop waiting for him to be perfect before you obey God.",
    doNow: "Do the right thing as unto the Lord. If he asked you to sin, refuse the sin.",
    opposite: "Do one right act of obedience today. Do not give a speech with it.",
    word: "Ephesians 5:22."
  },
  harsh: {
    title: "I used my place as husband to hurt, blame, or speak harm",
    stop: "Stop barking orders, keeping score, and speaking death over her.",
    doNow: "Tell God you were wrong. Ask how you hurt her. Care for her. Speak life.",
    opposite: "Do one kind act. Say one true fact in a kind way.",
    word: "Ephesians 5:25, 29. Colossians 3:19."
  },
  unforgiveness: {
    title: "I am holding bitterness",
    stop: "Stop going over the hurt as if it gives you the right to stay bitter.",
    doNow: "Forgive them before God. Say it. Let God deal with them.",
    opposite: "Pray one good prayer for them today.",
    word: "Ephesians 4:31-32."
  }
};

const WORD = {
  direction: [
    { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths." },
    { ref: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." },
    { ref: "Isaiah 30:21", text: "And your ears shall hear a word behind you, saying, This is the way, walk in it." }
  ],
  obedience: [
    { ref: "John 14:15", text: "If you love me, you will keep my commandments." },
    { ref: "Ephesians 5:21-25", text: "Submitting to one another out of reverence for Christ. Wives, submit to your own husbands, as to the Lord. Husbands, love your wives, as Christ loved the church." },
    { ref: "Acts 5:29", text: "We must obey God rather than men." },
    { ref: "James 1:22", text: "Be doers of the word, and not hearers only." }
  ],
  healing: [
    { ref: "Psalm 147:3", text: "He heals the brokenhearted and binds up their wounds." },
    { ref: "James 5:16", text: "Confess your sins to one another and pray for one another, that you may be healed." },
    { ref: "1 Peter 2:24", text: "By his wounds you have been healed." },
    { ref: "Ephesians 4:32", text: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you." }
  ]
};

const STEPS = ["Who", "What", "More", "Plan"];

const PRACTICES = [
  { id: "ask", title: "Ask before you decide", text: "Take one thing you assumed. Ask what they meant. Write their words next to yours." },
  { id: "fact-bless", title: "One fact, one kind word", text: "Say one thing that really happened. Then say one true kind word." },
  { id: "intercede", title: "Pray instead of blame", text: "Pray for their good for two minutes. Do not go over the blame." },
  { id: "trigger", title: "Name the old hurt, then face today", text: "This strong feeling may come from an old hurt. Then name only what happened today." },
  { id: "surrender", title: "Give it to God", text: "Give this to the Lord yourself. Ask them to do the same. If they will not, you still give it to God." },
  { id: "agape", title: "Check yourself with 1 Corinthians 13", text: "Was I slow to get angry, or did I snap? Did I keep a list of wrongs?" },
  { id: "thanks", title: "Thank God for one true thing", text: "Name one true good thing. Thank God out loud." },
  { id: "need-god", title: "Admit when this is too big", text: "If you cannot forgive, cannot stay safe, or keep slipping, say so to God." },
  { id: "reconcile", title: "One step toward peace", text: "If it is safe, go to them. Own your part. Do not demand they own theirs first." }
];
