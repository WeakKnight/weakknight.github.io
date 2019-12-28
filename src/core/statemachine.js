import $ from './utils.js'

export default class StateMachine {
    constructor(defaultState) {
        this.currentState = defaultState;
        this.previousState = defaultState;
        this.onChangeListener = [];
    }

    changeState(state) {
        for (let callback of this.onChangeListener) {
            callback(this.currentState, state);
        }

        this.previousState = this.currentState;
        this.currentState = state;
    }

    onChange(callback) {
        this.onChangeListener.push(callback);
    }

    clearListener() {
        this.onChangeListener = [];
    }
}