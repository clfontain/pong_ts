import {gamestate} from "../../back/game"	

/*export	class Paddle
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
			this.y = y;
			this.height = height;
			this.width = width;
			this.color = color;
			this.v_y = v_y;
			this.lastKey = lastKey;
		}
	}
*/
/*export function PaddleResize(paddle:Paddle, prev:number)
{
	//let test:number = 
	let ratio:number = window.innerHeight * 0.66;
	paddle.x = Math.round(ratio / 10);
	paddle.y = Math.round(ratio /10);
	paddle.height = Math.round(ratio / 3);
	paddle.width = Math.round(ratio / 20);
}*/

export	function drawPlayer(context:CanvasRenderingContext2D, canvas:HTMLCanvasElement, paddle:gamestate["players"][0])
	{
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


