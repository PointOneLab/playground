// 卡片系统管理
const powPartyCard = {
    // 卡片类型枚举
    CardType: {
        PUNISHMENT: '惩罚',
        GAME: '游戏',
        RIGHT: '权利'
    },

    // 卡片数据
    cards: [
        // 这里之后会导入完整的卡片数据
    ],

    // 当前游戏状态
    state: {
        currentCard: null,
        isShuffling: false,
        shuffleInterval: null,
        lastDrawnType: null,
        cardsShown: new Set(), // 用于追踪已显示的卡片
    },

    // DOM 元素引用
    elements: {
        cardContainer: null,
        actionCaption: null,
        actionName: null,
        actionDetails: null,
        button: null,
        emoji: null
    },

    // 初始化卡片系统
    init() {
        // 获取相关DOM元素
        this.elements.cardContainer = document.querySelector('.pow-party-game-card');
        this.elements.actionCaption = document.querySelector('.pow-party-game-action-caption');
        this.elements.actionName = document.querySelector('.pow-party-game-action-name');
        this.elements.actionDetails = document.querySelector('.pow-party-game-action-details');
        this.elements.button = document.querySelector('.pow-party-game-button');

        // 初始化卡片数据
        this.initializeCardData();
        
        // 绑定按钮事件
        if (this.elements.button) {
            this.elements.button.addEventListener('click', () => {
                if (!this.state.isShuffling) {
                    this.startShuffle();
                } else {
                    this.stopShuffle();
                }
            });
        }
    },

    // 初始化卡片数据
    async initializeCardData() {
        // 这里之后会导入完整的卡片数据
        // 目前使用测试数据
        this.cards = [
            {
                cardAlias: "v我50",
                cardContent: "持牌者需献五十金入聚宝盆，似古时富商投资，重资入库。",
                cardType: this.CardType.PUNISHMENT,
                cardIsEnabled: true,
                cardEmoji: "💰",
                cardPossibilityFactor: 5,
                requirementsToShow: {
                    gameRoundTotal: 10,
                    playerIsDangerous: false,
                    playerIsSafe: false
                }
            },
            // ... 更多卡片数据
        ];
    },

    // 检查卡片是否可用
    isCardAvailable(card, currentPlayer, gameState) {
        if (!card.cardIsEnabled) return false;
        
        const reqs = card.requirementsToShow;
        if (reqs.gameRoundTotal && gameState.roundCount < reqs.gameRoundTotal) return false;
        if (reqs.playerIsDangerous && currentPlayer.isDangerous) return false;
        if (reqs.playerIsSafe && currentPlayer.isSafe) return false;
        
        // 避免连续出现同类型卡片
        if (this.state.lastDrawnType === card.cardType) {
            return Math.random() > 0.7;
        }

        return true;
    },

    // 获取可用卡片
    getAvailableCards(currentPlayer, gameState) {
        return this.cards.filter(card => 
            this.isCardAvailable(card, currentPlayer, gameState)
        );
    },

    // 开始洗牌动画
    startShuffle() {
        powPartyAudio.sounds.shuffle();
        this.state.isShuffling = true;
        this.elements.button.textContent = '抽牌';
        
        // 开始卡片切换动画
        this.state.shuffleInterval = setInterval(() => {
            const randomCard = this.cards[Math.floor(Math.random() * this.cards.length)];
            this.displayCard(randomCard, true);
        }, 100);
    },

    // 停止洗牌并选择最终卡片
    stopShuffle() {
        clearInterval(this.state.shuffleInterval);
        this.state.isShuffling = false;
        this.elements.button.textContent = '开启下一轮抽牌';

        // 获取当前玩家和游戏状态
        const currentPlayer = powPartyGame.getCurrentPlayer();
        const gameState = powPartyGame.state;

        // 获取可用卡片
        const availableCards = this.getAvailableCards(currentPlayer, gameState);
        
        if (availableCards.length === 0) {
            console.error('没有可用的卡片！');
            return;
        }

        // 根据权重选择卡片
        const totalWeight = availableCards.reduce((sum, card) => sum + (card.cardPossibilityFactor || 1), 0);
        let randomWeight = Math.random() * totalWeight;
        
        let selectedCard = availableCards[0];
        for (const card of availableCards) {
            randomWeight -= (card.cardPossibilityFactor || 1);
            if (randomWeight <= 0) {
                selectedCard = card;
                break;
            }
        }

        // 更新状态
        this.state.currentCard = selectedCard;
        this.state.lastDrawnType = selectedCard.cardType;
        this.cardsShown.add(selectedCard.cardAlias);

        // 显示选中的卡片
        this.displayCard(selectedCard, false);
        powPartyStats.stats.gameStats.totalRoundsPlayed++;
        powPartyAudio.playCardSound(selectedCard.cardType);

        // 触发卡片效果
        this.handleCardEffect(selectedCard, currentPlayer);
    },

    // 显示卡片
    displayCard(card, isShuffling = false) {
        if (!card) return;

        this.elements.actionCaption.textContent = card.cardAlias;
        this.elements.actionName.textContent = card.cardType;
        this.elements.actionDetails.textContent = card.cardContent;
        
        // 添加对应类型的动画效果
        if (!isShuffling) {
            this.addCardTypeAnimation(card.cardType);
        }
    },

    // 添加卡片类型动画
    addCardTypeAnimation(cardType) {
        const container = this.elements.cardContainer;
        container.classList.remove('pow-party-animation-punishment', 'pow-party-animation-game', 'pow-party-animation-right');
        
        switch (cardType) {
            case this.CardType.PUNISHMENT:
                container.classList.add('pow-party-animation-punishment');
                break;
            case this.CardType.GAME:
                container.classList.add('pow-party-animation-game');
                break;
            case this.CardType.RIGHT:
                container.classList.add('pow-party-animation-right');
                break;
        }
    },

    // 处理卡片效果
handleCardEffect(card, currentPlayer) {
    if (!powPartyEffects.canExecuteEffect(card)) {
        console.log('无法执行卡片效果：条件不满足');
        return false;
    }

    const success = powPartyEffects.executeCardEffect(card, currentPlayer);
    if (success) {
        const effectDescription = powPartyEffects.getEffectDescription(card);
        console.log(`执行卡片效果成功：${effectDescription}`);
    }

    return success;
}
};

// 初始化卡片系统
document.addEventListener('DOMContentLoaded', () => {
    powPartyCard.init();
});