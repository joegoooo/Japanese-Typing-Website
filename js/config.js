// Game configuration
export const config = {
    // Game settings
    WORDS_PER_ROUND: 10,
    WORD_COMPLETION_DELAY: 300, // milliseconds
    CHARS_PER_WORD: 5, // for WPM calculation
    
    // UI settings
    DEFAULT_KEYBOARD_LAYOUT: true, // true = Japanese, false = QWERTY
    SHOW_FEEDBACK: false, // whether to show typing feedback
    
    // Color scheme
    colors: {
        primary: '#e2b714',
        background: '#323437',
        surface: '#2c2e31',
        text: '#d1d0c5',
        textSecondary: '#646669',
        error: '#ca4754',
        success: '#28a745',
        nextKey: '#4a90e2'
    },
    
    // Input methods
    inputMethods: {
        standard: 'Standard',
        romaji: 'Romaji → Kana',
        japaneseIme: 'Japanese IME',
        kanaDirect: 'Direct Kana',
        japaneseDirect: 'Japanese Direct'
    }
};
