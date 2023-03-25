import React, { useEffect, useRef, useState } from 'react';


const sizeCanvas = 600;
const DEG90 = Math.PI / 2;
const DEG180 = Math.PI;
const gun = document.createElement("img");
const ball = document.createElement("img");
const bg_head = document.createElement("img");
const BALL_CONFIGS = [
    {
        color: "#000000",
        point: -10,
        lifes: 1,
    },
    {
        color: "#d34a4a",
        point: 20,
        lifes: 2,
    },
    {
        color: "#30b542",
        point: 30,
        lifes: 2,
    },
];

let userPoint = 0;
let isDrawHintLine = false;
let currentPoint = { x: sizeCanvas / 2, y: 0 };
let currentTime = 0;
let currentCountId = 0;
let requestAnimationFrameId = 0;
let currentVector = {
    a: 0,
    b: 0,
}
let currentRank = {
    x: 0,
    y: 0,
}
let createBubleTimeoutId = 0;
const eventMouse = {}

class ItemFlyable {
    constructor(size = 0, from = { x: 0, y: 0 }, moveX_step = 0, vector = { a: 0, b: 0 }, speed = 0, area = { x1: 0, y1: 0, x2: 0, y2: 0 }, props = {}) {
        this.size = size;
        this.from = from;
        this.moveX_step = moveX_step;
        this.A = vector.a;
        this.B = vector.b;
        this.speed = speed;
        this.area = area;
        // this.distanse = ;
        this.timeoutId = 0;
        this.MAX_DELAY = 100;
        this.isFlying = true;
        this.play = true;
        this.data = props;
        this.fly();
    }
    fly() {
        if (this.isFlying === false) {
            return;
        }
        clearTimeout(this.timeoutId);
        if (this.play) {
            this.from.x -= this.moveX_step;
            this.from.y = this.from.x * this.A + this.B;
            if (this.from.x < this.area.x1 || this.from.x > this.area.x2 || this.from.y < this.area.y1 || this.from.y > this.area.y2) {
                this.isFlying = false;
                return;
            }
            this.timeoutId = setTimeout(() => {
                this.fly();
            }, this.MAX_DELAY - this.speed);
        }
    }
    pause() {
        this.play = false;
    }
    stop() {
        this.isFlying = false;
        clearTimeout(this.timeoutId);
    }
}

class Bubble extends ItemFlyable {
    drawBubble(ctx) {
        ctx.save();
        ctx.translate(this.from.x, this.from.y);
        ctx.fillStyle = this.data.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(this.data.lifes, 0, 6);
        ctx.restore();
    }
}

class Bullet extends ItemFlyable {
    drawButtlet(ctx) {
        ctx.save();
        ctx.translate(this.from.x, this.from.y);
        ctx.fillStyle = "#ffcf4a";
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    checkWithBubble(bubbles = [new Bubble()]) {
        bubbles.forEach((b) => {
            let realDistanse = calcDistance(b.from.x, b.from.y, this.from.x, this.from.y);
            let expectedDistance = this.size / 2 + b.size;
            if (realDistanse < expectedDistance && this.isFlying === true) {
                this.stop();
                b.data.lifes--;
                if (b.data.lifes <= 0) {
                    b.stop();
                    userPoint += b.data.point;
                }
            }
        })
    }
}

let bullets = [new Bullet()];
let bubbles = [new Bubble()];

const calcPointByDistanceOfFx = (fromX, fromY, distanse, a, b, toX) => {
    // let t = 0;
    // M(t, a * t + b);
    // (t - fromX)^2 + (a*t + b - fromY)^2 = distanse^2; 

    // (t - fromX)^2 = t^2 - 2*fromX*t + fromX^2;
    // (a*t + (b - fromY))^2 = (a*t)^2 + 2*a*(b - fromY)*t + (b - fromY)^2;

    // => t^2 - 2*fromX*t + fromX^2 + (a*t)^2 + 2*a*(b - fromY)*t + (b - fromY)^2 = distanse^2;

    // (a*t)^2 = a^2 * t^2;

    // (1 + a^2)*t^2 + 2*(a*(b - fromY) - fromX)*t + (fromX^2 + (b - fromY)^2 - distanse^2) = 0; // a^2.x + b.x + c = 0

    let A = 1 + a ** 2;
    let B = 2 * (a * (b - fromY) - fromX);
    let C = fromX ** 2 + (b - fromY) ** 2 - distanse ** 2;
    let detal = (B ** 2) - 4 * (A) * (C) // detal = b^2 - 4ac

    let x = (-B + Math.sqrt(detal)) / (2 * A); //  x1 = (-b + sqrt(detal)) / 2a
    if (x > toX) {
        x = (-B - Math.sqrt(detal)) / (2 * A); //  x2 = (-b - sqrt(detal)) / 2a
    }
    let y = a * x + b;
    return { x, y };
}

const calcDistance = (x1, y1, x2, y2) => {
    let distanse = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    return distanse;
}

const calcLine = (x1, y1, x2, y2) => {
    let a = (y2 - y1) / (x2 - x1);
    let b = y1 - a * x1;
    // find y= ax+b
    return [a, b];
}

const countdown = (onEnd) => {
    currentTime--;
    clearTimeout(currentCountId);
    if (currentTime > 0) {
        currentCountId = setTimeout(() => countdown(onEnd), 1000);
    } else {
        onEnd();
    }
}

export const getTimeString = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return [
        minutes, seconds,
        (minutes > 0 ? `${minutes} phút` : "") + ((seconds > 0 || minutes === 0) ? ` ${seconds} giây` : ""),
        (`${minutes > 9 ? "" : "0"}${minutes}:${seconds > 9 ? "" : "0"}${seconds}`)
    ];
};

const Game = ({ isPC = false, maxTime, configGame, onEndGame = () => { } }) => {
    let { maxRound, currentRound } = configGame;
    const canvasRef = useRef(null);
    const [message, setMessage] = useState(null);
    useEffect(() => {
        initGame();
        render();
        drawBoardGame();
        return () => {
            cancelAnimationFrame(requestAnimationFrameId);
        }
    }, []);

    useEffect(() => {
        drawBoardGame();
        if (configGame.isStart) {
            initEvents();
            initTime();
            startGame();
            render();
        } else {
            cancelAnimationFrame(requestAnimationFrameId);
        }
        return () => {
            cancelAnimationFrame(requestAnimationFrameId);
            resetEvent(canvasRef.current);
        }
    }, [configGame]);


    const render = () => {
        drawBoardGame();
        cancelAnimationFrame(requestAnimationFrameId);
        requestAnimationFrameId = requestAnimationFrame(render);
    }

    const randomDirect = (from = { x: 0, y: 0 }, area = { w: 0, h: 0 }) => {
        let toX = Math.floor(Math.random() * (area.w - 100)) + 100,
            toY = Math.floor(Math.random() * (area.h - 100)) + 100;
        let [a, b] = calcLine(from.x, from.y, toX, toY);
        let M = calcPointByDistanceOfFx(from.x, from.y, 3, a, b, toX);
        return [M.x, M.y, a, b];
    }

    const randomBubblePosition = (areaW, areaH) => {
        let isTop = Math.floor(Math.random() * 2);
        let isRight = Math.floor(Math.random() * 2);
        let x = 0, y = 0;
        if (isTop === 1) {
            x = Math.floor(Math.random() * areaW);
            return { x, y };
        }
        if (isRight === 1) {
            x = areaW;
        }
        y = Math.floor(Math.random() * areaH);
        return { x, y };
    }

    const initEvents = () => {
        const canvas = canvasRef.current;
        eventMouse.mousedownHandler = () => {
            isDrawHintLine = true;
        }
        eventMouse.moveHandler = (e) => {
            var x = e.offsetX, y = e.offsetY;
            currentPoint = { x, y };
        }
        eventMouse.moveTouchHandler = (e) => {
            var x = e.touches[0].clientX - e.touches[0].target.offsetLeft,
                y = e.touches[0].clientY - e.touches[0].target.offsetTop;
            currentPoint = { x, y };
        }
        eventMouse.mouseupHandler = () => {
            isDrawHintLine = false;
            let from = {
                x: canvas.width / 2,
                y: canvas.height
            }
            let area = {
                x1: 0, y1: 0,
                x2: canvas.width, y2: canvas.height
            }
            let bullet = new Bullet(10, from, from.x - currentRank.x, currentVector, 99, area);
            bullets.push(bullet);
        }
        canvas.addEventListener('touchstart', eventMouse.mousedownHandler);
        canvas.addEventListener('touchmove', eventMouse.moveTouchHandler);
        canvas.addEventListener('touchend', eventMouse.mouseupHandler);

        canvas.addEventListener('mousedown', eventMouse.mousedownHandler);
        canvas.addEventListener('mousemove', eventMouse.moveHandler);
        canvas.addEventListener('mouseup', eventMouse.mouseupHandler);
    }
    const initTime = () => {
        currentTime = maxTime;
    }

    const initGame = () => {
        bubbles = [];
        bullets = [];
        userPoint = 0;

        //init area
        bg_head.src = process.env.PUBLIC_URL + "/assets/bg_head.png";
        gun.src = process.env.PUBLIC_URL + "/assets/cannon_gun.png";
        ball.src = process.env.PUBLIC_URL + "/assets/btn_start.png";

    }
    const startGame = () => {
        const canvas = canvasRef.current;

        bubbles = [];
        bullets = [];
        userPoint = 0;

        countdown(() => {
            onEndGame(userPoint);
            bullets.forEach(val => val.pause());
            bubbles.forEach(val => val.pause());
            clearTimeout(createBubleTimeoutId);
            resetEvent(canvas);
        });
        createBubble();
    }
    const resetEvent = (canvas) => {
        if (canvas) {
            canvas.removeEventListener('touchstart', eventMouse.mousedownHandler);
            canvas.removeEventListener('touchmove', eventMouse.moveTouchHandler);
            canvas.removeEventListener('touchend', eventMouse.mouseupHandler);

            canvas.removeEventListener('mousedown', eventMouse.mousedownHandler);
            canvas.removeEventListener('mousemove', eventMouse.moveHandler);
            canvas.removeEventListener('mouseup', eventMouse.mouseupHandler);
        }
    }

    const createBubble = () => {
        const canvas = canvasRef.current;
        let area = { w: canvas.width, h: canvas.height };
        let from = randomBubblePosition(area.w, area.h);
        let [x, _, a, b] = randomDirect(from, area);
        let vector = { a, b };
        let areaFlyable = { x1: -1, y1: -1, x2: area.w + 1, y2: area.h + 1 };
        let bubble = new Bubble(30, from, from.x - x, vector, 80, areaFlyable, { ...BALL_CONFIGS[Math.floor(Math.random() * BALL_CONFIGS.length)] });
        bubbles.push(bubble);
        clearTimeout(createBubleTimeoutId);
        createBubleTimeoutId = setTimeout(createBubble, 700);
    }

    const drawBoardGame = () => {
        const canvas = canvasRef.current;
        if (!canvas) return false;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bullets.forEach(val => {
            val.checkWithBubble(bubbles);
            val.drawButtlet(ctx);
        });
        bubbles.forEach(val => {
            val.drawBubble(ctx);
        });
        bullets.forEach((val, index, arr) => {
            if (!val.isFlying) {
                val.stop();
                arr.splice(index, 1);
            }
        });
        bubbles.forEach((val, index, arr) => {
            if (!val.isFlying) {
                val.stop();
                arr.splice(index, 1);
            }
        })
        drawCircleLine(canvas, ctx, 0, 10);
        drawGun(canvas, ctx, 0, 10);
        drawHeaderBg(ctx);
        drawText(ctx, "ĐIỂM: " + userPoint, 18, canvas.width - 100, 40, "#fff");
        drawText(ctx, "LƯỢT: " + currentRound + "/" + maxRound, 18, 20, 40, "#fff");
        drawText(ctx, "Thời gian: 00:" + getTimeString(currentTime)[3], 18, canvas.width - 270, 40, "#fff");
        BALL_CONFIGS.forEach((val, i) => {
            drawBall(ctx, 15, 85 + 25 * i, val.color);
            drawText(ctx, "= " + val.point + " điểm", 14, 30, 90 + 25 * i);
        });
    }

    const drawCircleLine = (canvas, ctx, x, y) => {
        if (!isDrawHintLine) return;
        let w = canvas.width, h = canvas.height;
        let [a, b] = calcLine(w / 2 - x, h - y, currentPoint.x, currentPoint.y);
        const M = calcPointByDistanceOfFx(w / 2 - x, h - y, 3, a, b, (currentPoint.x > w / 2 ? w : 0));
        const M2 = calcPointByDistanceOfFx(w / 2 - x, h - y, 200, a, b, (currentPoint.x > w / 2 ? w : 0));
        currentVector = { a, b };
        currentRank = { ...M }
        ctx.beginPath();
        ctx.moveTo(w / 2 - x, h - y);
        ctx.lineTo(M2.x, M2.y);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    const drawGun = (canvas, ctx, x, y) => {
        let scale = 1;
        let w = gun.width * scale;
        let h = gun.height * scale;
        ctx.save();
        ctx.translate((canvas.width / 2) - x, canvas.height - y);
        let deg = DEG180 + Math.atan2(currentPoint.y - (canvas.height - y), currentPoint.x - (canvas.width / 2 - x));
        ctx.rotate(deg - DEG90);
        ctx.drawImage(gun, -w / 2, -h, w, h);
        ctx.restore();
    }

    const drawHeaderBg = (ctx) => {
        let scale = 0.8;
        let w = bg_head.width * scale;
        let h = bg_head.height * scale;
        ctx.drawImage(bg_head, 0, -140, w, h);
    }

    const drawText = (ctx, text, textSize, x, y, color = "#000") => {
        ctx.font = `bold ${textSize}px Roboto`;
        ctx.fillStyle = color;
        ctx.fillText(text + "", x, y);
    }

    const drawBall = (ctx, x, y, color = "#000") => {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className={"message-container absolute w-full h-full flex flex-col items-center justify-center p-2 " +
                (message == null ? "hidden" : "")}>
                <div
                    className={"bg-red-500 border-red-400 rounded-3xl border-4 overflow-hidden " +
                        (message == null ? "opacity-0 scale-50 z-0" : "scale-100 opacity-100 z-10")}
                    style={{
                        height: 300
                    }}
                >
                    <div className='p-6 message-win-bg w-full h-full'>
                        <div
                            className='win-content relative flex flex-col items-center justify-center rounded-xl border-4 w-full h-full
                        bg-red-800 border-red-400'
                        >
                            <p className='text-yellow-300 text-xl text-center px-8'>{message?.content}</p>
                            <p className='border-2 border-dashed text-white px-16 py-1 font-bold mt-6' >{message?.code}</p>
                            <button
                                className='btn-continuous uppercase mt-6 px-8 py-2 bg-yellow-200 font-bold rounded-lg'
                                onClick={() => {
                                }}
                            >
                                {"Trở về trang chủ"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <canvas
                className='touch-none'
                ref={canvasRef}
                height={isPC ? sizeCanvas : 600}
                width={isPC ? sizeCanvas : 400}
                style={{ border: "1px solid red" }}
            />
        </div >
    )
}

export const ScoreHistory = ({ scores = [], maxRound }) => {

    return (
        <div className='min-h-[200px]'>
            <p className='font-bold mb-3 text-center text-lg text-green-600'>Quà của bạn sau {maxRound} lần chơi</p>
            <table className='w-full'>
                <thead>
                    <tr className='border-b-2 border-gray-300'>
                        <th className='w-24'>Lượt</th>
                        <th className='w-24'>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {scores?.map((val, index) => (
                        <tr key={index} className='h-10 even:bg-slate-100'>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{val.point}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Game;
