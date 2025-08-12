const { createApp } = Vue;

// ====================================================================
// DATA CONFIGURATION
// ====================================================================

const JAPANESE_WORDS = [
    'こんにちは', 'ありがとう', 'さようなら', 'おはよう', 'こんばんは',
    'すみません', 'はじめまして', 'よろしく', 'がんばって', 'おめでとう',
    'たべもの', 'のみもの', 'やすみ', 'べんきょう', 'しごと',
    'がっこう', 'いえ', 'ともだち', 'かぞく', 'せんせい',
    'みず', 'おちゃ', 'こーひー', 'パン', 'ごはん',
    'さかな', 'にく', 'やさい', 'くだもの', 'あまい',
    'あつい', 'さむい', 'あたらしい', 'ふるい', 'おおきい',
    'ちいさい', 'たかい', 'やすい', 'はやい', 'おそい'
];

const KEYBOARD_LAYOUT = {
    row1: [
        { key: '1', kana: 'ぬ' }, { key: '2', kana: 'ふ' }, { key: '3', kana: 'あ' }, 
        { key: '4', kana: 'う' }, { key: '5', kana: 'え' }, { key: '6', kana: 'お' }, 
        { key: '7', kana: 'や' }, { key: '8', kana: 'ゆ' }, { key: '9', kana: 'よ' }, 
        { key: '0', kana: 'わ' }, { key: '-', kana: 'ほ' }, { key: '=', kana: '・' }
    ],
    row2: [
        { key: 'q', kana: 'た' }, { key: 'w', kana: 'て' }, { key: 'e', kana: 'い' }, 
        { key: 'r', kana: 'す' }, { key: 't', kana: 'か' }, { key: 'y', kana: 'ん' }, 
        { key: 'u', kana: 'な' }, { key: 'i', kana: 'に' }, { key: 'o', kana: 'ら' }, 
        { key: 'p', kana: 'せ' }, { key: '[', kana: '゛' }, { key: ']', kana: '゜' },
        { key: '\\', kana: 'む'}
    ],
    row3: [
        { key: 'a', kana: 'ち' }, { key: 's', kana: 'と' }, { key: 'd', kana: 'し' }, 
        { key: 'f', kana: 'は' }, { key: 'g', kana: 'き' }, { key: 'h', kana: 'く' }, 
        { key: 'j', kana: 'ま' }, { key: 'k', kana: 'の' }, { key: 'l', kana: 'り' }, 
        { key: ';', kana: 'れ' }, { key: "'", kana: 'け' }
    ],
    row4: [
        { key: 'z', kana: 'つ' }, { key: 'x', kana: 'さ' }, { key: 'c', kana: 'そ' }, 
        { key: 'v', kana: 'ひ' }, { key: 'b', kana: 'こ' }, { key: 'n', kana: 'み' }, 
        { key: 'm', kana: 'も' }, { key: ',', kana: 'ね' }, { key: '.', kana: 'る' }, 
        { key: '/', kana: 'め' }
    ]
};

const SHIFT_KEYBOARD_LAYOUT = {
    row1: [
        { key: '1', kana: 'ぬ' }, { key: '2', kana: 'ふ' }, { key: '3', kana: 'ぁ' }, 
        { key: '4', kana: 'ぅ' }, { key: '5', kana: 'ぇ' }, { key: '6', kana: 'ぉ' }, 
        { key: '7', kana: 'ゃ' }, { key: '8', kana: 'ゅ' }, { key: '9', kana: 'ょ' }, 
        { key: '0', kana: 'を' }, { key: '-', kana: 'ー' }, { key: '=', kana: 'へ' }
    ],
    row2: [
        { key: 'q', kana: 'た' }, { key: 'w', kana: 'て' }, { key: 'e', kana: 'ぃ' }, 
        { key: 'r', kana: 'す' }, { key: 't', kana: 'か' }, { key: 'y', kana: 'ん' }, 
        { key: 'u', kana: 'な' }, { key: 'i', kana: 'に' }, { key: 'o', kana: 'ら' }, 
        { key: 'p', kana: 'せ' }, { key: '[', kana: '「' }, { key: ']', kana: '」' },
        { key: '\\', kana: 'む'}
    ],
    row3: [
        { key: 'a', kana: 'ち' }, { key: 's', kana: 'と' }, { key: 'd', kana: 'し' }, 
        { key: 'f', kana: 'は' }, { key: 'g', kana: 'き' }, { key: 'h', kana: 'く' }, 
        { key: 'j', kana: 'ま' }, { key: 'k', kana: 'の' }, { key: 'l', kana: 'り' }, 
        { key: ';', kana: 'れ' }, { key: "'", kana: 'け' }
    ],
    row4: [
        { key: 'z', kana: 'っ' }, { key: 'x', kana: 'さ' }, { key: 'c', kana: 'そ' }, 
        { key: 'v', kana: 'ひ' }, { key: 'b', kana: 'こ' }, { key: 'n', kana: 'み' }, 
        { key: 'm', kana: 'も' }, { key: ',', kana: '、' }, { key: '.', kana: '。' }, 
        { key: '/', kana: '・' }
    ]
};

const GAME_CONFIG = {
    WORDS_PER_ROUND: 10,
    WORD_COMPLETION_DELAY: 300,
    CHARS_PER_WORD: 5
};

// ====================================================================
// UTILITY FUNCTIONS
// ====================================================================

const GameUtils = {
    getRandomWord(words) {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    },

    calculateWPM(correctChars, startTime) {
        if (!startTime) return 0;
        const minutes = (Date.now() - startTime) / 60000;
        return Math.round((correctChars / GAME_CONFIG.CHARS_PER_WORD) / minutes) || 0;
    },

    calculateAccuracy(correctChars, totalChars) {
        if (totalChars === 0) return 100;
        return Math.round((correctChars / totalChars) * 100);
    },

    findKeyForCharacter(character, keyboardRows) {
        const allKeys = [...keyboardRows.row1, ...keyboardRows.row2, ...keyboardRows.row3, ...keyboardRows.row4];
        const keyMapping = allKeys.find(keyObj => keyObj.kana === character);
        return keyMapping ? keyMapping.key : null;
    },

    mapPhysicalKey(event) {
        let displayKey = event.code ? event.code.replace('Key', '').replace('Digit', '').toLowerCase() : event.key.toLowerCase();
        
        if (event.key === ' ') {
            return 'space';
        } else if (event.key === 'Enter') {
            return 'enter';
        }
        
        return displayKey;
    },

    detectInputMethod(event) {
        if (event.isComposing || event.keyCode === 229) {
            return 'japanese-ime';
        }
        
        if (event.inputType && event.inputType.includes('japanese')) {
            return 'japanese-direct';
        }
        
        const romajiPattern = /^[a-zA-Z]$/;
        if (romajiPattern.test(event.key)) {
            return 'romaji';
        }
        
        const kanaPattern = /[\u3040-\u309F\u30A0-\u30FF]/;
        if (kanaPattern.test(event.key)) {
            return 'kana-direct';
        }
        
        return 'standard';
    },

    getInputMethodName(inputMethod) {
        const methods = {
            'standard': 'Standard',
            'romaji': 'Romaji → Kana',
            'japanese-ime': 'Japanese IME',
            'kana-direct': 'Direct Kana',
            'japanese-direct': 'Japanese Direct'
        };
        return methods[inputMethod] || 'Unknown';
    }
};

// ====================================================================
// MAIN VUE APPLICATION
// ====================================================================

createApp({
    // =====================================
    // DATA
    // =====================================
    data() {
        return {
            // Game state
            currentWord: '',
            userInput: '',
            startTime: null,
            totalChars: 0,
            correctChars: 0,
            wordsCompleted: 0,
            gameEnded: false,
            showResults: false,
            
            // Round statistics
            roundStats: {
                wpm: 0,
                accuracy: 0,
                wordsCompleted: 0,
                timeSpent: 0
            },
            
            // UI state
            feedback: '',
            feedbackType: '',
            activeKey: '',
            inputMethod: 'standard',
            isComposing: false,
            compositionText: '',
            isWordComplete: false,
            showJapaneseLayout: true,
            
            // Keyboard layout from config
            ...KEYBOARD_LAYOUT
        };
    },

    // =====================================
    // COMPUTED PROPERTIES
    // =====================================
    computed: {
        wpm() {
            return GameUtils.calculateWPM(this.correctChars, this.startTime);
        },

        accuracy() {
            return GameUtils.calculateAccuracy(this.correctChars, this.totalChars);
        },

        nextKey() {
            if (!this.currentWord || this.userInput.length >= this.currentWord.length) {
                return null;
            }
            
            const nextChar = this.currentWord[this.userInput.length];
            return GameUtils.findKeyForCharacter(nextChar, {
                row1: this.row1,
                row2: this.row2,
                row3: this.row3,
                row4: this.row4
            });
        }
    },

    // =====================================
    // LIFECYCLE
    // =====================================
    mounted() {
        this.newWord();
        this.$refs.typingInput.focus();
    },

    // =====================================
    // METHODS
    // =====================================
    methods: {
        // =================================
        // GAME STATE MANAGEMENT
        // =================================
        newWord() {
            this.currentWord = GameUtils.getRandomWord(JAPANESE_WORDS);
            this.userInput = '';
            this.feedback = '';
            this.gameEnded = false;
            this.showResults = false;
            this.isWordComplete = false;
            this.$nextTick(() => {
                if (this.$refs.typingInput) {
                    this.$refs.typingInput.focus();
                }
            });
        },

        resetStats() {
            this.startTime = null;
            this.totalChars = 0;
            this.correctChars = 0;
            this.wordsCompleted = 0;
            this.feedback = '';
            this.showResults = false;
            this.isWordComplete = false;
            this.newWord();
        },

        endRound() {
            const endTime = Date.now();
            const timeSpent = (endTime - this.startTime) / 1000;
            
            this.roundStats = {
                wpm: this.wpm,
                accuracy: this.accuracy,
                wordsCompleted: this.wordsCompleted,
                timeSpent: Math.round(timeSpent)
            };
            
            this.showResults = true;
            this.gameEnded = true;
        },

        startNewRound() {
            this.resetStats();
        },

        toggleKeyboardLayout() {
            this.showJapaneseLayout = !this.showJapaneseLayout;
        },

        // =================================
        // INPUT HANDLING
        // =================================
        handleInput() {
            if (!this.startTime) {
                this.startTime = Date.now();
            }

            // Handle Japanese IME composition
            if (this.isComposing) {
                return;
            }

            // Prevent duplicate word completion
            if (this.isWordComplete) {
                return;
            }

            // Check if word is completed
            if (this.userInput === this.currentWord) {
                this.completeWord();
            } else if (this.userInput.length > this.currentWord.length) {
                // User typed too much - no feedback shown
            } else {
                this.updateStats();
            }
        },

        completeWord() {
            this.isWordComplete = true;
            this.wordsCompleted++;
            this.correctChars += this.currentWord.length;
            this.totalChars += this.currentWord.length;
            
            // Check if round is complete
            if (this.wordsCompleted >= GAME_CONFIG.WORDS_PER_ROUND) {
                this.endRound();
            } else {
                // Move to next word
                setTimeout(() => {
                    this.newWord();
                }, GAME_CONFIG.WORD_COMPLETION_DELAY);
            }
        },

        updateStats() {
            if (this.userInput.length <= this.currentWord.length) {
                this.totalChars = Math.max(this.totalChars, this.wordsCompleted * GAME_CONFIG.CHARS_PER_WORD + this.userInput.length);
                
                // Count correct characters
                let correctCount = 0;
                for (let i = 0; i < this.userInput.length; i++) {
                    if (this.userInput[i] === this.currentWord[i]) {
                        correctCount++;
                    }
                }
                this.correctChars = Math.max(this.correctChars, this.wordsCompleted * GAME_CONFIG.CHARS_PER_WORD + correctCount);
            }
            
            // Clear feedback
            this.feedback = '';
        },

        // =================================
        // COMPOSITION EVENTS (Japanese IME)
        // =================================
        handleCompositionStart(event) {
            this.isComposing = true;
            this.compositionText = '';
            console.log('Composition started:', this.inputMethod);
        },

        handleCompositionUpdate(event) {
            this.compositionText = event.data || '';
            console.log('Composition update:', this.compositionText);
        },

        handleCompositionEnd(event) {
            this.isComposing = false;
            this.compositionText = '';
            console.log('Composition ended, final text:', event.data);
            
            this.$nextTick(() => {
                this.handleInput();
            });
        },

        // =================================
        // KEYBOARD EVENTS
        // =================================
        handleKeyDown(event) {
            this.activeKey = GameUtils.mapPhysicalKey(event);
            this.inputMethod = GameUtils.detectInputMethod(event);
        },

        handleKeyUp() {
            this.activeKey = '';
        },

        // =================================
        // UI HELPERS
        // =================================
        getCharacterClass(index) {
            if (index < this.userInput.length) {
                return this.userInput[index] === this.currentWord[index] ? 'correct' : 'incorrect';
            } else if (index === this.userInput.length) {
                return 'current';
            }
            return '';
        },

        getInputMethodName() {
            return GameUtils.getInputMethodName(this.inputMethod);
        }
    }
}).mount('#app');