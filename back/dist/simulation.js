"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset_sim = exports.init_sim_top_to_mid = exports.init_sim_mid_to_mid = void 0;
function init_sim_mid_to_mid() {
    const state = {
        players: [{
                x: 0.1, y: 0.40, height: 0.2, width: 0.02, color: "white",
                v_y: 0, lastKey: "null", score: 0, order: 'null', keys: { w: false, s: false }
            },
            {
                x: 4, y: 5, height: 30, width: 50, color: "white",
                v_y: 0, lastKey: "null", score: 0, order: 'null ', keys: { w: false, s: false }
            }],
        ball: {
            x: 0.5, y: 0.5, dx: 0.01, dy: 0.00, rad: 0.02, speed: 1, direction: 0
        },
    };
    return (state);
}
exports.init_sim_mid_to_mid = init_sim_mid_to_mid;
function init_sim_top_to_mid() {
    const state = {
        players: [{
                x: 0.1, y: 0.40, height: 0.2, width: 0.02, color: "white",
                v_y: 0, lastKey: "null", score: 0, order: 'null', keys: { w: false, s: false }
            },
            {
                x: 4, y: 5, height: 30, width: 50, color: "white",
                v_y: 0, lastKey: "null", score: 0, order: 'null', keys: { w: false, s: false }
            }],
        ball: {
            x: 0.5, y: 0.1, dx: 0.01, dy: 0.01, rad: 0.01, speed: 1, direction: 2.45
        },
    };
    return (state);
}
exports.init_sim_top_to_mid = init_sim_top_to_mid;
function reset_sim(state) {
    state.ball.direction = 2.45;
    state.ball.x = 0.5;
    state.ball.y = 0.1;
    state.ball.dx = 0.01;
    state.ball.dy = 0.01;
    state.ball.speed = 1;
}
exports.reset_sim = reset_sim;
