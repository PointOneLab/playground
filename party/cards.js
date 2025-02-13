const powPartyCards = {
    cardSets: {
        cards: [
            {
                id: 'v我50',
                cardType: '惩罚',
                cardName: '发红包入池（给主持人）50',
                cardContent: '持牌者需献五十金入聚宝盆，似古时富商投资，重资入库。此盆为公共之财，静候良机。正如古时"财聚则散"之道。',
                cardEmoji: '💰',
                cardIsEnabled: true,
                cardPossibilityFactor: 5,
                requirements: {
                    gameRoundTotal: 10,
                    playerIsDangerous: false,
                    playerIsSafe: false,
                    poolAlcoholAmount: null,
                    poolMoneyAmount: null,
                    extraPlayersNeeded: 0
                },
                effects: {
                    poolMoney: (gameState) => {
                        gameState.pool.money += 50;
                    }
                }
            },
            {
                id: '形影不离',
                cardType: '惩罚',
                cardName: '小姐/小哥',
                cardContent: '如同《红楼梦》中袭人之于宝玉，持牌者需尽陪饮之责。她/他人每饮一分，君需饮一分。该牌又现，方得解脱。',
                cardEmoji: '👥',
                cardIsEnabled: true,
                cardPossibilityFactor: 5,
                requirements: {
                    playerIsDangerous: true,
                    playerIsSafe: true
                },
                effects: {
                    playerStatus: (gameState) => {
                        gameState.currentPlayer.isDangerous = true;
                        // 移除其他玩家的危险状态
                        gameState.players.forEach(player => {
                            if (player !== gameState.currentPlayer) {
                                player.isDangerous = false;
                            }
                        });
                    }
                }
            },
            {
                id: '飞钱散宝',
                cardType: '惩罚',
                cardName: '发红包群里数额自己定',
                cardContent: '需似古时"散财济众"，持牌者打开手机于群内发散红包，金额随心，一掷千金或半文铜钱，全凭心意。',
                cardEmoji: '🧧',
                cardIsEnabled: true,
                cardPossibilityFactor: 1,
                requirements: {},
                effects: {
                    // 这个卡片需要玩家实际操作，不需要修改游戏状态
                    action: () => true
                }
            },
            {
                id: '免醉金牌',
                cardType: '权利',
                cardName: '安全区',
                cardContent: '似封神榜中太乙真人赐下的金钱剑，持牌者可免除一切饮酒惩罚。待下一位有缘人抽得此牌，需交由新主。',
                cardEmoji: '🏅',
                cardIsEnabled: true,
                cardPossibilityFactor: 5,
                requirements: {
                    playerIsSafe: false
                },
                effects: {
                    playerStatus: (gameState) => {
                        // 移除其他玩家的安全状态
                        gameState.players.forEach(player => {
                            player.isSafe = false;
                        });
                        // 设置当前玩家为安全状态
                        gameState.currentPlayer.isSafe = true;
                    }
                }
            },
            {
                id: '天降鸿福',
                cardType: '权利',
                cardName: '天降鸿福',
                cardContent: '狄仁杰年少清贫，一日得赏，青云直上，富贵不可言。持牌者得此神牌，尽收聚宝盆中积财。正印证"时运亨通，天降鸿福"的气象。',
                cardEmoji: '🏆',
                cardIsEnabled: true,
                cardPossibilityFactor: 0.5,
                requirements: {
                    poolMoneyAmount: 200
                },
                effects: {
                    poolMoney: (gameState) => {
                        // 将聚宝盆中的钱转给当前玩家
                        gameState.currentPlayer.money += gameState.pool.money;
                        gameState.pool.money = 0;
                    }
                }
            }
        ]
    },

    // 获取所有启用的卡片
    getEnabledCards() {
        return this.cardSets.cards.filter(card => card.cardIsEnabled);
    },

    // 根据类型获取卡片
    getCardsByType(type) {
        return this.getEnabledCards().filter(card => card.cardType === type);
    },

    // 检查卡片是否可以在当前游戏状态下使用
    canCardBeUsed(card, gameState) {
        if (!card || !card.requirements) return false;

        const reqs = card.requirements;
        
        if (reqs.gameRoundTotal && gameState.roundCount < reqs.gameRoundTotal) {
            return false;
        }

        if (reqs.playerIsDangerous !== null && 
            gameState.currentPlayer.isDangerous !== reqs.playerIsDangerous) {
            return false;
        }

        if (reqs.playerIsSafe !== null && 
            gameState.currentPlayer.isSafe !== reqs.playerIsSafe) {
            return false;
        }

        if (reqs.poolAlcoholAmount && 
            gameState.pool.alcohol < reqs.poolAlcoholAmount) {
            return false;
        }

        if (reqs.poolMoneyAmount && 
            gameState.pool.money < reqs.poolMoneyAmount) {
            return false;
        }

        if (reqs.extraPlayersNeeded && 
            gameState.players.length < reqs.extraPlayersNeeded + 1) {
            return false;
        }

        return true;
    },

    // 应用卡片效果
    applyCardEffects(card, gameState) {
        if (!card || !card.effects) return;

        // 执行所有效果
        Object.values(card.effects).forEach(effect => {
            if (typeof effect === 'function') {
                effect(gameState);
            }
        });
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('卡片数据库已加载');
});