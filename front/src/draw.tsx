
export	function drawPlayer(context:CanvasRenderingContext2D, canvas:HTMLCanvasElement, gamestate:any)
	{
			context.beginPath();
			context.rect(context.canvas.width * gamestate.player1_x, context.canvas.height *gamestate.player1_y, context.canvas.width *gamestate.player1_width, context.canvas.height *gamestate.player1_height);
			context.fillStyle = gamestate.color;
			context.strokeStyle = "white";
			context.lineWidth = 1;
			context.shadowBlur = 0;
			context.shadowColor = "blue";
			context.strokeRect(context.canvas.width * gamestate.player1_x, context.canvas.height *gamestate.player1_y, context.canvas.width *gamestate.player1_width, context.canvas.height *gamestate.player1_height);
			context.fill();

			context.beginPath();
			context.rect(context.canvas.width * gamestate.player2_x, context.canvas.height *gamestate.player2_y, context.canvas.width *gamestate.player2_width, context.canvas.height *gamestate.player2_height);
			context.fillStyle = gamestate.color;
			context.strokeStyle = "white";
			context.lineWidth = 1;
			context.shadowBlur = 0;
			context.shadowColor = "blue";
			context.strokeRect(context.canvas.width * gamestate.player2_x, context.canvas.height *gamestate.player2_y, context.canvas.width *gamestate.player2_width, context.canvas.height *gamestate.player2_height);
			context.fill();
	}

export function drawBall(context:CanvasRenderingContext2D, gamestate:any)
	{
		context.arc( context.canvas.width * gamestate.ball_x , context.canvas.height * gamestate.ball_y, gamestate.ball_rad * ((context.canvas.width + context.canvas.height )/2),0, 2*Math.PI);
		context.strokeStyle ="white";
		context.stroke();
		context.fillStyle = "white";
		context.lineWidth =4;
		context.fill();

	}

export function drawCanvas(context:CanvasRenderingContext2D)
{
	context.clearRect(0,0, context.canvas.width, context.canvas.height);
	context.beginPath();

}

export function drawScore(ctx:CanvasRenderingContext2D, gamestate:any)
{
	let pixel:number = 0;

	if (ctx.canvas.width < 400)
	{
		if (ctx.canvas.height < 200)
			pixel = 5;
		else
			pixel = 10;
	}
	else if (ctx.canvas.width <= 600)
		pixel = 15;
	else if (ctx.canvas.width <= 1200)
		pixel = 25;
	else
		pixel = 40;
	ctx.font = `${pixel}px Arial`;
	ctx.fillStyle = "white";
	ctx.fillText(`Player One :  ${gamestate.player1_score}`, 0.25* ctx.canvas.width , 0.1 * ctx.canvas.height);
	ctx.fillText(`Player Two :  ${gamestate.player2_score}`, 0.55* ctx.canvas.width , 0.1 * ctx.canvas.height);
}


export function drawEnd(ctx:CanvasRenderingContext2D, gamestate:any)
{
	let pixel:number = 40;
	ctx.font = `${pixel}px Arial`;
	ctx.fillStyle = "white";
	if (gamestate.player1_score > gamestate.player2_score)
		ctx.fillText(`Player One win !!!`, 0.50* ctx.canvas.width , 0.50 * ctx.canvas.height);
	else
		ctx.fillText(`Player Two win !!!`, 0.50* ctx.canvas.width , 0.50 * ctx.canvas.height);
}
