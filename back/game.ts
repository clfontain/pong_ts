import { reset_sim } from "./simulation";

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
	const playerOne = state.players[0];
	const playerTwo = state.players[1];
	const ball = state.ball;
	if (playerOne.lastKey === 's' && playerOne.keys.s === true)
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
	let pt:point | 0 =circlevsRectOne(state);*/
	//if (pt != 0)
	if (circlevsRectOne(state) || circlevsRectTwo(state))
	{
		/*let offset:point = {px : ball.x - pt.px, py: ball.y - pt.py};
		let distance:number = Math.sqrt(Math.pow(offset.px, 2) + Math.pow(offset.py, 2));
		let direction:point = {px: offset.px/distance, py: offset.py/distance};
		let  movelen:number = ball.rad - distance;
		ball.x = ball.x + movelen * direction.px;
		ball.y = ball.y + movelen * direction.py;*/
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


/*

ball.y < playerOne.y + playerOne.height &&
    ball.y > playerOne.y &&
    playerOne.x < playerOne.x + playerOne.width &&
    ball.x + ball.rad > playerOne.x - playerOne.width / 2



*/

/*if(ball.x - ball.rad )




*/


