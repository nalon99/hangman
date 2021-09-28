import React from "react";
import { observer } from "mobx-react";
import { GameContext, STATUS_IDLE, STATUS_LOST, STATUS_PLAYING, STATUS_WON } from "../model/game";

export const Status = observer(() => {

    const statusTexts = [];
    statusTexts[STATUS_IDLE] = "Pronto.";
    statusTexts[STATUS_PLAYING] = "Partita in corso...";
    statusTexts[STATUS_LOST] = "Hai perso.";
    statusTexts[STATUS_WON] = "Hai vinto!"

    const game = React.useContext(GameContext);

    return (
        <>
            <h2>Stato del gioco</h2>
            <p>{statusTexts[game.status]}</p>
        </>
    );
});