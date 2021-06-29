import {ChessInstance, Piece, Square} from "chess.js";


const relativeValue = {'r': 5,
    'n': 2.5,
    'b': 3.5,
    'q': 9,
    'k': 100,
    'p': 1};

//W >= 40  and B <= 39
const squares: Square[] = ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'];

const squareLookup = {'a1':0, 'b1':1, 'c1': 2, 'd1': 3, 'e1': 4, 'f1': 5, 'g1': 6, 'h1': 7,
    'a2':8, 'b2':9, 'c2':10, 'd2':11, 'e2':12, 'f2':13, 'g2':14, 'h2':15,
    'a3':16, 'b3':17, 'c3':18, 'd3':19, 'e3':20, 'f3':21, 'g3':22, 'h3':23,
    'a4':24, 'b4':25, 'c4':26, 'd4':27, 'e4':28, 'f4':29, 'g4':30, 'h4':31,
    'a5':32, 'b5':33, 'c5':34, 'd5':35, 'e5':36, 'f5':37, 'g5':38, 'h5':39,
    'a6':40, 'b6':41, 'c6':42, 'd6':43, 'e6':44, 'f6':45, 'g6':46, 'h6':47,
    'a7':48, 'b7':49, 'c7':50, 'd7':51, 'e7':52, 'f7':53, 'g7':54, 'h7':55,
    'a8':56, 'b8':57, 'c8':58, 'd8':59, 'e8':60, 'f8':61, 'g8':62, 'h8':63}

class Engine {
        game: ChessInstance;

        constructor(game: ChessInstance) {
            this.game = game;
        }

        evaluateFEN(fen: string) {
            this.game.load(fen);
            var evaluation = 0.0;
            for(let i = 0; i < 64; i++) {
                let piece: Piece | null = this.game.get(squares[i])
                if(piece != null)
                    evaluation += (relativeValue[piece.type] * (piece.color === 'w' ? 1.0 : -1.0));
            }
            const mod = this.game.turn() === "w" ? 1 : -1;
            this.game.moves({ verbose: true }).forEach((move) => {
                evaluation += (mod * .1 * ((mod === 1 && squareLookup[move.to] >= 40) || (mod === -1 && squareLookup[move.to] < 40) ? 1 : 0))
            });
            return evaluation;
        }

        evaluateCurrentPosition() {
            return this.evaluateFEN(this.game.fen());
        }
}

export default Engine