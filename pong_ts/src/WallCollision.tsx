import {Ball} from "./Ball"

export function WallCollision(ball:Ball, canvas:HTMLCanvasElement)
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
