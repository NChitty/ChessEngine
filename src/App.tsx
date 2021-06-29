import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import {ChessInstance, Piece, ShortMove} from "chess.js";
import Engine from "./engine";

const Chess = require("chess.js");

const App: React.FC = () => {
    const [chess] = useState<ChessInstance>(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );

    const [fen, setFen] = useState(chess.fen());
    const engine = new Engine(chess);

    const handleMove = (move: ShortMove) => {
        chess.move(move);
        let start = Date.now();
        let evaluation = engine.evaluateCurrentPosition();
        let end = Date.now();
        console.log(evaluation + " " + (end-start));
        setFen(chess.fen());
    };

    return (
        <div className="flex-center">
            <Chessboard
                width={400}
                position={fen}
                onDrop={(move) =>
                    handleMove({
                        from: move.sourceSquare,
                        to: move.targetSquare,
                        promotion: "q",
                    })
                }
            />
        </div>
    );
};

export default App;