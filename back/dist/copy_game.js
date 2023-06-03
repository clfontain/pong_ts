"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGame = void 0;
function initGame() {
    const state = {
        players: [{
                x: 4, y: 5, height: 30, width: 50, color: "white",
                v_y: 0, lastKey: "null"
            },
            {
                x: 4, y: 5, height: 30, width: 50, color: "white",
                v_y: 0, lastKey: "null"
            }],
        ball: {
            x: 0, y: 4, dx: 5, dy: 5, rad: 10, speed: 5
        },
    };
    return (state);
}
exports.initGame = initGame;
;
