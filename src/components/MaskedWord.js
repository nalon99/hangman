import React from "react";
import { observer } from "mobx-react-lite";
import { GameContext, STATUS_LOST } from "../model/game";
import "./MaskedWord.css"

export const MaskedWord = observer(() => {
    const game = React.useContext(GameContext);

    let currentWord;
    if (game.status === STATUS_LOST)
        currentWord = game.secretWord;
    else
        currentWord = game.maskedWord;

    return (
        <>
            <h3>Parola misteriosa</h3>
            <div className="Masked-Word">{currentWord}</div>
        </>
    );
});