import { useState } from "react";

// ── DESIGN TOKENS ─────────────────────────────────────────────
const C = {
  bg:"#07120a", bgMid:"#0d1f10", card:"rgba(13,31,16,0.85)",
  border:"rgba(34,197,94,0.22)", borderHi:"rgba(34,197,94,0.65)",
  green:"#22c55e", greenDim:"#16a34a", gold:"#f59e0b", goldDim:"#d97706",
  text:"#f0fdf4", muted:"#86efac", dim:"rgba(134,239,172,0.45)",
  messi:"#60a5fa", ronaldo:"#f87171",
};
const card = { background:C.card, border:`1px solid ${C.border}`, borderRadius:"16px", padding:"24px", backdropFilter:"blur(8px)" };

// ── DATA ──────────────────────────────────────────────────────
const KL = [
  { id:1, e:"🌱", label:"Complete Newbie",  desc:"I know almost nothing — just that people kick a ball" },
  { id:2, e:"📺", label:"Basics Fan",       desc:"I know the basics — rules, some big teams, major tournaments" },
  { id:3, e:"⚽", label:"Casual Follower",  desc:"I watch big games and know the popular players" },
  { id:4, e:"🏆", label:"Active Follower",  desc:"I actively follow football and major tournaments" },
];

const PREDS = [
  { rank:"🥇", label:"Most Likely Winner", team:"Argentina", flag:"🇦🇷",
    conf:74, fifaRank:1, formScore:92, result:"Won 3–0 vs Algeria ✅ (Messi hat-trick)",
    star:"Messi — 3 goals · WC all-time record (13 career WC goals = Klose)",
    why:"FIFA #1, highest form score (92/100), 68% historical win rate, reigning champions. Messi's hat-trick in the opener put him level with Miroslav Klose as the all-time leading scorer in World Cup history.",
    risk:"No team has won back-to-back since Brazil in 1958/62. The defending-champion bull's-eye is real — everyone has studied their patterns for 4 years.",
    accent:C.green },
  { rank:"🥈", label:"Runner-Up", team:"France", flag:"🇫🇷",
    conf:63, fifaRank:3, formScore:90, result:"Won 3–1 vs Senegal ✅",
    star:"Mbappé — 2 goals vs Senegal · Real Madrid's 42-goal season form",
    why:"2022 finalists, 2018 winners. Mbappé (age 27) is on course to become the WC all-time top scorer and is at the absolute peak of his career. Fired France to a 3–1 win with two goals including one described as 'spectacular'.",
    risk:"France sometimes underperform their talent ceiling — heavy reliance on individual brilliance. A potential final rematch with Argentina is psychologically loaded.",
    accent:"#60a5fa" },
  { rank:"⚡", label:"Dark Horse", team:"Germany", flag:"🇩🇪",
    conf:46, fifaRank:9, formScore:87, result:"Won 7–1 vs Curaçao ✅",
    star:"Kai Havertz — 2 goals in opener · collective tactical cohesion",
    why:"7–1 opener is a statement — even against weak opposition, goal difference boosts morale. Europeans have won 4 of the last 5 World Cups. Germany have the tournament DNA.",
    risk:"Haven't won since 2014. The expanded 48-team format means 7 games to win — their squad depth across the board will be tested in a way earlier tournaments didn't demand.",
    accent:C.gold },
  { rank:"👀", label:"Watch Closely", team:"Norway", flag:"🇳🇴",
    conf:30, fifaRank:25, formScore:85, result:"Won 4–1 vs Iraq ✅ (Haaland 2 goals)",
    star:"Erling Haaland — 2 goals on WC debut · 27 PL goals in 2025–26",
    why:"Norway are back at their first World Cup since 1998 and opened with a 4-1 demolition of Iraq. Haaland — who finished as Premier League Golden Boot winner with 27 goals for City — scored twice. If Norway goes deep, he could run away with the Golden Boot.",
    risk:"Group I contains France and Senegal — two knockout-quality teams. Norway advancing past the group depends on results they can't fully control.",
    accent:"#f87171" },
];

const LIVE = [
  { m:"Argentina 3–0 Algeria",  g:"J", d:"Jun 16", e:"✅", note:"Messi hat-trick" },
  { m:"France 3–1 Senegal",     g:"I", d:"Jun 16", e:"✅", note:"Mbappé 2 goals" },
  { m:"Germany 7–1 Curaçao",   g:"E", d:"Jun 14", e:"✅", note:"Havertz 2 goals" },
  { m:"Norway 4–1 Iraq",        g:"I", d:"Jun 16", e:"✅", note:"Haaland 2 goals" },
  { m:"USA 4–1 Paraguay",       g:"D", d:"Jun 12", e:"✅", note:"Balogun 2 goals" },
  { m:"Mexico 2–0 South Africa",g:"A", d:"Jun 11", e:"✅", note:"Opening match" },
  { m:"Canada 6–0 Qatar",       g:"B", d:"Jun 18", e:"✅", note:"David hat-trick" },
  { m:"Brazil 1–1 Morocco",     g:"C", d:"Jun 13", e:"🟡", note:"Defensive Morocco" },
  { m:"Spain 0–0 Cape Verde",   g:"H", d:"Jun 15", e:"🟡", note:"Flat opener" },
  { m:"Netherlands 2–2 Japan",  g:"G", d:"Jun 14", e:"🟡", note:"Thriller" },
];

const GOLDEN_BOOT = [
  { player:"Lionel Messi",     country:"🇦🇷 Argentina", goals:3, note:"Hat-trick vs Algeria. Matches Klose's all-time WC record of 13 career WC goals." },
  { player:"Jonathan David",   country:"🇨🇦 Canada",    goals:3, note:"Hat-trick vs Qatar in 6–0 win. Emerged as a major Golden Boot contender." },
  { player:"Kylian Mbappé",    country:"🇫🇷 France",    goals:2, note:"Scored twice vs Senegal. Needs 5 more to overtake Klose as all-time WC top scorer." },
  { player:"Erling Haaland",   country:"🇳🇴 Norway",    goals:2, note:"Scored twice on WC debut vs Iraq. 27-goal PL season carried into the tournament." },
  { player:"Harry Kane",       country:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",   goals:2, note:"61-goal season for Bayern Munich. Leads England's attack with typical efficiency." },
  { player:"Kai Havertz",      country:"🇩🇪 Germany",   goals:2, note:"Key contribution to Germany's 7–1 demolition of Curaçao." },
];

const IQQ = [
  { id:1, cat:"⚽ Rules", diff:"🟢 Beginner", pts:15,
    q:"When the ball goes out of play over the sideline (the long sides of the pitch), what happens?",
    opts:[{id:"A",t:"A corner kick is awarded"},{id:"B",t:"A throw-in is taken by the team who didn't touch it last"},{id:"C",t:"A free kick is awarded"},{id:"D",t:"Play restarts with a goal kick"}], ans:"B" },
  { id:2, cat:"🏆 Tournament History", diff:"🟡 Intermediate", pts:20,
    q:"Looking at the last 5 FIFA World Cups (2006–2022), which continent has dominated?",
    opts:[{id:"A",t:"South America — won 3 of the last 5"},{id:"B",t:"Europe — won 4 of the last 5"},{id:"C",t:"It's been evenly split, 2–2 with one tied"},{id:"D",t:"Africa won one, making it more balanced"}], ans:"B" },
  { id:3, cat:"⭐ Player Intelligence", diff:"🟡 Intermediate", pts:20,
    q:"Among 2026's tracked stars — Messi, Mbappé, Ronaldo, Haaland, Bellingham — who has the HIGHEST rating AND MOST assists?",
    opts:[{id:"A",t:"Kylian Mbappé — leads in both"},{id:"B",t:"Erling Haaland — top rated with most assists"},{id:"C",t:"Lionel Messi — highest rating (96) and most assists (12)"},{id:"D",t:"Jude Bellingham — top-rated midfielder overall"}], ans:"C" },
  { id:4, cat:"📡 Live 2026 Data", diff:"🟡 Intermediate", pts:20,
    q:"What significant milestone did Messi reach in Argentina's 2026 opening match?",
    opts:[{id:"A",t:"He scored a hat-trick, levelling the all-time World Cup scoring record"},{id:"B",t:"He broke the record for most assists in a single World Cup game"},{id:"C",t:"He became the first player to appear at 6 World Cups"},{id:"D",t:"He scored a penalty to win 1–0 in a tight match"}], ans:"A" },
  { id:5, cat:"🧠 Tactical Thinking", diff:"🔴 Advanced", pts:25,
    q:"A team has a very high 'Goals Against' number but also a very high Win %. What does this most likely suggest?",
    opts:[{id:"A",t:"They're defensive — grinding out narrow wins"},{id:"B",t:"They're attack-heavy — they outscore opponents rather than shut them out"},{id:"C",t:"The data is contradictory and unreliable"},{id:"D",t:"They tend to win on penalties after low-scoring games"}], ans:"B" },
];

const PQ = [
  { id:"q1", trait:"Ambition", type:"choice", multi:false,
    q:"When you set a goal, what actually keeps you going?",
    opts:[{id:"A",t:"The hunger to be the best — I want to be number one"},{id:"B",t:"The love of the process — the journey matters more than the trophy"},{id:"C",t:"Proving people wrong — external doubt is my fuel"},{id:"D",t:"Seeing the people around me succeed because of my contribution"}] },
  { id:"q2", trait:"Discipline", type:"rating", multi:false,
    q:'"I stick to routines and structured habits even when I don\'t feel motivated."' },
  { id:"q3", trait:"Leadership", type:"choice", multi:true, maxSel:2,
    q:"How do you naturally lead in a group? (Select up to 2)",
    opts:[{id:"A",t:"Lead by example quietly — I let results speak"},{id:"B",t:"Vocal and direct — I call things out and demand more"},{id:"C",t:"I step back — I'd rather set others up to shine"},{id:"D",t:"I read the room — sometimes quiet, sometimes loud"}] },
  { id:"q4", trait:"Teamwork", type:"rating", multi:false,
    q:'"I genuinely enjoy working as part of a team more than achieving things alone."' },
  { id:"q5", trait:"Creativity", type:"choice", multi:false,
    q:"When solving a problem, your first instinct is:",
    opts:[{id:"A",t:"Trust your gut — improvise in the moment"},{id:"B",t:"Follow a proven framework — what worked before works again"},{id:"C",t:"Analyse first, then pick the most efficient path"},{id:"D",t:"Look for the unexpected angle others haven't tried"}] },
  { id:"q6", trait:"Competitiveness", type:"rating", multi:false,
    q:'"Losing genuinely bothers me — not just in the moment, but it lingers."' },
  { id:"q7", trait:"Risk Taking", type:"choice", multi:false,
    q:"When a big decision needs to be made under pressure, you:",
    opts:[{id:"A",t:"Take the risk — you can't win big by playing safe"},{id:"B",t:"Calculated risk only — weigh it carefully, then commit"},{id:"C",t:"Default to what you know works — protect what you've built"},{id:"D",t:"Look for someone to share the decision with"}] },
  { id:"q8", trait:"Confidence", type:"rating", multi:false,
    q:'"Even in unfamiliar situations, I back myself to figure it out."' },
  { id:"q9", trait:"Learning Style", type:"choice", multi:false,
    q:"How do you get better at something?",
    opts:[{id:"A",t:"Repetition and drilling — mastery from doing it thousands of times"},{id:"B",t:"Watching others and adapting — I learn more by observing"},{id:"C",t:"Trying, failing, reflecting — experience is the best teacher"},{id:"D",t:"Deep research — understand the theory before I execute"}] },
  { id:"q10", trait:"Work Ethic", type:"rating", multi:false,
    q:'"I believe hard work and preparation matter more than raw natural talent."' },
  { id:"q11", trait:"Pressure Response", type:"choice", multi:false,
    q:"When the stakes are highest, you:",
    opts:[{id:"A",t:"Raise your level — big moments bring out something extra in you"},{id:"B",t:"Stay exactly the same — consistency is the goal, not elevation"},{id:"C",t:"Feel the nerves but push through them deliberately"},{id:"D",t:"Prefer not to be the one everyone's looking at"}] },
  { id:"q12", trait:"Recognition", type:"choice", multi:true, maxSel:2,
    q:"What kind of success feels most meaningful? (Select up to 2)",
    opts:[{id:"A",t:"Individual achievement — records, being the undeniable best"},{id:"B",t:"Collective success — a team win where everyone contributed"},{id:"C",t:"Both — I want to win AND have my contribution undeniably recognised"},{id:"D",t:"The impact you had on others — more than any title or record"}] },
];

const ARC = {
  "Tactical Visionary":    { icon:"🎯", color:"#818cf8", desc:"You don't just play the game — you read it before it happens. Analytical, calculated, efficient. Your biggest asset is seeing what others miss.", traits:["Analytical problem-solver","Calculated risk-taker","Learns through reflection","Highly disciplined"], real:"Xavi Hernández, Kevin De Bruyne, Andrea Pirlo" },
  "Creative Playmaker":    { icon:"🎨", color:"#34d399", desc:"Natural instinct, fluid creativity, an ability to make teammates better. You don't follow the path — you draw a new one.", traits:["Intuitive decision-making","High creativity","Team-first mindset","Flow-state performer"], real:"Andrés Iniesta, Pedri, Jamal Musiala" },
  "Relentless Competitor": { icon:"🔥", color:"#f87171", desc:"Every challenge, every setback becomes fuel. You're built to win and won't stop until you do — records are a byproduct, not the goal.", traits:["Extreme competitiveness","Work ethic above all","Individual excellence drive","Refuses to accept defeat"], real:"Cristiano Ronaldo, Thierry Henry, Harry Kane" },
  "Quiet Leader":          { icon:"🎖️", color:"#2dd4bf", desc:"You don't need the spotlight to lead. Your consistency and example pull people forward without you ever raising your voice.", traits:["Lead by example","Process-driven","Intrinsic motivation","Calm under pressure"], real:"N'Golo Kanté, Bastian Schweinsteiger, Messi (early)" },
  "Fearless Attacker":     { icon:"⚡", color:"#fbbf24", desc:"Risk is your language. You thrive when it matters most and back yourself in situations others would shy away from.", traits:["High risk appetite","Big-moment confidence","Improvisation instinct","Thrives on uncertainty"], real:"Kylian Mbappé, Ronaldinho, Arjen Robben" },
  "Strategic Commander":   { icon:"⚔️", color:"#a78bfa", desc:"You lead from the front and aren't afraid to demand more from everyone around you. Structure and vocal direction are your weapons.", traits:["Vocal leadership","High competitiveness","Calculated execution","Demands excellence from all"], real:"Roy Keane, Sergio Ramos, Cafu" },
  "Consistent Performer":  { icon:"📈", color:"#38bdf8", desc:"While others peak and valley, you just keep showing up. Reliability is your superpower — day in, day out.", traits:["Extreme discipline","Strong work ethic","Steady confidence","Long-term thinker"], real:"Thomas Müller, James Milner, Philipp Lahm" },
  "Big-Match Specialist":  { icon:"🏆", color:"#fb923c", desc:"The bigger the moment, the better you perform. When others tense up, you unlock a completely different gear.", traits:["Elevates under pressure","Highly competitive","Clutch mentality","Thrives on the spotlight"], real:"Mbappé (finals), Gerd Müller, Messi (2022 final)" },
};

// ── SCORING ───────────────────────────────────────────────────
function mPts(q,a){
  const mc={q1:{A:0,B:3,C:1,D:2},q3:{A:3,B:0,C:2,D:1},q5:{A:3,B:1,C:0,D:2},q7:{A:2,B:0,C:0,D:2},q9:{A:0,B:2,C:3,D:1},q11:{A:1,B:2,C:2,D:3},q12:{A:0,B:3,C:2,D:2}};
  const rt={q2:[0,1,1.5,2,2,2],q4:[0,0,1,1.5,2,3],q6:[0,0,1,1,1,1],q8:[0,0,1,1.5,2,1],q10:[0,3,2,1,1,0]};
  if(mc[q]){if(Array.isArray(a))return a.reduce((s,x)=>s+(mc[q][x]||0),0)/Math.max(a.length,1);return mc[q][a]||0;}
  if(rt[q])return rt[q][parseInt(a)]||0; return 0;
}
function rPts(q,a){
  const mc={q1:{A:3,B:0,C:2,D:1},q3:{A:0,B:3,C:1,D:2},q5:{A:0,B:2,C:3,D:1},q7:{A:1,B:3,C:1,D:0},q9:{A:3,B:1,C:0,D:2},q11:{A:2,B:2,C:1,D:0},q12:{A:3,B:0,C:2,D:1}};
  const rt={q2:[0,0,1,1,2,3],q4:[0,3,2,1.5,1,0],q6:[0,0,0,1,2,3],q8:[0,0,0,1,2,3],q10:[0,0,0,1,2,3]};
  if(mc[q]){if(Array.isArray(a))return a.reduce((s,x)=>s+(mc[q][x]||0),0)/Math.max(a.length,1);return mc[q][a]||0;}
  if(rt[q])return rt[q][parseInt(a)]||0; return 0;
}
function calcPersonality(ans){
  let m=0,r=0;
  PQ.forEach(q=>{ if(ans[q.id]!==undefined){m+=mPts(q.id,ans[q.id]);r+=rPts(q.id,ans[q.id]);} });
  const t=m+r; if(!t) return {messi:50,ronaldo:50};
  return {messi:Math.round((m/t)*100),ronaldo:Math.round((r/t)*100)};
}
function calcArchetype(ans,mp){
  const g=q=>ans[q]; const ri=q=>parseInt(ans[q])||3;
  const arr=q=>Array.isArray(ans[q])?ans[q]:ans[q]?[ans[q]]:[];
  if(g('q5')==='C'&&g('q7')==='B'&&ri('q2')>=3) return "Tactical Visionary";
  if(g('q11')==='A'&&ri('q6')>=4)               return "Big-Match Specialist";
  if(ri('q6')>=4&&ri('q10')>=4&&mp<50)          return "Relentless Competitor";
  if(arr('q3').includes('A')&&(g('q1')==='B'||g('q1')==='D')&&mp>=55) return "Quiet Leader";
  if(arr('q3').includes('B')&&g('q7')==='B'&&ri('q6')>=3) return "Strategic Commander";
  if(g('q7')==='A'&&ri('q8')>=4)                return "Fearless Attacker";
  if(g('q5')==='A'||g('q5')==='D')              return "Creative Playmaker";
  if(ri('q2')>=4&&ri('q10')>=4)                 return "Consistent Performer";
  return mp>=55?"Creative Playmaker":"Relentless Competitor";
}
function calcIQ(ans){ return IQQ.reduce((s,q)=>s+(ans[q.id]===q.ans?q.pts:0),0); }
function getClass(s){ if(s<=20)return"Beginner Fan";if(s<=40)return"Casual Viewer";if(s<=60)return"Football Follower";if(s<=80)return"Football Enthusiast";return"Football Expert"; }

// ── RULE-BASED PROFILE ENGINE ─────────────────────────────────

function buildHeadline(arc, mp, pa) {
  const q1=pa.q1, q5=pa.q5, q11=pa.q11;
  const LINES = {
    "Tactical Visionary":   ["Reads the Game Three Moves Ahead","The Analyst the Game Didn't Expect","Calculated, Efficient, and Rarely Wrong"],
    "Creative Playmaker":   ["The Instinct Player Who Lifts Everyone","Creativity Over Convention, Always","Where Flair Meets Football Intelligence"],
    "Relentless Competitor":["Won't Stop Until the Record is Broken","Built for Battle — Every Single Time","Outworking Everyone in the Room"],
    "Quiet Leader":         ["Results Speak. That's the Only Language.","The Player Coaches Build Systems Around","Process First. Trophy Follows."],
    "Fearless Attacker":    ["Takes the Risk When Others Won't","Backs Themselves in Every Big Moment","Risk Is the Language — Fluent in It"],
    "Strategic Commander":  ["Leads Loud and Executes Precisely","The Voice That Makes Teams Perform","Demands Excellence. Receives It."],
    "Consistent Performer": ["Shows Up When It Counts. Every Time.","The Reliability Others Can't Replace","Day In, Day Out — No Drop-Off"],
    "Big-Match Specialist":  ["The Bigger the Moment, the Better","Saves the Best for When It Matters","Clutch Is a Skill — and You Have It"],
  };
  const pool = LINES[arc] || LINES["Tactical Visionary"];
  const idx = (q1==='B'||q11==='C') ? 0 : (q5==='C'||q5==='B') ? 1 : 2;
  return pool[idx];
}

function buildIQInsight(score, cl, ans) {
  const correct = IQQ.filter(q=>ans[q.id]===q.ans);
  const wrong   = IQQ.filter(q=>ans[q.id]!==q.ans);
  let s1='';
  if(score===100) s1=`Perfect 100/100 — five for five, from beginner rules all the way to advanced tactical thinking. That puts you firmly in Football Expert territory, which is a rare landing point for anyone who identifies as a casual follower.`;
  else if(score>=80) s1=`${score}/100 and firmly in the ${cl} bracket. Most self-described casual fans land in the 40–60 range; you're operating significantly above that baseline.`;
  else if(score>=60) s1=`${score}/100 earns you the ${cl} classification — solid across rules, tournament history, and player intelligence.`;
  else if(score>=40) s1=`${score}/100 places you in the ${cl} bracket — a real foundation to build on as the tournament progresses.`;
  else s1=`${score}/100 is your starting point as a ${cl}. Football knowledge grows fast when you're actively watching — 2026 is perfect timing.`;

  let s2='';
  if(correct.length===5) s2=`You nailed all five areas: basic rules, Europe's 4/5 dominance in recent World Cups, Messi's dual lead in rating and assists, his hat-trick milestone vs Algeria (levelling Klose's all-time record of 13 WC goals), and the tactical logic behind attack-heavy win rates.`;
  else if(correct.length>=3){ const a=correct.map(q=>q.cat.replace(/[^\w\s]/g,'').trim()); s2=`Your strongest knowledge areas: ${a.join(', ')}. The questions you got right reflect genuine football awareness, not guesswork.`; }
  else s2=`The questions you answered correctly show a foundation in place — and there's real upside given you're watching one of the most data-rich tournaments ever played.`;

  let s3='';
  if(wrong.length===0) s3=`The next challenge level: deeper tactical theory (pressing systems, xG metrics, formation asymmetry) or lesser-known tournament history like the Copa Libertadores, CAF Champions League, or pre-modern World Cups.`;
  else { const a=wrong.map(q=>q.cat.replace(/[^\w\s]/g,'').trim()); s3=`Areas to close: ${a.join(' and ')}. Both are highly fillable just by following 2026 closely — the tournament is the fastest football education available.`; }
  return `${s1} ${s2} ${s3}`;
}

function buildPersonalityInsight(mp, rp, pa) {
  const q1=pa.q1, q5=pa.q5, q7=pa.q7, q9=pa.q9;
  const q10=parseInt(pa.q10)||3;
  const split=Math.abs(mp-rp);
  const dom = mp>=rp ? 'messi' : 'ronaldo';

  let s1='';
  if(split<9) s1=`A near-even ${mp}%/${rp}% Messi-Ronaldo split — genuinely rare. Most people land clearly on one side, but you've built a profile that carries defining traits from both of the greatest players in football history almost equally.`;
  else if(dom==='messi') s1=`Your personality maps ${mp}% to Messi and ${rp}% to Ronaldo. The clearest pattern across your answers is intrinsic motivation — the process and the journey matter more to you than the external markers of success.`;
  else s1=`Your personality maps ${mp}% to Messi and ${rp}% to Ronaldo. The clearest pattern is achievement orientation — external goals, records, and recognition are real drivers for you, not just nice-to-haves.`;

  let s2='';
  if(q1==='B'&&dom==='messi') s2=`Choosing the journey over the trophy (Q1) is your strongest Messi signal — it's the same intrinsic drive that kept Messi playing until his 6th World Cup at 38, not chasing Ronaldo's goal record, but because he genuinely loves football. His 414 career assists tell that story: more playmaker than poacher, more creator than record-chaser.`;
  else if(q1==='A'&&dom==='ronaldo') s2=`The drive to be number one (Q1) is Ronaldo's entire operating system. He's the only player to score 900+ top-tier career goals — that's not a talent story, it's a relentlessness story. Your ambition signals run on the same frequency.`;
  else if(q5==='C'&&dom==='ronaldo') s2=`Analysing and picking the most efficient path (Q5) is how Ronaldo engineered his career. He wasn't born the most naturally gifted player in the world — he reverse-engineered himself into the most statistically dominant one, scoring 138 international goals across 221 appearances for Portugal.`;
  else if(q9==='C'&&dom==='messi') s2=`Learning through trying, failing, and reflecting (Q9) mirrors Messi's developmental pattern — no rigid drilling programme, just an intuitive process of playing, adjusting, and growing. His 0.83 goals per game across a career is the efficiency of someone who learned by doing.`;
  else if(q10<=2&&dom==='messi') s2=`Valuing natural talent over grind (Q10) is the most distinctively Messi answer in the quiz. He never needed to announce how hard he worked, because 8 Ballon d'Or awards and a World Cup won at 35 made that argument for him.`;
  else if(q10>=4&&dom==='ronaldo') s2=`Your belief in hard work over raw talent (Q10) sits at the core of Ronaldo's entire career philosophy. He's publicly said 'Talent without hard work is nothing,' and his career — from wiry 18-year-old at Man United to the holder of 900+ top-tier career goals — is the proof of concept.`;
  else if(dom==='messi') s2=`The consistent thread in your Messi-coded answers is intrinsic motivation — performing because the act itself is worth doing, not for the applause.`;
  else s2=`The consistent thread in your Ronaldo-coded answers is external drive — records, recognition, and measurable results as proof of excellence.`;

  let s3='';
  if(split<15&&dom==='messi') s3=`The Ronaldo influence in your profile shows up in how you operate even within your process-driven values — you're likely more analytical and calculated in execution than you consciously recognise.`;
  else if(split<15&&dom==='ronaldo') s3=`The Messi influence keeps your ambition grounded — you care about the quality of what you do, not just the scoreboard. That combination is genuinely harder to find than pure drive alone.`;
  else if(dom==='messi') s3=`Where Ronaldo spent decades demanding recognition through records (138 international goals, 5 Champions Leagues, 5 Ballon d'Or), Messi simply kept creating — 414 career assists suggests he found more satisfaction in the setup than the finish. Your answers follow that same quiet logic.`;
  else s3=`Where Messi found flow through instinct and love of the game, Ronaldo built systems — 2-hour training extensions, controlled diet, sleep optimization. You can plan your way to excellence rather than waiting for inspiration to arrive.`;
  return `${s1} ${s2} ${s3}`;
}

function buildArchetypeInsight(arc, pa) {
  const q2=parseInt(pa.q2)||3, q3=Array.isArray(pa.q3)?pa.q3:[pa.q3||'A'];
  const q5=pa.q5, q7=pa.q7, q11=pa.q11;
  const ad=ARC[arc];
  const MAP = {
    "Tactical Visionary": `The Tactical Visionary is football's deep-lying playmaker made into a personality type — not always the most visible presence, but the one controlling the tempo and rarely making a mistake that matters. ${q5==='C'?'Your instinct to analyse before acting (Q5) is the clearest expression of this — you find the efficient path, not the flashy one, and that consistency compounds over time.':'Your calculated approach to risk (Q7) is the core engine — knowing when to commit is more valuable than always being aggressive.'} In football, this is the De Bruyne, Pirlo, and Xavi profile: the player coaches call "undroppable" not for moments, but for relentless, sustainable intelligence across 90 minutes.`,
    "Creative Playmaker": `The Creative Playmaker sees football — and problems — differently from everyone else in the room. ${q5==='A'?'Trusting your gut and improvising in the moment (Q5) is the heartbeat of this archetype — the best playmakers make decisions before defenders can process them.':'Your instinct to find the unexpected angle (Q5) is what separates playmakers from executors — creativity is the ability to see what a straight line misses.'} The real-world examples are Iniesta (2010 World Cup final goal, 116th minute), Pedri (best player in the world at 22), and Musiala (German football's most exciting talent) — all players who make teammates better by simply being on the pitch.`,
    "Relentless Competitor": `The Relentless Competitor is the engine room of every serious team. ${q11==='A'?'Big moments raising your level (Q11) is the definitive signal — the best competitors don\'t just absorb pressure, they convert it into energy.':'The lingering feeling after a loss (Q6) is what separates great competitors from good ones — the inability to fully let go of failure is what drives the next training session.'} Ronaldo is the archetype's greatest case study: 830+ club goals, 138 international goals for Portugal, five Champions League titles — none of it achieved through natural gifts alone, all of it through refusing to stop when others would have.`,
    "Quiet Leader": `The Quiet Leader doesn't need to announce their presence — the results do that. ${q3.includes('A')?'Leading by example rather than words (Q3) is the core trait — in football, the players who simply keep showing up and delivering build more trust than the loudest voices in the room.':'Your process-driven approach builds the kind of sustained credibility that vocal leadership can\'t manufacture.'} Kanté built his entire reputation without ever needing a speech. Schweinsteiger won a World Cup by being the player every teammate wanted beside them. The Quiet Leader's influence is invisible until it's gone — and then it's unmistakable.`,
    "Fearless Attacker": `The Fearless Attacker operates best when the stakes are highest and the sensible choice would be to hold back. ${q7==='A'?'Choosing to take the risk when others won\'t (Q7) is the clearest expression of this archetype — the best attackers make decisions that defenders can\'t prepare for because they\'re decisions most people would talk themselves out of.':'Your high confidence in unfamiliar situations (Q8) is what allows this archetype to function — you can\'t be fearless without a baseline of trust in your own ability.'} Mbappé's goal vs Senegal in 2026's group stage — described as spectacular — is the archetype in action. Ronaldinho, Robben in the 2014 final, Garrincha — all Fearless Attackers who changed games others couldn't.`,
    "Strategic Commander": `The Strategic Commander leads loud and executes precisely — the captain's armband is almost incidental, because the authority comes from performance, not the badge. ${q3.includes('B')?'Your direct, vocal leadership style (Q3) is the core signal — the Strategic Commander doesn\'t wait for morale to drop before speaking; they preempt it.':'Demanding more from others (Q3) while delivering yourself is the Strategic Commander\'s contract with the team — high standards applied universally, including inward.'} Roy Keane captained Manchester United to five Premier League titles and a Champions League through exactly this combination: relentless standards, vocal accountability, and performances that backed every word he ever said.`,
    "Consistent Performer": `The Consistent Performer is the most underrated archetype in football — and in life. ${q2>=4?'Your high discipline (Q2) is the structural advantage that underpins everything else — consistency is simply discipline applied over time, and time is the factor most people underestimate.':'Your steady work ethic is the compound interest strategy of performance — it doesn\'t look dramatic quarter by quarter, but over years it creates something irreplaceable.'} Thomas Müller played over 680 games for Bayern Munich across 16 seasons, winning everything available multiple times. Lahm never had a bad game in his career. Milner became a cult hero through pure reliability. The Consistent Performer's value only becomes fully visible in retrospect — and by then it's enormous.`,
    "Big-Match Specialist": `The Big-Match Specialist carries a switch that ordinary performers don't — something that activates specifically when the stakes are highest. ${q11==='A'?'Raising your level when the stakes are highest (Q11) is the rarest and most sought-after trait in team sports — every team has players who perform in training, but very few who elevate in finals.':'Your high competitiveness that lingers after losses (Q6) combined with big-moment capability creates the profile managers pay premium prices to have in the squad.'} Mbappé scored a hat-trick in a World Cup final to almost single-handedly rescue it from 2–0 down. Gerd Müller scored in every major tournament final he appeared in. Messi won the 2022 World Cup final by scoring twice. The Big-Match Specialist isn't just good — they're better when it matters most.`,
  };
  return MAP[arc] || `As a ${arc}: ${ad.desc} Players who share this archetype — ${ad.real} — built careers on ${ad.traits[0].toLowerCase()} and ${ad.traits[1].toLowerCase()}.`;
}

function buildRecommendations(arc, mp, rp, pa) {
  const messiLean = mp > rp;
  const q5=pa.q5, q7=pa.q7;

  const POOL = {
    "Tactical Visionary": {
      player: messiLean
        ? { name:"Luka Modrić", reason:"The master of timing, reading space, and delivering under pressure — won the Ballon d'Or by controlling games, not dominating them." }
        : { name:"Kevin De Bruyne", reason:"Analytical, efficient, and obsessively precise — he creates chances others don't see as possibilities and rarely takes the wrong option." },
      club: q5==='C'
        ? { name:"Manchester City", reason:"Guardiola's system rewards the analytical, deliberate mind — every movement has a purpose, every press is coordinated." }
        : { name:"FC Barcelona", reason:"Built on intelligence, spacing, and creativity — the club that produced Messi, Iniesta, and Xavi through the same football philosophy." },
      national: messiLean
        ? { name:"Spain", reason:"Their 2010 World Cup win via tiki-taka remains the purest expression of tactical vision made into national identity." }
        : { name:"Germany", reason:"Their 7-1 opener in 2026 and 2014 World Cup are both products of systematic, analytically-driven collective intelligence." },
      rivalry: { name:"El Clásico (Barcelona vs Real Madrid)", reason:"The tactical chess match between Guardiola and Mourinho from 2010–12 is the Tactical Visionary's dream case study in preparation and counter-preparation." },
    },
    "Creative Playmaker": {
      player: messiLean
        ? { name:"Pedri", reason:"Barcelona's 22-year-old creative engine — the closest thing to peak Messi in modern football, creating from nothing in tight spaces." }
        : { name:"Jamal Musiala", reason:"Pure creativity and joy on the ball, with the ability to unlock games through improvisation that defenders simply cannot plan for." },
      club: { name:"FC Barcelona", reason:"The home of every great Creative Playmaker — built on the principle that creativity and intelligence are more sustainable than physicality." },
      national: { name:"Brazil", reason:"The birthplace of jogo bonito — the beautiful game — whose greatest players (Ronaldinho, Pelé, Garrincha, Neymar) were all Creative Playmakers at heart." },
      rivalry: { name:"Copa América (Argentina vs Brazil)", reason:"The greatest international rivalry in South American football — a collision of two creative football philosophies across generations." },
    },
    "Relentless Competitor": {
      player: { name:"Harry Kane", reason:"61 goals in the 2025-26 season at Bayern Munich, World Cup Golden Boot in 2018 — built through obsessive work ethic and refusal to plateau." },
      club: { name:"Real Madrid", reason:"13 Champions League titles — the most of any club — built on a culture of ruthless competition and refusal to accept second place." },
      national: { name:"Portugal", reason:"Ronaldo's 138 international goals across 221 appearances for Portugal is the definitive case study in what relentless competition looks like over two decades." },
      rivalry: { name:"Champions League Knockout Stages", reason:"No stage in club football rewards competitive drive more — every elimination match is a winner-take-all test of who wants it more." },
    },
    "Quiet Leader": {
      player: { name:"N'Golo Kanté", reason:"Won the World Cup, Premier League, and Champions League by being the player every team needed and no opponent could neutralise — quietly indispensable." },
      club: messiLean
        ? { name:"FC Barcelona", reason:"Their greatest era (2008–2015) was built on collective quiet leadership — Messi, Iniesta, Xavi leading by performance, not noise." }
        : { name:"Liverpool (Klopp era)", reason:"Built on collective effort, pressing as a team identity, and Klopp's ability to build leaders without egos from the group up." },
      national: { name:"Croatia", reason:"A small nation that reached the 2018 World Cup final and 2022 semi-final through Modrić's quiet, consistent genius — the Quiet Leader's international blueprint." },
      rivalry: { name:"World Cup Knockout Rounds", reason:"The knockout stages separate leaders from performers — the Quiet Leader's consistency and calm become the most valuable assets when one mistake ends everything." },
    },
    "Fearless Attacker": {
      player: q7==='A'
        ? { name:"Kylian Mbappé", reason:"27 years old, 2022 World Cup Golden Boot, a hat-trick in the final — defined by backing himself in moments that break most players." }
        : { name:"Erling Haaland", reason:"2 goals on his World Cup debut vs Iraq, 27 PL goals for City in 2025-26 — power and confidence that doesn't recognise impossible." },
      club: { name:"Real Madrid", reason:"The club built on Galácticos and individual brilliance — where the fearless are celebrated and the tentative don't survive." },
      national: { name:"France", reason:"Their attack in 2026 — Mbappé, Dembélé, Olise — is the most talented attacking unit in the tournament, built around fearless risk-taking." },
      rivalry: { name:"France vs Argentina (WC Finals)", reason:"The 2022 final was 90 minutes of fearless attacking football from both sides — Mbappé's hat-trick vs Messi's brilliance. No better advertisement for this archetype." },
    },
    "Strategic Commander": {
      player: { name:"Sergio Ramos", reason:"22 years, 671 Real Madrid appearances, 5 Champions Leagues — led through vocal authority, physical aggression, and an ability to perform in every big moment." },
      club: { name:"Real Madrid", reason:"Their culture of demanding winners and leaders at every position makes it the perfect home for the Strategic Commander personality." },
      national: { name:"Argentina", reason:"Their 2022 World Cup win was as much about collective command and defensive organisation as Messi's brilliance — Scaloni built a strategic unit." },
      rivalry: { name:"El Clásico — The Mourinho Era", reason:"Three straight El Clásico seasons (2010–12) defined by tactical warfare, vocal command, and psychological games — the Strategic Commander's arena." },
    },
    "Consistent Performer": {
      player: { name:"Thomas Müller", reason:"Over 680 games for Bayern Munich across 16 seasons, winning everything — never spectacular, always decisive, impossible to drop." },
      club: { name:"Bayern Munich", reason:"The most consistent winning machine in European football — built on reliability, structure, and a culture where consistency is valued above flair." },
      national: messiLean
        ? { name:"Spain", reason:"Their 15-year dominance (Euro 2008, WC 2010, Euro 2012) was built on the most consistent collective of players any international team has fielded." }
        : { name:"Germany", reason:"From Müller to Lahm to Neuer — Germany's greatest squads were built on reliable, consistent contributors who showed up in every tournament game." },
      rivalry: { name:"Bundesliga (Bayern vs Borussia Dortmund)", reason:"Der Klassiker — the cleanest example of what consistent excellence (Bayern) vs brilliant inconsistency (BVB) looks like over a decade." },
    },
    "Big-Match Specialist": {
      player: messiLean
        ? { name:"Lionel Messi", reason:"Two goals in the 2022 World Cup final, hat-trick in the 2026 opener to match Klose's all-time record — saved his best consistently for what mattered most." }
        : { name:"Kylian Mbappé", reason:"Hat-trick in the 2022 WC final at 23, 2 goals in his 2026 opener — the pre-tournament favourite to break Klose's all-time scoring record." },
      club: { name:"Real Madrid", reason:"13 Champions League titles — more than any club — built on an almost supernatural ability to perform when the stakes are absolute." },
      national: { name:"Argentina", reason:"2022 World Cup winners. Their 2026 opener — Messi hat-trick, 3-0 vs Algeria — suggests the defending champions may be even more dangerous this time." },
      rivalry: { name:"Champions League Finals", reason:"The highest-stakes single match in club football — the Big-Match Specialist's ultimate stage, where career reputations are defined or destroyed in 90 minutes." },
    },
  };

  const recs = POOL[arc] || POOL["Tactical Visionary"];
  return {
    player: recs.player,
    club: recs.club,
    nationalTeam: recs.national,
    rivalry: recs.rivalry,
  };
}

function buildKeyInsights(score, cl, mp, rp, arc, pa) {
  const dom=mp>=rp?'messi':'ronaldo';
  const q1=pa.q1, q5=pa.q5, q10=parseInt(pa.q10)||3;
  const split=Math.abs(mp-rp);

  const i1 = score===100
    ? `Perfect 100/100 on a quiz spanning beginner rules to advanced tactical reasoning — that's the Football Expert ceiling, and you hit it while identifying yourself as a casual follower. You know more than you think.`
    : score>=80
    ? `${score}/100 Football IQ places you in the ${cl} bracket — well above the 40–60 range where most self-identified casual fans land. Your tournament awareness and player intelligence are already running at enthusiast level.`
    : `${score}/100 is a solid ${cl} foundation — and the 2026 tournament is the fastest possible upgrade path. Follow it closely and retake this quiz at the knockout stage.`;

  const i2 = split<9
    ? `Your ${mp}%/${rp}% Messi-Ronaldo split is genuinely rare — most people land clearly on one side. Carrying both archetypes almost equally means you likely adapt your approach based on context rather than operating from a fixed personality playbook.`
    : dom==='messi'
    ? `The ${mp}% Messi lean isn't about playing style — it's about what drives you. ${q1==='B'?'Choosing the journey over the trophy (Q1) was the clearest signal: intrinsic motivation is your engine, and that\'s the defining Messi trait across 914 career goals and 414 assists.':q10<=2?"Valuing talent over grind (Q10) is the most Messi answer in this quiz — he built a career not on announcing his work ethic, but on delivering results that spoke louder than any statement about effort.":'Process, creativity, and contribution over individual glory — the thread that runs through your highest-scoring Messi answers.'}`
    : `The ${rp}% Ronaldo lean is about how you measure excellence. ${q5==='C'?'Analysing and picking the most efficient path (Q5) is Ronaldo\'s whole approach — he reverse-engineered himself from a talented teenager to the holder of 138 international goals through calculated optimisation of every element of his game.':q10>=4?'Believing in hard work over natural talent (Q10) is Ronaldo\'s core philosophy — 900+ top-tier career goals are proof that effort, applied systematically, beats gifted inconsistency every time.':'External drive, records, and results as proof of excellence — the thread that runs through your highest-scoring Ronaldo answers.'}`;

  const arcReal = ARC[arc]?.real ? ("In football, this is the " + ARC[arc].real + " profile — ") : "";
  const i3 = `Your ${arc} archetype means you bring ${(ARC[arc]?.traits[0]||'analytical thinking').toLowerCase()} and ${(ARC[arc]?.traits[1]||'calculated execution').toLowerCase()} to every challenge. ${arcReal}the qualities that make the difference in competitive environments aren't always the most visible, but they're the ones that compound into lasting impact.`;

  return [i1, i2, i3];
}

function generateProfile(results) {
  const { iqScore, classification, iqAnswers, personalityAnswers: pa, messiPct: mp, ronaldoPct: rp, archetype } = results;
  return {
    headline:            buildHeadline(archetype, mp, pa),
    iqInsight:           buildIQInsight(iqScore, classification, iqAnswers),
    personalityInsight:  buildPersonalityInsight(mp, rp, pa),
    archetypeInsight:    buildArchetypeInsight(archetype, pa),
    recommendations:     buildRecommendations(archetype, mp, rp, pa),
    keyInsights:         buildKeyInsights(iqScore, classification, mp, rp, archetype, pa),
  };
}

// ── SHARED UI ─────────────────────────────────────────────────
function StepBar({ stage }) {
  const steps=[['knowledge','Knowledge'],['predictions','Predictions'],['iq','IQ Quiz'],['personality','Personality'],['profile','Profile']];
  const cur=steps.findIndex(s=>s[0]===stage); if(cur<0) return null;
  return (
    <div style={{background:'rgba(7,18,10,0.95)',borderBottom:`1px solid ${C.border}`,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',flexWrap:'wrap',position:'sticky',top:0,zIndex:10}}>
      {steps.map(([key,label],i)=>(
        <div key={key} style={{display:'flex',alignItems:'center',gap:'6px'}}>
          <div style={{width:'26px',height:'26px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:800,background:i<cur?C.green:i===cur?C.gold:'rgba(255,255,255,0.08)',color:i<=cur?'#000':'rgba(255,255,255,0.3)',flexShrink:0}}>{i<cur?'✓':i+1}</div>
          <span style={{fontSize:'11px',fontWeight:i===cur?700:400,color:i===cur?C.gold:i<cur?C.green:'rgba(255,255,255,0.3)',whiteSpace:'nowrap'}}>{label}</span>
          {i<steps.length-1&&<span style={{color:'rgba(255,255,255,0.15)',fontSize:'14px',margin:'0 2px'}}>›</span>}
        </div>
      ))}
    </div>
  );
}
function PW({ children }) { return <div style={{maxWidth:'700px',margin:'0 auto',padding:'36px 20px 60px'}}>{children}</div>; }
function SecTitle({ icon, eyebrow, title, sub }) {
  return (
    <div style={{textAlign:'center',marginBottom:'32px'}}>
      {icon&&<div style={{fontSize:'44px',marginBottom:'10px'}}>{icon}</div>}
      <div style={{color:C.gold,fontSize:'11px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',marginBottom:'8px'}}>{eyebrow}</div>
      <h2 style={{fontSize:'clamp(20px,4vw,30px)',fontWeight:800,color:C.text,margin:'0 0 10px',lineHeight:1.2}}>{title}</h2>
      {sub&&<p style={{color:C.muted,fontSize:'14px',maxWidth:'440px',margin:'0 auto',lineHeight:1.7}}>{sub}</p>}
    </div>
  );
}
function Btn({ children, onClick, disabled, gold, small }) {
  const size=small?{padding:'10px 28px',fontSize:'14px'}:{padding:'14px 44px',fontSize:'16px'};
  const col=disabled?{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.25)'}:gold?{background:`linear-gradient(135deg,${C.gold},${C.goldDim})`,color:'#000',boxShadow:`0 4px 20px rgba(245,158,11,0.3)`}:{background:`linear-gradient(135deg,${C.green},${C.greenDim})`,color:'#fff',boxShadow:`0 4px 20px rgba(34,197,94,0.25)`};
  return <button onClick={onClick} disabled={!!disabled} style={{border:'none',borderRadius:'50px',fontWeight:700,cursor:disabled?'not-allowed':'pointer',transition:'all 0.18s',letterSpacing:'0.3px',...size,...col}}>{children}</button>;
}
function PBar({ pct, color }) {
  return <div style={{background:'rgba(255,255,255,0.06)',borderRadius:'4px',height:'5px',overflow:'hidden'}}><div style={{height:'100%',width:`${pct}%`,background:color||C.green,borderRadius:'4px',transition:'width 0.4s ease'}}/></div>;
}

// ── STAGE COMPONENTS ──────────────────────────────────────────
function Landing({ onStart }) {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'32px 20px',textAlign:'center',background:`radial-gradient(ellipse 80% 60% at 50% 45%, rgba(22,163,74,0.13) 0%, transparent 70%)`}}>
      <div style={{fontSize:'80px',marginBottom:'16px',filter:`drop-shadow(0 0 28px rgba(34,197,94,0.55))`}}>⚽</div>
      <h1 style={{fontSize:'clamp(28px,6vw,52px)',fontWeight:900,background:`linear-gradient(135deg,${C.green} 30%,${C.gold})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 8px',lineHeight:1.15}}>Football Intelligence Hub</h1>
      <p style={{color:C.muted,fontSize:'16px',fontWeight:600,margin:'0 0 6px'}}>⚡ Live FIFA World Cup 2026 Data</p>
      <p style={{color:C.dim,fontSize:'13px',margin:'0 0 44px'}}>World Cup Predictions · Football IQ Test · Messi vs Ronaldo Personality Match</p>
      <div style={{...card,maxWidth:'520px',width:'100%',marginBottom:'40px',textAlign:'left'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
          {[{e:'🏆',t:'Live 2026 Predictions',d:'Confidence scores + Golden Boot race'},{e:'🧠',t:'Football IQ Quiz',d:'5 questions across 5 knowledge categories'},{e:'🔮',t:'Personality Profiling',d:'12-question Messi vs Ronaldo deep analysis'},{e:'📊',t:'Personalised Profile',d:'Unique report built from your specific answers'}].map(x=>(
            <div key={x.t} style={{background:'rgba(255,255,255,0.04)',borderRadius:'12px',padding:'14px 16px'}}>
              <div style={{fontSize:'26px',marginBottom:'6px'}}>{x.e}</div>
              <div style={{fontWeight:700,color:C.text,fontSize:'13px',marginBottom:'4px'}}>{x.t}</div>
              <div style={{color:C.dim,fontSize:'12px',lineHeight:1.5}}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
      <Btn onClick={onStart} gold>Begin Your Journey ⚽</Btn>
      <p style={{marginTop:'16px',color:C.dim,fontSize:'12px'}}>5–8 minutes · Rule-based personalised profile · No sign-up needed</p>
    </div>
  );
}

function KnowledgeCheck({ onSelect }) {
  return (
    <PW>
      <SecTitle icon="🎯" eyebrow="Stage 0 — Calibration" title="How familiar are you with football?" sub="This adjusts depth, terminology, and examples throughout. No wrong answers." />
      <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        {KL.map(l=>(
          <button key={l.id} onClick={()=>onSelect(l.id)} style={{...card,cursor:'pointer',textAlign:'left',border:`1px solid ${C.border}`,background:'rgba(13,31,16,0.5)',transition:'all 0.2s',width:'100%'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.borderHi;e.currentTarget.style.background='rgba(22,163,74,0.1)'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background='rgba(13,31,16,0.5)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
              <span style={{fontSize:'38px'}}>{l.e}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:'15px',color:C.text}}>{l.label}</div>
                <div style={{fontSize:'13px',color:C.muted,marginTop:'3px'}}>{l.desc}</div>
              </div>
              <span style={{color:C.green,fontSize:'18px',opacity:0.6}}>→</span>
            </div>
          </button>
        ))}
      </div>
    </PW>
  );
}

function PredictionsStage({ onNext }) {
  const [tab, setTab] = useState('predictions');
  return (
    <PW>
      <SecTitle icon="🏆" eyebrow="Stage 1 — Predictions" title="World Cup 2026 Prediction Report" sub="Historical win rates, current form scores, FIFA rankings, live group stage results, and Golden Boot race — all in one view." />
      <div style={{display:'flex',gap:'8px',marginBottom:'24px',borderBottom:`1px solid ${C.border}`,paddingBottom:'0'}}>
        {[['predictions','Predictions'],['live','Live Results'],['golden','Golden Boot']].map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{padding:'10px 18px',border:'none',background:'transparent',color:tab===key?C.gold:C.muted,fontWeight:tab===key?700:400,fontSize:'13px',cursor:'pointer',borderBottom:`2px solid ${tab===key?C.gold:'transparent'}`,transition:'all 0.15s'}}>{label}</button>
        ))}
      </div>

      {tab==='predictions'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'16px',marginBottom:'28px'}}>
          {PREDS.map(p=>(
            <div key={p.team} style={{...card,borderLeft:`4px solid ${p.accent}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'12px',marginBottom:'14px'}}>
                <div>
                  <div style={{fontSize:'11px',color:p.accent,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:'5px'}}>{p.rank} {p.label}</div>
                  <div style={{fontSize:'22px',fontWeight:800,color:C.text}}>{p.flag} {p.team}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:'38px',fontWeight:900,lineHeight:1,color:p.conf>=65?C.green:p.conf>=45?C.gold:'#86efac'}}>{p.conf}%</div>
                  <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',letterSpacing:'1px',textTransform:'uppercase'}}>Confidence</div>
                </div>
              </div>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'14px'}}>
                {[{l:'FIFA Rank',v:`#${p.fifaRank}`},{l:'Form Score',v:`${p.formScore}/100`},{l:'2026 Opener',v:p.result}].map(s=>(
                  <div key={s.l} style={{background:'rgba(255,255,255,0.05)',borderRadius:'8px',padding:'6px 12px'}}>
                    <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',marginBottom:'2px'}}>{s.l}</div>
                    <div style={{fontSize:'12px',color:C.text,fontWeight:600}}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:'13px',color:'#bbf7d0',lineHeight:1.7,marginBottom:'8px'}}><strong style={{color:C.green}}>Why: </strong>{p.why}</div>
              <div style={{fontSize:'13px',color:'rgba(252,165,165,0.85)',lineHeight:1.7}}><strong style={{color:'#fca5a5'}}>Key risk: </strong>{p.risk}</div>
            </div>
          ))}
        </div>
      )}

      {tab==='live'&&(
        <div style={{marginBottom:'28px'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {LIVE.map(r=>(
              <div key={r.m} style={{...card,padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
                <div>
                  <div style={{fontSize:'15px',fontWeight:700,color:C.text}}>{r.m}</div>
                  <div style={{fontSize:'12px',color:C.dim,marginTop:'3px'}}>Group {r.g} · {r.d}{r.note?` · ${r.note}`:''}</div>
                </div>
                <span style={{fontSize:'22px'}}>{r.e}</span>
              </div>
            ))}
          </div>
          <p style={{color:C.dim,fontSize:'11px',marginTop:'12px',textAlign:'center'}}>Data as of June 19, 2026 · Source: FIFA / CBS Sports / Sofascore</p>
        </div>
      )}

      {tab==='golden'&&(
        <div style={{marginBottom:'28px'}}>
          <p style={{color:C.muted,fontSize:'13px',marginBottom:'16px'}}>🥇 Golden Boot race as of Matchday 8 — June 18, 2026</p>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {GOLDEN_BOOT.map((g,i)=>(
              <div key={g.player} style={{...card,padding:'14px 18px',borderLeft:`3px solid ${i<2?C.gold:i<5?C.green:C.border}`}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'12px'}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'15px',fontWeight:700,color:C.text}}>{g.player}</div>
                    <div style={{fontSize:'12px',color:C.muted,marginTop:'2px'}}>{g.country}</div>
                    <div style={{fontSize:'12px',color:C.dim,marginTop:'6px',lineHeight:1.5}}>{g.note}</div>
                  </div>
                  <div style={{textAlign:'center',minWidth:'48px'}}>
                    <div style={{fontSize:'32px',fontWeight:900,color:i<2?C.gold:C.green,lineHeight:1}}>{g.goals}</div>
                    <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)'}}>goals</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{textAlign:'center'}}>
        <Btn onClick={onNext} gold>Start Football IQ Quiz 🧠</Btn>
      </div>
    </PW>
  );
}

function IQStage({ currentIdx, answers, onAnswer, onNext }) {
  const q=IQQ[currentIdx]; const sel=answers[q.id]; const isLast=currentIdx===IQQ.length-1;
  return (
    <PW>
      <SecTitle eyebrow={`Stage 2 — Football IQ · Q${currentIdx+1} of ${IQQ.length}`} title={q.cat} sub={null} />
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
        <span style={{fontSize:'12px',color:C.muted}}>{q.diff}</span>
        <span style={{fontSize:'12px',color:C.gold,fontWeight:600}}>{q.pts} pts</span>
      </div>
      <PBar pct={((currentIdx+1)/IQQ.length)*100} />
      <div style={{...card,margin:'20px 0'}}>
        <p style={{fontSize:'17px',fontWeight:600,color:C.text,lineHeight:1.65,margin:0}}>{q.q}</p>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'28px'}}>
        {q.opts.map(opt=>{
          const chosen=sel===opt.id;
          return (
            <button key={opt.id} onClick={()=>onAnswer(q.id,opt.id)} style={{background:chosen?'rgba(34,197,94,0.15)':'rgba(13,31,16,0.5)',border:`1px solid ${chosen?C.green:C.border}`,borderRadius:'12px',padding:'14px 18px',textAlign:'left',cursor:'pointer',color:chosen?C.text:C.muted,fontSize:'14px',display:'flex',gap:'12px',alignItems:'center',transition:'all 0.15s',width:'100%'}}>
              <span style={{width:'28px',height:'28px',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'12px',background:chosen?C.green:'rgba(255,255,255,0.08)',color:chosen?'#000':C.muted}}>{opt.id}</span>
              {opt.t}
            </button>
          );
        })}
      </div>
      <div style={{textAlign:'center'}}>
        <Btn onClick={onNext} disabled={!sel}>{isLast?'Submit Quiz →':'Next Question →'}</Btn>
      </div>
    </PW>
  );
}

function PersonalityStage({ currentIdx, answers, onAnswer, onNext }) {
  const q=PQ[currentIdx]; const sel=answers[q.id]; const isMulti=!!q.multi; const isLast=currentIdx===PQ.length-1;
  const isAnswered=isMulti?(Array.isArray(sel)&&sel.length>0):(sel!==undefined&&sel!=='');
  const handleChoice=(optId)=>{
    if(isMulti){ const cur=Array.isArray(sel)?sel:[]; if(cur.includes(optId)){onAnswer(q.id,cur.filter(x=>x!==optId));}else if(cur.length<(q.maxSel||2)){onAnswer(q.id,[...cur,optId]);} }
    else { onAnswer(q.id,optId); }
  };
  return (
    <PW>
      <SecTitle eyebrow={`Stage 3 — Personality · Q${currentIdx+1} of ${PQ.length}`} title={q.trait} sub={null} />
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontSize:'12px',color:C.gold,fontWeight:600,letterSpacing:'1px',textTransform:'uppercase'}}>{q.trait}</span>
        {isMulti&&<span style={{fontSize:'12px',color:C.dim}}>Select up to {q.maxSel}</span>}
      </div>
      <PBar pct={((currentIdx+1)/PQ.length)*100} color={C.gold} />
      <div style={{...card,margin:'20px 0'}}>
        <p style={{fontSize:'16px',fontWeight:600,color:C.text,lineHeight:1.65,margin:0,fontStyle:q.type==='rating'?'italic':'normal'}}>{q.q}</p>
        {isMulti&&<p style={{fontSize:'12px',color:C.dim,margin:'8px 0 0'}}>Select up to {q.maxSel}</p>}
      </div>
      {q.type==='rating'?(
        <div style={{marginBottom:'28px'}}>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',marginBottom:'12px'}}>
            {[1,2,3,4,5].map(n=>{const chosen=sel===String(n);return(
              <button key={n} onClick={()=>onAnswer(q.id,String(n))} style={{width:'54px',height:'54px',borderRadius:'50%',border:`2px solid ${chosen?C.gold:C.border}`,background:chosen?'rgba(245,158,11,0.18)':'rgba(13,31,16,0.5)',color:chosen?C.gold:C.muted,fontSize:'20px',fontWeight:700,cursor:'pointer',transition:'all 0.15s'}}>{n}</button>
            );})}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.3)',padding:'0 4px'}}>
            <span>Strongly disagree</span><span>Strongly agree</span>
          </div>
        </div>
      ):(
        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'28px'}}>
          {q.opts.map(opt=>{const chosen=isMulti?(Array.isArray(sel)&&sel.includes(opt.id)):sel===opt.id;return(
            <button key={opt.id} onClick={()=>handleChoice(opt.id)} style={{background:chosen?'rgba(245,158,11,0.12)':'rgba(13,31,16,0.5)',border:`1px solid ${chosen?C.gold:C.border}`,borderRadius:'12px',padding:'13px 18px',textAlign:'left',cursor:'pointer',color:chosen?'#fef3c7':C.muted,fontSize:'14px',display:'flex',gap:'12px',alignItems:'center',transition:'all 0.15s',width:'100%'}}>
              <span style={{width:'28px',height:'28px',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'12px',background:chosen?C.gold:'rgba(255,255,255,0.08)',color:chosen?'#000':C.muted}}>{opt.id}</span>
              {opt.t}
            </button>
          );})}
        </div>
      )}
      <div style={{textAlign:'center'}}>
        <Btn onClick={onNext} disabled={!isAnswered} gold={isMulti}>{isLast?'Generate My Profile 🚀':'Next →'}</Btn>
      </div>
    </PW>
  );
}

function GeneratingScreen({ msg }) {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'32px',textAlign:'center',background:`radial-gradient(ellipse 60% 50% at 50% 50%, rgba(22,163,74,0.1) 0%, transparent 70%)`}}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes blink{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
      <div style={{fontSize:'72px',marginBottom:'24px',display:'inline-block',animation:'spin 2.5s linear infinite'}}>⚽</div>
      <h2 style={{fontSize:'28px',fontWeight:800,color:C.text,marginBottom:'12px'}}>Building Your Profile</h2>
      <p style={{color:C.muted,fontSize:'16px',marginBottom:'36px',minHeight:'26px'}}>{msg}</p>
      <div style={{display:'flex',gap:'8px'}}>{[0,1,2].map(i=><div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:C.green,animation:`blink 1.2s ease ${i*0.35}s infinite`}}/>)}</div>
    </div>
  );
}

function ProfileStage({ results, profile, onReset }) {
  const { iqScore, classification, messiPct, ronaldoPct, archetype } = results;
  const ad = ARC[archetype] || { icon:'⚽', color:C.green, traits:['Intelligence','Creativity'], real:'' };
  const classColor = classification==='Football Expert'?C.green:classification==='Football Enthusiast'?C.gold:C.muted;
  return (
    <div style={{maxWidth:'700px',margin:'0 auto',padding:'36px 20px 80px'}}>
      <div style={{textAlign:'center',marginBottom:'40px',background:`radial-gradient(ellipse 70% 50% at 50% 30%, ${ad.color}18 0%, transparent 70%)`,padding:'40px 20px 20px',borderRadius:'20px'}}>
        <div style={{fontSize:'60px',marginBottom:'14px',filter:`drop-shadow(0 0 20px ${ad.color}60)`}}>{ad.icon}</div>
        <h1 style={{fontSize:'clamp(22px,4vw,36px)',fontWeight:900,background:`linear-gradient(135deg,${ad.color},${C.gold})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 14px',lineHeight:1.2}}>{profile.headline}</h1>
        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:`${ad.color}18`,border:`1px solid ${ad.color}50`,borderRadius:'50px',padding:'8px 22px',color:ad.color,fontWeight:700,fontSize:'14px'}}>{ad.icon} {archetype}</div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'20px'}}>
        <div style={{...card,textAlign:'center'}}>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'10px'}}>Football IQ Score</div>
          <div style={{fontSize:'54px',fontWeight:900,color:iqScore>=80?C.green:C.gold,lineHeight:1}}>{iqScore}</div>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.25)',margin:'2px 0 10px'}}>/100</div>
          <div style={{display:'inline-block',background:`${classColor}15`,border:`1px solid ${classColor}40`,borderRadius:'50px',padding:'5px 16px',color:classColor,fontWeight:600,fontSize:'12px'}}>{classification}</div>
        </div>
        <div style={{...card}}>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'14px'}}>Personality Match</div>
          {[{label:'🔵 Messi',pct:messiPct,color:C.messi},{label:'🔴 Ronaldo',pct:ronaldoPct,color:C.ronaldo}].map(p=>(
            <div key={p.label} style={{marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                <span style={{fontSize:'13px',color:C.text}}>{p.label}</span>
                <span style={{fontSize:'15px',fontWeight:700,color:p.color}}>{p.pct}%</span>
              </div>
              <PBar pct={p.pct} color={p.color} />
            </div>
          ))}
        </div>
      </div>

      {[{icon:'🧠',label:'Football IQ Analysis',text:profile.iqInsight,accent:C.green},{icon:'🔮',label:'Messi vs Ronaldo Split',text:profile.personalityInsight,accent:C.messi},{icon:ad.icon,label:`Your Archetype: ${archetype}`,text:profile.archetypeInsight,accent:ad.color}].map(ins=>(
        <div key={ins.label} style={{...card,marginBottom:'14px',borderLeft:`4px solid ${ins.accent}`}}>
          <div style={{fontWeight:700,color:ins.accent,marginBottom:'8px',fontSize:'13px',letterSpacing:'0.3px'}}>{ins.icon} {ins.label.toUpperCase()}</div>
          <p style={{color:'#dcfce7',fontSize:'14px',lineHeight:1.8,margin:0}}>{ins.text}</p>
        </div>
      ))}

      <div style={{...card,marginBottom:'14px',border:`1px solid ${ad.color}35`}}>
        <div style={{fontWeight:700,color:ad.color,marginBottom:'12px',fontSize:'13px',letterSpacing:'0.3px'}}>✨ ARCHETYPE TRAITS</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginBottom:'10px'}}>
          {ad.traits.map(t=><span key={t} style={{background:`${ad.color}14`,border:`1px solid ${ad.color}35`,borderRadius:'50px',padding:'6px 16px',color:ad.color,fontSize:'13px',fontWeight:500}}>{t}</span>)}
        </div>
        {ad.real&&<div style={{fontSize:'12px',color:C.dim,marginTop:'8px'}}>Real-world examples: <span style={{color:C.muted}}>{ad.real}</span></div>}
      </div>

      <div style={{...card,marginBottom:'14px'}}>
        <div style={{fontWeight:700,color:C.gold,marginBottom:'16px',fontSize:'13px',letterSpacing:'0.3px'}}>🔭 PERSONALISED RECOMMENDATIONS</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'12px'}}>
          {[{icon:'⭐',label:'Player to Follow',data:profile.recommendations?.player},{icon:'🏟️',label:'Club to Follow',data:profile.recommendations?.club},{icon:'🌍',label:'National Team',data:profile.recommendations?.nationalTeam},{icon:'⚔️',label:'Rivalry to Explore',data:profile.recommendations?.rivalry}].map(rec=>(
            <div key={rec.label} style={{background:'rgba(255,255,255,0.04)',borderRadius:'12px',padding:'14px 16px'}}>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,0.35)',marginBottom:'5px',letterSpacing:'1px'}}>{rec.icon} {rec.label.toUpperCase()}</div>
              <div style={{fontWeight:700,color:C.green,fontSize:'15px',marginBottom:'6px'}}>{rec.data?.name}</div>
              <div style={{fontSize:'12px',color:C.muted,lineHeight:1.6}}>{rec.data?.reason}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{...card,marginBottom:'36px'}}>
        <div style={{fontWeight:700,color:C.gold,marginBottom:'16px',fontSize:'13px',letterSpacing:'0.3px'}}>💡 KEY INSIGHTS</div>
        {profile.keyInsights?.map((ins,i)=>(
          <div key={i} style={{display:'flex',gap:'14px',marginBottom:i<2?'18px':0,alignItems:'flex-start'}}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'rgba(245,158,11,0.12)',border:`1px solid ${C.gold}50`,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:C.gold,fontWeight:700,fontSize:'12px'}}>{i+1}</div>
            <p style={{color:'#dcfce7',fontSize:'14px',lineHeight:1.75,margin:0}}>{ins}</p>
          </div>
        ))}
      </div>

      <div style={{textAlign:'center',borderTop:`1px solid ${C.border}`,paddingTop:'32px'}}>
        <Btn onClick={onReset} small>Start Over ↺</Btn>
        <p style={{marginTop:'20px',color:'rgba(134,239,172,0.3)',fontSize:'11px'}}>⚽ Football Intelligence Hub · FIFA World Cup 2026 · Data: FIFA, CBS Sports, Squawka, Sofascore</p>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function FootballHub() {
  const [stage, setStage]   = useState('landing');
  const [klId,  setKlId]    = useState(null);
  const [iqAns, setIqAns]   = useState({});
  const [pAns,  setPAns]    = useState({});
  const [iqIdx, setIqIdx]   = useState(0);
  const [pIdx,  setPIdx]    = useState(0);
  const [results, setResults] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadMsg, setLoadMsg] = useState('Cross-referencing 2026 live data...');

  const reset = () => { setStage('landing');setKlId(null);setIqAns({});setPAns({});setIqIdx(0);setPIdx(0);setResults(null);setProfile(null);setLoadMsg('Cross-referencing 2026 live data...'); };
  const onIQAnswer = (qId, ans) => setIqAns(p=>({...p,[qId]:ans}));
  const onNextIQ   = () => { if(iqIdx<IQQ.length-1){setIqIdx(p=>p+1);}else{setStage('personality');} };
  const onPAnswer  = (qId, ans) => setPAns(p=>({...p,[qId]:ans}));

  const onNextP = () => {
    if(pIdx<PQ.length-1){ setPIdx(p=>p+1); return; }
    const iqScore=calcIQ(iqAns);
    const classification=getClass(iqScore);
    const {messi:messiPct,ronaldo:ronaldoPct}=calcPersonality(pAns);
    const archetype=calcArchetype(pAns,messiPct);
    const computed={iqScore,classification,iqAnswers:iqAns,personalityAnswers:pAns,messiPct,ronaldoPct,archetype};
    setResults(computed);
    setStage('generating');

    // Rule-based: generate synchronously after brief UX delay
    const msgs=['Cross-referencing 2026 live data...','Mapping your personality traits...','Composing your intelligence profile...'];
    msgs.forEach((m,i)=>setTimeout(()=>setLoadMsg(m),i*900));
    setTimeout(()=>{ setProfile(generateProfile(computed)); setStage('profile'); }, 2800);
  };

  const BG = { background:'linear-gradient(160deg,#060d08 0%,#091a0f 50%,#060c14 100%)', minHeight:'100vh', fontFamily:'system-ui,-apple-system,BlinkMacSystemFont,sans-serif', color:C.text };
  return (
    <div style={BG}>
      {!['landing','generating'].includes(stage)&&<StepBar stage={stage}/>}
      {stage==='landing'     && <Landing onStart={()=>setStage('knowledge')} />}
      {stage==='knowledge'   && <KnowledgeCheck onSelect={id=>{setKlId(id);setStage('predictions');}} />}
      {stage==='predictions' && <PredictionsStage onNext={()=>setStage('iq')} />}
      {stage==='iq'          && <IQStage currentIdx={iqIdx} answers={iqAns} onAnswer={onIQAnswer} onNext={onNextIQ} />}
      {stage==='personality' && <PersonalityStage currentIdx={pIdx} answers={pAns} onAnswer={onPAnswer} onNext={onNextP} />}
      {stage==='generating'  && <GeneratingScreen msg={loadMsg} />}
      {stage==='profile' && results && profile && <ProfileStage results={results} profile={profile} onReset={reset} />}
    </div>
  );
}
