import { gamestate } from "../../back/game";

export function playerState(ctx:CanvasRenderingContext2D, game:gamestate)
{
	ctx.font = "40px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(`Player One :  ${game.players[0].score}`, 0.25* ctx.canvas.width , 0.1 * ctx.canvas.height);
	ctx.fillText(`Player Two :  ${game.players[1].score}`, 0.55* ctx.canvas.width , 0.1 * ctx.canvas.height);
}