// 取得元素
const startBtn = document.getElementById("start-button");
const introContainer = document.getElementById("intro-container");
const gameContainer = document.getElementById("game-container");
const questionNumberEl = document.getElementById("question-word");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-button");

// 🎵 音效產生器（不用檔案）
function playBeep(frequency, duration) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(0.1, ctx.currentTime); // 音量
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + duration / 1000);
}

// ✅ 答對音效（叮叮）
function playCorrectSound() {
  playBeep(880, 100);
  setTimeout(() => playBeep(1320, 150), 120);
}

// ❌ 答錯音效（噗噗）
function playWrongSound() {
  playBeep(220, 200);
  setTimeout(() => playBeep(180, 250), 220);
}

// 🎉 全對慶祝音效（和弦閃亮）
function playWinSound() {
  playBeep(523, 200); // C5
  setTimeout(() => playBeep(659, 200), 150); // E5
  setTimeout(() => playBeep(784, 300), 300); // G5
  setTimeout(() => playBeep(1046, 400), 500); // C6
}

// 題目資料
const questions = [
  { word: "1", choices: ["ㄅ<br>ㄧ", "ㄆ<br>ㄧ"], answer: "ㄅ<br>ㄧ" },
  { word: "2", choices: ["ㄇ<br>ㄠ<br><br>ㄇ<br>ㄧ", "ㄅ<br>ㄠ<br><br>ㄅ<br>ㄧ"], answer: "ㄇ<br>ㄠ<br><br>ㄇ<br>ㄧ" },
  { word: "3", choices: ["ㄉ<br>ㄧˋ<br><br>˙<br>ㄉ<br>ㄧ", "ㄉ<br>ㄧˋ<br><br>ㄉ<br>ㄧˋ"], answer: "ㄉ<br>ㄧˋ<br><br>˙<br>ㄉ<br>ㄧ" },
  { word: "4", choices: ["ㄆ<br>ㄠˇ<br><br>ㄉ<br>ㄧˋ<br><br>ㄧ", "ㄅ<br>ㄠˇ<br><br>ㄉ<br>ㄧˋ<br><br>ㄧ"], answer: "ㄆ<br>ㄠˇ<br><br>ㄉ<br>ㄧˋ<br><br>ㄧ" },
  { word: "5", choices: ["ㄑ<br>ㄧ<br>ㄢ<br><br>ㄅ<br>ㄧˇ", "ㄑ<br>ㄧ<br>ㄢ<br><br>ㄆ<br>ㄧˇ"], answer: "ㄑ<br>ㄧ<br>ㄢ<br><br>ㄅ<br>ㄧˇ" },
  { word: "6", choices: ["ㄔ<br>ㄨ<br>ㄟ<br><br>ㄉ<br>ㄧˊ<br><br>˙<br>ㄗ", "ㄔ<br>ㄨ<br>ㄟ<br><br>ㄌ<br>ㄧˊ<br><br>˙<br>ㄗ"], answer: "ㄔ<br>ㄨ<br>ㄟ<br><br>ㄉ<br>ㄧˊ<br><br>˙<br>ㄗ" },
  { word: "7", choices: ["ㄉ<br>ㄠ<br><br>˙<br>ㄗ", "ㄌ<br>ㄠ<br><br>˙<br>ㄗ"], answer: "ㄉ<br>ㄠ<br><br>˙<br>ㄗ" },
  { word: "8", choices: ["ㄆ<br>ㄧˊ<br><br>ㄅ<br>ㄠ", "ㄆ<br>ㄧˊ<br><br>ㄉ<br>ㄠ"], answer: "ㄆ<br>ㄧˊ<br><br>ㄅ<br>ㄠ" },
  { word: "9", choices: ["ㄇ<br>ㄠˊ<br><br>ㄧ", "ㄇ<br>ㄠˇ<br><br>ㄧ"], answer: "ㄇ<br>ㄠˊ<br><br>ㄧ" },
  { word: "10", choices: ["ㄉ<br>ㄠˋ<br><br>ㄇ<br>ㄧˇ", "ㄉ<br>ㄠˋ<br><br>ㄅ<br>ㄧˇ"], answer: "ㄉ<br>ㄠˋ<br><br>ㄇ<br>ㄧˇ" }
];

let shuffledIndexes = [];
let currentIndex = 0;
let correctCount = 0;
let wrongAnswers = [];

// 洗牌
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 開始遊戲
function startGame() {
  shuffledIndexes = shuffle([...Array(questions.length).keys()]);
  currentIndex = 0;
  correctCount = 0;
  wrongAnswers = [];
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  showQuestion();
}

// 顯示題目
function showQuestion() {
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  const q = questions[shuffledIndexes[currentIndex]];
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

// 檢查答案 + 音效
function checkAnswer(selected, q) {
  if (selected === q.answer) {
    feedbackEl.textContent = "✅ 答對了！";
    feedbackEl.style.color = "green";
    correctCount++;
    playCorrectSound();
  } else {
    feedbackEl.textContent = `❌ 錯了，正確答案是：${q.answer.replace(/<br>/g, '')}`;
    feedbackEl.style.color = "red";
    wrongAnswers.push({ word: q.word, correct: q.answer, selected: selected });
    playWrongSound();
  }
  Array.from(choicesEl.children).forEach(btn => btn.disabled = true);
  nextBtn.style.display = "inline-block";
}

// 下一題
nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

// 結果
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
    playWinSound();
  }
  feedbackEl.innerHTML = html;
  restartBtn.style.display = "inline-block";
}

// 重新開始
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

// 開始遊戲
startBtn.onclick = () => {
  introContainer.style.display = "none";
  gameContainer.style.display = "block";
  startGame();
};
