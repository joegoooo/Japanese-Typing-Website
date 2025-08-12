const InputHandler = {
    /**
     * Processes input from the text field for a seamless, auto-advancing experience.
     * @param {object} app - The Vue application instance.
     */
    processInput(app) {
        const inputField = app.$refs.textInput;
        const inputValue = inputField.value;

        // Debug - access .value for refs
        console.log('processInput →', { 
            inputValue, 
            userInput: app.userInput.value, 
            expected: app.currentWord.value 
        });

        if (app.isWordComplete.value) {
            inputField.value = '';  // Clear input field immediately
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

            // **WORD DONE → ADVANCE**
            if (app.userInput.value === expected) {
                app.isWordComplete.value = true;
                // Clear input field immediately when word is complete
                inputField.value = '';
                setTimeout(() => {
                    app.nextWord();
                }, app.config?.WORD_COMPLETION_DELAY || 300);
            }
        } else if (inputValue.length > correctSoFar.length) {
            app.totalChars.value++;
            // snap back on mistake
            inputField.value = correctSoFar;
        }
    },

    /**
     * Handles keydown events for visual feedback.
     * @param {object} app - The Vue application instance.
     * @param {KeyboardEvent} event - The keydown event.
     */
    handleKeyDown(app, event) {
        // Handle shift key detection
        if (event.key === 'Shift') {
            app.isShiftPressed.value = true;
        }
        
        const mappedKey = GameUtils.mapPhysicalKey(event);
        console.log('handleKeyDown → raw key:', event.key, 'mappedKey:', mappedKey);
        app.activeKey.value = mappedKey;
    },

    /**
     * Handles keyup events to remove visual feedback.
     * @param {object} app - The Vue application instance.
     */
    handleKeyUp(app) {
        // Handle shift key release
        if (event && event.key === 'Shift') {
            app.isShiftPressed.value = false;
        }
        
        console.log('handleKeyUp → clearing activeKey');
        app.activeKey.value = '';
    }
};