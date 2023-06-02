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
let player_size:number = 0;
const state:gamestate = initGame();

io.on("connection", (client:Socket) => {
	
	player_size++;
	
	client_tab[client.id] = player_size;

		
	client.on("disconnect", () => {
		console.log("allo ?")
		io.emit("end");
	})
});


setInterval(() => {
	gameLoop(state);
	io.emit("gameState", state);
}, 1000/20);

/*app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
	socket.on('upgrade', (arg) => {
		arg.y = 2;
		//console.log(arg);
	});

	socket.on('up', (data) =>
	{
		data.x += 32;
		io.emit('response_on', data);
	});
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg) ;
	})
});*/

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
