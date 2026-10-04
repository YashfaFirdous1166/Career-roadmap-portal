/* AI Career Roadmap Portal – all site logic */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const B=document.body,R=B.dataset.root!==undefined?B.dataset.root:(/\/pages\//.test(location.pathname.replace(/\\/g,"/"))?"../":""),P=B.dataset.page,app=$("#app");
/* Path helpers: roadmap.html lives in pages/. From index.html -> pages/roadmap.html ; from pages/*.html -> roadmap.html */
const IN=R==="../",RM=(IN?"":"pages/")+"roadmap.html?career=",U=h=>IN&&h.startsWith("pages/")?h.slice(6):R+h;
const get=()=>{try{return JSON.parse(localStorage.getItem("acrp"))||{}}catch(e){return{}}};
const put=o=>localStorage.setItem("acrp",JSON.stringify(o));
// [id,name,icon,description,skills,duration,demand,projects,[corePhase,skills],[advPhase,skills]]
const C=[
["ai-engineer","AI Engineer","🤖","Build and ship intelligent, AI-powered applications.",["Python","Machine Learning","Deep Learning","APIs","TensorFlow/PyTorch","Git/GitHub"],"8–12 months","Very High",["AI Chatbot","Recommendation System","Computer Vision Project"],["Machine Learning","Regression, Classification, Clustering, Model Evaluation"],["Deep Learning","Neural Networks, CNN, RNN, Transformers"]],
["data-scientist","Data Scientist","🔬","Turn raw data into insights and predictive models.",["Python","SQL","Statistics","Machine Learning","Pandas","Visualization"],"8–10 months","Very High",["Customer Churn Prediction","House Price Model","A/B Test Analysis"],["Data Analysis","Pandas, NumPy, SQL, EDA"],["Statistics & ML","Hypothesis Testing, Regression, Feature Engineering, Model Evaluation"]],
["data-analyst","Data Analyst","📊","Analyse data and communicate findings through dashboards.",["Excel","SQL","Python","Power BI/Tableau","Statistics","Storytelling"],"4–6 months","High",["Sales Dashboard","Survey Analysis","Covid Trend Report"],["Data Wrangling","Excel, SQL, Pandas, Data Cleaning"],["Visualization","Power BI, Tableau, Matplotlib, Dashboard Design"]],
["machine-learning-engineer","Machine Learning Engineer","⚙️","Train, deploy and maintain ML systems in production.",["Python","Scikit-learn","MLOps","Docker","APIs","Cloud"],"9–12 months","Very High",["Fraud Detector","Model Deployed with FastAPI","ML Pipeline"],["Machine Learning","Supervised Learning, Feature Engineering, Pipelines, Tuning"],["MLOps","Docker, FastAPI, CI/CD, Model Monitoring"]],
["deep-learning-engineer","Deep Learning Engineer","🧠","Design neural networks for complex perception tasks.",["Python","PyTorch","Neural Networks","CNN/RNN","GPU Computing","Math"],"10–14 months","High",["Image Classifier","Speech Recognizer","GAN Image Generator"],["Neural Networks","Backpropagation, Optimizers, Regularization, PyTorch"],["Advanced Architectures","CNN, RNN/LSTM, Transformers, GANs"]],
["ai-ml-researcher","AI/ML Researcher","🧪","Invent new algorithms and publish scientific research.",["Advanced Math","Python","Deep Learning","Paper Reading","Experimentation","Writing"],"18–24 months","Medium",["Paper Reproduction","Novel Model Experiment","Benchmark Study"],["Research Foundations","Optimization, Information Theory, Paper Reading"],["Advanced Research","Experiment Design, Reproducibility, Academic Writing"]],
["nlp-engineer","NLP Engineer","💬","Teach machines to understand and generate human language.",["Python","NLP","Transformers","Hugging Face","Text Processing","Deep Learning"],"9–12 months","Very High",["Sentiment Analyzer","Q&A Chatbot","Text Summarizer"],["NLP Basics","Tokenization, Embeddings, Text Classification, spaCy"],["Modern NLP","Transformers, BERT, Hugging Face, LLM Fine-tuning"]],
["computer-vision-engineer","Computer Vision Engineer","👁️","Build systems that see and understand images and video.",["Python","OpenCV","CNN","PyTorch","Image Processing","Deep Learning"],"9–12 months","High",["Face Detector","Object Detection App","OCR Tool"],["Image Processing","OpenCV, Filters, Feature Detection, Augmentation"],["Vision Models","CNN, YOLO, Segmentation, Transfer Learning"]]];
const find=id=>C.find(c=>c[0]===id);
const U6=["1–2 months","1–2 months","2 months","2–3 months","2 months","1 month"];
const mk=(title,description,duration,list)=>({title,description,duration,difficulty:"Beginner-friendly",phases:list.map((p,i)=>({title:p[0],description:"Learn and practise: "+p[1]+".",skills:p[1].split(", "),projects:[p[2]],duration:U6[i]}))});
const careerRoadmaps={
"ai-engineer":mk("AI Engineer","Build and ship intelligent, AI-powered applications.","8–12 months",[["Python & Programming","Python, Git/GitHub, Problem Solving","Command-line Task Automation"],["Mathematics","Linear Algebra, Probability, Statistics","Math Concepts Notebook"],["Machine Learning","Regression, Classification, Clustering, Model Evaluation","Student Performance Predictor"],["Deep Learning","Neural Networks, CNN, RNN, Transformers","Image Classifier"],["AI Projects","LLM APIs, Prompting, Recommendation Systems","AI Chatbot"],["Deployment & Career Preparation","FastAPI, Docker, Resume, GitHub Portfolio, Interview Preparation","Deployed AI Web App"]]),
"data-scientist":mk("Data Scientist","Turn raw data into insights and predictive models.","8–10 months",[["Python Fundamentals","Python, NumPy, Pandas, Jupyter","Data Cleaning Notebook"],["Statistics & Mathematics","Descriptive Statistics, Probability, Hypothesis Testing, Linear Algebra","A/B Test Analysis"],["SQL & Data Handling","SQL Joins, Aggregations, Data Cleaning, EDA","Sales Database Analysis"],["Machine Learning","Regression, Classification, Feature Engineering, Model Evaluation","Customer Churn Prediction"],["Data Visualization","Matplotlib, Seaborn, Plotly, Storytelling","Insights Dashboard"],["Projects & Career Preparation","Capstone, Kaggle, Resume, GitHub Portfolio, Interviews","End-to-End Data Science Capstone"]]),
"data-analyst":mk("Data Analyst","Analyse data and communicate findings through dashboards.","4–6 months",[["Excel & Data Basics","Excel, Formulas, Pivot Tables, Data Cleaning","Budget Tracker"],["SQL","SELECT, Joins, Aggregations, Window Functions","Sales Query Report"],["Python for Analysis","Python, Pandas, NumPy, EDA","Covid Trend Analysis"],["Statistics","Descriptive Statistics, Probability, Hypothesis Testing, Correlation","Survey Analysis"],["Dashboards & Visualization","Power BI, Tableau, Matplotlib, Storytelling","Sales Dashboard"],["Portfolio & Career Preparation","Case Studies, Resume, LinkedIn, Interview Preparation","Analyst Portfolio Website"]]),
"machine-learning-engineer":mk("Machine Learning Engineer","Train, deploy and maintain ML systems in production.","9–12 months",[["Python & Software Engineering","Python, OOP, Git/GitHub, Testing","CLI Data Tool"],["Mathematics","Linear Algebra, Calculus, Probability, Optimization","Gradient Descent from Scratch"],["Core Machine Learning","Scikit-learn, Feature Engineering, Pipelines, Hyperparameter Tuning","Fraud Detector"],["Deep Learning","Neural Networks, PyTorch, CNN, Transfer Learning","Image Classifier"],["MLOps","Docker, MLflow, CI/CD, Model Monitoring","Automated ML Pipeline"],["Deployment & Career Preparation","FastAPI, Cloud Basics, Resume, Interview Preparation","Model Deployed with FastAPI"]]),
"deep-learning-engineer":mk("Deep Learning Engineer","Design neural networks for complex perception tasks.","10–14 months",[["Python & Tools","Python, NumPy, Git/GitHub, GPU Basics","Matrix Operations Toolkit"],["Mathematics","Linear Algebra, Calculus, Probability, Backpropagation","Neural Net from Scratch"],["Neural Network Foundations","Perceptrons, Optimizers, Regularization, PyTorch","Digit Recognizer"],["Vision & Sequence Models","CNN, RNN, LSTM, Transfer Learning","Image Classifier"],["Advanced Architectures","Transformers, GANs, Autoencoders, Attention","GAN Image Generator"],["Projects & Career Preparation","Training Pipelines, Paper Reading, Resume, Interview Preparation","Speech Recognizer"]]),
"ai-ml-researcher":mk("AI/ML Researcher","Invent new algorithms and publish scientific research.","18–24 months",[["Programming & Research Tools","Python, PyTorch, LaTeX, Git/GitHub","Reproducible Experiment Repo"],["Advanced Mathematics","Linear Algebra, Calculus, Probability, Optimization","Optimization Study"],["Machine Learning Theory","Statistical Learning, Bias-Variance, Generalization, Information Theory","Theory Summary Report"],["Deep Learning Research","Transformers, Generative Models, Reinforcement Learning Basics, Paper Reading","Paper Reproduction"],["Experimentation","Experiment Design, Reproducibility, Benchmarks, Ablation Studies","Novel Model Experiment"],["Publishing & Career Preparation","Academic Writing, arXiv, Conferences, Graduate Applications","Workshop Paper Draft"]]),
"nlp-engineer":mk("NLP Engineer","Teach machines to understand and generate human language.","9–12 months",[["Python & Text Basics","Python, Regex, Text Cleaning, Pandas","Text Cleaning Pipeline"],["Math & ML Foundations","Probability, Linear Algebra, Classification, Evaluation","Spam Classifier"],["Classical NLP","Tokenization, TF-IDF, Word Embeddings, spaCy","Sentiment Analyzer"],["Deep Learning for NLP","RNN/LSTM, Attention, Transformers, PyTorch","Text Generator"],["LLMs & Applications","Hugging Face, BERT, Fine-tuning, RAG","Q&A Chatbot"],["Deployment & Career Preparation","FastAPI, Docker, Resume, Interview Preparation","Deployed Text Summarizer"]]),
"computer-vision-engineer":mk("Computer Vision Engineer","Build systems that see and understand images and video.","9–12 months",[["Python & Image Basics","Python, NumPy, OpenCV, Pillow","Photo Filter App"],["Mathematics","Linear Algebra, Calculus, Probability, Convolutions","Convolution from Scratch"],["Image Processing","Filters, Edge Detection, Feature Extraction, Augmentation","Document Scanner"],["Deep Learning for Vision","CNN, PyTorch, Transfer Learning, Image Classification","Image Classifier"],["Advanced Vision","YOLO, Segmentation, Object Tracking, OCR","Object Detection App"],["Deployment & Career Preparation","Streamlit, Docker, Resume, Interview Preparation","Face Detector Web App"]])};
const done=id=>{try{return JSON.parse(localStorage.getItem("careerProgress_"+id))||[]}catch(e){return[]}};
const pct=id=>{const c=careerRoadmaps[id];return c?Math.round(done(id).length/c.phases.length*100):0};
const DEM={"Very High":95,High:80,Medium:60};
const bar=v=>`<div class="bar" role="progressbar" aria-valuenow="${v}" aria-valuemin="0" aria-valuemax="100"><i data-w="${v}"></i></div>`;
const head=(t,p)=>`<div class="page-head"><h1>${t}</h1><p>${p}</p></div>`;

/* ---------- layout ---------- */
const LINKS=[["Home","index.html","home"],["Careers","pages/careers.html","careers"],["Roadmap","pages/roadmap.html","roadmap"],["Quiz","pages/quiz.html","quiz"],["Resources","pages/resources.html","resources"],["Tracker","pages/tracker.html","tracker"],["Contact","pages/contact.html","contact"]];
function layout(){
 B.insertAdjacentHTML("afterbegin",`<header class="nav"><a class="brand" href="${R}index.html"><img src="${R}images/logo.svg" alt="">AI Career Portal</a><button class="burger" aria-label="Toggle menu" aria-expanded="false">☰</button><nav aria-label="Main">${LINKS.map(([n,h,k])=>`<a href="${U(h)}" class="${k===P?"on":""}">${n}</a>`).join("")}</nav></header>`);
 B.insertAdjacentHTML("beforeend",`<footer class="foot">© ${new Date().getFullYear()} AI Career Roadmap Portal · Built with HTML, CSS &amp; JavaScript</footer>`);
 const bg=$(".burger"),nv=$(".nav nav");
 bg.onclick=()=>{const o=nv.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
 $$("a",nv).forEach(a=>a.onclick=()=>nv.classList.remove("open"));
}
function effects(){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.1});
 $$(".reveal").forEach(el=>io.observe(el));
 setTimeout(()=>$$("[data-w]").forEach(i=>i.style.width=i.dataset.w+"%"),80);
}
document.addEventListener("mousemove",e=>{ // 3D tilt
 const t=e.target.closest&&e.target.closest(".tilt");$$(".tilt").forEach(c=>{if(c!==t)c.style.transform=""});
 if(!t)return;const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
 t.style.transform=`perspective(700px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateZ(8px)`;
});

/* ---------- pages ---------- */
const careerCard=c=>`<article class="card tilt reveal"><div class="ico">${c[2]}</div><h3>${c[1]}</h3><p class="muted">${c[3]}</p><div class="tags">${c[4].map(s=>`<span>${s}</span>`).join("")}</div><ul class="meta"><li>Level: Beginner-friendly</li><li>Duration: ${c[5]}</li><li>Demand: <b>${c[6]}</b></li></ul>${bar(DEM[c[6]])}<p class="small">Projects: ${c[7].join(", ")}</p><a class="btn" href="${RM}${c[0]}">View Roadmap</a></article>`;

function home(){
 $("#cats").innerHTML=C.map(c=>`<a class="card tilt reveal" href="${RM}${c[0]}"><div class="ico">${c[2]}</div><h3>${c[1]}</h3><p class="small">${c[3]}</p></a>`).join("");
 $("#feat").innerHTML=C.slice(0,3).map(c=>`<article class="card tilt reveal"><div class="ico">${c[2]}</div><h3>${c[1]} Roadmap</h3><p class="small">6 phases · ${c[5]}</p>${bar(pct(c[0]))}<a class="btn" href="${RM}${c[0]}">Open Roadmap</a></article>`).join("");
}
function careers(){
 app.innerHTML=head("Career Explorer","Compare AI and Data Science careers, then open the roadmap for the one you like.")+`<div class="grid g3">${C.map(careerCard).join("")}</div>`;
}
function roadmap(){
 const q=new URLSearchParams(window.location.search).get("career"),id=q||get().career,c=careerRoadmaps[id];
 if(!c){app.innerHTML=head("Roadmap",q?"We could not find that career.":"Choose a career to see its roadmap.")+`<div class="grid g4">${C.map(x=>`<a class="card tilt" href="${RM}${x[0]}"><div class="ico">${x[2]}</div><h3>${x[1]}</h3></a>`).join("")}</div>`;return}
 const s=get();s.career=id;put(s);
 const ico=find(id)[2],n=c.phases.length;
 const draw=()=>{
  const d=done(id),p=pct(id);
  app.innerHTML=head(`${ico} ${c.title} Roadmap`,c.description)+
  `<div class="row" style="margin-bottom:16px"><span class="badge">⏱ Duration: ${c.duration}</span><span class="badge">Difficulty: ${c.difficulty}</span></div>
  <div class="prog"><b>Your Progress: ${p}%</b>${bar(p)}<span class="small">${d.length} of ${n} phases completed</span></div>
  <div class="row" style="margin-top:16px"><select id="sw" aria-label="Switch career">${C.map(x=>`<option value="${x[0]}" ${x[0]===id?"selected":""}>${x[1]}</option>`).join("")}</select></div>
  <div class="timeline">${c.phases.map((x,i)=>`<article class="card phase ${d.includes(i)?"done":""}" data-n="${i+1}"><div class="top"><h3>Phase ${i+1}: ${x.title}</h3><span class="badge">⏱ ${x.duration}</span></div><p class="muted">${x.description}</p><div class="tags">${x.skills.map(k=>`<span>${k}</span>`).join("")}</div><p class="small">Recommended project: ${x.projects.join(", ")}</p><button class="btn ${d.includes(i)?"ghost":""}" data-ph="${i}" aria-pressed="${d.includes(i)}">${d.includes(i)?"✓ Completed – Undo":"Mark Complete"}</button></article>`).join("")}</div>`;
  $$("[data-w]").forEach(i=>i.style.width="0");effects();
  $("#sw").onchange=e=>{location.href=RM+e.target.value};
  $$("[data-ph]").forEach(b=>b.onclick=()=>{const a=new Set(done(id)),k=+b.dataset.ph;a.has(k)?a.delete(k):a.add(k);localStorage.setItem("careerProgress_"+id,JSON.stringify([...a]));draw()});
 };draw();
}
const K={a:"ai-engineer",d:"data-scientist",n:"data-analyst",m:"machine-learning-engineer",l:"deep-learning-engineer",r:"ai-ml-researcher",p:"nlp-engineer",v:"computer-vision-engineer"};
const Q=[
["What do you enjoy most?",[["Building intelligent systems","am"],["Finding patterns in data","dn"],["Creating dashboards","nd"],["Researching algorithms","rl"]]],
["Which activity sounds interesting?",[["Teaching a computer to read text","pa"],["Making computers see images","vl"],["Analysing sales trends","nd"],["Writing a research paper","rl"]]],
["Pick a project to build:",[["A smart chatbot","pa"],["A face detection app","vl"],["A business dashboard","nd"],["A prediction model","dm"]]],
["What is your strongest trait?",[["Coding","am"],["Mathematics","rl"],["Explaining data visually","nd"],["Fascination with language","pa"]]],
["Preferred way of working?",[["Deploying real products","ma"],["Running experiments","rd"],["Reporting to stakeholders","nd"],["Training large models","lv"]]],
["Favourite tool?",[["PyTorch / TensorFlow","lv"],["Excel / Power BI","nd"],["Jupyter notebooks","dr"],["APIs and Docker","ma"]]],
["Which data excites you?",[["Images and video","vl"],["Text and speech","pl"],["Tables and numbers","nd"],["Theory and signals","rd"]]],
["Your goal in 2 years?",[["Ship an AI product","am"],["Lead data insights","dn"],["Publish research","rl"],["Run production ML pipelines","ma"]]]];
function quiz(){
 let i=0,sc={};Object.keys(K).forEach(k=>sc[k]=0);
 const ask=()=>{app.innerHTML=`<div class="quiz">${head("Career Quiz","Answer honestly – there are no wrong answers.")}<p class="small">Question ${i+1} of ${Q.length}</p>${bar(i/Q.length*100)}<h2>${Q[i][0]}</h2>${Q[i][1].map((o,j)=>`<button class="opt" data-j="${j}">${o[0]}</button>`).join("")}</div>`;
  $$("[data-w]").forEach(x=>x.style.width=x.dataset.w+"%");
  $$(".opt").forEach(b=>b.onclick=()=>{[...Q[i][1][b.dataset.j][1]].forEach((k,n)=>sc[k]+=n?1:2);++i<Q.length?ask():res()})};
 const res=()=>{
  const tot=Object.values(sc).reduce((a,b)=>a+b,0)||1,top=Object.keys(sc).sort((a,b)=>sc[b]-sc[a])[0],c=find(K[top]);
  const s=get();s.quiz={id:c[0],name:c[1],date:new Date().toLocaleDateString()};if(!s.career)s.career=c[0];put(s);
  app.innerHTML=`<div class="quiz">${head("Your Recommended Career","Calculated from your 8 answers.")}<div class="card"><div class="ico">${c[2]}</div><h2>${c[1]}</h2><p><b>Why it suits you:</b> your answers matched ${Math.round(sc[top]/tot*100)}% of the points toward this path. ${c[3]}</p><p class="small">Recommended skills</p><div class="tags">${c[4].map(k=>`<span>${k}</span>`).join("")}</div><h3>Match breakdown</h3>${Object.keys(sc).sort((a,b)=>sc[b]-sc[a]).slice(0,4).map(k=>`<small>${find(K[k])[1]}</small>${bar(Math.round(sc[k]/tot*100*2))}`).join("")}<div class="row" style="margin-top:14px"><a class="btn" href="${RM}${c[0]}">View Roadmap</a><button class="btn ghost" id="rs">Restart Quiz</button></div></div></div>`;
  effects();$("#rs").onclick=quiz};
 ask();
}
const RES=[["Python","Official Python Tutorial","Free official guide to the language.","Docs","Beginner","https://docs.python.org/3/tutorial/"],["SQL","SQLBolt","Interactive SQL lessons in the browser.","Interactive","Beginner","https://sqlbolt.com/"],["Statistics","Khan Academy Statistics","Probability and statistics from scratch.","Course","Beginner","https://www.khanacademy.org/math/statistics-probability"],["Machine Learning","Google ML Crash Course","Fast practical intro with exercises.","Course","Beginner","https://developers.google.com/machine-learning/crash-course"],["Deep Learning","fast.ai Practical Deep Learning","Code-first deep learning course.","Course","Intermediate","https://course.fast.ai/"],["Data Visualization","Kaggle Data Visualization","Short hands-on charting course.","Course","Beginner","https://www.kaggle.com/learn/data-visualization"],["Git & GitHub","GitHub Skills","Learn Git by doing small guided projects.","Interactive","Beginner","https://skills.github.com/"],["Projects","Kaggle Learn & Datasets","Free courses plus datasets for projects.","Platform","Intermediate","https://www.kaggle.com/learn"],["Interview Preparation","LeetCode","Practice coding interview problems.","Practice","Intermediate","https://leetcode.com/"]];
function resources(){
 app.innerHTML=head("Free Learning Resources","Reputable, free resources grouped by topic.")+`<div class="grid g3">${RES.map(r=>`<article class="card tilt reveal"><span class="badge">${r[0]}</span><h3>${r[1]}</h3><p class="muted">${r[2]}</p><p class="small">${r[3]} · ${r[4]}</p><a class="btn" href="${r[5]}" target="_blank" rel="noopener noreferrer">Visit Resource</a></article>`).join("")}</div>`;
}
const SK=["Python Basics","Git & GitHub","SQL","Statistics","Data Visualization","Machine Learning","Deep Learning","NLP / Computer Vision","Model Deployment","Communication"];
const PJ=["Data Analysis Project","Dashboard","Prediction Model","Chatbot","Image Classifier","Deployed ML App"];
function tracker(){
 const draw=()=>{
  const s=get(),sk=s.skills||[],pj=s.projects||[],cid=s.career,rp=cid?pct(cid):0;
  const a=Math.round(sk.length/SK.length*100),b=Math.round(pj.length/PJ.length*100),all=Math.round((a+b+rp)/3);
  const stat=(t,v,x)=>`<div class="card stat"><span class="muted">${t}</span><b>${v}</b>${x||""}</div>`;
  app.innerHTML=head("Progress Tracker","Your learning dashboard – saved in this browser.")+
  `<div class="grid g4">${stat("Overall Progress",all+"%",bar(all))}${stat("Skills Completed",`${sk.length}/${SK.length}`,bar(a))}${stat("Projects Completed",`${pj.length}/${PJ.length}`,bar(b))}${stat("Roadmap Progress",rp+"%",bar(rp))}</div>
  <div class="grid g3" style="margin-top:20px">
  <div class="card"><h3>🎯 Career Goal</h3><select id="goal"><option value="">Select a career</option>${C.map(x=>`<option value="${x[0]}" ${x[0]===cid?"selected":""}>${x[1]}</option>`).join("")}</select>${cid?`<a class="btn" style="margin-top:14px" href="${RM}${cid}">Open Roadmap</a>`:`<p class="small">Pick a goal to link your roadmap.</p>`}<h3 style="margin-top:20px">🧩 Quiz Result</h3>${s.quiz?`<p>${s.quiz.name} <span class="small">(${s.quiz.date})</span></p>`:`<p class="small">Not taken yet. <a href="quiz.html" style="color:var(--c)">Take the quiz</a></p>`}</div>
  <div class="card"><h3>✅ Skills</h3>${SK.map((x,i)=>`<label class="check"><input type="checkbox" data-k="skills" data-i="${i}" ${sk.includes(i)?"checked":""}>${x}</label>`).join("")}</div>
  <div class="card"><h3>🚀 Projects</h3>${PJ.map((x,i)=>`<label class="check"><input type="checkbox" data-k="projects" data-i="${i}" ${pj.includes(i)?"checked":""}>${x}</label>`).join("")}</div></div>
  <p style="margin-top:24px"><button class="btn danger" id="reset">Reset Progress</button></p>`;
  $$("[data-w]").forEach(x=>x.style.width="0");effects();
  $("#goal").onchange=e=>{const s=get();s.career=e.target.value;put(s);draw()};
  $$("[data-k]").forEach(c=>c.onchange=()=>{const s=get(),k=c.dataset.k,n=+c.dataset.i,a=new Set(s[k]||[]);c.checked?a.add(n):a.delete(n);s[k]=[...a];put(s);draw()});
  $("#reset").onclick=()=>{if(confirm("Reset ALL progress? This cannot be undone.")){localStorage.removeItem("acrp");Object.keys(localStorage).filter(k=>k.startsWith("careerProgress_")).forEach(k=>localStorage.removeItem(k));draw()}};
 };draw();
}
function contact(){
 app.innerHTML=head("Contact Us","Questions or feedback? Send us a message.")+`<form id="f" novalidate><label>Name<input id="n" autocomplete="name"><span class="err"></span></label><label>Email<input id="e" type="email" autocomplete="email"><span class="err"></span></label><label>Subject<input id="s"><span class="err"></span></label><label>Message<textarea id="m" rows="5"></textarea><span class="err"></span></label><button class="btn" type="submit">Send Message</button><div id="out" role="status"></div></form>`;
 const rules={n:v=>v.trim().length>=2||"Enter your name (2+ characters).",e:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)||"Enter a valid email address.",s:v=>v.trim().length>=3||"Enter a subject.",m:v=>v.trim().length>=10||"Message must be at least 10 characters."};
 $("#f").onsubmit=ev=>{ev.preventDefault();let ok=true;
  for(const k in rules){const el=$("#"+k),r=rules[k](el.value);el.nextElementSibling.textContent=r===true?"":r;if(r!==true)ok=false}
  if(ok){$("#f").reset();$("#out").innerHTML=`<p class="ok">Thank you! Your message has been submitted successfully.</p>`}};
}
layout();
({home,careers,roadmap,quiz,resources,tracker,contact})[P]();
effects();
