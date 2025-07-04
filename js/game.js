document.addEventListener('DOMContentLoaded', function () {
  // 垃圾分类数据
  const garbageTypes = {
    organic: [
      { name: '剩菜', emoji: '🍚' },
      { name: '果皮', emoji: '🍎' },
      { name: '落叶', emoji: '🍂' },
      { name: '骨头', emoji: '🦴' },
      { name: '蔬菜', emoji: '🥬' },
      { name: '水果', emoji: '🍌' },
      { name: '咖啡渣', emoji: '☕' },
      { name: '茶叶渣', emoji: '🍵' }
    ],
    recyclable: [
      { name: '塑料瓶', emoji: '🥤' },
      { name: '报纸', emoji: '📰' },
      { name: '易拉罐', emoji: '🥫' },
      { name: '玻璃瓶', emoji: '🍶' },
      { name: '旧衣服', emoji: '👕' },
      { name: '纸箱', emoji: '📦' },
      { name: '书本', emoji: '📚' },
      { name: '金属罐', emoji: '🔩' }
    ],
    hazardous: [
      { name: '电池', emoji: '🔋' },
      { name: '灯泡', emoji: '💡' },
      { name: '农药', emoji: '🧪' },
      { name: '油漆', emoji: '🎨' },
      { name: '化妆品', emoji: '💄' },
      { name: '温度计', emoji: '🌡️' },
      { name: '药品', emoji: '💊' },
      { name: '杀虫剂', emoji: '🧴' }
    ],
    other: [
      { name: '烟蒂', emoji: '🚬' },
      { name: '卫生纸', emoji: '🧻' },
      { name: '塑料袋', emoji: '🛍️' },
      { name: '保鲜膜', emoji: '📦' },
      { name: '尿布', emoji: '👶' },
      { name: '陶瓷碎片', emoji: '🏺' },
      { name: '棉签', emoji: 'Q' },
      { name: '创可贴', emoji: '🩹' }
    ]
  };

  // 游戏状态
  const gameState = {
    score: 0,
    timeLeft: 60,
    correctCount: 0,
    wrongCount: 0,
    gameActive: false,
    timer: null,
    currentGarbage: []
  };

  // DOM元素
  const elements = {
    startButton: document.getElementById('start-btn'),
    garbageContainer: document.getElementById('garbage-container'),
    scoreDisplay: document.getElementById('score-value'),
    timeDisplay: document.getElementById('time-value'),
    correctDisplay: document.getElementById('correct-value'),
    wrongDisplay: document.getElementById('wrong-value'),
    bins: {
      organic: document.getElementById('organic-bin'),
      recyclable: document.getElementById('recyclable-bin'),
      hazardous: document.getElementById('hazardous-bin'),
      other: document.getElementById('other-bin')
    },
    feedbackElement: document.getElementById('feedback'),
    gameOverModal: document.getElementById('game-over-modal'),
    finalScoreDisplay: document.getElementById('final-score'),
    correctCountDisplay: document.getElementById('final-correct'),
    wrongCountDisplay: document.getElementById('final-wrong'),
    restartButton: document.getElementById('restart-btn'),
    returnButton: document.getElementById('return-btn')
  };

  // 初始化游戏
  window.initGame = function () {
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.correctCount = 0;
    gameState.wrongCount = 0;
    gameState.gameActive = true;
    updateScoreboard();
    clearGarbageContainer();
    generateGarbageItems();
    startTimer();
  }

  // 生成垃圾项目
  function generateGarbageItems() {
    const allGarbage = [];

    // 从每个类别中随机选择2个垃圾项
    Object.values(garbageTypes).forEach(typeGarbage => {
      const shuffled = [...typeGarbage].sort(() => 0.5 - Math.random());
      allGarbage.push(...shuffled.slice(0, 2));
    });

    // 随机排序所有垃圾项
    const shuffledGarbage = allGarbage.sort(() => 0.5 - Math.random());
    gameState.currentGarbage = shuffledGarbage;

    // 创建垃圾项元素
    shuffledGarbage.forEach((item, index) => {
      const garbageType = Object.keys(garbageTypes).find(type =>
        garbageTypes[type].some(g => g.name === item.name)
      );

      const garbageElement = document.createElement('div');
      garbageElement.className = `garbage-item ${garbageType}-bg`;
      garbageElement.draggable = true;
      garbageElement.innerHTML = `
        <span>${item.emoji}</span>
        <span>${item.name}</span>
      `;
      garbageElement.dataset.type = garbageType;
      garbageElement.dataset.index = index;

      // 添加拖拽事件监听
      garbageElement.addEventListener('dragstart', handleDragStart);

      elements.garbageContainer.appendChild(garbageElement);
    });
  }

  // 拖拽开始处理函数
  function handleDragStart(e) {
    if (!gameState.gameActive) return;
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
    e.target.classList.add('dragging');
    setTimeout(() => e.target.classList.add('opacity-50'), 0);
  }

  // 为垃圾桶添加拖放事件监听
  function setupBinEventListeners() {
    Object.values(elements.bins).forEach(bin => {
      bin.addEventListener('dragover', e => e.preventDefault());
      bin.addEventListener('dragenter', e => {
        e.preventDefault();
        bin.classList.add('scale-110');
      });
      bin.addEventListener('dragleave', () => bin.classList.remove('scale-110'));
      bin.addEventListener('drop', handleDrop);
    });
  }

  // 处理拖放事件
  function handleDrop(e) {
    e.preventDefault();
    if (!gameState.gameActive) return;

    const garbageType = e.dataTransfer.getData('text/plain');
    const binType = e.target.closest('.bin').id.replace('-bin', '');
    const draggingElement = document.querySelector('.garbage-item.dragging');

    // 重置垃圾桶样式
    Object.values(elements.bins).forEach(bin => bin.classList.remove('scale-110'));

    // 检查分类是否正确
    const isCorrect = garbageType === binType;
    if (isCorrect) {
      gameState.score += 10;
      gameState.correctCount++;
      showFeedback('+10分！', 'correct');
    } else {
      gameState.score = Math.max(0, gameState.score - 5);
      gameState.wrongCount++;
      showFeedback('-5分！', 'wrong');
    }

    // 更新计分板
    updateScoreboard();

    // 移除拖拽元素
    if (draggingElement) {
      draggingElement.classList.add('scale-0');
      setTimeout(() => draggingElement.remove(), 300);
    }

    // 检查是否需要生成新的垃圾项
    const remainingGarbage = elements.garbageContainer.children.length - (draggingElement ? 1 : 0);
    if (remainingGarbage < 4) {
      setTimeout(generateGarbageItems, 500);
    }
  }

  // 开始计时器
  function startTimer() {
    clearInterval(gameState.timer);
    gameState.timer = setInterval(() => {
      gameState.timeLeft--;
      elements.timeDisplay.textContent = gameState.timeLeft;

      if (gameState.timeLeft <= 0) {
        endGame();
      } else if (gameState.timeLeft <= 10) {
        elements.timeDisplay.classList.add('text-red-500');
        elements.timeDisplay.classList.add('animate-pulse');
      }
    }, 1000);
  }

  // 更新计分板
  function updateScoreboard() {
    elements.scoreDisplay.textContent = gameState.score;
    elements.correctDisplay.textContent = gameState.correctCount;
    elements.wrongDisplay.textContent = gameState.wrongCount;
  }

  // 显示反馈
  function showFeedback(message, type) {
    elements.feedbackElement.textContent = message;
    elements.feedbackElement.className = `feedback show ${type}`;
    setTimeout(() => {
      elements.feedbackElement.classList.remove('show');
    }, 1500);
  }

  // 结束游戏
  function endGame() {
    gameState.gameActive = false;
    clearInterval(gameState.timer);

    //计算正确率
    const total = gameState.correctCount + gameState.wrongCount;
    const accuracy = (gameState.correctCount / total) * 100;
    // 显示游戏结束模态框
    elements.finalScoreDisplay.textContent = gameState.score;
    elements.correctCountDisplay.textContent = gameState.correctCount;
    elements.wrongCountDisplay.textContent = gameState.wrongCount;
    elements.accuracyDisplay = document.getElementById('accuracy');
    elements.accuracyDisplay.textContent = accuracy.toFixed(2) + '%';
    elements.gameOverModal.classList.add('active');
  }

  // 清空垃圾容器
  function clearGarbageContainer() {
    elements.garbageContainer.innerHTML = '';
  }

  // 事件监听器设置
  elements.startButton.addEventListener('click', initGame);
  elements.restartButton.addEventListener('click', () => {
    elements.gameOverModal.classList.remove('active');
    initGame();
  });
  elements.endGameButton = document.getElementById('end-game-btn');
  elements.endGameButton.addEventListener('click', endGame);
  elements.playAgainButton = document.getElementById('play-again-btn');
  elements.playAgainButton.addEventListener('click', () => {
    elements.gameOverModal.classList.remove('active');
    initGame();
  });

  // 返回按钮功能
  if (elements.returnButton) {
    elements.returnButton.addEventListener('click', () => {
      history.back();
    });
  }

  // 设置垃圾桶拖放事件
  setupBinEventListeners();
});