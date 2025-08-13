// ====================================================================
// GAME UTILITIES & HELPER FUNCTIONS  
// ====================================================================

const GameUtils = {
    // Generate random Japanese words for practice
    generateWords: function(wordList, count) {
        const shuffled = [...wordList].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    },

    /**
     * Get a random word from the word list
     * @param {Array} wordList - Array of words to choose from
     * @returns {string} Random word
     */
    getRandomWord(wordList) {
        if (!wordList || wordList.length === 0) {
            return 'こんにちは'; // fallback word
        }
        const randomIndex = Math.floor(Math.random() * wordList.length);
        return wordList[randomIndex];
    },

    // Get current target character
    getCurrentChar: function(currentWord, charIndex) {
        return currentWord ? currentWord[charIndex] || '' : '';
    },

    // Calculate Words Per Minute
    calculateWPM: function(correctChars, timeElapsed) {
        if (timeElapsed === 0) return 0;
        return Math.round((correctChars / window.GAME_CONFIG.CHARS_PER_WORD) / (timeElapsed / 60));
    },

    /**
     * Find which keyboard key produces a given character
     * @param {string} character - The character to find
     * @param {object} keyboardLayout - The keyboard layout object
     * @param {object} shiftLayout - The shift keyboard layout object (optional)
     * @returns {string|null} The key that produces this character
     */
    findKeyForCharacter(character, keyboardLayout, shiftLayout = null) {
        // First check normal layout
        let allKeys = [
            ...keyboardLayout.row1, 
            ...keyboardLayout.row2, 
            ...keyboardLayout.row3, 
            ...keyboardLayout.row4
        ];
        let keyMapping = allKeys.find(keyObj => keyObj.kana === character);
        
        if (keyMapping) {
            return keyMapping.key;
        }

        // If not found and shift layout exists, check shift layout
        if (shiftLayout) {
            allKeys = [
                ...shiftLayout.row1, 
                ...shiftLayout.row2, 
                ...shiftLayout.row3, 
                ...shiftLayout.row4
            ];
            keyMapping = allKeys.find(keyObj => keyObj.kana === character);
            return keyMapping ? keyMapping.key : null;
        }

        return null;
    },

    /**
     * Map physical keyboard events to display keys
     * @param {KeyboardEvent} event - The keyboard event
     * @returns {string} Mapped key name
     */
    mapPhysicalKey(event) {
        let displayKey = event.code ? event.code.replace('Key', '').replace('Digit', '').toLowerCase() : event.key.toLowerCase();
        console.log(event.key);
        
        switch(event.code) {
            case ' ': return ' ';
            case 'Enter': return 'enter';
            case 'minus': return '-';
            case 'equal': return '=';
            case 'BracketLeft': return '[';
            case 'BracketRight': return ']';
            case 'Backslash': return '\\';
            case 'Semicolon': return ';';
            case 'Quote': return '"';
            case 'Comma': return ',';
            case 'Period': return '.';
            case 'Slash': return '/';
            default: return displayKey;
        }
        
    },

    // Format time display
    formatTime: function(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    // Reset game statistics
    resetStats: function() {
        return {
            startTime: null,
            totalChars: 0,
            correctChars: 0,
            errors: 0
        };
    },

    /**
     * Calculate typing accuracy percentage
     * @param {number} correctChars - Number of correct characters
     * @param {number} totalChars - Total number of characters typed
     * @returns {number} Accuracy percentage
     */
    calculateAccuracy(correctChars, totalChars) {
        if (totalChars === 0) return 100;
        return Math.round((correctChars / totalChars) * 100);
    },

    /**
     * Process dakuten and handakuten combinations
     * Converts sequences like "た゛" to "だ"
     * @param {string} input - The input string to process
     * @returns {string} Processed string with dakuten combinations
     */
    processDakutenCombinations(input) {
        // Dakuten combinations
        const dakutenMap = {
            'か゛': 'が', 'き゛': 'ぎ', 'く゛': 'ぐ', 'け゛': 'げ', 'こ゛': 'ご',
            'さ゛': 'ざ', 'し゛': 'じ', 'す゛': 'ず', 'せ゛': 'ぜ', 'そ゛': 'ぞ',
            'た゛': 'だ', 'ち゛': 'ぢ', 'つ゛': 'づ', 'て゛': 'で', 'と゛': 'ど',
            'は゛': 'ば', 'ひ゛': 'び', 'ふ゛': 'ぶ', 'へ゛': 'べ', 'ほ゛': 'ぼ'
        };

        // Handakuten combinations
        const handakutenMap = {
            'は゜': 'ぱ', 'ひ゜': 'ぴ', 'ふ゜': 'ぷ', 'へ゜': 'ぺ', 'ほ゜': 'ぽ'
        };

        let processed = input;

        // Process dakuten combinations
        Object.keys(dakutenMap).forEach(combination => {
            processed = processed.replace(new RegExp(combination, 'g'), dakutenMap[combination]);
        });

        // Process handakuten combinations
        Object.keys(handakutenMap).forEach(combination => {
            processed = processed.replace(new RegExp(combination, 'g'), handakutenMap[combination]);
        });

        return processed;
    },

    /**
     * Get the next expected character(s) for typing, handling dakuten combinations
     * @param {string} currentWord - The word being typed
     * @param {number} charIndex - Current character index
     * @returns {string} The next character to display for guidance
     */
    getNextExpectedInput(currentWord, charIndex) {
        if (!currentWord || charIndex >= currentWord.length) {
            return '';
        }

        const nextChar = currentWord[charIndex];
        
        // Reverse dakuten map - from combined character to sequence
        const reverseDakutenMap = {
            'が': 'か゛', 'ぎ': 'き゛', 'ぐ': 'く゛', 'げ': 'け゛', 'ご': 'こ゛',
            'ざ': 'さ゛', 'じ': 'し゛', 'ず': 'す゛', 'ぜ': 'せ゛', 'ぞ': 'そ゛',
            'だ': 'た゛', 'ぢ': 'ち゛', 'づ': 'つ゛', 'で': 'て゛', 'ど': 'と゛',
            'ば': 'は゛', 'び': 'ひ゛', 'ぶ': 'ふ゛', 'べ': 'へ゛', 'ぼ': 'ほ゛'
        };

        const reverseHandakutenMap = {
            'ぱ': 'は゜', 'ぴ': 'ひ゜', 'ぷ': 'ふ゜', 'ぺ': 'へ゜', 'ぽ': 'ほ゜'
        };

        // Check if this character needs dakuten or handakuten
        if (reverseDakutenMap[nextChar]) {
            return reverseDakutenMap[nextChar];
        } else if (reverseHandakutenMap[nextChar]) {
            return reverseHandakutenMap[nextChar];
        }

        return nextChar;
    },
};
