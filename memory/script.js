document.addEventListener('DOMContentLoaded', () => {
  const cardsData = [
    { id: 1, icon: '🍎' },
    { id: 2, icon: '🍎' },
    { id: 3, icon: '🍊' },
    { id: 4, icon: '🍊' },
    { id: 5, icon: '🍋' },
    { id: 6, icon: '🍋' },
    { id: 7, icon: '🍉' },
    { id: 8, icon: '🍉' },
    { id: 9, icon: '🍇' },
    { id: 10, icon: '🍇' },
    { id: 11, icon: '🍓' },
    { id: 12, icon: '🍓' },
    { id: 13, icon: '🍒' },
    { id: 14, icon: '🍒' },
    { id: 15, icon: '🥥' },
    { id: 16, icon: '🥥' },
  ];

  const gameBoard = document.getElementById('game-board');
  const moveCounter = document.getElementById('move-counter');
  const matchCounter = document.getElementById('match-counter');
  const resetButton = document.getElementById('reset-button');
  const stopButton = document.getElementById('stop-button');
  const timerDisplay = document.getElementById('timer');

  let cards = [];
  let flippedCards = [];
  let moves = 0;
  let matches = 0;
  let canFlip = true;
  let timer;
  let startTime;
  let elapsedTime = 0;
  const timeLimit = 120; // 2 minutes in seconds

  initializeGame();

  function initializeGame() {
    moves = 0;
    matches = 0;
    flippedCards = [];
    moveCounter.textContent = moves;
    matchCounter.textContent = matches;
    clearTimeout(timer);
    elapsedTime = 0;
    updateTimerDisplay();
    renderCards();
    setupEventListeners();
    startTimer();
  }

  function renderCards() {
    gameBoard.innerHTML = '';
    cards = [...cardsData];
    shuffleArray(cards);
    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.id = card.id;

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');

      const cardFront = document.createElement('div');
      cardFront.classList.add('card-front');
      cardFront.textContent = '?';

      const cardBack = document.createElement('div');
      cardBack.classList.add('card-back');
      cardBack.textContent = card.icon;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);

      cardElement.addEventListener('click', () => handleCardClick(cardElement));

      gameBoard.appendChild(cardElement);
    });
  }

  function setupEventListeners() {
    resetButton.addEventListener('click', initializeGame);
    stopButton.addEventListener('click', stopGame);
  }

  function handleCardClick(cardElement) {
    if (!canFlip || cardElement.classList.contains('flip') || flippedCards.length === 2) return;

    cardElement.classList.add('flip');
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }

  function checkForMatch() {
    const [card1, card2] = flippedCards;
    const icon1 = card1.querySelector('.card-back').textContent;
    const icon2 = card2.querySelector('.card-back').textContent;

    if (icon1 === icon2) {
      handleMatch();
    } else {
      handleMismatch();
    }
  }

  function handleMatch() {
    moves++;
    matches++;
    moveCounter.textContent = moves;
    matchCounter.textContent = matches;

    flippedCards.forEach(card => card.classList.add('matched'));
    flippedCards = [];

    if (matches === cardsData.length / 2) {
      setTimeout(() => {
        alert('Congratulations! You won the game!');
        initializeGame();
      }, 500);
    }
  }

  function handleMismatch() {
    moves++;
    moveCounter.textContent = moves;

    canFlip = false;
    setTimeout(() => {
      flippedCards.forEach(card => card.classList.remove('flip'));
      flippedCards = [];
      canFlip = true;
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function startTimer() {
    startTime = Date.now() - elapsedTime * 1000;
    timer = setInterval(() => {
      elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      updateTimerDisplay();

      if (elapsedTime >= timeLimit) {
        handleTimeOut();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function stopGame() {
    stopTimer();
    canFlip = false;
    alert('Game stopped. Click "Reset Game" to start again.');
  }

  function handleTimeOut() {
    stopTimer();
    canFlip = false;
    alert('Time out! Try again.');
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
});


