// 音效管理系统
const powPartyAudio = {
    // 音效状态
    state: {
        isMuted: false,
        volume: 0.5,
        currentBGM: null
    },

    // 音效资源（使用 AudioContext 创建音效）
    sounds: {
        // 基础音效生成器
        createOscillator(type, frequency, duration) {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
            
            gainNode.gain.setValueAtTime(this.state.volume, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
            
            return { oscillator, gainNode, audioCtx };
        },

        // 按钮点击音效
        buttonClick() {
            if (this.state.isMuted) return;
            
            const { oscillator, gainNode, audioCtx } = this.createOscillator('sine', 800, 0.1);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        },

        // 洗牌音效
        shuffle() {
            if (this.state.isMuted) return;
            
            const { oscillator, gainNode, audioCtx } = this.createOscillator('sawtooth', 400, 0.2);
            oscillator.start();
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime + 0.1);
            oscillator.stop(audioCtx.currentTime + 0.2);
        },

        // 抽牌音效
        drawCard() {
            if (this.state.isMuted) return;
            
            const { oscillator, gainNode, audioCtx } = this.createOscillator('sine', 500, 0.3);
            oscillator.start();
            oscillator.frequency.setValueAtTime(700, audioCtx.currentTime + 0.15);
            oscillator.stop(audioCtx.currentTime + 0.3);
        },

        // 权利卡音效
        rightCard() {
            if (this.state.isMuted) return;
            
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(this.state.volume, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.4);
        },

        // 惩罚卡音效
        punishmentCard() {
            if (this.state.isMuted) return;
            
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
            oscillator.frequency.setValueAtTime(300, audioCtx.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(this.state.volume, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.4);
        },

        // 游戏卡音效
        gameCard() {
            if (this.state.isMuted) return;
            
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(this.state.volume, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.3);
        }
    },

    // 播放特定类型卡片的音效
    playCardSound(cardType) {
        if (this.state.isMuted) return;
        
        switch (cardType) {
            case '权利':
                this.sounds.rightCard();
                break;
            case '惩罚':
                this.sounds.punishmentCard();
                break;
            case '游戏':
                this.sounds.gameCard();
                break;
        }
    },

    // 音量控制
    setVolume(value) {
        this.state.volume = Math.max(0, Math.min(1, value));
    },

    // 静音切换
    toggleMute() {
        this.state.isMuted = !this.state.isMuted;
        return this.state.isMuted;
    }
};

// 将音效系统集成到现有系统中
document.addEventListener('DOMContentLoaded', () => {
    // 为按钮添加音效
    document.querySelectorAll('.pow-party-game-button').forEach(button => {
        button.addEventListener('click', () => {
            powPartyAudio.sounds.buttonClick();
        });
    });
});