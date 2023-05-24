

export function BallMovement(context:CanvasRenderingContext2D, ball:Ball)
{

	//let data = new Ball(ball.x, ball.y, ball.rad);
	draw(context, ball);
	ball.x += ball.dx;
	ball.y += ball.dy;
}

export class Ball {
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
}

export function	draw(context:CanvasRenderingContext2D, ball:Ball)
	{
		context.beginPath();
		//context.fillStyle = 'red';
		context.rect(ball.x,ball.y,10,10);
		context.strokeStyle ="white";
		context.lineWidth =4;
		context.fill();
		context.stroke();
	}


