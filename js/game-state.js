// Game state management
import { japaneseWords } from '../data/japanese-words.js';
import { keyboardLayout } from '../data/keyboard-layout.js';
import { utils } from './utils.js';

export const gameState = {
    // Initialize default state
    createInitialState() {
        return {
            // Game data
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
            
            // Keyboard layout
            ...keyboardLayout
        };
    },

    // Computed properties
    computedProperties: {
        wpm() {
            return utils.calculateWPM(this.correctChars, this.startTime);
        },

        accuracy() {
            return utils.calculateAccuracy(this.correctChars, this.totalChars);
        },

        nextKey() {
            if (!this.currentWord || this.userInput.length >= this.currentWord.length) {
                return null;
            }
            
            const nextChar = this.currentWord[this.userInput.length];
            return utils.findKeyForCharacter(nextChar, {
                row1: this.row1,
                row2: this.row2,
                row3: this.row3,
                row4: this.row4
            });
        }
    },

    // Game actions
    actions: {
        newWord() {
            this.currentWord = utils.getRandomWord(japaneseWords);
            this.userInput = '';
            this.feedback = '';
            this.gameEnded = false;
            this.showResults = false;
            this.isWordComplete = false;
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

        toggleKeyboardLayout() {
            this.showJapaneseLayout = !this.showJapaneseLayout;
        }
    }
};
