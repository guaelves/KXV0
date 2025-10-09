<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<title>注音辨識小遊戲</title>
<style>
  body {
    font-family: "Microsoft JhengHei", sans-serif;
    background: #f0f8ff;
    text-align: center;
    padding: 20px;
  }
  #intro-container, #game-container {
    margin-top: 30px;
  }
  .choice-button {
    display: inline-block;
    font-size: 28px;
    line-height: 1.6;
    padding: 15px 25px;
    margin: 10px;
    background: #fff;
    border: 2px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    min-width: 140px;
  }
  .choice-button:hover {
    background: #eef;
  }
  #feedback {
    font-size: 26px;
    margin-top: 20px;
  }
  button {
    font-size: 22px;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }
  #start-button {
    background-color: #ffb347;
  }
  #next-button {
    background-color: #87ceeb;
  }
  #restart-button {
    background-color: #90ee90;
  }
</style>
</head>
<body>
  <h1>注音辨識小遊戲</h1>
  <div id="intro-container">
    <p>點擊開始，選出正確的注音！</p>
    <button id="start-button">開始遊戲</button>
  </div>

  <div id="game-container" style="display:none;">
    <h2 id="question-word"></h2>
    <div id="choices"></div>
    <div id="feedback"></div>
    <button id="next-button" style="display:none;">下一題</button>
  </div>

  <script>
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
    { word: "1", choices: [
      "ㄑ<br>ㄧㄠˋ<br><br>ㄑ<br>ㄧㄠˋ<br><br>ㄅ<br>ㄢˇ",
      "ㄐ<br>ㄧㄠˋ<br><br>ㄐ<br>ㄧㄠˋ<br><br>ㄅ<br>ㄢˇ"
    ], answer: "ㄑ<br>ㄧㄠˋ<br><br>ㄑ<br>ㄧㄠˋ<br><br>ㄅ<br>ㄢˇ" },

    { word: "2", choices: [
      "ㄏ<br>ㄠˇ<br><br>ㄆ<br>ㄥˊ<br><br>ㄧ<br>ㄡˇ",
      "ㄏ<br>ㄠˇ<br><br>ㄆ<br>ㄣˊ<br><br>ㄧ<br>ㄡˇ"
    ], answer: "ㄏ<br>ㄠˇ<br><br>ㄆ<br>ㄥˊ<br><br>ㄧ<br>ㄡˇ" },

    { word: "3", choices: [
      "ㄧˋ<br><br>ㄑ<br>ㄧˇ",
      "ㄧˋ<br><br>ㄑ<br>ㄩˇ"
    ], answer: "ㄧˋ<br><br>ㄑ<br>ㄧˇ" },

    { word: "4", choices: [
      "ㄌ<br>ㄞˊ<br><br>ㄨ<br>ㄢˊ",
      "ㄉ<br>ㄞˊ<br><br>ㄨ<br>ㄢˊ"
    ], answer: "ㄌ<br>ㄞˊ<br><br>ㄨ<br>ㄢˊ" },

    { word: "5", choices: [
      "ㄕ<br>ㄤˋ<br><br>ㄒ<br>ㄧㄚˋ",
      "ㄙ<br>ㄤˋ<br><br>ㄒ<br>ㄧㄚˋ"
    ], answer: "ㄕ<br>ㄤˋ<br><br>ㄒ<br>ㄧㄚˋ" },

    { word: "6", choices: [
      "ㄍ<br>ㄠ<br><br>ㄉ<br>ㄧ",
      "ㄎ<br>ㄠ<br><br>ㄉ<br>ㄧ"
    ], answer: "ㄍ<br>ㄠ<br><br>ㄉ<br>ㄧ" },

    { word: "7", choices: [
      "ㄏ<br>ㄠˇ<br><br>ㄒ<br>ㄧㄤˋ",
      "ㄏ<br>ㄠˇ<br><br>ㄐ<br>ㄧㄤˋ"
    ], answer: "ㄏ<br>ㄠˇ<br><br>ㄒ<br>ㄧㄤˋ" },

    { word: "8", choices: [
      "ㄒ<br>ㄧㄠˇ<br><br>ㄋ<br>ㄧㄠˇ",
      "ㄒ<br>ㄧㄠˇ<br><br>ㄌ<br>ㄧㄠˇ"
    ], answer: "ㄒ<br>ㄧㄠˇ<br><br>ㄋ<br>ㄧㄠˇ" },

    { word: "9", choices: [
      "ㄈ<br>ㄟ<br><br>ㄒ<br>ㄧㄤˊ",
      "ㄏ<br>ㄟ<br><br>ㄒ<br>ㄧㄤˊ"
    ], answer: "ㄈ<br>ㄟ<br><br>ㄒ<br>ㄧㄤˊ" },

    { word: "10", choices: [
      "ㄇ<br>ㄧˋ<br><br>ㄈ<br>ㄥ",
      "ㄇ<br>ㄧˋ<br><br>ㄏ<br>ㄥ"
    ], answer: "ㄇ<br>ㄧˋ<br><br>ㄈ<br>ㄥ" },

    { word: "11", choices: [
      "ㄩˊ<br><br>ㄍ<br>ㄢ",
      "ㄩˊ<br><br>ㄎ<br>ㄢ"
    ], answer: "ㄩˊ<br><br>ㄍ<br>ㄢ" },

    { word: "12", choices: [
      "ㄍ<br>ㄡˋ<br><br>ㄇ<br>ㄞˇ",
      "ㄍ<br>ㄡˋ<br><br>ㄅ<br>ㄞˇ"
    ], answer: "ㄍ<br>ㄡˋ<br><br>ㄇ<br>ㄞˇ" },

    { word: "13", choices: [
      "ㄨ<br>ㄢˊ<br><br>ㄑ<br>ㄧㄡˊ",
      "ㄨ<br>ㄢˊ<br><br>ㄐ<br>ㄧㄡˊ"
    ], answer: "ㄨ<br>ㄢˊ<br><br>ㄑ<br>ㄧㄡˊ" }
  ];

  let shuffledIndexes = [];
  let currentIndex = 0;
  let correctCount = 0;
  let wrongAnswers = [];

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

  // 顯示題目（增加：選項隨機左右順序）
  function showQuestion() {
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
    const q = questions[shuffledIndexes[currentIndex]];
    questionNumberEl.textContent = `題目：${currentIndex + 1}`;
    choicesEl.innerHTML = "";

    // ✅ 將選項隨機排序
    const randomChoices = shuffle([...q.choices]);

    randomChoices.forEach(choice => {
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
      wrongAnswers.push({ word: q.word, correct: q.answer, selected: selected });
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

  // 開始按鈕
  startBtn.onclick = () => {
    introContainer.style.display = "none";
    gameContainer.style.display = "block";
    startGame();
  };
  </script>
</body>
</html>

