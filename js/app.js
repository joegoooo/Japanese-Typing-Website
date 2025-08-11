// Main application file
import { gameState } from './game-state.js';
import { inputHandler } from './input-handler.js';
import { utils } from './utils.js';

const { createApp } = Vue;

createApp({
    data() {
        return gameState.createInitialState();
    },
    
    computed: gameState.computedProperties,
    
    mounted() {
        this.newWord();
        this.$refs.typingInput.focus();
    },
    
    methods: {
        // Game state methods
        ...gameState.actions,
        
        // Input handling methods
        ...inputHandler,
        
        // Utility methods
        getInputMethodName() {
            return utils.getInputMethodName(this.inputMethod);
        },

        startNewRound() {
            this.resetStats();
        }
    }
}).mount('#app');
