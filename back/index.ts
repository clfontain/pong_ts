/*
	npm run dev :: launch the server
	npm run build :: compile index.ts
*/


import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as http from "http";
import { Socket } from "socket.io";
import { serialize, parse } from "cookie";
import {initGame, gamestate, gameLoop} from "./game"
import e from 'express';
import { init_sim_mid_to_mid, init_sim_top_to_mid, reset_sim } from './simulation';
import { Input } from './input';


dotenv.config();

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
	res.send('Express + bonjour TypeScript Server');
  });
//const http = require('http');
const server = http.createServer(app);
//const io = new socketio.Server(server);
const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());
let end:boolean = false;
//let socket_tab;

const io = new Server(server, {
	cors:{
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const client_tab:any = [];
let i:number = 0;
const state:gamestate = initGame();
//const state:gamestate = init_sim_mid_to_mid();
//const state:gamestate = init_sim_top_to_mid();
io.on("connection", (client:Socket) => {


	if (i < 2)
	{

		state.players[i].order = client.id;
		i++;
	}


	client.on("disconnect", () =>
	{
		let index:number = 0
		for(; index < 2; index++)
		{
			if (client.id === state.players[index].order)
			{
				i = index;
			}
		}
		io.emit("end");
	})

	client.on("move_up", () =>
	{
		//console.log(i);
		if (client.id === state.players[0].order)
			Input.movePlayerOneUp(state);
		else if(client.id === state.players[1].order)
			Input.movePlayerTwoUp(state);
	})

	client.on("move_down", () =>
	{

		if (client.id === state.players[0].order)
		{
			//console.log("allo ?")
			Input.movePlayerOneDown(state);
		}
		else if(client.id === state.players[1].order)
			Input.movePlayerTwoDown(state);
	})



	client.on("stop_up", () =>
	{
		if (client.id === state.players[0].order)
		{
			Input.stopMovePlayerOneUp(state);
		}
		else if(client.id === state.players[1].order)
			Input.stopMovePlayerTwoUp(state);
	})

	client.on("stop_down", () =>
	{
		if (client.id === state.players[0].order)
			Input.stopMovePlayerOneDown(state);
		else if(client.id === state.players[1].order)
			Input.stopMovePlayerTwoDown(state);
	})


});

setInterval(() => {
	gameLoop(state);
	io.emit("gameState", state);
}, 17);


server.listen(port, () => {
  console.log(`listening on ${port}`);
});
