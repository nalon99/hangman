import Options from "./options";
import wordService from "../services/WordService";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import React from "react";

export const STATUS_IDLE = 0;
export const STATUS_PLAYING = 1;
export const STATUS_WON = 2;
export const STATUS_LOST = 4;

class Game {

    status = STATUS_IDLE;
    attempts = 0;
    chars = [];
    options = new Options();
    secretWord = "";

    constructor() {
        makeObservable(this, {
            attempts: observable,
            chars: observable,
            secretWord: observable,
            status: observable,
            maskedWord: computed,
            start: action,
            quit: action,
            tryChar: action
        });
    }

    get maskedWord() {
        let result = "";
        for (let char of this.secretWord) {
            if (this.chars.includes(char))
                result = result + char;
            else
                result = result + "_";
        }
        return result;
    }

    async start() {
        if (this.status === STATUS_PLAYING)
            return;
        const newWord = await wordService.getNew();
        runInAction(() => {
            this.secretWord = newWord.toUpperCase();
            this.attempts = this.options.attempts;
            this.status = STATUS_PLAYING;
            this.chars = [];
        });
    }

    quit() {
        if (this.status !== STATUS_PLAYING)
            return;
        this.attempts = 0;
        this.status = STATUS_LOST;
    }

    tryChar(char) {
        if (this.status !== STATUS_PLAYING)
            return;
        if (this.chars.includes(char))
            return;
        this.chars.push(char);
        if (!this.secretWord.includes(char)) {
            this.attempts--;
            if (this.attempts <= 0)
                this.quit();
            return;
        }
        if (this.maskedWord === this.secretWord) {
            this.status = STATUS_WON;
        }
    }
}

export default Game;

export const GameContext = React.createContext(new Game());
