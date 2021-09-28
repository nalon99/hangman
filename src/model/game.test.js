jest.mock("../services/WordService");

import Game, { STATUS_IDLE, STATUS_LOST, STATUS_PLAYING } from "./game";

let game;
beforeEach(() => {
    game = new Game();
});

describe("When game is created...", () => {

    test("when game is created attemps are zero", () => {
        expect(game.attempts).toBe(0);
    });
    
    test("when game is created status is idle", () => {
        expect(game.status).toBe(STATUS_IDLE);
    });
    
    test("when game is created secret word is empty", () => {
        expect(game.secretWord).toBe("");
    });
           
});

describe("When game is started...", () => {

    test("when game is started status is playing", (done) => {
        game.start().then(() => {
            expect(game.status).toBe(STATUS_PLAYING);
            done();
        });
    });
    
    test("when game is started attemps equal option value", async () => {
        game.options.attempts = 123;
        await game.start();
        expect(game.attempts).toBe(game.options.attempts);
    });
    
    test("when game is started secret word matches", async () => {
        await game.start();
        expect(game.secretWord).toBe("SECRETWORD");
    });
    
    test("when game is started chars are empty", async () => {
        await game.start();
        expect(game.chars.length).toBe(0);
    });
});

describe("When game is played...", () => {

    test("when game is played masked word is correct", async () => {
        await game.start();
        game.tryChar("E");
        game.tryChar("R");
        expect(game.maskedWord).toBe("_E_RE___R_");
    });
    
    test("when game is played wrong char decrease attempts", async () => {
        await game.start();
        const initialAttempts = game.attempts;
        game.tryChar("X");
        game.tryChar("Y");
        game.tryChar("Z");
        expect(game.attempts).toBe(initialAttempts - 3);
    });
    
    test("when game is played more wrong chars reset attempts", async () => {
        game.options.attempts = 3;
        await game.start();
        game.tryChar("X");
        game.tryChar("Y");
        game.tryChar("Z");
        expect(game.attempts).toBe(0);
    });
    
    test("when game is played more wrong chars game is lost", async () => {
        game.options.attempts = 3;
        await game.start();
        game.tryChar("X");
        game.tryChar("Y");
        game.tryChar("Z");
        expect(game.status).toBe(STATUS_LOST);
    });
    
    test("when game is quit status is idle", async () => {
        await game.start();
        game.quit();
        expect(game.status).toBe(STATUS_LOST);
    });
    
    test("when game is re-started chars are empty", async () => {
        await game.start();
        game.tryChar("A");
        game.quit();
        await game.start();
        expect(game.chars.length).toBe(0);
    });
});
