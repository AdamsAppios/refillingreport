import { actionTypes } from '../State and Reducer/actionTypes';

export const toggleBackgroundColor = (color, dispatch, state) => {
    // If the original background color is not set, get it and update the state
    if (!state.originalBackgroundColor) {
        const body = document.body;
        dispatch({ 
            type: actionTypes.SET_VALUE, 
            field: 'originalBackgroundColor', 
            value: getComputedStyle(body).backgroundColor 
        });
    }

    // Handle the blue color
    if (color === 'blue') {
        dispatch({ type: actionTypes.TOGGLE_COLOR, color: 'blue' });
        speakMessage(`Plus ${state.selectedOption}`);
    } 
    // Handle the red color
    else if (color === 'red') {
        dispatch({ type: actionTypes.TOGGLE_COLOR, color: 'red' });
        speakMessage(`Minus ${state.selectedOption}`);
    }

    // Reset colors after 100 milliseconds
    setTimeout(() => {
        dispatch({ type: actionTypes.RESET_COLOR });
    }, 100);
};

const speakMessage = (message) => {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;

        // Cancel any ongoing or pending speech
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 2.7; 
        synth.speak(utterance);
    }
};