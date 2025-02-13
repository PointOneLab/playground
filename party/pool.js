// 资源池管理系统
const powPartyPool = {
    // 资源池状态
    state: {
        alcohol: {
            current: 0,
            accumulated: 0,
            maxLimit: 10 // 最大容量限制
        },
        money: {
            current: 0,
            accumulated: 0
        }
    },

    // DOM元素引用
    elements: {
        pools: {
            alcohol: {
                caption: null,
                number: null,
                unit: null
            },
            money: {
                caption: null,
                number: null,
                unit: null
            }
        }
    },

    // 初始化资源池系统
    init() {
        // 获取所有相关DOM元素
        const gameInfoContainers = document.querySelectorAll('.pow-party-game-info');
        
        gameInfoContainers.forEach((container, index) => {
            const caption = container.querySelector('.pow-party-game-action-caption');
            const number = container.querySelector('.pow-party-number');
            const unit = container.querySelector('.pow-party-unit');

            if (caption) {
                const captionText = caption.textContent.trim();
                if (captionText.includes('琼浆')) {
                    this.elements.pools.alcohol.caption = caption;
                    this.elements.pools.alcohol.number = number;
                    this.elements.pools.alcohol.unit = unit;
                } else if (captionText.includes('聚宝')) {
                    this.elements.pools.money.caption = caption;
                    this.elements.pools.money.number = number;
                    this.elements.pools.money.unit = unit;
                }
            }
        });

        // 初始化显示
        this.updateDisplay();
    },

    // 更新显示
    updateDisplay() {
        // 更新琼浆池显示
        if (this.elements.pools.alcohol.number) {
            this.elements.pools.alcohol.number.textContent = this.state.alcohol.current.toString();
        }
        if (this.elements.pools.alcohol.unit) {
            this.elements.pools.alcohol.unit.textContent = 'shot' + (this.state.alcohol.current !== 1 ? 's' : '');
        }

        // 更新聚宝盆显示
        if (this.elements.pools.money.number) {
            this.elements.pools.money.number.textContent = this.state.money.current.toString();
        }
        if (this.elements.pools.money.unit) {
            this.elements.pools.money.unit.textContent = '元';
        }
    },

    // 添加琼浆
    addAlcohol(amount) {
        if (amount <= 0) return false;
        
        const newAmount = Math.min(this.state.alcohol.current + amount, this.state.alcohol.maxLimit);
        const actualAdded = newAmount - this.state.alcohol.current;
        
        this.state.alcohol.current = newAmount;
        this.state.alcohol.accumulated += actualAdded;
        
        this.updateDisplay();
        return actualAdded;
    },

    // 移除琼浆
    removeAlcohol(amount) {
        if (amount <= 0) return false;
        
        const newAmount = Math.max(this.state.alcohol.current - amount, 0);
        const actualRemoved = this.state.alcohol.current - newAmount;
        
        this.state.alcohol.current = newAmount;
        
        this.updateDisplay();
        return actualRemoved;
    },

    // 清空琼浆池
    resetAlcohol() {
        this.state.alcohol.current = 0;
        this.updateDisplay();
    },

    // 添加金钱
    addMoney(amount) {
        if (amount <= 0) return false;
        
        this.state.money.current += amount;
        this.state.money.accumulated += amount;
        
        this.updateDisplay();
        return true;
    },

    // 移除金钱
    removeMoney(amount) {
        if (amount <= 0 || amount > this.state.money.current) return false;
        
        this.state.money.current -= amount;
        
        this.updateDisplay();
        return true;
    },

    // 清空聚宝盆
    resetMoney() {
        this.state.money.current = 0;
        this.updateDisplay();
    },

    // 获取资源池状态
    getPoolState() {
        return {
            alcohol: { ...this.state.alcohol },
            money: { ...this.state.money }
        };
    },

    // 检查是否满足资源条件
    checkPoolRequirements(requirements) {
        if (!requirements) return true;

        if (requirements.poolAlcoholAmount !== undefined) {
            if (typeof requirements.poolAlcoholAmount === 'number') {
                if (this.state.alcohol.current !== requirements.poolAlcoholAmount) return false;
            } else {
                const { min, max, exact } = requirements.poolAlcoholAmount;
                if (exact !== undefined && this.state.alcohol.current !== exact) return false;
                if (min !== undefined && this.state.alcohol.current < min) return false;
                if (max !== undefined && this.state.alcohol.current > max) return false;
            }
        }

        if (requirements.poolMoneyAmount !== undefined) {
            if (typeof requirements.poolMoneyAmount === 'number') {
                if (this.state.money.current !== requirements.poolMoneyAmount) return false;
            } else {
                const { min, max, exact } = requirements.poolMoneyAmount;
                if (exact !== undefined && this.state.money.current !== exact) return false;
                if (min !== undefined && this.state.money.current < min) return false;
                if (max !== undefined && this.state.money.current > max) return false;
            }
        }

        return true;
    }
};

// 初始化资源池系统
document.addEventListener('DOMContentLoaded', () => {
    powPartyPool.init();
});