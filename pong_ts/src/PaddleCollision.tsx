import { getByPlaceholderText } from "@testing-library/react";
import ballObj from "./data/ballObj";
import {Paddle} from "./Paddle";

export function PaddleCollision(ball:ballObj, paddle:Paddle)
{
	if (	ball.x >= paddle.x 	
		ball.x < paddle.x + paddle.width)
	/*&& 
			ball.x > paddle.x && 
			paddle.y < paddle.y + paddle.height)/* &&
			ball.y + ball.rad > paddle.y - paddle.height / 2
		)*/
	{
		ball.dx = 5;
		/*let collidePoint:number = ball.x - (paddle.x + paddle.width / 2)
		collidePoint = collidePoint / (paddle.width / 2);
		let angle:number = (collidePoint * Math.PI) / 3;
		ball.dx = ball.speed * Math.sin(angle);
		ball.dy = -ball.speed * Math.cos(angle);*/
	}
}
