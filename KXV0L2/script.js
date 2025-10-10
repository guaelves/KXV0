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
  { word: "1", choices: ["ㄜˊ", "ㄛˊ"], answer: "ㄜˊ" },
  { word: "2", choices: ["ㄇ<br>ㄚ<br><br>˙<br>ㄇ<br>ㄚ", "ㄇ<br>ㄚ<br><br>ㄇ<br>ㄚ"], answer: "ㄇ<br>ㄚ<br><br>˙<br>ㄇ<br>ㄚ" },
  { word: "3", choices: ["ㄏ<br>ㄚ<br><br>ㄏ<br>ㄚ", "ㄈ<br>ㄚ<br><br>ㄈ<br>ㄚ"], answer: "ㄏ<br>ㄚ<br><br>ㄏ<br>ㄚ" },
  { word: "4", choices: ["ㄏ<br>ㄠˇ<br><br>ㄉ<br>ㄜˊ<br><br>ㄧˋ", "ㄏ<br>ㄠˇ<br><br>ㄉ<br>ㄛˊ<br><br>ㄧˋ"], answer: "ㄏ<br>ㄠˇ<br><br>ㄉ<br>ㄜˊ<br><br>ㄧˋ" },
  { word: "5", choices: ["ㄈ<br>ㄨ<br><br>ㄔ<br>ㄨ", "ㄏ<br>ㄨ<br><br>ㄔ<br>ㄨ"], answer: "ㄈ<br>ㄨ<br><br>ㄔ<br>ㄨ" },
  { word: "6", choices: ["ㄨˇ<br><br>ㄓ", "ㄨˇ<br><br>ㄗ"], answer: "ㄨˇ<br><br>ㄓ" },
  { word: "7", choices: ["ㄅ<br>ㄠˇ<br><br>˙<br>ㄅ<br>ㄠ", "ㄅ<br>ㄠˇ<br><br>ㄅ<br>ㄠ"], answer: "ㄅ<br>ㄠˇ<br><br>˙<br>ㄅ<br>ㄠ" },
  { word: "8", choices: ["ㄧ<br>ㄚˊ<br><br>ㄔˇ", "ㄧ<br>ㄚˊ<br><br>ㄔˇ"], answer: "ㄧ<br>ㄚˊ<br><br>ㄔˇ" },
  { word: "9", choices: ["ㄏ<br>ㄜ<br><br>ㄔ<br>ㄚˊ", "ㄏ<br>ㄛ<br><br>ㄔ<br>ㄚˊ"], answer: "ㄏ<br>ㄜ<br><br>ㄔ<br>ㄚˊ" },
  { word: "10", choices: ["ㄓ<br>ㄨ<br><br>ㄅ<br>ㄠˇ", "ㄗ<br>ㄨ<br><br>ㄅ<br>ㄠˇ"], answer: "ㄓ<br>ㄨ<br><br>ㄅ<br>ㄠˇ" },
  { word: "11", choices: ["ㄇ<br>ㄚˇ<br><br>ㄔ<br>ㄜ", "ㄇ<br>ㄚˇ<br><br>ㄔ<br>ㄛ"], answer: "ㄇ<br>ㄚˇ<br><br>ㄔ<br>ㄜ" }
];





let shuffledIndexes = [];
let currentIndex = 0;
let correctCount = 0;
let wrongAnswers = []; // 記錄錯誤題目與答案

// 洗牌函式
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


// 檢查答案
function checkAnswer(selected, q) {
  if (selected === q.answer) {
    feedbackEl.textContent = "✅ 答對了！";
    feedbackEl.style.color = "green";
    correctCount++;
  } else {
    feedbackEl.textContent = `❌ 錯了，正確答案是：${q.answer.replace(/<br>/g, '')}`;
    feedbackEl.style.color = "red";
    wrongAnswers.push({
      word: q.word,
      correct: q.answer,
      selected: selected
    });
  }
  // 禁止繼續選擇
  Array.from(choicesEl.children).forEach(btn => btn.disabled = true);
  nextBtn.style.display = "inline-block";
}

// 下一題按鈕事件

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}


// 顯示結果
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


  // 顯示完全答對訊息（可選）
  if (wrongAnswers.length === 0) {
    html += `<p>🎯 完全答對，太厲害了！</p>`;
  }

  feedbackEl.innerHTML = html;
  restartBtn.style.display = "inline-block";
}


// 重新開始按鈕
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

// 按開始鍵啟動遊戲
startBtn.onclick = () => {
  introContainer.style.display = "none";
  gameContainer.style.display = "block";
  startGame();
};
