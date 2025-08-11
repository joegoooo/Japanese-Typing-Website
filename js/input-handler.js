// Input handling logic
import { utils } from './utils.js';

export const inputHandler = {
    // Handle main input processing
    handleInput() {
        if (!this.startTime) {
            this.startTime = Date.now();
        }

        // Handle Japanese IME composition
        if (this.isComposing) {
            return; // Wait for composition to complete
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
            // Check current progress and update stats
            this.updateStats();
        }
    },

    // Handle word completion
    completeWord() {
        this.isWordComplete = true;
        this.wordsCompleted++;
        this.correctChars += this.currentWord.length;
        this.totalChars += this.currentWord.length;
        
        // Check if round is complete (after 10 words)
        if (this.wordsCompleted >= 10) {
            this.endRound();
        } else {
            // Move to next word with delay
            setTimeout(() => {
                this.newWord();
            }, 300);
        }
    },

    // Update statistics during typing
    updateStats() {
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
        
        // Clear feedback for incorrect typing
        this.feedback = '';
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
        
        // Trigger input handling after composition
        this.$nextTick(() => {
            this.handleInput();
        });
    },

    // Handle key events
    handleKeyDown(event) {
        this.activeKey = utils.mapPhysicalKey(event);
        this.inputMethod = utils.detectInputMethod(event);
    },

    handleKeyUp() {
        this.activeKey = '';
    },

    // Get character display class
    getCharacterClass(index) {
        if (index < this.userInput.length) {
            return this.userInput[index] === this.currentWord[index] ? 'correct' : 'incorrect';
        } else if (index === this.userInput.length) {
            return 'current';
        }
        return '';
    }
};
