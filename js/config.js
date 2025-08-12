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


window.SHIFT_KEYBOARD_LAYOUT = {
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

// Game configuration
window.GAME_CONFIG = {
    WORDS_PER_ROUND: 10,
    WORD_COMPLETION_DELAY: 300,
    CHARS_PER_WORD: 5
};
