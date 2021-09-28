import React from "react";
import { GameContext } from "../model/game";

export const Chars = () => {
    const game = React.useContext(GameContext);
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const buttons = letters.split("").map((c) => {
        return <button onClick={() => {game.tryChar(c)}}>{c}</button>
    });

    return <div>{buttons}</div>;
};