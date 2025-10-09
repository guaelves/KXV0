// === 取得元素 ===
const startBtn = document.getElementById("start-button");
const introContainer = document.getElementById("intro-container");
const gameContainer = document.getElementById("game-container");
const questionNumberEl = document.getElementById("question-word");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-button");

// === 題目資料（正確 / 錯誤） ===
const questions = [
  { word: "1", correct: "ㄒ<br>ㄧ<br>ㄝˋ<br><br>˙<br>ㄒ<br>ㄧ<br>ㄝ", wrong: "ㄒ<br>ㄧ<br>ㄟˋ<br><br>˙<br>ㄒ<br>ㄧ<br>ㄟ" },
  { word: "2", correct: "ㄌ<br>ㄠˇ<br><br>ㄕ", wrong: "ㄌ<br>ㄠˇ<br><br>ㄙ" },
  { word: "3", correct: "ㄗ<br>ㄥˋ<br><br>ㄙ<br>ㄨㄥˋ", wrong: "ㄗ<br>ㄥˋ<br><br>ㄕ<br>ㄨㄥˋ" },
  { word: "4", correct: "ㄏ<br>ㄨㄚ<br><br>ㄉ<br>ㄨㄛˇ", wrong: "ㄈ<br>ㄨㄚ<br><br>ㄉ<br>ㄨㄛˇ" },
  { word: "5", correct: "ㄏ<br>ㄨㄥˊ<br><br>ㄏ<br>ㄨㄚ", wrong: "ㄈ<br>ㄨㄥˊ<br><br>ㄈ<br>ㄨㄚ" },
  { word: "6", correct: "ㄐ<br>ㄧㄠ<br><br>ㄕ<br>ㄨ", wrong: "ㄐ<br>ㄧㄠ<br><br>ㄙ<br>ㄨ" },
  { word: "7", correct: "ㄏ<br>ㄨㄚˋ<br><br>ㄏ<br>ㄨㄚˋ", wrong: "ㄈ<br>ㄨㄚˋ<br><br>ㄈ<br>ㄨㄚˋ" },
  { word: "8", correct: "ㄍ<br>ㄨㄥ<br><br>ㄐ<br>ㄧ", wrong: "ㄎ<br>ㄨㄥ<br><br>ㄐ<br>ㄧ" },
  { word: "9", correct: "ㄙ<br>ㄠˇ<br><br>ㄉ<br>ㄧˋ", wrong: "ㄕ<br>ㄠˇ<br><br>ㄉ<br>ㄧˋ" },
  { word: "10", correct: "ㄒ<br>ㄧㄝˊ<br><br>˙ㄗ", wrong: "ㄒ<br>ㄩㄝˊ<br><br>˙ㄗ" },
  { word: "11", correct: "ㄑ<br>ㄧㄥ<br><br>ㄨㄚ", wrong: "ㄑ<br>ㄧㄣ<br><br>ㄨㄚ" },
  { word: "12", correct: "ㄆ<br>ㄧㄥˊ<br><br>ㄍ<br>ㄨㄛˇ", wrong: "ㄆ<br>ㄧㄥˊ<br><br>ㄍ<br>ㄡˇ" },
  { word: "13", correct: "ㄍ<br>ㄨㄥ<br><br>ㄗ<br>ㄨㄛˋ", wrong: "ㄍ<br>ㄨㄥ<br><br>ㄓ<br>ㄨㄛˋ" },
  { word: "14", correct: "ㄌ<br>ㄢˇ<br><br>ㄉ<br>ㄨㄛˋ<br><br>ㄔ<br>ㄨㄥˊ", wrong: "ㄌ<br>ㄢˇ<br><br>ㄉ<br>ㄡˋ<br><br>ㄔ<br>ㄨㄥˊ" }
];

let shuffledIndexes = [];
let currentIndex = 0;
let correctCount = 0;
let wrongAnswers = [];

// === 洗牌函式 ===
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// === 開始遊戲 ===
function startGame() {
  shuffledIndexes = shuffle([...Array(questions.length).keys()]);
  currentIndex = 0;
  correctCount = 0;
  wrongAnswers = [];
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  showQuestion();
}

// === 顯示題目 ===
function showQuestion() {
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";

  const q = questions[shuffledIndexes[currentIndex]];
  questionNumberEl.textContent = `題目：${currentIndex + 1}`;
  choicesEl.innerHTML = "";

  // 隨機決定正確答案在左或右
  const isLeftCorrect = Math.random() < 0.5;
  const choices = isLeftCorrect
    ? [q.correct, q.wrong]
    : [q.wrong, q.correct];

  choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.innerHTML = choice;
    btn.className = "choice-button";
    btn.onclick = () => checkAnswer(choice === q.correct, q, btn);
    choicesEl.appendChild(btn);
  });
}

// === 檢查答案 ===
function checkAnswer(isCorrect, q, btn) {
  if (isCorrect) {
    feedbackEl.textContent = "✅ 答對了！";
    feedbackEl.style.color = "green";
    correctCount++;
    btn.classList.add("correct");
  } else {
    feedbackEl.innerHTML = `❌ 錯了，正確答案是：<br>${q.correct}`;
    feedbackEl.style.color = "red";
    btn.classList.add("wrong");
    wrongAnswers.push({ word: q.word, correct: q.correct });
  }

  // 禁止繼續選擇
  Array.from(choicesEl.children).forEach(b => b.disabled = true);
  nextBtn.style.display = "inline-block";
}

// === 下一題 ===
nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

// === 顯示結果 ===
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
    html += `<p>🎯 全部答對！太厲害了！</p>`;
  }

  feedbackEl.innerHTML = html;
  restartBtn.style.display = "inline-block";
}

// === 重新開始按鈕 ===
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

// === 開始按鈕事件 ===
startBtn.onclick = () => {
  introContainer.style.display = "none";
  gameContainer.style.display = "block";
  startGame();
};

