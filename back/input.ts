import { gamestate } from "./game";

export function movePlayerOneUp(state:gamestate)
{
	state.players[0].lastKey = 'w';
	state.players[0].keys.w = true;
}

export function movePlayerTwoUp(state:gamestate)
{
	state.players[1].lastKey = 'w';
	state.players[1].keys.w = true;
}

export function movePlayerOneDown(state:gamestate)
{
	state.players[0].lastKey = 's';
	state.players[0].keys.s = true;
}

export function movePlayerTwoDown(state:gamestate)
{
	state.players[1].lastKey = 's';
	state.players[1].keys.s = true;
}

export function stopMovePlayerOneUp(state:gamestate)
{
	state.players[0].v_y = 0;
	state.players[0].keys.w = false;
}

export function stopMovePlayerTwoUp(state:gamestate)
{
	state.players[1].v_y = 0;
	state.players[1].keys.w = false;
}

export function stopMovePlayerOneDown(state:gamestate)
{
	state.players[0].v_y = 0;
	state.players[0].keys.s = false;
}

export function stopMovePlayerTwoDown(state:gamestate)
{
	state.players[1].v_y = 0;
	state.players[1].keys.s = false;
}

export * as Input from "./input"