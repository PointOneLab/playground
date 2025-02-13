// 游戏统计系统
const powPartyStats = {
    // 统计数据
    stats: {
        gameStats: {
            totalGamesPlayed: 0,
            totalRoundsPlayed: 0,
            startTime: null,
            totalPlayTime: 0,
            averageRoundTime: 0
        },
        playerStats: {}, // 按玩家ID存储的统计数据
        cardStats: {
            totalCardsDrawn: 0,
            cardTypeDistribution: {
                '惩罚': 0,
                '游戏': 0,
                '权利': 0
            }
        },
        poolStats: {
            alcohol: {
                totalAdded: 0,
                totalRemoved: 0,
                peakAmount: 0
            },
            money: {
                totalAdded: 0,
                totalRemoved: 0,
                peakAmount: 0
            }
        }
    },

    // 初始化统计系统
    init() {
        this.loadStats();
        this.initializePlayerStats();
        this.startTracking();
    },

    // 开始追踪统计数据
    startTracking() {
        // 监听资源池变化
        this.trackPoolChanges();
        // 监听卡片使用
        this.trackCardUsage();
        // 开始计时
        this.stats.gameStats.startTime = Date.now();
    },

    // 初始化玩家统计数据
    initializePlayerStats() {
        powPartyGame.state.players.forEach(player => {
            if (!this.stats.playerStats[player.id]) {
                this.stats.playerStats[player.id] = {
                    cardsDrawn: 0,
                    timesDangerous: 0,
                    timesSafe: 0,
                    alcoholConsumed: 0,
                    moneyPaid: 0,
                    lastActiveTime: Date.now()
                };
            }
        });
    },

    // 追踪资源池变化
    trackPoolChanges() {
        // 使用代理监听资源池状态变化
        const originalAddAlcohol = powPartyPool.addAlcohol;
        powPartyPool.addAlcohol = (amount) => {
            const result = originalAddAlcohol.call(powPartyPool, amount);
            if (result) {
                this.stats.poolStats.alcohol.totalAdded += amount;
                this.stats.poolStats.alcohol.peakAmount = Math.max(
                    this.stats.poolStats.alcohol.peakAmount,
                    powPartyPool.state.alcohol.current
                );
            }
            return result;
        };

        const originalAddMoney = powPartyPool.addMoney;
        powPartyPool.addMoney = (amount) => {
            const result = originalAddMoney.call(powPartyPool, amount);
            if (result) {
                this.stats.poolStats.money.totalAdded += amount;
                this.stats.poolStats.money.peakAmount = Math.max(
                    this.stats.poolStats.money.peakAmount,
                    powPartyPool.state.money.current
                );
            }
            return result;
        };
    },

    // 追踪卡片使用
    trackCardUsage() {
        const originalHandleCardEffect = powPartyCard.handleCardEffect;
        powPartyCard.handleCardEffect = (card, currentPlayer) => {
            const result = originalHandleCardEffect.call(powPartyCard, card, currentPlayer);
            if (result) {
                this.stats.cardStats.totalCardsDrawn++;
                this.stats.cardStats.cardTypeDistribution[card.cardType]++;
                
                if (currentPlayer && currentPlayer.id) {
                    this.stats.playerStats[currentPlayer.id].cardsDrawn++;
                    this.updatePlayerStats(currentPlayer, card);
                }
            }
            return result;
        };
    },

    // 更新玩家统计数据
    updatePlayerStats(player, card) {
        const playerStats = this.stats.playerStats[player.id];
        playerStats.lastActiveTime = Date.now();

        if (card.dangerous === 'set to current player') {
            playerStats.timesDangerous++;
        }
        if (card.safe === 'set to current player') {
            playerStats.timesSafe++;
        }
        if (card.poolalcohol && card.poolalcohol > 0) {
            playerStats.alcoholConsumed += card.poolalcohol;
        }
        if (card.poolmoney && card.poolmoney > 0) {
            playerStats.moneyPaid += card.poolmoney;
        }
    },

    // 获取游戏统计摘要
    getGameSummary() {
        const currentTime = Date.now();
        this.stats.gameStats.totalPlayTime = currentTime - this.stats.gameStats.startTime;
        this.stats.gameStats.averageRoundTime = this.stats.gameStats.totalRoundsPlayed > 0 
            ? this.stats.gameStats.totalPlayTime / this.stats.gameStats.totalRoundsPlayed 
            : 0;

        return {
            duration: this.formatDuration(this.stats.gameStats.totalPlayTime),
            totalRounds: this.stats.gameStats.totalRoundsPlayed,
            averageRoundTime: this.formatDuration(this.stats.gameStats.averageRoundTime),
            cardStats: this.stats.cardStats,
            poolStats: this.stats.poolStats
        };
    },

    // 获取玩家统计数据
    getPlayerStats(playerId) {
        return this.stats.playerStats[playerId] || null;
    },

    // 获取所有玩家的排名数据
    getPlayerRankings() {
        return Object.entries(this.stats.playerStats)
            .map(([id, stats]) => ({
                id,
                name: powPartyGame.state.players.find(p => p.id === id)?.name || '未知玩家',
                ...stats
            }))
            .sort((a, b) => b.cardsDrawn - a.cardsDrawn);
    },

    // 保存统计数据
    saveStats() {
        try {
            localStorage.setItem('powPartyStats', JSON.stringify(this.stats));
        } catch (error) {
            console.error('保存统计数据失败:', error);
        }
    },

    // 加载统计数据
    loadStats() {
        try {
            const savedStats = localStorage.getItem('powPartyStats');
            if (savedStats) {
                this.stats = JSON.parse(savedStats);
            }
        } catch (error) {
            console.error('加载统计数据失败:', error);
        }
    },

    // 重置统计数据
    resetStats() {
        this.stats = {
            gameStats: {
                totalGamesPlayed: 0,
                totalRoundsPlayed: 0,
                startTime: Date.now(),
                totalPlayTime: 0,
                averageRoundTime: 0
            },
            playerStats: {},
            cardStats: {
                totalCardsDrawn: 0,
                cardTypeDistribution: {
                    '惩罚': 0,
                    '游戏': 0,
                    '权利': 0
                }
            },
            poolStats: {
                alcohol: {
                    totalAdded: 0,
                    totalRemoved: 0,
                    peakAmount: 0
                },
                money: {
                    totalAdded: 0,
                    totalRemoved: 0,
                    peakAmount: 0
                }
            }
        };
        this.saveStats();
    },

    // 工具方法：格式化持续时间
    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        return `${hours}小时${minutes % 60}分${seconds % 60}秒`;
    }
};

// 初始化统计系统
document.addEventListener('DOMContentLoaded', () => {
    powPartyStats.init();
    
    // 定期保存统计数据
    setInterval(() => {
        powPartyStats.saveStats();
    }, 60000); // 每分钟保存一次
    
    // 页面关闭前保存统计数据
    window.addEventListener('beforeunload', () => {
        powPartyStats.saveStats();
    });
});