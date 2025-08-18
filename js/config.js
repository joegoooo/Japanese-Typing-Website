// ====================================================================
// GAME CONFIGURATION & DATA
// ====================================================================

// Japanese words for typing practice
window.JAPANESE_WORDS = [
    'こんにちは', 'ありがとう', 'さようなら', 'おはよう', 'こんばんは',
    'すみません', 'はじめまして', 'よろしく', 'がんばって', 'おめでとう',
    'たべもの', 'のみもの', 'やすみ', 'べんきょう', 'しごと',
    'がっこう', 'いえ', 'ともだち', 'かぞく', 'せんせい',
    'みず', 'おちゃ', 'こーひー', 'ごはん',
    'さかな', 'にく', 'やさい', 'くだもの', 'あまい',
    'あつい', 'さむい', 'あたらしい', 'ふるい', 'おおきい',
    'ちいさい', 'たかい', 'やすい', 'はやい', 'おそい'
];

// Japanese JIS Keyboard Layout
window.KEYBOARD_LAYOUT = {
    row1: [
        { key: '1', kana: 'ぬ' }, { key: '2', kana: 'ふ' }, { key: '3', kana: 'あ' }, 
        { key: '4', kana: 'う' }, { key: '5', kana: 'え' }, { key: '6', kana: 'お' }, 
        { key: '7', kana: 'や' }, { key: '8', kana: 'ゆ' }, { key: '9', kana: 'よ' }, 
        { key: '0', kana: 'わ' }, { key: '-', kana: 'ほ' }, { key: '=', kana: 'へ' }
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


window.SHIFT_KEYBOARD_LAYOUT = {
    row1: [
        { key: '!', kana: 'ぬ' }, { key: '@', kana: 'ふ' }, { key: '#', kana: 'ぁ' }, 
        { key: '$', kana: 'ぅ' }, { key: '%', kana: 'ぇ' }, { key: '^', kana: 'ぉ' }, 
        { key: '&', kana: 'ゃ' }, { key: '*', kana: 'ゅ' }, { key: '(', kana: 'ょ' }, 
        { key: ')', kana: 'を' }, { key: '_', kana: 'ー' }, { key: '+', kana: 'へ' }
    ],
    row2: [
        { key: 'Q', kana: 'た' }, { key: 'W', kana: 'て' }, { key: 'E', kana: 'ぃ' }, 
        { key: 'R', kana: 'す' }, { key: 'T', kana: 'か' }, { key: 'Y', kana: 'ん' }, 
        { key: 'U', kana: 'な' }, { key: 'I', kana: 'に' }, { key: 'O', kana: 'ら' }, 
        { key: 'P', kana: 'せ' }, { key: '{', kana: '「' }, { key: '}', kana: '」' },
        { key: '|', kana: 'む'}
    ],
    row3: [
        { key: 'A', kana: 'ち' }, { key: 'S', kana: 'と' }, { key: 'D', kana: 'し' }, 
        { key: 'F', kana: 'は' }, { key: 'G', kana: 'き' }, { key: 'H', kana: 'く' }, 
        { key: 'J', kana: 'ま' }, { key: 'K', kana: 'の' }, { key: 'L', kana: 'り' }, 
        { key: ':', kana: 'れ' }, { key: '"', kana: 'け' }
    ],
    row4: [
        { key: 'Z', kana: 'っ' }, { key: 'X', kana: 'さ' }, { key: 'C', kana: 'そ' }, 
        { key: 'V', kana: 'ひ' }, { key: 'B', kana: 'こ' }, { key: 'N', kana: 'み' }, 
        { key: 'M', kana: 'も' }, { key: '<', kana: '、' }, { key: '>', kana: '。' }, 
        { key: '?', kana: '・' }
    ]
};

// Dakuten and Handakuten typing sequences
window.DAKUTEN_MAP = {
    // Dakuten (゛) combinations - base character + dakuten mark
    'が': ['か', '゛'], 'ぎ': ['き', '゛'], 'ぐ': ['く', '゛'], 'げ': ['け', '゛'], 'ご': ['こ', '゛'],
    'ざ': ['さ', '゛'], 'じ': ['し', '゛'], 'ず': ['す', '゛'], 'ぜ': ['せ', '゛'], 'ぞ': ['そ', '゛'],
    'だ': ['た', '゛'], 'ぢ': ['ち', '゛'], 'づ': ['つ', '゛'], 'で': ['て', '゛'], 'ど': ['と', '゛'],
    'ば': ['は', '゛'], 'び': ['ひ', '゛'], 'ぶ': ['ふ', '゛'], 'べ': ['へ', '゛'], 'ぼ': ['ほ', '゛'],
    'ヴ': ['う', '゛'],

    // Handakuten (゜) combinations - base character + handakuten mark  
    'ぱ': ['は', '゜'], 'ぴ': ['ひ', '゜'], 'ぷ': ['ふ', '゜'], 'ぺ': ['へ', '゜'], 'ぽ': ['ほ', '゜']
};

// Reverse mapping for quick lookup - from base character to possible combinations
window.BASE_TO_DAKUTEN = {
    'か': ['が'], 'き': ['ぎ'], 'く': ['ぐ'], 'け': ['げ'], 'こ': ['ご'],
    'さ': ['ざ'], 'し': ['じ'], 'す': ['ず'], 'せ': ['ぜ'], 'そ': ['ぞ'],
    'た': ['だ'], 'ち': ['ぢ'], 'つ': ['づ'], 'て': ['で'], 'と': ['ど'],
    'は': ['ば', 'ぱ'], 'ひ': ['び', 'ぴ'], 'ふ': ['ぶ', 'ぷ'], 'へ': ['べ', 'ぺ'], 'ほ': ['ぼ', 'ぽ'],
    'う': ['ヴ']
};

// Helper function to get typing sequence for any character
window.getTypingSequence = function(character) {
    // Check if it's a dakuten/handakuten combination
    if (DAKUTEN_MAP[character]) {
        return DAKUTEN_MAP[character];
    }
    
    // Regular character - just return it as single item array
    return [character];
};

// Helper function to check if character needs dakuten/handakuten
window.isDakutenCharacter = function(character) {
    return DAKUTEN_MAP.hasOwnProperty(character);
};

// Helper function to get the base character for dakuten combinations
window.getBaseCharacter = function(character) {
    if (DAKUTEN_MAP[character]) {
        return DAKUTEN_MAP[character][0]; // First element is base character
    }
    return character; // Return as-is if not a combination
};

// Game configuration
window.GAME_CONFIG = {
    WORDS_PER_ROUND: 10,
    WORD_COMPLETION_DELAY: 300,
    CHARS_PER_WORD: 5
};
