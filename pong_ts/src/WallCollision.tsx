import ballObj from "./data/ballObj";

export function WallCollision(ball:ballObj, canvas:HTMLCanvasElement)
{
	if ( ball.y - ball.rad <= 0 || 
		ball.y + ball.rad >= canvas.height)
	{
		ball.dy *= -1;
	}
	if ( ball.x + ball.rad >= canvas.width || 
		ball.x - ball.rad <= 0)
	{
		ball.dx *= -1;
	}
}
