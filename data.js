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
    stop: "Stop treating a different way of thinking as an attack.",
    doNow: "Ask what they meant. Take the charge back if it was not an attack.",
    opposite: "Thank them for one true thing.",
    word: "1 Thessalonians 5:21. Proverbs 18:13."
  },
  feeling: {
    title: "I treated a feeling as if it proved I was right",
    stop: "Stop using a feeling as proof.",
    doNow: "Name the feeling. Name the fact. Ask them.",
    opposite: "Say: I felt this. What happened was that.",
    word: "Proverbs 28:26."
  },
  rejection: {
    title: "When they led or corrected me, I felt rejected",
    stop: "Stop calling every lead an attack.",
    doNow: "Name the old hurt. Then say only what was said today.",
    opposite: "Take one fair lead without hitting back.",
    word: "1 Corinthians 13:5."
  },
  accusation: {
    title: "I blamed them or spoke harm",
    stop: "Stop naming them as a bad kind of person.",
    doNow: "Tell God. Take the words back. Speak a good word.",
    opposite: "Pray for their good. Say one true good thing.",
    word: "Proverbs 18:21. James 3:10."
  },
  ledger: {
    title: "I keep an old list of their faults",
    stop: "Stop adding today to an old pile.",
    doNow: "Give the list to God. Deal with this one fact.",
    opposite: "Forgive. If a fact remains, say it once, kindly.",
    word: "1 Corinthians 13:5."
  },
  withheld: {
    title: "I would not obey in a right thing",
    stop: "Stop waiting for him to be perfect before you obey God.",
    doNow: "Do the right thing as unto the Lord. If he asked you to sin, refuse the sin.",
    opposite: "One right act of obedience. No speech with it.",
    word: "Ephesians 5:22."
  },
  harsh: {
    title: "I used my place as husband to hurt",
    stop: "Stop barking, scoring, and speaking death.",
    doNow: "Repent. Ask how you hurt her. Care for her.",
    opposite: "One kind act. One fact said kindly.",
    word: "Ephesians 5:25, 29. Colossians 3:19."
  },
  unforgiveness: {
    title: "I am holding bitterness",
    stop: "Stop going over the hurt as a right.",
    doNow: "Forgive before God. Say it.",
    opposite: "Pray one good prayer for them.",
    word: "Ephesians 4:31-32."
  },
  curse: {
    title: "I spoke a curse or agreed with one",
    stop: "Stop speaking death. Stop agreeing with a curse.",
    doNow: "Take the words back out loud. Speak a blessing.",
    opposite: "Bless them. Do not repeat the old words.",
    word: "Proverbs 18:21. James 3:10. Galatians 3:13. Luke 6:28."
  }
};

const WORD = {
  direction: [
    { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart, and do not lean on your own understanding." },
    { ref: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." }
  ],
  obedience: [
    { ref: "John 14:15", text: "If you love me, you will keep my commandments." },
    { ref: "Ephesians 5:21-25", text: "Wives, submit to your own husbands, as to the Lord. Husbands, love your wives, as Christ loved the church." },
    { ref: "Acts 5:29", text: "We must obey God rather than men." }
  ],
  healing: [
    { ref: "Psalm 147:3", text: "He heals the brokenhearted and binds up their wounds." },
    { ref: "James 5:16", text: "Confess your sins to one another and pray for one another, that you may be healed." },
    { ref: "Ephesians 4:32", text: "Forgiving one another, as God in Christ forgave you." }
  ],
  blessing: [
    { ref: "Proverbs 18:21", text: "Death and life are in the power of the tongue." },
    { ref: "James 3:10", text: "From the same mouth come blessing and cursing. These things ought not to be so." },
    { ref: "Galatians 3:13", text: "Christ redeemed us from the curse of the law by becoming a curse for us." },
    { ref: "Luke 6:28", text: "Bless those who curse you." }
  ],
  covenant: [
    { ref: "Luke 22:17", text: "He took a cup, and when he had given thanks he said, Take this, and divide it among yourselves." },
    { ref: "Luke 22:19-20", text: "This is my body… This cup is the new covenant in my blood." },
    { ref: "1 Corinthians 5:7", text: "Christ, our Passover lamb, has been sacrificed." },
    { ref: "1 Corinthians 11:28-29", text: "Examine himself… without discerning the body eats and drinks judgment." },
    { ref: "1 Corinthians 10:16-17", text: "We who are many are one body." },
    { ref: "2 Peter 1:4", text: "Partakers of the divine nature." }
  ],
  war: [
    { ref: "John 10:10", text: "The thief comes only to steal and kill and destroy. I came that they may have life and have it abundantly." },
    { ref: "John 16:33", text: "In the world you will have tribulation. But take heart; I have overcome the world." },
    { ref: "Matthew 10:34", text: "I have not come to bring peace, but a sword." },
    { ref: "Ephesians 6:12", text: "We do not wrestle against flesh and blood." },
    { ref: "1 Peter 5:8", text: "Your adversary the devil prowls around like a roaring lion." }
  ]
};

const STEPS = ["Who", "What", "More", "Plan"];

const PRACTICES = [
  { id: "ask", title: "Ask before you decide", text: "Ask what they meant. Write their words next to yours." },
  { id: "fact-bless", title: "One fact, one kind word", text: "Say one true fact. Then one kind word." },
  { id: "intercede", title: "Pray instead of blame", text: "Pray for their good for two minutes." },
  { id: "trigger", title: "Name the old hurt, then face today", text: "Name the old hurt. Then name only what happened today." },
  { id: "surrender", title: "Give it to God", text: "Give this to the Lord. If they will not, you still do." },
  { id: "agape", title: "1 Corinthians 13", text: "Did I snap? Did I keep a list of wrongs?" },
  { id: "thanks", title: "Thank God for one true thing", text: "Name one true good thing. Thank God out loud." },
  { id: "need-god", title: "Admit when this is too big", text: "If you cannot forgive or stay safe, say so to God." },
  { id: "reconcile", title: "One step toward peace", text: "If it is safe, go to them. Own your part." },
  { id: "bless", title: "Take back a curse. Speak a blessing", text: "Take the words back. Speak one true blessing. Do not repeat the curse." },
  { id: "communion", title: "Remember the blood of the new covenant", text: "A cup set apart, then the bread, then the cup of His blood. Christ is the true Passover. Discern the body: Jesus, and those who believe." },
  { id: "war", title: "Remember: this is a war", text: "The thief comes to steal, kill, and destroy. Life is not always fair. Do not treat your spouse as the enemy. Jesus came that you may have life, and have it to the full." }
];
