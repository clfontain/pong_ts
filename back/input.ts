import { gamestate } from "./game";

export function movePlayerOneUp(state:gamestate)
{
	state.player1.lastKey = 'w';
	state.player1.keys.w = true;
}

export function movePlayerTwoUp(state:gamestate)
{
	state.player2.lastKey = 'w';
	state.player2.keys.w = true;
}

export function movePlayerOneDown(state:gamestate)
{
	state.player1.lastKey = 's';
	state.player1.keys.s = true;
}

export function movePlayerTwoDown(state:gamestate)
{
	state.player2.lastKey = 's';
	state.player2.keys.s = true;
}

export function stopMovePlayerOneUp(state:gamestate)
{
	state.player1.v_y = 0;
	state.player1.keys.w = false;
}

export function stopMovePlayerTwoUp(state:gamestate)
{
	state.player2.v_y = 0;
	state.player2.keys.w = false;
}

export function stopMovePlayerOneDown(state:gamestate)
{
	state.player1.v_y = 0;
	state.player1.keys.s = false;
}

export function stopMovePlayerTwoDown(state:gamestate)
{
	state.player2.v_y = 0;
	state.player2.keys.s = false;
}

export * as Input from "./input"