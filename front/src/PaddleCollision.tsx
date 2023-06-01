import {Ball} from "./Ball"
import {Paddle} from "./Paddle";

export function PaddleCollision(ball:Ball, paddle:Paddle)
{
	if ( 	ball.x <= paddle.x + paddle.width &&
			ball.y >= paddle.y 	&&
			ball.y < paddle.y + paddle.height)
	{
		ball.dx = 5;
	}
}
