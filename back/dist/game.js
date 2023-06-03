"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.moveBall = exports.getRandomDirection = exports.gameLoop = exports.initGame = void 0;
function initGame() {
    const state = {
        players: [{
                x: 0.1, y: 0.2, height: 0.2, width: 0.02, color: "white",
                v_y: 0, lastKey: "null", score: 0
            },
            {
                x: 4, y: 5, height: 30, width: 50, color: "white",
                v_y: 0, lastKey: "null", score: 0
            }],
        ball: {
            x: 0.5, y: 0.5, dx: 0.01, dy: 0.01, rad: 0.02, speed: 1, direction: getRandomDirection()
        },
        keys: {
            w: false, s: false
        }
    };
    return (state);
}
exports.initGame = initGame;
;
function playerWall(player) {
    if (player.y + player.height + player.v_y >= 1) {
        player.v_y = 0;
        player.y = 0.80;
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
    if (playerOne.lastKey === 's' && state.keys.s === true) {
        playerOne.v_y = 0.01;
    }
    if (playerOne.lastKey === 'w' && state.keys.w === true) {
        playerOne.v_y = -0.01;
    }
    playerOne.y += playerOne.v_y;
    playerTwo.y += playerTwo.v_y;
    //console.log(state.players[0].v_y);
    playerWall(playerOne);
    playerWall(playerTwo);
    moveBall(state);
    if (ball.x + ball.rad >= 1 || ball.x - ball.rad <= 0) {
        if (ball.x <= 0)
            playerOne.score++;
        else
            playerTwo.score++;
        reset(state);
    }
    if (ball.y - ball.rad <= 0 || ball.y + ball.rad >= 1) {
        if (ball.speed < 3) {
            //ball.dy *= 1.25;
            ball.speed++;
        }
        ball.dy *= -1;
    }
    if (ball.x - ball.rad <= playerOne.x + playerOne.width && ball.y - ball.rad >= playerOne.y && ball.y < playerOne.y + playerOne.height) {
        console.log(ball.dx);
        ball.dx *= -1;
    }
}
exports.gameLoop = gameLoop;
function getRandomDirection() {
    const range = 0.70;
    let first = (Math.random() * range - range / 2) * Math.PI;
    let second = Math.random() * range - range / 2;
    second = (second + (1 - (range / 2)) * Math.sign(second)) * Math.PI;
    return Math.random() > 0.5 ? first : second;
}
exports.getRandomDirection = getRandomDirection;
function moveBall(state) {
    let up_x = state.ball.dx * Math.cos(state.ball.direction);
    let up_y = state.ball.dy * Math.sin(state.ball.direction);
    state.ball.x += up_x;
    state.ball.y += up_y;
}
exports.moveBall = moveBall;
function reset(state) {
    state.ball.direction = getRandomDirection();
    state.ball.x = 0.5;
    state.ball.y = 0.5;
    state.ball.dx = 0.01;
    state.ball.dx = 0.01;
    state.ball.speed = 1;
}
exports.reset = reset;
