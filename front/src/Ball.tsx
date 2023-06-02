import {gamestate} from "./copy_game"

export function drawBall(context:CanvasRenderingContext2D, ball:gamestate["ball"])
{
	//console.log(ball.dx);
	context.beginPath();
	context.arc(ball.x,ball.y, ball.rad,0, 2*Math.PI);
	context.strokeStyle ="white";
	context.lineWidth =4;
	context.fill();
	context.stroke();

}

/*export class Ball {
	x:number;
	y:number;
	dx:number;
	dy:number;
	rad:number;
	speed:number
	constructor(x:number, y:number, dx:number, dy:number, rad:number, speed:number)
	{
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.rad = rad;
		this.speed = speed;
	}
}*/

export function BallResize(ball:gamestate["ball"])
{
	let ratio:number = window.innerHeight * 0.66;
	ball.x = Math.round(ratio /2);
	ball.y = Math.round(ratio /2);
	ball.rad = Math.round(ratio/40);
	/*ball.height = Math.round(ratio / 3);
	ball.width = Math.round(ratio / 20);*/
}



