"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = exports.stopMovePlayerTwoDown = exports.stopMovePlayerOneDown = exports.stopMovePlayerTwoUp = exports.stopMovePlayerOneUp = exports.movePlayerTwoDown = exports.movePlayerOneDown = exports.movePlayerTwoUp = exports.movePlayerOneUp = void 0;
function movePlayerOneUp(state) {
    state.player1.lastKey = 'w';
    state.player1.keys.w = true;
}
exports.movePlayerOneUp = movePlayerOneUp;
function movePlayerTwoUp(state) {
    state.player2.lastKey = 'w';
    state.player2.keys.w = true;
}
exports.movePlayerTwoUp = movePlayerTwoUp;
function movePlayerOneDown(state) {
    state.player1.lastKey = 's';
    state.player1.keys.s = true;
}
exports.movePlayerOneDown = movePlayerOneDown;
function movePlayerTwoDown(state) {
    state.player2.lastKey = 's';
    state.player2.keys.s = true;
}
exports.movePlayerTwoDown = movePlayerTwoDown;
function stopMovePlayerOneUp(state) {
    state.player1.v_y = 0;
    state.player1.keys.w = false;
}
exports.stopMovePlayerOneUp = stopMovePlayerOneUp;
function stopMovePlayerTwoUp(state) {
    state.player2.v_y = 0;
    state.player2.keys.w = false;
}
exports.stopMovePlayerTwoUp = stopMovePlayerTwoUp;
function stopMovePlayerOneDown(state) {
    state.player1.v_y = 0;
    state.player1.keys.s = false;
}
exports.stopMovePlayerOneDown = stopMovePlayerOneDown;
function stopMovePlayerTwoDown(state) {
    state.player2.v_y = 0;
    state.player2.keys.s = false;
}
exports.stopMovePlayerTwoDown = stopMovePlayerTwoDown;
exports.Input = __importStar(require("./input"));
