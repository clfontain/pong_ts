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
            x: 0.5, y: 0.5, dx: 0.5, dy: 0.5, rad: 10, speed: 5
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
    ball.x += 0.001;
    ball.y += 0.001;
    if (ball.x >= 1)
        ball.x = 0.45;
    if (ball.y >= 1)
        ball.y = 0.45;
    //ball.x += ball.dx;
    //ball.y += ball.dy;
    /*if ( ball.y - ball.rad <= 0 ||
        ball.y + ball.rad >= 500)
    {
        ball.dy *= -1;
        ball.speed *= 1;
    }
    if ( ball.x + ball.rad >= 800 ||
        ball.x - ball.rad <= 0)
    {
        ball.dx *= -1;
        ball.speed *= 1;
    }*/
    //console.log(ball.x);
    //console.log(ball.dx);
    //console.log(`state ${state.ball.x}`);
}
exports.gameLoop = gameLoop;
