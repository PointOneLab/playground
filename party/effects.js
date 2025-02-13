// 卡片效果处理系统
const powPartyEffects = {
    // 效果处理器映射
    handlers: {
        // 池子操作
        'poolalcohol': {
            add: (amount) => {
                return powPartyPool.addAlcohol(Number(amount));
            },
            reset: () => {
                return powPartyPool.resetAlcohol();
            }
        },
        'poolmoney': {
            add: (amount) => {
                return powPartyPool.addMoney(Number(amount));
            },
            reset: () => {
                return powPartyPool.resetMoney();
            }
        },
        
        // 玩家状态
        'safe': {
            'set to current player': (currentPlayer) => {
                powPartyGame.state.players.forEach(player => {
                    player.isSafe = false;
                    player.setStatusStyle();
                });
                currentPlayer.isSafe = true;
                currentPlayer.setStatusStyle();
                return true;
            }
        },
        'dangerous': {
            'set to current player': (currentPlayer) => {
                powPartyGame.state.players.forEach(player => {
                    player.isDangerous = false;
                    player.setStatusStyle();
                });
                currentPlayer.isDangerous = true;
                currentPlayer.setStatusStyle();
                return true;
            }
        }
    },

    // 执行卡片效果
    executeCardEffect(card, currentPlayer) {
        if (!card) return false;

        const effects = [];

        // 处理资金池效果
        if (card.poolmoney) {
            if (card.poolmoney === 'reset') {
                effects.push(() => this.handlers.poolmoney.reset());
            } else {
                effects.push(() => this.handlers.poolmoney.add(card.poolmoney));
            }
        }

        // 处理酒池效果
        if (card.poolalcohol) {
            if (card.poolalcohol === 'reset') {
                effects.push(() => this.handlers.poolalcohol.reset());
            } else {
                effects.push(() => this.handlers.poolalcohol.add(card.poolalcohol));
            }
        }

        // 处理安全状态
        if (card.safe === 'set to current player') {
            effects.push(() => this.handlers.safe['set to current player'](currentPlayer));
        }

        // 处理危险状态
        if (card.dangerous === 'set to current player') {
            effects.push(() => this.handlers.dangerous['set to current player'](currentPlayer));
        }

        // 执行所有效果
        return effects.every(effect => effect());
    },

    // 获取卡片效果描述
    getEffectDescription(card) {
        const effects = [];

        if (card.poolmoney) {
            if (card.poolmoney === 'reset') {
                effects.push('清空聚宝盆');
            } else {
                effects.push(`聚宝盆${card.poolmoney > 0 ? '增加' : '减少'}${Math.abs(card.poolmoney)}元`);
            }
        }

        if (card.poolalcohol) {
            if (card.poolalcohol === 'reset') {
                effects.push('清空琼浆池');
            } else {
                effects.push(`琼浆池${card.poolalcohol > 0 ? '增加' : '减少'}${Math.abs(card.poolalcohol)}杯`);
            }
        }

        if (card.safe === 'set to current player') {
            effects.push('获得免醉金牌');
        }

        if (card.dangerous === 'set to current player') {
            effects.push('进入形影不离状态');
        }

        return effects.join('，');
    },

    // 检查效果是否可执行
    canExecuteEffect(card) {
        // 检查金钱相关效果
        if (card.poolmoney && card.poolmoney !== 'reset') {
            if (card.poolmoney < 0 && Math.abs(card.poolmoney) > powPartyPool.state.money.current) {
                return false;
            }
        }

        // 检查酒水相关效果
        if (card.poolalcohol && card.poolalcohol !== 'reset') {
            if (card.poolalcohol < 0 && Math.abs(card.poolalcohol) > powPartyPool.state.alcohol.current) {
                return false;
            }
            if (card.poolalcohol > 0 && 
                (powPartyPool.state.alcohol.current + card.poolalcohol) > powPartyPool.state.alcohol.maxLimit) {
                return false;
            }
        }

        return true;
    }
};

// 动画效果助手
const powPartyAnimations = {
    // 添加卡片动画
    addCardAnimation(element, type) {
        element.style.transition = 'all 0.3s ease';
        
        switch (type) {
            case '惩罚':
                element.style.animation = 'cardPunishment 0.5s ease';
                element.style.backgroundColor = 'rgba(255, 87, 34, 0.1)';
                break;
            case '游戏':
                element.style.animation = 'cardGame 0.5s ease';
                element.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
                break;
            case '权利':
                element.style.animation = 'cardRight 0.5s ease';
                element.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                break;
        }

        // 动画结束后清除
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        }, { once: true });
    },

    // 添加资源池变化动画
    addPoolAnimation(element, isIncrease) {
        element.style.transition = 'all 0.3s ease';
        element.style.animation = isIncrease ? 'poolIncrease 0.5s ease' : 'poolDecrease 0.5s ease';
        
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        }, { once: true });
    }
};

// 添加必要的CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes cardPunishment {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); background-color: rgba(255, 87, 34, 0.2); }
        100% { transform: scale(1); }
    }

    @keyframes cardGame {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.05) rotate(5deg); background-color: rgba(33, 150, 243, 0.2); }
        100% { transform: scale(1) rotate(0deg); }
    }

    @keyframes cardRight {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); background-color: rgba(76, 175, 80, 0.2); }
        100% { transform: translateY(0); }
    }

    @keyframes poolIncrease {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); color: #4CAF50; }
        100% { transform: scale(1); }
    }

    @keyframes poolDecrease {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); color: #FF5722; }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// 初始化效果系统
document.addEventListener('DOMContentLoaded', () => {
    // 效果系统不需要特别的初始化
    console.log('效果系统已就绪');
});