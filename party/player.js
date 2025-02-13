// 游戏核心状态管理
const powPartyGame = {
    // 游戏状态
    state: {
        players: [],
        currentPlayerIndex: 0,
        isGameStarted: false,
        roundCount: 0,
        startTime: null
    },

    // 玩家类
    Player: class {
        constructor(element) {
            this.id = crypto.randomUUID();
            this.element = element;
            this.nameElement = element.querySelector('.pow-party-player-name');
            this.imageContainer = element.querySelector('.pow-party-player-profile-image-container');
            this.name = this.nameElement?.textContent || '';
            this.isCurrentPlayer = false;
            this.isDangerous = false;
            this.isSafe = false;
        }

        // 设置玩家状态样式
        setStatusStyle() {
            this.imageContainer.style.transition = 'box-shadow 0.3s ease';
            if (this.isCurrentPlayer) {
                this.imageContainer.style.boxShadow = '0 0 15px #4CAF50'; // 当前玩家：绿色光环
            } else if (this.isDangerous) {
                this.imageContainer.style.boxShadow = '0 0 15px #FF5722'; // 形影不离：橙色光环
            } else if (this.isSafe) {
                this.imageContainer.style.boxShadow = '0 0 15px #FFC107'; // 免醉金牌：金色光环
            } else {
                this.imageContainer.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.3)'; // 默认：暗色光环
            }
        }
    },

    // 初始化游戏
    init() {
        // 获取所有玩家元素
        const playerElements = document.querySelectorAll('.pow-party-player-card');
        
        // 初始化玩家数组
        this.state.players = Array.from(playerElements).map(el => new this.Player(el));
        
        // 如果有玩家，设置第一个玩家为当前玩家
        if (this.state.players.length > 0) {
            this.state.players[0].isCurrentPlayer = true;
            this.state.players[0].setStatusStyle();
        }

        // 调试信息
        console.log(`游戏初始化完成，共有 ${this.state.players.length} 名玩家`);
        this.state.players.forEach(player => {
            console.log(`玩家: ${player.name}`);
        });
    },

    // 切换到下一个玩家
    nextPlayer() {
        // 重置当前玩家状态
        this.state.players[this.state.currentPlayerIndex].isCurrentPlayer = false;
        this.state.players[this.state.currentPlayerIndex].setStatusStyle();

        // 更新当前玩家索引
        this.state.currentPlayerIndex = (this.state.currentPlayerIndex + 1) % this.state.players.length;

        // 设置新的当前玩家状态
        this.state.players[this.state.currentPlayerIndex].isCurrentPlayer = true;
        this.state.players[this.state.currentPlayerIndex].setStatusStyle();

        // 增加回合数
        this.state.roundCount++;

        return this.state.players[this.state.currentPlayerIndex];
    },

    // 获取当前玩家
    getCurrentPlayer() {
        return this.state.players[this.state.currentPlayerIndex];
    },

    // 随机选择指定数量的其他玩家
    getRandomPlayers(count, excludeCurrentPlayer = true) {
        const availablePlayers = this.state.players.filter(player => 
            excludeCurrentPlayer ? !player.isCurrentPlayer : true
        );

        const shuffled = [...availablePlayers].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }
};

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    // 初始化游戏
    const gameContainer = document.querySelector('.pow-party-game');
    if (gameContainer) {
        powPartyGame.init();
    }
});