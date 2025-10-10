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
  { word: "1", choices: ["ㄅ<br>ㄟ<br><br>˙<br>ㄓ<br>ㄜ", "ㄅ<br>ㄟ<br><br>˙<br>ㄓ<br>ㄛ"], answer: "ㄅ<br>ㄟ<br><br>˙<br>ㄓ<br>ㄜ" },
  { word: "2", choices: ["ㄕ<br>ㄨ<br><br>ㄅ<br>ㄠ", "ㄙ<br>ㄨ<br><br>ㄅ<br>ㄠ"], answer: "ㄕ<br>ㄨ<br><br>ㄅ<br>ㄠ" },
  { word: "3", choices: ["ㄕ<br>ㄡˇ<br><br>ㄓˇ", "ㄙ<br>ㄡˇ<br><br>ㄗˇ"], answer: "ㄕ<br>ㄡˇ<br><br>ㄓˇ" },
  { word: "4", choices: ["ㄌ<br>ㄚ<br><br>ㄕ<br>ㄡˇ", "ㄌ<br>ㄚ<br><br>ㄙ<br>ㄡˇ"], answer: "ㄌ<br>ㄚ<br><br>ㄕ<br>ㄡˇ" },
  { word: "5", choices: ["ㄨ<br>ㄢˇ<br><br>ㄒ<br>ㄩ<br>ㄥˊ", "ㄨ<br>ㄢˇ<br><br>ㄒ<br>ㄧ<br>ㄥˊ"], answer: "ㄨ<br>ㄢˇ<br><br>ㄒ<br>ㄩ<br>ㄥˊ" },
  { word: "6", choices: ["ㄏ<br>ㄨ<br>ㄢ<br><br>ㄒ<br>ㄧˇ", "ㄏ<br>ㄨ<br>ㄢ<br><br>ㄐ<br>ㄧˇ"], answer: "ㄏ<br>ㄨ<br>ㄢ<br><br>ㄒ<br>ㄧˇ" },
  { word: "7", choices: ["ㄒ<br>ㄧ<br><br>ㄋ<br>ㄧ<br>ㄡˊ", "ㄒ<br>ㄧ<br><br>ㄋ<br>ㄡˊ"], answer: "ㄒ<br>ㄧ<br><br>ㄋ<br>ㄧ<br>ㄡˊ" },
  { word: "8", choices: ["ㄦˊ<br><br>˙<br>ㄗ", "ㄜˊ<br><br>˙<br>ㄗ"], answer: "ㄦˊ<br><br>˙<br>ㄗ" },
  { word: "9", choices: ["ㄦˋ<br><br>ㄌ<br>ㄡˊ", "ㄜˋ<br><br>ㄌ<br>ㄡˊ"], answer: "ㄦˋ<br><br>ㄌ<br>ㄡˊ" },
  { word: "10", choices: ["ㄦˇ<br><br>˙<br>ㄉ<br>ㄨ<br>ㄛ", "ㄦˇ<br><br>˙<br>ㄉ<br>ㄨ<br>ㄜ"], answer: "ㄦˇ<br><br>˙<br>ㄉ<br>ㄨ<br>ㄛ" },
  { word: "11", choices: ["ㄜˋ<br><br>ㄩˊ", "ㄛˋ<br><br>ㄩˊ"], answer: "ㄜˋ<br><br>ㄩˊ" },
  { word: "12", choices: ["ㄑ<br>ㄧˋ<br><br>ㄜˊ", "ㄑ<br>ㄧˋ<br><br>ㄛˊ"], answer: "ㄑ<br>ㄧˋ<br><br>ㄜˊ" },
  { word: "13", choices: ["ㄨ<br>ㄢ<br><br>ㄧ<br>ㄠ", "ㄢ<br><br>ㄧ<br>ㄠ"], answer: "ㄨ<br>ㄢ<br><br>ㄧ<br>ㄠ" },
  { word: "14", choices: ["ㄧ<br>ㄠˊ<br><br>ㄌ<br>ㄢˊ", "ㄧ<br>ㄠˊ<br><br>ㄖ<br>ㄢˊ"], answer: "ㄧ<br>ㄠˊ<br><br>ㄌ<br>ㄢˊ" }
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
