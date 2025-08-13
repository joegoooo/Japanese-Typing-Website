// ====================================================================
// VUE.JS APPLICATION - MAIN TYPING GAME
// ====================================================================

const { createApp, computed, ref, nextTick, onMounted } = Vue;

createApp({
    setup() {
        // ====================================================================
        // REACTIVE DATA
        // ====================================================================
        const currentWord = ref('');
        const userInput = ref('');
        const charIndex = ref(0);
        const wordsCompleted = ref(0);
        const words = ref(JAPANESE_WORDS);
        const totalChars = ref(0);
        const correctChars = ref(0);
        const activeKey = ref('');
        const showJapaneseLayout = ref(true);
        const isComposing = ref(false);
        const isWordComplete = ref(false);
        const gameEnded = ref(false);
        const feedback = ref('');
        const feedbackType = ref('');
        const isShiftPressed = ref(false);

        // ====================================================================
        // COMPUTED PROPERTIES
        // ====================================================================
        const nextKey = computed(() => {
            if (!currentWord.value || charIndex.value >= currentWord.value.length) {
                return null;
            }
            const nextChar = currentWord.value[charIndex.value];
            const layout = isShiftPressed.value ? SHIFT_KEYBOARD_LAYOUT : KEYBOARD_LAYOUT;
            return GameUtils.findKeyForCharacter(nextChar, layout);
        });

        // Keyboard layout rows
        const row1 = computed(() => isShiftPressed.value ? SHIFT_KEYBOARD_LAYOUT.row1 : KEYBOARD_LAYOUT.row1);
        const row2 = computed(() => isShiftPressed.value ? SHIFT_KEYBOARD_LAYOUT.row2 : KEYBOARD_LAYOUT.row2);
        const row3 = computed(() => isShiftPressed.value ? SHIFT_KEYBOARD_LAYOUT.row3 : KEYBOARD_LAYOUT.row3);
        const row4 = computed(() => isShiftPressed.value ? SHIFT_KEYBOARD_LAYOUT.row4 : KEYBOARD_LAYOUT.row4);

        // ====================================================================
        // METHODS
        // ====================================================================
        const getCharacterClass = (index) => {
            if (index < userInput.value.length) {
                return userInput.value[index] === currentWord.value[index] ? 'correct' : 'incorrect';
            } else if (index === userInput.value.length) {
                return 'current';
            }
            return '';
        };

        const nextWord = () => {
            console.log('nextWord called');
            
            if (wordsCompleted.value >= GAME_CONFIG.WORDS_PER_ROUND) {
                gameEnded.value = true;
                return;
            }

            if (currentWord.value) {
                wordsCompleted.value++;
            }

            // Get a random word from the JAPANESE_WORDS array
            currentWord.value = GameUtils.getRandomWord(JAPANESE_WORDS);
            userInput.value = '';
            charIndex.value = 0;
            isWordComplete.value = false;

            console.log('New word set:', currentWord.value);

            nextTick(() => {
                const inputField = document.querySelector('input[ref="textInput"]');
                if (inputField) {
                    inputField.value = '';  // Clear the actual input field
                    inputField.focus();
                }
            });
        };

        const startNewRound = () => {
            console.log('Starting new round');
            wordsCompleted.value = 0;
            totalChars.value = 0;
            correctChars.value = 0;
            gameEnded.value = false;
            nextWord();
        };

        const handleKeyDown = (event) => {
            // Delegate ALL key handling to InputHandler
            const app = {
                isShiftPressed,
                activeKey,
                userInput,
                currentWord,
                charIndex,
                isWordComplete,
                correctChars,
                totalChars,
                config: GAME_CONFIG,
                nextWord
            };
            InputHandler.handleKeyDown(app, event);
        };

        const handleKeyUp = (event) => {
            // Delegate ALL key release handling to InputHandler
            const app = {
                isShiftPressed,
                activeKey
            };
            InputHandler.handleKeyUp(app, event);
        };

        const handleInput = (event) => {
            if (isComposing.value) return;
            
            const app = {
                $refs: { textInput: event.target },
                userInput,
                currentWord,
                isWordComplete,
                correctChars,
                totalChars,
                charIndex,
                config: GAME_CONFIG,
                nextWord
            };
            
            InputHandler.processInput(app);
        };

        const handleCompositionStart = () => {
            const app = { isComposing };
            InputHandler.handleCompositionStart(app);
        };

        const handleCompositionEnd = (event) => {
            const app = {
                isComposing,
                $refs: { textInput: event.target },
                userInput,
                currentWord,
                isWordComplete,
                correctChars,
                totalChars,
                charIndex,
                config: GAME_CONFIG,
                nextWord
            };
            InputHandler.handleCompositionEnd(app, event);
        };

        const toggleKeyboardLayout = () => {
            showJapaneseLayout.value = !showJapaneseLayout.value;
        };

        // ====================================================================
        // LIFECYCLE
        // ====================================================================
        onMounted(() => {
            console.log('App mounted, starting game');
            startNewRound();
            nextTick(() => {
                const appEl = document.getElementById('app');
                if (appEl) appEl.focus();
            });
        });

        // ====================================================================
        // RETURN FOR TEMPLATE
        // ====================================================================
        return {
            // Data
            currentWord,
            userInput,
            wordsCompleted,
            words,
            activeKey,
            showJapaneseLayout,
            nextKey,
            gameEnded,
            feedback,
            feedbackType,
            isShiftPressed,
            
            // Computed
            row1,
            row2,
            row3,
            row4,
            
            // Methods
            getCharacterClass,
            handleInput,
            handleKeyDown,
            handleKeyUp,
            handleCompositionStart,
            handleCompositionEnd,
            toggleKeyboardLayout
        };
    }
}).mount('#app');

