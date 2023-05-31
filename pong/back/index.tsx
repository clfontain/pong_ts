const express = require('express');
const app = express();
const http = require('http');
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

io.on("connection", (socket) => {
	//console.log(`User Connected: ${socket.id}`);
	socket.on("send_message", (data) => {
		console.log(data);
	});
	socket.on("move_up", (data) => {
		data.x += 1;
		io.emit("response_up", data);
	})
})





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

server.listen(3001, () => {
  console.log('listening on *:3001');
});
