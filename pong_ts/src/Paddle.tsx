



//export default(context:CanvasRenderingContext2D, canvas:HTMLCanvasElement, paddle:paddleObj) => {
	
	
export	class Paddle
	{
		x:number;
		y:number;
		height:number;
		width:number;
		color:string;
		v_y:number;
		lastKey:string;
		constructor(x:number, y:number, height:number, width:number, color:string, v_y:number, lastKey:string)
		{
			this.x = x;
			//this.y = canvas.height - 30;
			this.y = y;
			//this.height = 20;
			this.height = height;
			//this.width = paddle.width;
			this.width = width;
			//this.color = "white";
			this.color = color;
			this.v_y = v_y;
			this.lastKey = lastKey;
			//console.log(this.velocity_x);
		}
	}

export	function move(context:CanvasRenderingContext2D, canvas:HTMLCanvasElement, paddle:Paddle)
	{
		paddle.y += paddle.v_y;
		if (paddle.y + paddle.height + paddle.v_y >= canvas.height)
		{
			paddle.v_y = 0;
			paddle.y = 400;
		}
		if (paddle.y + paddle.v_y <= 0)
		{
			paddle.v_y = 0;
			paddle.y = 0;
		}
		context.beginPath();
		context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
		context.fillStyle = paddle.color;
		context.strokeStyle = "white";
		context.lineWidth = 1;
		context.shadowBlur = 0;
		context.shadowColor = "blue";
		context.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
		context.fill();
	}
	
export interface keys
	{
		w:boolean;
		s:boolean;
	}

/*}
	//let padz = new Paddle(paddle.x, paddle.vel_x);
	//console.log(padz.x);
	//padz.move();
	//console.log(padz.x);
	if (paddle.x <= 0)
	{
		paddle.x = 0;
	}
	else if (paddle.x + paddle.width >= canvas.width)
	{
		paddle.x = canvas.width - paddle.width;
	}
}*/


