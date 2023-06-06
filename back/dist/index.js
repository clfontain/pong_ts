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
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
let i = 0;
const state = new game_1.gamestate();
io.on("connection", (client) => {
    if (i === 0) {
        state.player1.id = client.id;
        i++;
    }
    else if (i === 1) {
        console.log("joueur 2 assigne");
        state.player2.id = client.id;
        i++;
    }
    client.on("disconnect", () => {
        if (client.id === state.player1.id)
            i = 0;
        else if (client.id === state.player2.id)
            i = 1;
        io.emit("end");
    });
    client.on("move_up", () => {
        if (client.id === state.player1.id)
            input_1.Input.movePlayerOneUp(state);
        else if (client.id === state.player2.id)
            input_1.Input.movePlayerTwoUp(state);
    });
    client.on("move_down", () => {
        if (client.id === state.player1.id) {
            input_1.Input.movePlayerOneDown(state);
        }
        else if (client.id === state.player2.id)
            input_1.Input.movePlayerTwoDown(state);
    });
    client.on("stop_up", () => {
        if (client.id === state.player1.id) {
            input_1.Input.stopMovePlayerOneUp(state);
        }
        else if (client.id === state.player2.id)
            input_1.Input.stopMovePlayerTwoUp(state);
    });
    client.on("stop_down", () => {
        if (client.id === state.player1.id)
            input_1.Input.stopMovePlayerOneDown(state);
        else if (client.id === state.player2.id)
            input_1.Input.stopMovePlayerTwoDown(state);
    });
});
setInterval(() => {
    state.update();
    io.emit("gameState", state.getData());
}, 17);
server.listen(port, () => {
    console.log(`listening on ${port}`);
});
