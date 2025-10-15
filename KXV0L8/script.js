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
  {
    word: "1",
    choices: ["ㄅ<br>ㄚˊ<br><br>ㄌ<br>ㄨ<br>ㄛˊ<br><br>˙<br>ㄅ<br>ㄛ", "ㄅ<br>ㄚˊ<br><br>ㄌ<br>ㄛˊ<br><br>˙<br>ㄅ<br>ㄛ"],
    answer: "ㄅ<br>ㄚˊ<br><br>ㄌ<br>ㄨ<br>ㄛˊ<br><br>˙<br>ㄅ<br>ㄛ"
  },
  {
    word: "2",
    choices: ["ㄘ<br>ㄞˋ<br><br>ㄩ<br>ㄢˊ", "ㄔ<br>ㄞˋ<br><br>ㄩ<br>ㄢˊ"],
    answer: "ㄘ<br>ㄞˋ<br><br>ㄩ<br>ㄢˊ"
  },
  {
    word: "3",
    choices: ["ㄉ<br>ㄚˋ<br><br>ㄐ<br>ㄧ<br>ㄚ", "ㄉ<br>ㄚˋ<br><br>ㄐ<br>ㄚ"],
    answer: "ㄉ<br>ㄚˋ<br><br>ㄐ<br>ㄧ<br>ㄚ"
  },
  {
    word: "4",
    choices: ["ㄏ<br>ㄟ<br><br>ㄧ<br>ㄛ", "ㄏ<br>ㄟ<br><br>ㄡ"],
    answer: "ㄏ<br>ㄟ<br><br>ㄧ<br>ㄛ"
  },
  {
    word: "5",
    choices: ["ㄎ<br>ㄨ<br>ㄞˋ<br><br>ㄌ<br>ㄞˊ", "ㄍ<br>ㄨ<br>ㄞˋ<br><br>ㄌ<br>ㄞˊ"],
    answer: "ㄎ<br>ㄨ<br>ㄞˋ<br><br>ㄌ<br>ㄞˊ"
  },
  {
    word: "6",
    choices: ["ㄏ<br>ㄨ<br>ㄤˊ<br><br>ㄋ<br>ㄧ<br>ㄡˊ", "ㄏ<br>ㄨ<br>ㄤˊ<br><br>ㄌ<br>ㄧ<br>ㄡˊ"],
    answer: "ㄏ<br>ㄨ<br>ㄤˊ<br><br>ㄋ<br>ㄧ<br>ㄡˊ"
  },
  {
    word: "7",
    choices: ["ㄉ<br>ㄚˋ<br><br>ㄒ<br>ㄧ<br>ㄤˋ", "ㄊ<br>ㄚˋ<br><br>ㄒ<br>ㄧ<br>ㄤˋ"],
    answer: "ㄉ<br>ㄚˋ<br><br>ㄒ<br>ㄧ<br>ㄤˋ"
  },
  {
    word: "8",
    choices: ["ㄨ<br>ㄢˇ<br><br>ㄒ<br>ㄩ<br>ㄥˊ", "ㄨ<br>ㄢˇ<br><br>ㄒ<br>ㄧ<br>ㄥˊ"],
    answer: "ㄨ<br>ㄢˇ<br><br>ㄒ<br>ㄩ<br>ㄥˊ"
  },
  {
    word: "9",
    choices: ["ㄖ<br>ㄜˋ<br><br>ㄋ<br>ㄠˋ", "ㄌ<br>ㄜˋ<br><br>ㄋ<br>ㄠˋ"],
    answer: "ㄖ<br>ㄜˋ<br><br>ㄋ<br>ㄠˋ"
  },
  {
    word: "10",
    choices: ["ㄐ<br>ㄩ<br>ㄢˇ<br><br>ㄑ<br>ㄧˇ", "ㄐ<br>ㄢˇ<br><br>ㄑ<br>ㄧˇ"],
    answer: "ㄐ<br>ㄩ<br>ㄢˇ<br><br>ㄑ<br>ㄧˇ"
  },
  {
    word: "11",
    choices: ["ㄒ<br>ㄧ<br>ㄡˋ<br><br>˙<br>ㄗ", "ㄒ<br>ㄡˋ<br><br>˙<br>ㄗ"],
    answer: "ㄒ<br>ㄧ<br>ㄡˋ<br><br>˙<br>ㄗ"
  },
  {
    word: "12",
    choices: ["ㄖˋ<br><br>ㄌ<br>ㄧˋ", "ㄌˋ<br><br>ㄌ<br>ㄧˋ"],
    answer: "ㄖˋ<br><br>ㄌ<br>ㄧˋ"
  },
  {
    word: "13",
    choices: ["ㄘˊ<br><br>ㄊ<br>ㄧ<br>ㄝˇ", "ㄔˊ<br><br>ㄊ<br>ㄧ<br>ㄝˇ"],
    answer: "ㄘˊ<br><br>ㄊ<br>ㄧ<br>ㄝˇ"
  },
  {
    word: "14",
    choices: ["ㄧ<br>ㄡˊ<br><br>ㄩ<br>ㄥˇ", "ㄡˊ<br><br>ㄩ<br>ㄥˇ"],
    answer: "ㄧ<br>ㄡˊ<br><br>ㄩ<br>ㄥˇ"
  }
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
