// 取得元素
const startBtn = document.getElementById("start-button");
const introContainer = document.getElementById("intro-container");
const gameContainer = document.getElementById("game-container");
const questionNumberEl = document.getElementById("question-word");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-button");

// 題目資料
const questions = [
  { word: "1", choices: ["ㄑ<br>ㄧ<br>ㄠˋ<br><br>ㄑ<br>ㄧ<br>ㄠˋ<br><br>ㄅ<br>ㄢˇ", "ㄐ<br>ㄧ<br>ㄠˋ<br><br>ㄐ<br>ㄧ<br>ㄠˋ<br><br>ㄅ<br>ㄢˇ"], 
answer: "ㄑ<br>ㄧ<br>ㄠˋ<br><br>ㄑ<br>ㄧ<br>ㄠˋ<br><br>ㄅ<br>ㄢˇ" },
  { word: "2", choices: ["ㄏ<br>ㄠˇ<br><br>ㄆ<br>ㄥˊ<br><br>ㄧ<br>ㄡˇ", "ㄏ<br>ㄠˇ<br><br>ㄆ<br>ㄣˊ<br><br>ㄧ<br>ㄡˇ"], 
answer: "ㄏ<br>ㄠˇ<br><br>ㄆ<br>ㄥˊ<br><br>ㄧ<br>ㄡˇ" },
  { word: "3", choices: ["ㄧˋ<br><br>ㄑ<br>ㄧˇ", "ㄧˋ<br><br>ㄑ<br>ㄩˇ"], 
answer: "ㄧˋ<br><br>ㄑ<br>ㄧˇ" },
  { word: "4", choices: ["ㄌ<br>ㄞˊ<br><br>ㄨ<br>ㄢˊ", "ㄉ<br>ㄞˊ<br><br>ㄨ<br>ㄢˊ"], 
answer: "ㄌ<br>ㄞˊ<br><br>ㄨ<br>ㄢˊ" },
  { word: "5", choices: ["ㄕ<br>ㄤˋ<br><br>ㄒ<br>ㄧ<br>ㄚˋ", "ㄙ<br>ㄤˋ<br><br>ㄒ<br>ㄧ<br>ㄚˋ"], 
answer: "ㄕ<br>ㄤˋ<br><br>ㄒ<br>ㄧ<br>ㄚˋ" },
  { word: "6", choices: ["ㄍ<br>ㄠ<br><br>ㄉ<br>ㄧ", "ㄎ<br>ㄠ<br><br>ㄉ<br>ㄧ"], 
answer: "ㄍ<br>ㄠ<br><br>ㄉ<br>ㄧ" },
  { word: "7", choices: ["ㄏ<br>ㄠˇ<br><br>ㄒ<br>ㄧ<br>ㄤˋ", "ㄏ<br>ㄠˇ<br><br>ㄐ<br>ㄧ<br>ㄤˋ"], 
answer: "ㄏ<br>ㄠˇ<br><br>ㄒ<br>ㄧ<br>ㄤˋ" },
  { word: "8", choices: ["ㄒ<br>ㄧ<br>ㄠˇ<br><br>ㄋ<br>ㄧ<br>ㄠˇ", "ㄒ<br>ㄧ<br>ㄠˇ<br><br>ㄌ<br>ㄧ<br>ㄠˇ"], 
answer: "ㄒ<br>ㄧ<br>ㄠˇ<br><br>ㄋ<br>ㄧ<br>ㄠˇ" },
  { word: "9", choices: ["ㄈ<br>ㄟ<br><br>ㄒ<br>ㄧ<br>ㄤˊ", "ㄏ<br>ㄟ<br><br>ㄒ<br>ㄧ<br>ㄤˊ"], answer: "ㄈ<br>ㄟ<br><br>ㄒ<br>ㄧ<br>ㄤˊ" },
  { word: "10", choices: ["ㄇ<br>ㄧˋ<br><br>ㄈ<br>ㄥ", "ㄇ<br>ㄧˋ<br><br>ㄏ<br>ㄥ"], 
answer: "ㄇ<br>ㄧˋ<br><br>ㄈ<br>ㄥ" },
  { word: "11", choices: ["ㄩˊ<br><br>ㄍ<br>ㄢ", "ㄩˊ<br><br>ㄎ<br>ㄢ"], 
answer: "ㄩˊ<br><br>ㄍ<br>ㄢ" },
  { word: "12", choices: ["ㄍ<br>ㄡˋ<br><br>ㄇ<br>ㄞˇ", "ㄍ<br>ㄡˋ<br><br>ㄅ<br>ㄞˇ"], 
answer: "ㄍ<br>ㄡˋ<br><br>ㄇ<br>ㄞˇ" },
  { word: "13", choices: ["ㄨ<br>ㄢˊ<br><br>ㄑ<br>ㄧ<br>ㄡˊ", "ㄨ<br>ㄢˊ<br><br>ㄐ<br>ㄧ<br>ㄡˊ"], answer: "ㄨ<br>ㄢˊ<br><br>ㄑ<br>ㄧ<br>ㄡˊ" }
];

let shuffledIndexes = [];
let currentIndex = 0;
let correctCount = 0;
let wrongAnswers = [];

// ======== 簡單電腦音效 ========
function playBeep(frequency, duration) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  osc.start();
  osc.stop(ctx.currentTime + duration / 1000);
}

function playCorrect() {
  playBeep(880, 100);
  setTimeout(() => playBeep(1320, 100), 150);
}

function playWrong() {
  playBeep(220, 150);
  setTimeout(() => playBeep(150, 150), 200);
}

function playCelebrate() {
  playBeep(660, 100);
  setTimeout(() => playBeep(880, 100), 150);
  setTimeout(() => playBeep(990, 100), 300);
  setTimeout(() => playBeep(1320, 150), 450);
}

// ======== 洗牌函式 ========
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ======== 開始遊戲 ========
function startGame() {
  shuffledIndexes = shuffle([...Array(questions.length).keys()]);
  currentIndex = 0;
  correctCount = 0;
  wrongAnswers = [];
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  showQuestion();
}

// ======== 顯示題目 ========
function showQuestion() {
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  const q = questions[shuffledIndexes[currentIndex]];

  // 隨機左右排列
  const shuffledChoices = shuffle([...q.choices]);

  questionNumberEl.textContent = `題目：${currentIndex + 1}`;
  choicesEl.innerHTML = "";
  shuffledChoices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerHTML = choice;
    btn.className = "choice-button";
    btn.onclick = () => checkAnswer(choice, q);
    choicesEl.appendChild(btn);
  });
}

// ======== 檢查答案 ========
function checkAnswer(selected, q) {
  if (selected === q.answer) {
    feedbackEl.textContent = "✅ 答對了！";
    feedbackEl.style.color = "green";
    correctCount++;
    playCorrect(); // 播放答對音
  } else {
    feedbackEl.textContent = `❌ 錯了，正確答案是：${q.answer.replace(/<br>/g, '')}`;
    feedbackEl.style.color = "red";
    wrongAnswers.push({
      word: q.word,
      correct: q.answer,
      selected: selected
    });
    playWrong(); // 播放答錯音
  }
  Array.from(choicesEl.children).forEach(btn => btn.disabled = true);
  nextBtn.style.display = "inline-block";
}

// ======== 下一題按鈕事件 ========
nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ======== 顯示結果 ========
function showResult() {
  questionNumberEl.textContent = "";
  choicesEl.innerHTML = "";
  nextBtn.style.display = "none";

  let html = `
    <h2>🎉 遊戲完成！</h2>
    <p>總共 ${questions.length} 題</p>
    <p>✅ 答對：${correctCount} 題</p>
    <p>❌ 答錯：${questions.length - correctCount} 題</p>
  `;

  if (wrongAnswers.length === 0) {
    html += `<p>🎯 完全答對，太厲害了！</p>`;
    playCelebrate(); // 全對慶祝音
  }

  feedbackEl.innerHTML = html;
  restartBtn.style.display = "inline-block";
}

// ======== 重新開始按鈕 ========
const restartBtn = document.createElement("button");
restartBtn.id = "restart-button";  
restartBtn.textContent = "✅ 重新開始遊戲";
restartBtn.style.display = "none";
restartBtn.onclick = () => {
  gameContainer.style.display = "none";
  introContainer.style.display = "block";
  feedbackEl.textContent = "";
  choicesEl.innerHTML = "";
  questionNumberEl.textContent = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "none";
};
gameContainer.appendChild(restartBtn);

// ======== 按開始鍵啟動遊戲 ========
startBtn.onclick = () => {
  introContainer.style.display = "none";
  gameContainer.style.display = "block";
  startGame();
};
