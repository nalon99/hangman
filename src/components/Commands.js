import React from "react";
import { observer } from "mobx-react";
import { GameContext, STATUS_PLAYING } from "../model/game";

export const Commands = observer(() => {

    const game = React.useContext(GameContext);

    const onStartClick = () => {
        game.start();
    };

    const onQuitClick = () => {
        game.quit();
    };

    return (
        <div>
            <button className="startButton" onClick={onStartClick} disabled={game.status === STATUS_PLAYING}>Start</button>
            <button className="quitButton" onClick={onQuitClick} disabled={game.status !== STATUS_PLAYING}>Quit</button>
        </div>
    );
});