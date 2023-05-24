import React from 'react';
import {useEffect,useRef} from 'react';
import './App.css';
import {BallMovement} from './BallMovement'
import ballObj from "./data/ballObj"
import {WallCollision} from './WallCollision'

import {Paddle} from "./Paddle"
import {move} from "./Paddle"
import {PaddleCollision} from './PaddleCollision'
import {keys} from "./Paddle"


const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => 
	{
		let key:keys = {w:false, s:false};
		window.addEventListener("keydown", e =>
		{
			switch (e.key)
			{
			case 'w':
				console.log("key w pressed");
				key.w = true;
				paddle.lastKey = "w";
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
		let ball = new ballObj(20, 200, 5, 5,10,5);
		console.log("salut");
		let paddle = new Paddle(20, 20 -30, 100, 20,"white", 0, "null");
		const render = () => 
		{
			const canvas = canvasRef.current;
			if (!canvas)
			return;
			const context = canvas.getContext('2d');
			if (!context)
			return;
			context.clearRect(0,0,canvas.width, canvas.height);
			BallMovement(context, ball);
			WallCollision(ball, canvas);
			move(context, canvas, paddle);
			if (key.w === true && paddle.lastKey === "w")
				paddle.v_y = -5;
			else if (key.s === true && paddle.lastKey === "s")
				paddle.v_y = 5;
			//paddle.v_y = 0;
			PaddleCollision(ball, paddle);
			requestAnimationFrame(render);
		}
		render();

	}, []);
	
	return (<canvas 
		id="canvas"
		ref={canvasRef}
		height="500px"
		width="800px">
		</canvas>);
}

export default Canvas



