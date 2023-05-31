import React from 'react';
import './App.css';
import Canvas from './Canvas';
import { io, Socket } from 'socket.io-client';
import {GameState} from "./GameState"
import { send } from 'process';


function App()
{
	return(
		<div className="App">
		<Canvas></Canvas>
		</div>
	)

}

export default App;


