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
  { word: "1", choices: ["ㄏ<br>ㄜˊ<br><br>ㄇ<br>ㄚˇ", "ㄏ<br>ㄛˊ<br><br>ㄇ<br>ㄚˇ"], 
    answer: "ㄏ<br>ㄜˊ<br><br>ㄇ<br>ㄚˇ" },
  { word: "2", choices: ["ㄧ<br>ㄠˋ<br><br>ㄑ<br>ㄩˋ", "ㄧ<br>ㄠˋ<br><br>ㄑ<br>ㄧˋ"],
    answer: "ㄧ<br>ㄠˋ<br><br>ㄑ<br>ㄩˋ" },
  { word: "3", choices: ["ㄆ<br>ㄠˋ<br><br>ㄓ<br>ㄠˇ", "ㄆ<br>ㄠˋ<br><br>ㄗ<br>ㄠˇ"], 
    answer: "ㄆ<br>ㄠˋ<br><br>ㄗ<br>ㄠˇ" },
  { word: "4", choices: ["ㄅ<br>ㄢˋ<br><br>ㄌ<br>ㄨˋ", "ㄅ<br>ㄢˋ<br><br>ㄉ<br>ㄨˋ"], 
    answer: "ㄅ<br>ㄢˋ<br><br>ㄌ<br>ㄨˋ" },
  { word: "5", choices: ["ㄩˋ<br><br>ㄌ<br>ㄠˋ", "ㄩˋ<br><br>ㄉ<br>ㄠˋ"], 
    answer: "ㄩˋ<br><br>ㄉ<br>ㄠˋ" },
  { word: "6", choices: ["ㄏ<br>ㄜˊ<br><br>ㄌ<br>ㄧˊ", "ㄏ<br>ㄛˊ<br><br>ㄌ<br>ㄧˊ"], 
    answer: "ㄏ<br>ㄜˊ<br><br>ㄌ<br>ㄧˊ" },
  { word: "7", choices: ["ㄇ<br>ㄤˊ<br><br>˙<br>ㄓ<br>ㄜ", "ㄇ<br>ㄤˊ<br><br>˙<br>ㄓ<br>ㄛ"], 
    answer: "ㄇ<br>ㄤˊ<br><br>˙<br>ㄓ<br>ㄜ" },
  { word: "8", choices: ["ㄓ<br>ㄨˊ<br><br>ㄘ<br>ㄠˊ", "ㄓ<br>ㄨˊ<br><br>ㄔ<br>ㄠˊ"], 
    answer: "ㄓ<br>ㄨˊ<br><br>ㄔ<br>ㄠˊ" },
  { word: "9", choices: ["ㄅ<br>ㄛ<br><br>ㄌ<br>ㄧˊ", "ㄅ<br>ㄜ<br><br>ㄌ<br>ㄧˊ"], 
    answer: "ㄅ<br>ㄛ<br><br>ㄌ<br>ㄧˊ" },
  { word: "10", choices: ["ㄨ<br><br>ㄆ<br>ㄛˊ", "ㄨ<br><br>ㄆ<br>ㄨ<br>ㄛˊ"], 
    answer: "ㄨ<br><br>ㄆ<br>ㄛˊ" },
  { word: "11", choices: ["ㄇ<br>ㄨ<br>ㄛˇ<br><br>ㄈ<br>ㄚˇ", "ㄇ<br>ㄛˇ<br><br>ㄈ<br>ㄚˇ"], 
    answer: "ㄇ<br>ㄛˇ<br><br>ㄈ<br>ㄚˇ" },
 { word: "12", choices: ["ㄨ<br>ㄛˋ<br><br>ㄈ<br>ㄤˊ", "ㄨ<br>ㄜˋ<br><br>ㄈ<br>ㄤˊ"], 
    answer: "ㄨ<br>ㄛˋ<br><br>ㄈ<br>ㄤˊ" }
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
  questionNumberEl.textContent = `題目：${currentIndex + 1}`;
  choicesEl.innerHTML = "";
  q.choices.forEach(choice => {
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
