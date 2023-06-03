export interface gamestate
{
	players :{
		x:number;
		y:number;
		height:number;
		width:number;
		color:string;
		v_y:number;
		lastKey:string;
	} [],
	ball :{
		x:number;
		y:number;
		dx:number;
		dy:number;
		rad:number;
		speed:number;
	},
}

export function initGame()
{
	const state:gamestate = { 
		players: [{
			x: 4, y: 5, height: 30, width: 50, color: "white",
			v_y : 0, lastKey: "null"},
		{
			x: 4, y: 5, height: 30, width: 50, color: "white",
			v_y : 0, lastKey: "null"}],
		ball:{
			x:250, y:250, dx: 5, dy: 5, rad: 10, speed:5
		},
	}	
	
	return (state);
};
