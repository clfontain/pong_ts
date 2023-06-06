/*
	npm run dev :: launch the server
	npm run build :: compile index.ts
*/


import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as http from "http";
import { Socket } from "socket.io";
import {gamestate} from "./game"

import { Input } from './input';


dotenv.config();

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
	res.send('Express + bonjour TypeScript Server');
  });

const server = http.createServer(app);

const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());


const io = new Server(server, {
	cors:{
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

let i:number = 0;
const state = new gamestate();

io.on("connection", (client:Socket) => {


	if (i === 0)
	{
		state.player1.id = client.id;
		i++;
	}
	else if (i === 1)
	{
		console.log("joueur 2 assigne")
		state.player2.id = client.id;
		i++;
	}


	client.on("disconnect", () =>
	{
		if (client.id === state.player1.id)
			i = 0
		else if (client.id === state.player2.id)
			i = 1;
		io.emit("end");
	})

	client.on("move_up", () =>
	{
		if (client.id === state.player1.id)
			Input.movePlayerOneUp(state);
		else if(client.id === state.player2.id)
			Input.movePlayerTwoUp(state);
	})

	client.on("move_down", () =>
	{

		if (client.id === state.player1.id)
		{
			Input.movePlayerOneDown(state);
		}
		else if(client.id === state.player2.id)
			Input.movePlayerTwoDown(state);
	})



	client.on("stop_up", () =>
	{
		if (client.id === state.player1.id)
		{
			Input.stopMovePlayerOneUp(state);
		}
		else if(client.id === state.player2.id)
			Input.stopMovePlayerTwoUp(state);
	})

	client.on("stop_down", () =>
	{
		if (client.id === state.player1.id)
			Input.stopMovePlayerOneDown(state);
		else if(client.id === state.player2.id)
			Input.stopMovePlayerTwoDown(state);
	})


});

setInterval(() => {
	state.update();
	io.emit("gameState", state.getData());
}, 17);


server.listen(port, () => {
  console.log(`listening on ${port}`);
});
