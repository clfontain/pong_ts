"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamestate = exports.Ball = exports.Player = void 0;
class Player {
    constructor(x, y, height, width, color, v_y, lastKey, score, id, keys) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.v_y = v_y;
        this.lastKey = lastKey;
        this.score = score;
        this.id = id;
        this.keys = keys;
    }
}
exports.Player = Player;
class Ball {
    constructor(x, y, dx, dy, rad, speed, direction) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.rad = rad;
        this.speed = speed;
        this.direction = direction;
    }
}
exports.Ball = Ball;
class gamestate {
    constructor() {
        this.ball = new Ball(0.5, 0.5, 0.01, 0.01, 0.01, 1, this.getRandomDirection());
        this.player1 = new Player(0.1, 0.2, 0.2, 0.02, "white", 0, "null", 0, 'null', { w: false, s: false });
        this.player2 = new Player(0.9, 0.2, 0.2, 0.02, "white", 0, "null", 0, 'null', { w: false, s: false });
    }
    reset() {
        this.ball.direction = this.getRandomDirection();
        this.ball.x = 0.5;
        this.ball.y = 0.5;
        this.ball.dx = 0.01;
        this.ball.dx = 0.01;
        this.ball.speed = 1;
    }
    getRandomDirection() {
        const range = 0.70;
        let first = (Math.random() * range - range / 2) * Math.PI;
        let second = Math.random() * range - range / 2;
        second = (second + (1 - (range / 2)) * Math.sign(second)) * Math.PI;
        return Math.random() > 0.5 ? first : second;
    }
    getData() {
        return ({
            ball_x: this.ball.x,
            ball_y: this.ball.y,
            ball_rad: this.ball.rad,
            player1_x: this.player1.x,
            player1_y: this.player1.y,
            player1_height: this.player1.height,
            player1_width: this.player1.width,
            player1_score: this.player1.score,
            player2_x: this.player2.x,
            player2_y: this.player2.y,
            player2_height: this.player2.height,
            player2_width: this.player2.width,
            player2_score: this.player2.score,
        });
    }
    playerWall(player) {
        if (player.y + player.height + player.v_y >= 1) {
            player.v_y = 0;
            player.y = 0.80;
        }
        if (player.y + player.v_y <= 0) {
            player.v_y = 0;
            player.y = 0;
        }
    }
    circlevsRect(player) {
        let px = this.ball.x;
        let py = this.ball.y;
        px = Math.max(px, player.x);
        px = Math.min(px, player.x + player.width);
        py = Math.max(py, player.y);
        py = Math.min(py, player.y + player.height);
        return (Math.pow((this.ball.y - py), 2) + Math.pow(this.ball.x - px, 2) < Math.pow(this.ball.rad, 2));
    }
    moveBall() {
        let up_x = this.ball.dx * Math.cos(this.ball.direction);
        let up_y = this.ball.dy * Math.sin(this.ball.direction);
        this.ball.x += up_x;
        this.ball.y += up_y;
    }
    BallCollision() {
        if (this.player1.score >= 12 || this.player2.score >= 12) {
            this.reset();
            this.player1.score = 0;
            this.player2.score = 0;
        }
        if (this.ball.x + this.ball.rad >= 1 || this.ball.x - this.ball.rad <= 0) {
            if (this.ball.x - this.ball.rad <= 0)
                this.player2.score++;
            else
                this.player1.score++;
            this.reset();
        }
        if (this.ball.y - this.ball.rad <= 0 || this.ball.y + this.ball.rad >= 1) {
            if (this.ball.speed < 3) {
                //this.ball.dy *= 1.15;
                //this.ball.speed++;
            }
            this.ball.dy *= -1;
        }
        if (this.circlevsRect(this.player1) || this.circlevsRect(this.player2)) {
            this.ball.dx *= -1;
            this.ball.dy *= -1;
        }
    }
    update() {
        if (this.player1.lastKey === 's' && this.player1.keys.s === true) {
            this.player1.v_y = 0.01;
        }
        else if (this.player1.lastKey === 'w' && this.player1.keys.w === true) {
            this.player1.v_y = -0.01;
        }
        if (this.player2.lastKey === 's' && this.player2.keys.s === true) {
            this.player2.v_y = 0.01;
        }
        else if (this.player2.lastKey === 'w' && this.player2.keys.w === true) {
            this.player2.v_y = -0.01;
        }
        this.player1.y += this.player1.v_y;
        this.player2.y += this.player2.v_y;
        this.playerWall(this.player1);
        this.playerWall(this.player2);
        this.moveBall();
        this.BallCollision();
    }
}
exports.gamestate = gamestate;
/*
export interface gamestate
{
    players :{
        x:number;
        y:number;
        height:number;
        width:number;
        color:string;
        v_y:number;
        lastKey:string;
        score:number;
        order:string;
        keys: {
            w:boolean;
            s:boolean;
        }
    } [],
    ball :{
        x:number;
        y:number;
        dx:number;
        dy:number;
        rad:number;
        speed:number;
        direction:number;
    },

}

export function initGame()
{
    const state:gamestate = {
        players: [{
            x: 0.1, y: 0.2, height: 0.2, width: 0.02, color: "white",
            v_y : 0, lastKey: "null", score: 0, order: 'null', keys:{w:false, s:false}},
        {
            x: 0.9, y: 0.2, height: 0.2, width: 0.02, color: "white",
            v_y : 0, lastKey: "null", score: 0, order: 'null', keys:{w:false, s:false}}],
        ball:{
            x:0.5, y:0.5, dx: 0.01, dy: 0.01, rad: 0.01, speed:1, direction: getRandomDirection()
        },

    }
    return (state);
};

function playerWall(player:any)
{
    if (player.y + player.height + player.v_y >= 1)
    {
        player.v_y = 0;
        player.y = 0.80;
    }
    if (player.y + player.v_y <= 0)
    {
        player.v_y = 0;
        player.y = 0;
    }
}


export function gameLoop(state:gamestate)
{
    if (!state)
        return;
    const this.player1 = state.players[0];
    const playerTwo = state.players[1];
    const ball = state.ball;
    if (this.player1.lastKey === 's' && playerOne.keys.s === true)
    {
        playerOne.v_y = 0.01;
    }
    else if (playerOne.lastKey === 'w' && playerOne.keys.w === true)
    {
            playerOne.v_y = -0.01;
    }
    if (playerTwo.lastKey === 's' && playerTwo.keys.s === true)
    {
        playerTwo.v_y = 0.01;
    }
    else if (playerTwo.lastKey === 'w' && playerTwo.keys.w === true)
    {
            playerTwo.v_y = -0.01;
    }
    playerOne.y += playerOne.v_y;
    playerTwo.y += playerTwo.v_y;
    playerWall(playerOne);
    playerWall(playerTwo);
    moveBall(state);
    BallCollision(state);


}

export function getRandomDirection() {
    const range = 0.70;
    let first = (Math.random() * range - range / 2) * Math.PI;
    let second = Math.random() * range - range / 2;
    second = (second + (1 - (range / 2)) * Math.sign(second)) * Math.PI ;
    return Math.random() > 0.5 ? first : second;
}

export function moveBall(state:gamestate)
{
    let up_x = state.ball.dx * Math.cos(state.ball.direction);
    let up_y = state.ball.dy * Math.sin(state.ball.direction);
    state.ball.x += up_x;
    state.ball.y += up_y;

}

export function reset(state:gamestate)
{
    state.ball.direction = getRandomDirection();
    state.ball.x = 0.5;
    state.ball.y = 0.5;
    state.ball.dx = 0.01;
    state.ball.dx = 0.01;
    state.ball.speed = 1;
}

let a:number = 0;

function BallCollision(state:gamestate)
{
    const ball = state.ball;
    const playerOne = state.players[0];
    const playerTwo = state.players[1];

    if (playerOne.score >= 12|| playerTwo.score >= 12)
    {
        reset(state);
        playerOne.score = 0;
        playerTwo.score = 0;
    }
    if ( ball.x + ball.rad >= 1 ||	ball.x - ball.rad <= 0)
    {
        if (ball.x - ball.rad<= 0)
            playerTwo.score++;
        else
            playerOne.score++;
        reset(state);
    }
    if ( ball.y - ball.rad <= 0 ||	ball.y + ball.rad >= 1)
    {
        if (ball.speed < 3)
        {
            //ball.dy *= 1.15;
            //ball.speed++;
        }
        ball.dy *= -1;
    }
    /*interface point {
        px:number;
        py:number;
    }
    let pt:point | 0 =circlevsRectOne(state);
    //if (pt != 0)
    if (circlevsRectOne(state) || circlevsRectTwo(state))
    {
        let offset:point = {px : ball.x - pt.px, py: ball.y - pt.py};
        let distance:number = Math.sqrt(Math.pow(offset.px, 2) + Math.pow(offset.py, 2));
        let direction:point = {px: offset.px/distance, py: offset.py/distance};
        let  movelen:number = ball.rad - distance;
        ball.x = ball.x + movelen * direction.px;
        ball.y = ball.y + movelen * direction.py;
        ball.dx *= -1;
        ball.dy *= -1;
    }
}

export function circlevsRectOne(state:gamestate)
{
    const ball = state.ball;
    const playerOne = state.players[0];
    let px:number = ball.x;
    let py:number = ball.y;
    px = Math.max(px, playerOne.x);
    px = Math.min(px, playerOne.x + playerOne.width);
    py = Math.max(py, playerOne.y);
    py = Math.min(py, playerOne.y + playerOne.height);
    let result:boolean = Math.pow((ball.y - py), 2) + Math.pow(ball.x - px, 2) < Math.pow(ball.rad, 2)
    if (result)
        return({px, py});
    else
        return (0);
}

export function circlevsRectTwo(state:gamestate)
{
    const ball = state.ball;
    const playerTwo = state.players[1];
    let px:number = ball.x;
    let py:number = ball.y;
    px = Math.max(px, playerTwo.x);
    px = Math.min(px, playerTwo.x + playerTwo.width);
    py = Math.max(py, playerTwo.y);
    py = Math.min(py, playerTwo.y + playerTwo.height);
    return (Math.pow((ball.y - py), 2) + Math.pow(ball.x - px, 2) < Math.pow(ball.rad, 2));
}


*/ 
