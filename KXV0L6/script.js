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
  { word: "1", choices: ["ㄒ<br>ㄧ<br>ㄝˋ<br><br>ㄒ<br>ㄧ<br>ㄝˋ", "ㄒ<br>ㄧ<br>ㄟˋ<br><br>ㄒ<br>ㄧ<br>ㄟˋ"], answer: "ㄒ<br>ㄧ<br>ㄝˋ<br><br>ㄒ<br>ㄧ<br>ㄝˋ" },
  { word: "2", choices: ["ㄌ<br>ㄠˇ<br><br>ㄕ", "ㄌ<br>ㄠˇ<br><br>ㄙ"], answer: "ㄌ<br>ㄠˇ<br><br>ㄕ" },
  { word: "3", choices: ["ㄗ<br>ㄥˋ<br><br>ㄙ<br>ㄨ<br>ㄥˋ", "ㄗ<br>ㄥˋ<br><br>ㄕ<br>ㄨ<br>ㄥˋ"], answer: "ㄗ<br>ㄥˋ<br><br>ㄙ<br>ㄨ<br>ㄥˋ" },
  { word: "4", choices: ["ㄏ<br>ㄨ<br>ㄚ<br><br>ㄉ<br>ㄨ<br>ㄛˇ", "ㄈ<br>ㄨ<br>ㄚ<br><br>ㄉ<br>ㄨ<br>ㄛˇ"], answer: "ㄏ<br>ㄨ<br>ㄚ<br><br>ㄉ<br>ㄨ<br>ㄛˇ" },
  { word: "5", choices: ["ㄏ<br>ㄨ<br>ㄥˊ<br><br>ㄏ<br>ㄨ<br>ㄚ", "ㄈ<br>ㄨ<br>ㄥˊ<br><br>ㄈ<br>ㄨ<br>ㄚ"], answer: "ㄏ<br>ㄨ<br>ㄥˊ<br><br>ㄏ<br>ㄨ<br>ㄚ" },
  { word: "6", choices: ["ㄐ<br>ㄧ<br>ㄠ<br><br>ㄕ<br>ㄨ", "ㄐ<br>ㄧ<br>ㄠ<br><br>ㄙ<br>ㄨ"], answer: "ㄐ<br>ㄧ<br>ㄠ<br><br>ㄕ<br>ㄨ" },
  { word: "7", choices: ["ㄏ<br>ㄨ<br>ㄚˋ<br><br>ㄏ<br>ㄨ<br>ㄚˋ", "ㄈ<br>ㄨ<br>ㄚˋ<br><br>ㄈ<br>ㄨ<br>ㄚˋ"], answer: "ㄏ<br>ㄨ<br>ㄚˋ<br><br>ㄏ<br>ㄨ<br>ㄚˋ" },
  { word: "8", choices: ["ㄍ<br>ㄨ<br>ㄥ<br><br>ㄐ<br>ㄧ", "ㄎ<br>ㄨ<br>ㄥ<br><br>ㄐ<br>ㄧ"], answer: "ㄍ<br>ㄨ<br>ㄥ<br><br>ㄐ<br>ㄧ" },
  { word: "9", choices: ["ㄙ<br>ㄠˇ<br><br>ㄉ<br>ㄧˋ", "ㄕ<br>ㄠˇ<br><br>ㄉ<br>ㄧˋ"], answer: "ㄙ<br>ㄠˇ<br><br>ㄉ<br>ㄧˋ" },
  { word: "10", choices: ["ㄒ<br>ㄧ<br>ㄝˊ<br><br>˙<br>ㄗ", "ㄒ<br>ㄩ<br>ㄝˊ<br><br>˙<br>ㄗ"], answer: "ㄒ<br>ㄧ<br>ㄝˊ<br><br>˙<br>ㄗ" },
  { word: "11", choices: ["ㄑ<br>ㄧ<br>ㄥ<br><br>ㄨ<br>ㄚ", "ㄑ<br>ㄧ<br>ㄣ<br><br>ㄨ<br>ㄚ"], answer: "ㄑ<br>ㄧ<br>ㄥ<br><br>ㄨ<br>ㄚ" },
  { word: "12", choices: ["ㄆ<br>ㄧ<br>ㄥˊ<br><br>ㄍ<br>ㄨ<br>ㄛˇ", "ㄆ<br>ㄧ<br>ㄥˊ<br><br>ㄍ<br>ㄡˇ"], answer: "ㄆ<br>ㄧ<br>ㄥˊ<br><br>ㄍ<br>ㄨ<br>ㄛˇ" },
  { word: "13", choices: ["ㄍ<br>ㄨ<br>ㄥ<br><br>ㄗ<br>ㄨ<br>ㄛˋ", "ㄍ<br>ㄨ<br>ㄥ<br><br>ㄓ<br>ㄨ<br>ㄛˋ"], answer: "ㄍ<br>ㄨ<br>ㄥ<br><br>ㄗ<br>ㄨ<br>ㄛˋ" },
  { word: "14", choices: ["ㄌ<br>ㄢˇ<br><br>ㄉ<br>ㄨ<br>ㄛˋ<br><br>ㄔ<br>ㄨ<br>ㄥˊ", "ㄌ<br>ㄢˇ<br><br>ㄉ<br>ㄡˋ<br><br>ㄔ<br>ㄨ<br>ㄥˊ"], answer: "ㄌ<br>ㄢˇ<br><br>ㄉ<br>ㄨ<br>ㄛˋ<br><br>ㄔ<br>ㄨ<br>ㄥˊ" }
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
