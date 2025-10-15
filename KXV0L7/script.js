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
  { word: "1", choices: ["ㄨ<br><br>ㄍ<br>ㄨ<br>ㄟ", "ㄨ<br>ㄍ<br>ㄟ"], answer: "ㄨ<br><br>ㄍ<br>ㄨ<br>ㄟ" },
  { word: "2", choices: ["ㄊ<br>ㄨˋ<br><br>˙<br>ㄗ", "ㄊ<br>ㄨˋ<br>˙<br>ㄓ"], answer: "ㄊ<br>ㄨˋ<br><br>˙<br>ㄗ" },
  { word: "3", choices: ["ㄅ<br>ㄧˇ<br><br>ㄙ<br>ㄞˋ", "ㄅ<br>ㄧˇ<br><br>ㄕ<br>ㄞˋ"], answer: "ㄅ<br>ㄧˇ<br><br>ㄙ<br>ㄞˋ" },
  { word: "4", choices: ["ㄎ<br>ㄨ<br>ㄞˋ<br><br>ㄙ<br>ㄨˋ", "ㄎ<br>ㄨ<br>ㄞˋ<br><br>ㄕ<br>ㄨˋ"], answer: "ㄎ<br>ㄨ<br>ㄞˋ<br><br>ㄙ<br>ㄨˋ" },
  { word: "5", choices: ["ㄌ<br>ㄧ<br>ㄥˇ<br><br>ㄒ<br>ㄧ<br>ㄢ", "ㄌ<br>ㄧ<br>ㄣˇ<br><br>ㄒ<br>ㄧ<br>ㄢ"], answer: "ㄌ<br>ㄧ<br>ㄥˇ<br><br>ㄒ<br>ㄧ<br>ㄢ" },
  { word: "6", choices: ["ㄕ<br>ㄨ<br>ㄟˋ<br><br>ㄐ<br>ㄧ<br>ㄠˋ", "ㄙ<br>ㄨ<br>ㄟˋ<br><br>ㄐ<br>ㄧ<br>ㄠˋ"], answer: "ㄕ<br>ㄨ<br>ㄟˋ<br><br>ㄐ<br>ㄧ<br>ㄠˋ" },
  { word: "7", choices: ["ㄌ<br>ㄨ<br>ㄛˋ<br><br>ㄏ<br>ㄡˋ", "ㄌ<br>ㄨ<br>ㄡˋ<br><br>ㄏ<br>ㄡˋ"], answer: "ㄌ<br>ㄨ<br>ㄛˋ<br><br>ㄏ<br>ㄡˋ" },
  { word: "8", choices: ["ㄙ<br>ㄞˋ<br><br>ㄆ<br>ㄠˇ", "ㄕ<br>ㄞˋ<br><br>ㄆ<br>ㄠˇ"], answer: "ㄙ<br>ㄞˋ<br><br>ㄆ<br>ㄠˇ" },
  { word: "9", choices: ["ㄑ<br>ㄧˋ<br><br>ㄋ<br>ㄟˇ", "ㄑ<br>ㄧˋ<br><br>ㄋ<br>ㄧ<br>ㄝˇ"], answer: "ㄑ<br>ㄧˋ<br><br>ㄋ<br>ㄟˇ" },
  { word: "10", choices: ["ㄍ<br>ㄣ<br><br>ㄙ<br>ㄨ<br>ㄟˊ", "ㄍ<br>ㄥ<br><br>ㄙ<br>ㄨ<br>ㄟˊ"], answer: "ㄍ<br>ㄣ<br><br>ㄙ<br>ㄨ<br>ㄟˊ" },
  { word: "11", choices: ["ㄓ<br>ㄨ<br>ㄟ<br><br>ㄓ<br>ㄨˊ", "ㄓ<br>ㄨ<br>ㄟ<br><br>ㄗ<br>ㄨˊ"], answer: "ㄓ<br>ㄨ<br>ㄟ<br><br>ㄓ<br>ㄨˊ" },
  { word: "12", choices: ["ㄏ<br>ㄡˋ<br><br>ㄇ<br>ㄧ<br>ㄢˋ", "ㄏ<br>ㄛˋ<br><br>ㄇ<br>ㄧ<br>ㄢˋ"], answer: "ㄏ<br>ㄡˋ<br><br>ㄇ<br>ㄧ<br>ㄢˋ" },
  { word: "13", choices: ["ㄊ<br>ㄧ<br>ㄠˋ<br><br>ㄕ<br>ㄥˊ", "ㄊ<br>ㄧ<br>ㄠˋ<br><br>ㄕ<br>ㄣˊ"], answer: "ㄊ<br>ㄧ<br>ㄠˋ<br><br>ㄕ<br>ㄥˊ" },
  { word: "14", choices: ["ㄐ<br>ㄧ<br>ㄥ<br><br>ㄕ<br>ㄣˊ", "ㄐ<br>ㄧ<br>ㄥ<br><br>ㄕ<br>ㄥˊ"], answer: "ㄐ<br>ㄧ<br>ㄥ<br><br>ㄕ<br>ㄣˊ" }
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
