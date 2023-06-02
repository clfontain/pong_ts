import React from 'react';
import {useEffect,useRef, useState} from 'react';
import './App.css';
import {drawBall} from './Ball'
//import {WallCollision} from './WallCollision'
//import {PaddleCollision} from './PaddleCollision'
import {keys} from "./Paddle"
import {drawPlayer} from "./Paddle"
import {BallResize} from "./Ball"
import { io, Socket } from 'socket.io-client';
import {gamestate, initGame} from "./copy_game"


function Canvas(){

	const [hasLeft, setHasLeft] = useState(false);
	
	let state:gamestate = initGame();
	/*const sendMessage = () =>
	{
		socket.emit("send_message", paddx);
	}
	sendMessage();*/
	const socket = io("http://localhost:3001");
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	useEffect(() =>
	{
		socket.on("end", () =>{
			return (setHasLeft(true))
		});
		socket.on("gameState", (data) => {
			state = data;
			console.log(state.ball.x);
		})
		let key:keys = {w:false, s:false};
		window.addEventListener("keydown", e =>
		{
			switch (e.key)
			{
			case 'w':
				/*key.w = true;
				paddle.lastKey = "w";
				break;
				case 's':
					key.s = true;
				paddle.lastKey = "s";
				break;*/
			}
		})
		window.addEventListener("keyup", e =>
		{
			if (e.key === "w")
			{}
				/*key.w = false;
				paddle.v_y = 0;
			if (e.key === 's')
				key.s = false;
				paddle.v_y = 0;*/
		})
		
			/*//let ratio:number = window.innerHeight * 0.66;
			//let ball = new Ball(Math.round(ratio /2), Math.round(ratio/2), 5, 5,Math.round(ratio / 40),10);
			//let paddle = new Paddle(Math.round(ratio / 10), ratio /10, ratio /3, ratio / 20,"white", 0, "null");
			function render(state:gamestate)
			{
				if (!context)
				return;
				if (!canvas)
					return;
				if (!state)
					return;
				context.clearRect(0,0,canvas.width, canvas.height);
				//drawBall(context, state.ball);
				//drawPlayer(context, canvas, state.players[0]);
				//WallCollision(state.ball, canvas);
			if (key.w === true && paddle.lastKey === "w")
				paddle.v_y = -5;
			else if (key.s === true && paddle.lastKey === "s")
				paddle.v_y = 5;
			//PaddleCollision(state.ball, state.players[0]);
			//requestAnimationFrame(render);
		}
		//render();
		
		const handleResize = () => {
			let prev:number = context.canvas.height;
			let ratio:number = window.innerHeight * 0.66;
			context.canvas.height = ratio;
			context.canvas.width = window.innerWidth;
			//PaddleResize(paddle, prev);
			//BallResize(ball);
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);*/
	}, []);
	let here:boolean = false
	useEffect(() => {
			const canvas = canvasRef.current;
			if (!canvas)
				return;
			const context = canvas.getContext('2d');
				if (!context)
			return;
			context.clearRect(0,0,canvas.width, canvas.height);
			console.log(state.ball.x);
			drawBall(context, state.ball);
		}, [state]);

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



