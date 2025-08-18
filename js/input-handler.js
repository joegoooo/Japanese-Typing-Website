const InputHandler = {
    /**
     * Processes text input for continuous typing flow
     */
    processInput(app) {
        const inputField = app.$refs.textInput;
        const inputValue = inputField.value;

        console.log('processInput →', { 
            inputValue, 
            userInput: app.userInput.value, 
            expected: app.currentWord.value 
        });

        if (app.isWordComplete.value) {
            inputField.value = '';
            return;
        }

        const expected = app.currentWord.value;
        const correctSoFar = app.userInput.value;

        // Handle deletion (backspace)
        if (inputValue.length < correctSoFar.length) {
            app.userInput.value = inputValue;
            app.charIndex.value--;
            console.log(app.charIndex.value);
            return;
        }

        // Handle new input
        if (expected.startsWith(inputValue) && inputValue.length > correctSoFar.length) {
            const added = inputValue.length - correctSoFar.length;
            app.userInput.value = inputValue;
            app.charIndex.value = inputValue.length;
            app.correctChars.value += added;
            app.totalChars.value += added;

            // Word completion
            if (app.userInput.value === expected) {
                app.isWordComplete.value = true;
                inputField.value = '';
                setTimeout(() => {
                    app.nextWord();
                }, app.config?.WORD_COMPLETION_DELAY || 300);
            }
        } else if (inputValue.length > correctSoFar.length) {
            app.totalChars.value++;
            inputField.value = correctSoFar;
        }
    },

    /**
     * Centralized keyboard event handling - ALL key logic here
     */
    handleKeyDown(app, event) {

        console.log('InputHandler.handleKeyDown →', event.code);
        
        // Handle Shift key for layout switching
        if (event.key === 'Shift') {
            app.isShiftPressed.value = true;
        }

        // Handle special keys
        if (event.code === 'Enter' || event.code === 'Backspace') {
            event.preventDefault();
        }

        // Set active key for visual feedback - convert code to key for consistency
        app.activeKey.value = this.codeToKey(event.code);
        // Future: Add more key-specific logic here
        // - Tab for skipping words
        // - Escape for pausing
        // - Arrow keys for navigation
        if(app.nextKey.value === app.activeKey.value) {
            app.charIndex.value++;
        }
        else if(app.activeKey.value === 'backspace') {
            app.charIndex.value--;
        }
    },

    /**
     * Centralized key release handling
     */
    handleKeyUp(app, event) {

        // Handle Shift key release
        if (event.key === 'Shift') {
            app.isShiftPressed.value = false;
        }

        // Clear active key visual feedback
        app.activeKey.value = '';
    },

    /**
     * Convert event.code to key for keyboard highlighting
     */
    codeToKey(code) {
        const codeMap = {
            'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4', 'Digit5': '5',
            'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9', 'Digit0': '0',
            'Minus': '-', 'Equal': '=', 'Backquote': '`',
            'KeyQ': 'q', 'KeyW': 'w', 'KeyE': 'e', 'KeyR': 'r', 'KeyT': 't',
            'KeyY': 'y', 'KeyU': 'u', 'KeyI': 'i', 'KeyO': 'o', 'KeyP': 'p',
            'BracketLeft': '[', 'BracketRight': ']', 'Backslash': '\\',
            'KeyA': 'a', 'KeyS': 's', 'KeyD': 'd', 'KeyF': 'f', 'KeyG': 'g',
            'KeyH': 'h', 'KeyJ': 'j', 'KeyK': 'k', 'KeyL': 'l',
            'Semicolon': ';', 'Quote': "'",
            'KeyZ': 'z', 'KeyX': 'x', 'KeyC': 'c', 'KeyV': 'v', 'KeyB': 'b',
            'KeyN': 'n', 'KeyM': 'm', 'Comma': ',', 'Period': '.', 'Slash': '/',
            'Space': 'space', 'Enter': 'enter', 'Backspace': 'backspace',
            'Tab': 'tab', 'ShiftLeft': 'shift', 'ShiftRight': 'shift'
        };
        
        return codeMap[code] || code.toLowerCase();
    },

    /**
     * Handle composition events for Japanese IME
     */
    handleCompositionStart(app) {
        app.isComposing.value = true;
        console.log('IME composition started');
    },

    /**
     * Handle composition completion
     */
    handleCompositionEnd(app, event) {
        app.isComposing.value = false;
        console.log('IME composition ended:', event.data);
        
        if (event.target) {
            this.processInput(app);
        }
    }
};