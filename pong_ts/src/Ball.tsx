

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

export function BallResize(ball:Ball)
{
	let ratio:number = window.innerHeight * 0.66;
	ball.x = Math.round(ratio /2);
	ball.y = Math.round(ratio /2);
	ball.rad = Math.round(ratio/40);
	/*ball.height = Math.round(ratio / 3);
	ball.width = Math.round(ratio / 20);*/
}

export function	draw(context:CanvasRenderingContext2D, ball:Ball)
	{
		context.beginPath();
		//context.fillStyle = 'red';
		context.arc(ball.x,ball.y, ball.rad,0, 2*Math.PI);
		context.strokeStyle ="white";
		context.lineWidth =4;
		context.fill();
		context.stroke();
	}


