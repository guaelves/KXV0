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
  { word: "1", choices: ["ㄅ<br>ㄟ<br><br>˙<br>ㄓ<br>ㄜ", "ㄅ<br>ㄟ<br><br>˙<br>ㄓ<br>ㄛ"], 
    answer: "ㄅ<br>ㄟ<br><br>˙<br>ㄓ<br>ㄜ" },
  { word: "2", choices: ["ㄙ<br>ㄨ<br><br>ㄅ<br>ㄠ", "ㄕ<br>ㄨ<br><br>ㄅ<br>ㄠ"],
    answer: "ㄕ<br>ㄨ<br><br>ㄅ<br>ㄠˋ" },
  { word: "3", choices: ["ㄕ<br>ㄡˇ<br><br>ㄓˇ", "ㄙ<br>ㄡˇ<br><br>ㄗˇ"], 
    answer: "ㄕ<br>ㄡˇ<br><br>ㄓˇ" },
  { word: "4", choices: ["ㄌ<br>ㄚ<br><br>ㄙ<br>ㄡˇ", "ㄌ<br>ㄚ<br><br>ㄕ<br>ㄡˇ"], 
    answer: "ㄌ<br>ㄚ<br><br>ㄕ<br>ㄡˇ" },
  { word: "5", choices: ["ㄨ<br>ㄢˇ<br><br>ㄒ<br>ㄩ<br>ㄥˊ", "ㄨ<br>ㄢˇ<br><br>ㄒ<br>ㄧ<br>ㄥˊ"], 
    answer: "ㄨ<br>ㄢˇ<br><br>ㄒ<br>ㄩ<br>ㄥˊ" },
  { word: "6", choices: ["ㄏ<br>ㄨ<br>ㄢ<br><br>ㄐ<br>ㄧˇ", "ㄏ<br>ㄨ<br>ㄢ<br><br>ㄒ<br>ㄧˇ"], 
    answer: "ㄏ<br>ㄨ<br>ㄢ<br><br>ㄒ<br>ㄧˇ" },
  { word: "7", choices: ["ㄒ<br>ㄧ<br><br>ㄋ<br>ㄧ<br>ㄡˊ", "ㄒ<br>ㄧ<br><br>ㄋ<br>ㄡˊ"], 
    answer: "ㄒ<br>ㄧ<br><br>ㄋ<br>ㄧ<br>ㄡˊ" },
  { word: "8", choices: ["ㄜˊ<br><br>˙<br>ㄗ", "ㄦˊ<br><br>˙<br>ㄗ"], 
    answer: "ㄦˊ<br><br>˙<br>ㄗ" },
  { word: "9", choices: ["ㄦˋ<br><br>ㄌ<br>ㄡˊ", "ㄦˋ<br><br>ㄖ<br>ㄡˊ"], 
    answer: "ㄦˋ<br><br>ㄌ<br>ㄡˊ" },
  { word: "10", choices: ["ㄦˇ<br><br>˙<br>ㄉ<br>ㄨ<br>ㄛ", "ㄦˇ<br><br>ㄉ<br>ㄨ<br>ㄜ"], 
    answer: "ㄦˇ<br><br>˙<br>ㄉ<br>ㄨ<br>ㄛ" },
  { word: "11", choices: ["ㄜˋ<br><br>ㄩˊ", "ㄛˋ<br><br>ㄩˊ"], 
    answer: "ㄜˋ<br><br>ㄩˊ" },
 { word: "12", choices: ["ㄑ<br>ㄧˋ<br><br>ㄛˊ", "ㄑ<br>ㄧˋ<br><br>ㄜˊ"], 
    answer: "ㄑ<br>ㄧˋ<br><br>ㄜˊ" },
 { word: "13", choices: ["ㄨ<br>ㄢ<br><br>ㄧ<br>ㄠ", "ㄢ<br><br>ㄧ<br>ㄠ"], 
    answer: "ㄨ<br>ㄢ<br><br>ㄧ<br>ㄠ" },
 { word: "14", choices: ["ㄧ<br>ㄠˊ<br><br>ㄖ<br>ㄢˊ", "ㄧ<br>ㄠˊ<br><br>ㄌ<br>ㄢˊ"], 
    answer: "ㄧ<br>ㄠˊ<br><br>ㄌ<br>ㄢˊ" }
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

