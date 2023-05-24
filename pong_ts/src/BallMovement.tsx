import { displayPartsToString } from "typescript";
import ballObj from "./data/ballObj.js"

export function BallMovement(context:CanvasRenderingContext2D, ball:ballObj)
{

	let data = new Ball(ball.x, ball.y, ball.rad);
	data.draw(context);
	ball.x += ball.dx;
	ball.y += ball.dy;
}

class Ball {
	x:number;
	y:number;
	rad:number;
	constructor(x:number, y:number, rad:number)
	{
		this.x = x;
		this.y = y;
		this.rad = rad;
	}
	draw(context:CanvasRenderingContext2D)
	{
		context.beginPath();
		//context.fillStyle = 'red';
		context.rect(this.x,this.y,10,10);
		context.strokeStyle ="white";
		context.lineWidth =4;
		context.fill();
		context.stroke();
	}
}
