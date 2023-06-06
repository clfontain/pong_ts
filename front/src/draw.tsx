import {gamestate} from "../../back/game"



export	function drawPlayer(context:CanvasRenderingContext2D, canvas:HTMLCanvasElement, paddle:gamestate["players"][0])
	{
		context.beginPath();
		context.rect(context.canvas.width * paddle.x, context.canvas.height *paddle.y, context.canvas.width *paddle.width, context.canvas.height *paddle.height);
		context.fillStyle = paddle.color;
		context.strokeStyle = "white";
		context.lineWidth = 1;
		context.shadowBlur = 0;
		context.shadowColor = "blue";
		context.strokeRect(context.canvas.width * paddle.x, context.canvas.height *paddle.y, context.canvas.width *paddle.width, context.canvas.height *paddle.height);
		context.fill();
	}

export function drawBall(context:CanvasRenderingContext2D, state:gamestate)
	{
		context.arc( context.canvas.width * state.ball.x , context.canvas.height * state.ball.y, state.ball.rad * ((context.canvas.width + context.canvas.height )/2),0, 2*Math.PI);
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

export function drawScore(ctx:CanvasRenderingContext2D, game:gamestate)
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
	ctx.fillText(`Player One :  ${game.players[0].score}`, 0.25* ctx.canvas.width , 0.1 * ctx.canvas.height);
	ctx.fillText(`Player Two :  ${game.players[1].score}`, 0.55* ctx.canvas.width , 0.1 * ctx.canvas.height);
}