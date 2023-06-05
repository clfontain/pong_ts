import React, { useLayoutEffect } from 'react';
import {useEffect,useRef, useState} from 'react';
import './App.css';
import {drawBall} from './Ball'
//import {WallCollision} from './WallCollision'
//import {PaddleCollision} from './PaddleCollision'
import {keys} from "./Paddle"
import {drawPlayer} from "./Paddle"
import {BallResize} from "./Ball"
import { io, Socket } from 'socket.io-client';
import {gamestate} from "../../back/game"
import e from 'express';
import { Client } from 'socket.io/dist/client';
import { playerState } from './PlayerState';

function Canvas(){

	//const [hasLeft, setHasLeft] = useState(false);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const pixelRatio = window.devicePixelRatio;
	//const ref = useRef<HTMLDivElement | null>(null);
	const [state, setState] = useState({players: [{
		x: 0, y: 0, height: 0, width: 0, color: "white",
		v_y : 0, lastKey: "null", score: 0, order: 'null' , keys:{w:false, s:false}},
	{
		x: 0, y: 0, height: 0, width: 0, color: "white",
		v_y : 0, lastKey: "null", score: 0, order: 'null' , keys:{w:false, s:false}}],
	ball:{
		x:0, y:0, dx: 0, dy: 0, rad: 0, speed:0, direction: 0
	}
	});
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight > 400 ? window.innerHeight : 400);
		//setHeight(window.innerHeight);
	}, []);
	useEffect(() =>
	{
		const socket = io("http://localhost:3003");
		socket.on("gameState", (data) => {
			setState(data);
		});
		let key:keys = {w:false, s:false};
		window.addEventListener("keydown", e =>
		{
			switch (e.key)
			{
			case 'w':
				socket.emit("move_up")
				break;
			case 's':
				socket.emit("move_down");
				break;
			}
		})
		window.addEventListener("keyup", e =>
		{
			switch(e.key)
			{
				case 'w':
					socket.emit("stop_up");

					break;
				case 's':
					socket.emit("stop_down")
					break;
			}
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
		*/

	}, []);

	useEffect(() => {
			const canvas = canvasRef.current;
			if (!canvas)
				return;
			const context = canvas.getContext('2d');
				if (!context)
			return;
			context.clearRect(0,0, context.canvas.width, context.canvas.height);
			context.beginPath();
			context.arc( context.canvas.width * state.ball.x , context.canvas.height * state.ball.y, state.ball.rad * ((context.canvas.width + context.canvas.height )/2),0, 2*Math.PI);
			context.strokeStyle ="white";
			context.stroke();
			context.fillStyle = "white";
			context.lineWidth =4;
			context.fill();
			playerState(context, state);
			drawPlayer(context, canvas, state.players[0]);
			drawPlayer(context, canvas, state.players[1]);
			/*const handleResize = () => {
				//let prev:number = context.canvas.height;
				//let ratio:number = window.innerHeight * 0.5;
				context.canvas.width = window.innerWidth;
				context.canvas.height = 3 * window.innerWidth / 4;
				//PaddleResize(paddle, prev);
				//BallResize(ball);
			}*/
			/*handleResize();
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);*/
		}, [state, width, height]);

		const displayWidth = Math.floor(pixelRatio * width);
  		const displayHeight = Math.floor(pixelRatio * height);
  		//const style = { width, height };
	return (/*<>
		{ hasLeft ? (
		<div> Has left</div> ) :
	(*/
	<canvas
		id="canvas"
		ref={canvasRef}
		width={displayWidth}
		height={displayHeight}
		style={{width: '100%', height: '100%'}}
		background-color="black">
	</canvas>
	)}

export default Canvas



