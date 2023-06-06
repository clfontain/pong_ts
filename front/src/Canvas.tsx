import {useEffect,useRef, useState} from 'react';
import './App.css';
import {drawBall, drawCanvas, drawPlayer, drawScore} from "./draw"
import { io  } from 'socket.io-client';

function Canvas()
{
	//const [hasLeft, setHasLeft] = useState(false);
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

	useEffect(() =>
	{
		const socket = io("http://localhost:3003");
		socket.on("gameState", (data) => {
			setState(data);
		});
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
		drawBall(context, state);
		drawScore(context, state);
		drawPlayer(context, canvas, state.players[0]);
		drawPlayer(context, canvas, state.players[1]);
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
	}, [state, ]);

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



