// Utility functions for the typing game

export const utils = {
    // Get random word from array
    getRandomWord(words) {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    },

    // Calculate WPM (Words Per Minute)
    calculateWPM(correctChars, startTime) {
        if (!startTime) return 0;
        const minutes = (Date.now() - startTime) / 60000;
        return Math.round((correctChars / 5) / minutes) || 0;
    },

    // Calculate accuracy percentage
    calculateAccuracy(correctChars, totalChars) {
        if (totalChars === 0) return 100;
        return Math.round((correctChars / totalChars) * 100);
    },

    // Find key mapping for a character
    findKeyForCharacter(character, keyboardRows) {
        const allKeys = [...keyboardRows.row1, ...keyboardRows.row2, ...keyboardRows.row3, ...keyboardRows.row4];
        const keyMapping = allKeys.find(keyObj => keyObj.kana === character);
        return keyMapping ? keyMapping.key : null;
    },

    // Detect input method based on event
    detectInputMethod(event) {
        // Check if composition is happening (Japanese IME is active)
        if (event.isComposing || event.keyCode === 229) {
            return 'japanese-ime';
        }
        
        // Check input locale if available
        if (event.inputType && event.inputType.includes('japanese')) {
            return 'japanese-direct';
        }
        
        // Detect by key patterns for romaji input
        const romajiPattern = /^[a-zA-Z]$/;
        if (romajiPattern.test(event.key)) {
            return 'romaji';
        }
        
        // Detect direct kana input
        const kanaPattern = /[\u3040-\u309F\u30A0-\u30FF]/;
        if (kanaPattern.test(event.key)) {
            return 'kana-direct';
        }
        
        return 'standard';
    },

    // Get input method display name
    getInputMethodName(inputMethod) {
        const methods = {
            'standard': 'Standard',
            'romaji': 'Romaji → Kana',
            'japanese-ime': 'Japanese IME',
            'kana-direct': 'Direct Kana',
            'japanese-direct': 'Japanese Direct'
        };
        return methods[inputMethod] || 'Unknown';
    },

    // Map physical key to display key
    mapPhysicalKey(event) {
        let displayKey = event.code ? event.code.replace('Key', '').replace('Digit', '').toLowerCase() : event.key.toLowerCase();
        
        // Handle special keys
        if (event.key === ' ') {
            return 'space';
        } else if (event.key === 'Enter') {
            return 'enter';
        }
        
        return displayKey;
    }
};
