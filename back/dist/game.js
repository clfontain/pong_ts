"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameLoop = exports.initGame = void 0;
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
            x: 250, y: 250, dx: 1, dy: 1, rad: 10, speed: 2
        },
    };
    return (state);
}
exports.initGame = initGame;
;
function playerWall(player) {
    if (player.y + player.height + player.v_y >= 600) {
        player.v_y = 0;
        player.y = 500;
    }
    if (player.y + player.v_y <= 0) {
        player.v_y = 0;
        player.y = 0;
    }
}
function gameLoop(state) {
    if (!state)
        return;
    const playerOne = state.players[0];
    const playerTwo = state.players[1];
    const ball = state.ball;
    playerOne.y += playerOne.v_y;
    playerTwo.y += playerTwo.v_y;
    playerWall(playerOne);
    playerWall(playerTwo);
    ball.x += ball.dx;
    ball.y += ball.dy;
    //console.log(ball.x);
    //console.log(ball.dx);
    //console.log(`state ${state.ball.x}`);
}
exports.gameLoop = gameLoop;
