import { gamestate } from "./game";

export function init_sim_mid_to_mid()
{
	const state:gamestate = {
		players: [{
			x: 0.1, y: 0.40, height: 0.2, width: 0.02, color: "white",
			v_y : 0, lastKey: "null", score: 0, order: 'null' , keys:{w:false, s:false}},
		{
			x: 4, y: 5, height: 30, width: 50, color: "white",
			v_y : 0, lastKey: "null", score: 0, order: 'null ', keys:{w:false, s:false}}],
		ball:{
			x:0.5, y:0.5, dx: 0.01, dy: 0.00, rad: 0.02, speed:1, direction: 0
		},
	}
	return (state);
}

export function init_sim_top_to_mid()
{
	const state:gamestate = {
		players: [{
			x: 0.1, y: 0.40, height: 0.2, width: 0.02, color: "white",
			v_y : 0, lastKey: "null", score: 0, order: 'null' , keys:{w:false, s:false}},
		{
			x: 4, y: 5, height: 30, width: 50, color: "white",
			v_y : 0, lastKey: "null", score: 0, order: 'null' , keys:{w:false, s:false}}],
		ball:{
			x:0.5, y:0.1, dx: 0.01, dy: 0.01, rad: 0.01, speed:1, direction: 2.45
		},
	}
	return (state);
}


export function reset_sim(state:gamestate)
{
	state.ball.direction = 2.45
	state.ball.x = 0.5;
	state.ball.y = 0.1;
	state.ball.dx = 0.01;
	state.ball.dy = 0.01;
	state.ball.speed = 1;
}