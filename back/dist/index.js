"use strict";
/*
    npm run dev :: launch the server
    npm run build :: compile index.ts
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http = __importStar(require("http"));
const game_1 = require("./game");
const input_1 = require("./input");
dotenv_1.default.config();
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + bonjour TypeScript Server');
});
//const http = require('http');
const server = http.createServer(app);
//const io = new socketio.Server(server);
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
let end = false;
//let socket_tab;
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
const client_tab = [];
let i = 0;
const state = (0, game_1.initGame)();
//const state:gamestate = init_sim_mid_to_mid();
//const state:gamestate = init_sim_top_to_mid();
io.on("connection", (client) => {
    if (i < 2) {
        state.players[i].order = client.id;
        i++;
    }
    client.on("disconnect", () => {
        let index = 0;
        for (; index < 2; index++) {
            if (client.id === state.players[index].order) {
                i = index;
            }
        }
        io.emit("end");
    });
    client.on("move_up", () => {
        //console.log(i);
        if (client.id === state.players[0].order)
            input_1.Input.movePlayerOneUp(state);
        else if (client.id === state.players[1].order)
            input_1.Input.movePlayerTwoUp(state);
    });
    client.on("move_down", () => {
        if (client.id === state.players[0].order) {
            //console.log("allo ?")
            input_1.Input.movePlayerOneDown(state);
        }
        else if (client.id === state.players[1].order)
            input_1.Input.movePlayerTwoDown(state);
    });
    client.on("stop_up", () => {
        if (client.id === state.players[0].order) {
            input_1.Input.stopMovePlayerOneUp(state);
        }
        else if (client.id === state.players[1].order)
            input_1.Input.stopMovePlayerTwoUp(state);
    });
    client.on("stop_down", () => {
        if (client.id === state.players[0].order)
            input_1.Input.stopMovePlayerOneDown(state);
        else if (client.id === state.players[1].order)
            input_1.Input.stopMovePlayerTwoDown(state);
    });
});
setInterval(() => {
    (0, game_1.gameLoop)(state);
    io.emit("gameState", state);
}, 17);
server.listen(port, () => {
    console.log(`listening on ${port}`);
});
