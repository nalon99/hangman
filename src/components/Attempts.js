import React from "react";
import { observer } from "mobx-react";
import { GameContext } from "../model/game";

export const Attempts = observer(() => {
    const game = React.useContext(GameContext);
    return (
        <>
            <p>Tentativi disponibili: <strong>{game.attempts}</strong></p>
        </>
    );
});
