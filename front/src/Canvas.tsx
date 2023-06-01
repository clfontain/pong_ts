import React from 'react';
import {useEffect,useRef, useState} from 'react';
import './App.css';
import {BallMovement} from './Ball'
import {Ball} from './Ball'
import {WallCollision} from './WallCollision'
import {Paddle} from "./Paddle"
import {move} from "./Paddle"
import {PaddleCollision} from './PaddleCollision'
import {keys} from "./Paddle"
import {PaddleResize} from "./Paddle"
import {BallResize} from "./Ball"
import {GameState} from "./GameState"
import { io, Socket } from 'socket.io-client';


function Canvas(){

	const paddx = new GameState(4,7);
	const [hasLeft, setHasLeft] = useState(false);
	
	
	/*const sendMessage = () =>
	{
		socket.emit("send_message", paddx);
	}
	sendMessage();*/
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	useEffect(() =>
	{
		const socket = io("http://localhost:3001");
		console.log("Use state begin")
		socket.emit("newGame");
		socket.on("end", () =>{
			return (setHasLeft(true))
		});
		socket.on("id_socket", (data) => {
			console.log(`your are ${data}`);
		});
		socket.on("response_up", (data) =>
		{
			paddx.x = data.x;
			console.log(paddx.x);
		})
		let key:keys = {w:false, s:false};
		window.addEventListener("keydown", e =>
		{
			switch (e.key)
			{
			case 'w':
				key.w = true;
				paddle.lastKey = "w";
				socket.emit("move_up", paddx);
				//paddle.x += paddle.vel_x;
				break;
				case 's':
					key.s = true;
				paddle.lastKey = "s";
				break;
			}
		})
		window.addEventListener("keyup", e =>
		{
			if (e.key === "w")
				key.w = false;
				paddle.v_y = 0;
				if (e.key === 's')
				key.s = false;
				paddle.v_y = 0;
			})
			const canvas = canvasRef.current;
			if (!canvas)
			return;
			const context = canvas.getContext('2d');
			if (!context)
			return;
			let ratio:number = window.innerHeight * 0.66;
			let ball = new Ball(Math.round(ratio /2), Math.round(ratio/2), 5, 5,Math.round(ratio / 40),10);
			let paddle = new Paddle(Math.round(ratio / 10), ratio /10, ratio /3, ratio / 20,"white", 0, "null");
			const render = () =>
			{
				context.clearRect(0,0,canvas.width, canvas.height);
				BallMovement(context, ball);
			WallCollision(ball, canvas);
			move(context, canvas, paddle);
			if (key.w === true && paddle.lastKey === "w")
				paddle.v_y = -5;
			else if (key.s === true && paddle.lastKey === "s")
				paddle.v_y = 5;
			PaddleCollision(ball, paddle);
			requestAnimationFrame(render);
		}
		render();
		
		const handleResize = () => {
			let prev:number = context.canvas.height;
			let ratio:number = window.innerHeight * 0.66;
			context.canvas.height = ratio;
			context.canvas.width = window.innerWidth;
			PaddleResize(paddle, prev);
			BallResize(ball);
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (<>
		{ hasLeft ? ( 
		<div> Has left</div> ) :
	(
	 <canvas
		id="canvas"
		ref={canvasRef}
		/*height="500px"
		width="800px"*/>
		</canvas>
	)}
		</>);
}

export default Canvas



