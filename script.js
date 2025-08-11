const { createApp } = Vue;

createApp({
    data() {
        return {
            japaneseWords: [
                'こんにちは', 'ありがとう', 'さようなら', 'おはよう', 'こんばんは',
                'すみません', 'はじめまして', 'よろしく', 'がんばって', 'おめでとう',
                'たべもの', 'のみもの', 'やすみ', 'べんきょう', 'しごと',
                'がっこう', 'いえ', 'ともだち', 'かぞく', 'せんせい',
                'みず', 'おちゃ', 'こーひー', 'パン', 'ごはん',
                'さかな', 'にく', 'やさい', 'くだもの', 'あまい',
                'あつい', 'さむい', 'あたらしい', 'ふるい', 'おおきい',
                'ちいさい', 'たかい', 'やすい', 'はやい', 'おそい'
            ],
            currentWord: '',
            userInput: '',
            startTime: null,
            totalChars: 0,
            correctChars: 0,
            wordsCompleted: 0,
            gameEnded: false,
            showResults: false,
            roundStats: {
                wpm: 0,
                accuracy: 0,
                wordsCompleted: 0,
                timeSpent: 0
            },
            feedback: '',
            feedbackType: '',
            activeKey: '',
            inputMethod: 'standard',
            isComposing: false,
            compositionText: '',
            // Japanese JIS Keyboard Layout
            showJapaneseLayout: true,
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
                { key: 'p', kana: 'せ' }, { key: '[', kana: '゛' }, { key: ']', kana: '゜' }
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
    },
    computed: {
        wpm() {
            if (!this.startTime) return 0;
            const minutes = (Date.now() - this.startTime) / 60000;
            return Math.round((this.correctChars / 5) / minutes) || 0;
        },
        accuracy() {
            if (this.totalChars === 0) return 100;
            return Math.round((this.correctChars / this.totalChars) * 100);
        }
    },
    mounted() {
        this.newWord();
        this.$refs.typingInput.focus();
    },
    methods: {
        newWord() {
            const randomIndex = Math.floor(Math.random() * this.japaneseWords.length);
            this.currentWord = this.japaneseWords[randomIndex];
            this.userInput = '';
            this.feedback = '';
            this.gameEnded = false;
            this.showResults = false;
            this.$nextTick(() => {
                if (this.$refs.typingInput) {
                    this.$refs.typingInput.focus();
                }
            });
        },
        handleInput() {
            if (!this.startTime) {
                this.startTime = Date.now();
            }

            // Handle Japanese IME composition
            if (this.isComposing) {
                return; // Wait for composition to complete
            }

            // Check if word is completed
            if (this.userInput === this.currentWord) {
                this.wordsCompleted++;
                this.feedback = 'Perfect! Great job!';
                this.feedbackType = 'correct';
                this.correctChars += this.currentWord.length;
                this.totalChars += this.currentWord.length;
                
                // Check if round is complete (after 10 words)
                if (this.wordsCompleted >= 10) {
                    this.endRound();
                } else {
                    setTimeout(() => {
                        this.newWord();
                    }, 800);
                }
            } else if (this.userInput.length > this.currentWord.length) {
                // User typed too much
                this.feedback = 'Too many characters! Try again.';
                this.feedbackType = 'incorrect';
            } else {
                // Check current progress
                let correct = true;
                for (let i = 0; i < this.userInput.length; i++) {
                    if (this.userInput[i] !== this.currentWord[i]) {
                        correct = false;
                        break;
                    }
                }
                
                if (!correct) {
                    this.feedback = 'Check your typing - there\'s a mistake!';
                    this.feedbackType = 'incorrect';
                } else {
                    this.feedback = '';
                }
            }

            // Update total characters for accuracy calculation
            if (this.userInput.length <= this.currentWord.length) {
                this.totalChars = Math.max(this.totalChars, this.wordsCompleted * 5 + this.userInput.length);
                
                // Count correct characters
                let correctCount = 0;
                for (let i = 0; i < this.userInput.length; i++) {
                    if (this.userInput[i] === this.currentWord[i]) {
                        correctCount++;
                    }
                }
                this.correctChars = Math.max(this.correctChars, this.wordsCompleted * 5 + correctCount);
            }
        },
        
        // Handle composition events for Japanese IME
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
            // The input event will be triggered after this
        },
        handleKeyDown(event) {
            // Map the physical key to display on keyboard
            let displayKey = event.code ? event.code.replace('Key', '').replace('Digit', '').toLowerCase() : event.key.toLowerCase();
            
            // Handle special keys
            if (event.key === ' ') {
                this.activeKey = 'space';
            } else if (event.key === 'Enter') {
                this.activeKey = 'enter';
            } else {
                this.activeKey = displayKey;
            }
            
            // Detect Japanese input method
            this.detectInputMethod(event);
        },
        
        detectInputMethod(event) {
            // Check if composition is happening (Japanese IME is active)
            if (event.isComposing || event.keyCode === 229) {
                this.inputMethod = 'japanese-ime';
                console.log('Japanese IME detected');
                return;
            }
            
            // Check input locale if available
            if (event.inputType && event.inputType.includes('japanese')) {
                this.inputMethod = 'japanese-direct';
                return;
            }
            
            // Detect by key patterns for romaji input
            const romajiPattern = /^[a-zA-Z]$/;
            if (romajiPattern.test(event.key)) {
                this.inputMethod = 'romaji';
                return;
            }
            
            // Detect direct kana input
            const kanaPattern = /[\u3040-\u309F\u30A0-\u30FF]/;
            if (kanaPattern.test(event.key)) {
                this.inputMethod = 'kana-direct';
                return;
            }
            
            this.inputMethod = 'standard';
        },
        handleKeyUp() {
            this.activeKey = '';
        },
        getCharacterClass(index) {
            if (index < this.userInput.length) {
                return this.userInput[index] === this.currentWord[index] ? 'correct' : 'incorrect';
            } else if (index === this.userInput.length) {
                return 'current';
            }
            return '';
        },
        resetStats() {
            this.startTime = null;
            this.totalChars = 0;
            this.correctChars = 0;
            this.wordsCompleted = 0;
            this.feedback = '';
            this.showResults = false;
            this.newWord();
        },
        
        endRound() {
            const endTime = Date.now();
            const timeSpent = (endTime - this.startTime) / 1000; // in seconds
            
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
        
        getInputMethodName() {
            const methods = {
                'standard': 'Standard',
                'romaji': 'Romaji → Kana',
                'japanese-ime': 'Japanese IME',
                'kana-direct': 'Direct Kana',
                'japanese-direct': 'Japanese Direct'
            };
            return methods[this.inputMethod] || 'Unknown';
        }
    }
}).mount('#app');