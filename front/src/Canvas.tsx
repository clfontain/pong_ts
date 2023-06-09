import {useEffect,useRef, useState} from 'react';
import './App.css';
import {drawBall, drawCanvas, drawPlayer, drawScore, drawEnd} from "./draw"
import { io  } from 'socket.io-client';

function Canvas()
{
	//const [hasLeft, setHasLeft] = useState(false);
	const [state, setState] = useState(
	{
		ball_x: 0,
		ball_y: 0,
		ball_rad: 0,
		player1_x: 0,
		player1_y: 0,
		player1_height: 0,
		player1_width: 0,
		player1_score: 0,
		player2_x: 0,
		player2_y: 0,
		player2_height: 0,
		player2_width: 0,
		player2_score: 0,
		end: false,
	}

	);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() =>
	{
		//const socket = io("http://localhost:8080");
		const socket = io("ws://localhost:3333", 
       {
       		path: "/api/v1/ws",
        	reconnectionDelayMax: 10000,
       });
		//socket.emit("events", "BONSOIR", (data:any) => console.log(data));
		socket.on("gameState", (data) => {
			setState(data);
		});
		window.addEventListener("keydown", e =>
		{
			switch (e.key)
			{
			case 'w':
				console.log("move_up");
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
	}, []);

	useEffect(() =>
	{
		const canvas = canvasRef.current;
		if (!canvas)
			return;
		const context = canvas.getContext('2d');
			if (!context)
		return;
		const redrawCanvas = () => {
		drawCanvas(context);
		if (state.end === false)
		{
			drawBall(context, state);
			drawScore(context, state);
			drawPlayer(context, canvas, state);
		}	
		else
		{
			drawEnd(context, state);
		}	
		};
		const handleResize = () =>
		{
			const { current:canvas} = canvasRef;
			if (canvas)
			{
				const {width, height} = canvas.getBoundingClientRect()
				const newWidth = window.innerWidth;
				const newHeight = (newWidth * height) / width;
				if (newHeight > window.innerHeight)
				{
					const updateHeight = window.innerHeight;
					const updateWidth = (updateHeight * width) / height;
					canvas.height = updateHeight;
					canvas.width = updateWidth;
				}
				else
				{
					canvas.width = newWidth;
					canvas.height = newHeight;
				}
			}
				redrawCanvas();
		}
		if (canvas && context)
		{
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			window.addEventListener("resize", handleResize);
			handleResize();
		}
			return () => window.removeEventListener("resize", handleResize);
	}, [state]);

	return (

	<canvas
		id="canvas"
		ref={canvasRef}
		style={{width: '100%', height: '100%'}}
		background-color="black">
	</canvas>
	)
}

export default Canvas



