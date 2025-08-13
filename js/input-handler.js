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
            app.charIndex.value = inputValue.length;
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
        console.log('InputHandler.handleKeyDown →', event.key);

        // Handle Shift key for layout switching
        if (event.key === 'Shift') {
            app.isShiftPressed.value = true;
            console.log('Shift pressed - switching to shift layout');
        }

        // Handle special keys
        if (event.key === 'Enter' || event.key === 'Backspace') {
            event.preventDefault();
            console.log('Prevented default for:', event.key);
        }

        // Set active key for visual feedback
        app.activeKey.value = event.key;
        console.log('Active key set to:', app.activeKey.value);

        // Future: Add more key-specific logic here
        // - Tab for skipping words
        // - Escape for pausing
        // - Arrow keys for navigation
    },

    /**
     * Centralized key release handling
     */
    handleKeyUp(app, event) {
        console.log('InputHandler.handleKeyUp →', event.key);

        // Handle Shift key release
        if (event.key === 'Shift') {
            app.isShiftPressed.value = false;
            console.log('Shift released - switching to normal layout');
        }

        // Clear active key visual feedback
        app.activeKey.value = '';
        console.log('Active key cleared');
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