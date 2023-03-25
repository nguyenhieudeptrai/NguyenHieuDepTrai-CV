import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { checkPointInArea, getTimeString, Item, randomNum, ScoreHistory } from './game';

let statusMouse = "";
let randomBartenderX = 0;
let bartenderW = 0;
let MAX_ROUND = 0;
let currentRound = 1;

let gamePause = true;
let userPoint = [0, 0];
let currentCupX = 0;

let waterInCupUp = false;
let waterInCupUpTimeOutId = 0;

let waterFallingDownX = 0;
let waterFallingDownW = 0;
let currentBartenderX = 0;
let currentBartenderTimeOutId = 0;

let currentTime = 0;
let currentCountId = null;

let currentWaterViewIndex = 0;
let currentWaterIndexTimeOutId = 0;

let tmpMessageView = null;
let tmpFrameNumber = 0;

const WIDTH_BAR = 140;
const HEIGHT_BAR = 140;
const BOTTOM_SPACE_BAR = 30;
const MAX_TIME = 30;
const bg_head = new Image();
const bg_cup = new Image();
const bg = new Image();
const table = new Image();
const bartender = new Image();
const water_bg = new Image();
const cup_full = new Image();
const WATER_ANIMATION_INDEX = 2;
const WATER_CONFIGS = [
    {
        src: "/assets/WaterDropdown/water.1.png",
        index: 0,
        img: new Image(),
        point: 0,
    },
    {
        src: "/assets/WaterDropdown/water.2.png",
        index: 1,
        img: new Image(),
        point: 0,
    },
    {
        src: "/assets/WaterDropdown/water.3.png",
        img: new Image(),
        point: 1,
    },
    {
        src: "/assets/WaterDropdown/water.4.png",
        img: new Image(),
        point: 1,
    },
    {
        src: "/assets/WaterDropdown/water.5.png",
        img: new Image(),
        point: 1,
    },
    {
        src: "/assets/WaterDropdown/water.6.png",
        img: new Image(),
        point: 1,
    },
];
const eventMouse = {};

const WaterDropdown = () => {

    const canvasRef = useRef(null);
    const screenRef = useRef();
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        MAX_ROUND = 1;
        initGame();
        initEvents(canvasRef.current);
        render();
        initIntroduction();
        setMessage({
            reference: true,
            status: "INTRO"
        });
        return () => {
            resetEvent(canvasRef.current);
            cancelAnimationFrame(tmpFrameNumber);
            clearTimeout(waterInCupUpTimeOutId);
            clearTimeout(currentBartenderTimeOutId);
            clearTimeout(currentWaterIndexTimeOutId);
            clearTimeout(waterInCupUpTimeOutId);
        }
    }, []);
    const initIntroduction = () => {
        tmpMessageView = (
            <div className='border-2 border-white rounded-lg p-4'>
                <p className='text-center border-b-2 font-bold uppercase text-xl mb-4'>
                    Cách chơi
                </p>
                <p>
                    • Bạn sẽ có {MAX_ROUND} lượt chơi
                </p>
                <p>
                    • Bạn cần di chuyển cái ly sang qua trái hoặc phải để hứng các nước của bartender
                </p>
                <p>
                    • Thời gian thực hiện trên mỗi lượt là {getTimeString(MAX_TIME)[2]}
                </p>
            </div>
        )
    }
    const render = () => {
        drawItems();
        tmpFrameNumber = requestAnimationFrame(render);
    }

    const initGame = () => {
        const canvas = canvasRef.current;

        //init area
        bg_head.src = process.env.PUBLIC_URL + "/assets/AppleDropdown/bg_header.png";
        bg_cup.src = process.env.PUBLIC_URL + "/assets/WaterDropdown/cup.png";
        bg.src = process.env.PUBLIC_URL + "/assets/WaterDropdown/BG.png";
        table.src = process.env.PUBLIC_URL + "/assets/WaterDropdown/table.png";
        bartender.src = process.env.PUBLIC_URL + "/assets/WaterDropdown/bartender.png";
        water_bg.src = process.env.PUBLIC_URL + "/assets/WaterDropdown/water.png";
        cup_full.src = process.env.PUBLIC_URL + "/assets/WaterDropdown/cup_full.png";
        bg_cup.width = WIDTH_BAR;
        currentCupX = canvas.width / 2;
        currentTime = MAX_TIME;

        WATER_CONFIGS.forEach((v) => {
            v.img.src = process.env.PUBLIC_URL + v.src;
        })
    }

    const initEvents = (canvas) => {
        if (canvas) {
            // for mouse
            eventMouse.mousedownHandler = (event) => {
                var y = event.offsetY;
                statusMouse = y >= (canvas.height - HEIGHT_BAR - BOTTOM_SPACE_BAR) && y <= (canvas.height - BOTTOM_SPACE_BAR) ?
                    "CLICKED" : "LEAVED";
            };
            eventMouse.mousemoveHandler = (event) => {
                var x = event.offsetX;
                if (statusMouse === "CLICKED") {
                    if (x >= WIDTH_BAR / 2 && x <= (canvas.width - WIDTH_BAR / 2)) {
                        currentCupX = x;
                    } else if (x < WIDTH_BAR / 2) {
                        currentCupX = WIDTH_BAR / 2;
                    } else {
                        currentCupX = canvas.width - WIDTH_BAR / 2;
                    }
                }
            };
            eventMouse.mouseupHandler = (event) => {
                statusMouse = "LEAVED";
            }

            // for touch
            eventMouse.touchStartHandler = (e) => {
                var y = e.touches[0].clientY - e.touches[0].target.offsetTop;
                statusMouse = y >= (canvas.height - HEIGHT_BAR - BOTTOM_SPACE_BAR) && y <= (canvas.height - BOTTOM_SPACE_BAR) ?
                    "CLICKED" : "LEAVED";
            };

            eventMouse.touchMoveHandler = (e) => {
                var x = e.touches[0].clientX - e.touches[0].target.offsetLeft;
                if (statusMouse === "CLICKED") {
                    if (x >= WIDTH_BAR / 2 && x <= (canvas.width - WIDTH_BAR / 2)) {
                        currentCupX = x;
                    } else if (x < WIDTH_BAR / 2) {
                        currentCupX = WIDTH_BAR / 2;
                    } else {
                        currentCupX = canvas.width - WIDTH_BAR / 2;
                    }
                }
            }

            canvas.addEventListener('touchstart', eventMouse.touchStartHandler);
            canvas.addEventListener('touchmove', eventMouse.touchMoveHandler);
            canvas.addEventListener('touchend', eventMouse.mouseupHandler);

            canvas.addEventListener('mousedown', eventMouse.mousedownHandler);
            canvas.addEventListener('mousemove', eventMouse.mousemoveHandler);
            canvas.addEventListener('mouseup', eventMouse.mouseupHandler);
            canvas.addEventListener('mouseout', eventMouse.mouseupHandler);

        }
    }

    const resetEvent = (canvas) => {
        if (canvas) {
            canvas.removeEventListener('touchstart', eventMouse.mousedownHandler);
            canvas.removeEventListener('touchmove', eventMouse.moveTouchHandler);
            canvas.removeEventListener('touchend', eventMouse.mouseupHandler);

            canvas.removeEventListener('mousedown', eventMouse.mousedownHandler);
            canvas.removeEventListener('mousemove', eventMouse.moveHandler);
            canvas.removeEventListener('mouseup', eventMouse.mouseupHandler);
            canvas.removeEventListener('mouseout', eventMouse.mouseupHandler);
        }
    }

    const randomX = () => {
        const canvas = canvasRef.current;
        let w = canvas.width;
        let numRandom = Math.floor(Math.random() * (w - bartenderW));
        return numRandom;
    }

    const drawItems = () => {
        const canvas = canvasRef.current;
        if (!canvas) return false;
        const ctx = canvas.getContext("2d");
        // clear all
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw items
        let h = canvas.height;
        let w = canvas.width;
        drawBG(ctx, h, w);
        drawBartender(ctx, h);
        drawWater(ctx, h);

        let cupW = WIDTH_BAR;
        let cupX = currentCupX - WIDTH_BAR / 2;
        let waterW = cupW - 76;
        let waterX = cupX + 25;
        let waterY = h - HEIGHT_BAR - BOTTOM_SPACE_BAR + (100 - userPoint[0]);
        //check cup
        drawWaterInCup(ctx, waterX, waterY, waterW, HEIGHT_BAR, "#579bde");
        drawTable(ctx, h, w);
        drawCup(ctx, cupX, h - HEIGHT_BAR - BOTTOM_SPACE_BAR, cupW, HEIGHT_BAR, "#579bde");
        waterInCupUp = cupX <= waterFallingDownX && (cupX + cupW - 40) >= (waterFallingDownX + waterFallingDownW);
        for (let i = 0; i < userPoint[1]; i++) {
            let x = 20 + i * 50;
            drawImg(ctx, cup_full, x, 10, 60, 60);
        }
        // drawText(ctx, userPoint[1], 28, 20, 50, "#fff");
        // drawText(ctx, "LƯỢT: " + currentRound + "/" + MAX_ROUND, 28, 20, 50, "#fff");
        drawText(ctx, "Thời gian: 00:" + getTimeString(currentTime)[3], 28, canvas.width - 250, 50, "#fff");
    }

    const drawImg = (ctx, img, x, y, w = 50, h = 500) => {
        ctx.drawImage(img, x, y, w, h);
    }
    const drawBG = (ctx, canvasHeight, canvasWidth) => {
        let bgH = bg.height;
        let bgW = bg.width;
        let w = canvasHeight * bgW / bgH
        ctx.drawImage(bg, -w / 2 + canvasWidth / 2, 0, w, canvasHeight);
    }
    const drawTable = (ctx, canvasHeight, canvasWidth) => {
        ctx.drawImage(table, 0, canvasHeight - 60, canvasWidth, 60);
    }
    const drawBartender = (ctx, canvasHeight) => {
        let bgH = bartender.height;
        let bgW = bartender.width;
        let rate = bgW / bgH;
        let h = canvasHeight * 0.8;
        bartenderW = h * rate;
        ctx.drawImage(bartender, currentBartenderX, canvasHeight - h, bartenderW, h);
    }

    const drawWater = (ctx, canvasHeight) => {
        if (gamePause) return;
        const water_img = WATER_CONFIGS[currentWaterViewIndex].img;
        let bgH = water_img.height;
        let bgW = water_img.width;
        let rate = bgW / bgH;
        let h = canvasHeight * 0.3;
        waterFallingDownW = h * rate;
        waterFallingDownX = currentBartenderX + bartenderW * 0.61;
        let y = canvasHeight - bartenderW * 0.69;
        ctx.drawImage(water_img, waterFallingDownX, y, waterFallingDownW, h);
    }

    const drawCup = (ctx, x, y, width, height) => {
        ctx.drawImage(bg_cup, x, y, width, height);
    }
    const drawWaterInCup = (ctx, x, y, width, height) => {
        ctx.drawImage(water_bg, x, y, width, height);
    }

    const drawText = (ctx, text, textSize, x, y, color = "#000") => {
        ctx.font = `bold ${textSize}px Roboto`;
        ctx.fillStyle = color;
        ctx.fillText(text + "", x, y);
    }

    const setWaterFallingDown = () => {
        clearTimeout(currentWaterIndexTimeOutId);
        if (gamePause) return;
        if (currentWaterViewIndex == WATER_CONFIGS.length - 1) {
            currentWaterViewIndex = WATER_ANIMATION_INDEX;
        }
        currentWaterIndexTimeOutId = setTimeout(() => {
            currentWaterViewIndex++;
            setWaterFallingDown();
        }, 150);
    }

    const setWaterInCupUp = () => {
        clearTimeout(waterInCupUpTimeOutId);
        if (gamePause) return;
        if (waterInCupUp) {
            if (userPoint[0] >= 100) {
                userPoint[0] = -1;
                userPoint[1]++;
            }
            userPoint[0] += 0.5;
        }
        waterInCupUpTimeOutId = setTimeout(() => {
            setWaterInCupUp();
        }, 10);
    }

    const setBartenderMoving = () => {
        clearTimeout(currentBartenderTimeOutId);
        if (gamePause) return;
        currentBartenderTimeOutId = setTimeout(() => {
            if (currentBartenderX > randomBartenderX + 1) {
                currentBartenderX -= 2;
                setBartenderMoving();
            } else if (currentBartenderX < randomBartenderX - 1) {
                currentBartenderX += 2;
                setBartenderMoving();
            } else {
                randomBartenderX = randomX();
                setTimeout(() => {
                    setBartenderMoving();
                }, 700);
            }
        }, 10);
    }

    const onStart = () => {
        const canvas = canvasRef.current;
        if (!canvas) return false;
        gamePause = false;
        userPoint = [0, 0];
        currentTime = MAX_ROUND;

        currentTime = MAX_TIME;
        setWaterFallingDown();
        setWaterInCupUp();
        countDown();
        setTimeout(() => {
            setBartenderMoving(0);
        }, 500);

    }
    const countDown = () => {
        clearTimeout(currentCountId);
        currentTime--;
        if (currentTime > 0) {
            currentCountId = setTimeout(countDown, 1000);
        } else {
            gamePause = true;
            setMessage({
                content: "Đã hết giờ",
                reference: false,
                status: "TIMEOUT"
            });
        }
    }
    const goHome = () => {
        if (message.status === "END") {
            return;
        }
        tmpMessageView = (
            <div className='flex flex-col items-center mx-10 text-yellow-300'>
                <p className='text-center text-2xl'>Cảm ơn bạn đã tham gia trò chơi này</p>
                <div className='flex flex-col items-center mt-3'>
                    <p className='text-center text-2xl font-bold'>Bạn đã hứng được {userPoint[1]} ly nước</p>
                </div>
            </div>
        );
        setMessage({
            reference: true,
            status: "END",
        })
    }

    const checkDialogEvent = () => {
        switch (message.status) {
            case "TIMEOUT":
                if (currentRound >= MAX_ROUND) {
                    goHome();
                    break;
                }
                currentRound++;
            case "INTRO":
                onStart();
                setMessage(null);
                break;
            default:
                break;
        }
    }
    return (
        <div ref={screenRef} className='relative h-screen w-screen bg-white overflow-hidden'>
            <div className={"message-container absolute w-full h-full flex flex-col items-center justify-center p-2 " +
                ((message == null || !["END"].includes(message?.status)) ? "hidden" : "")}>
                <div
                    className={"bg-red-500 border-red-400 rounded-3xl border-4 overflow-hidden " +
                        ((message == null || !["END"].includes(message?.status)) ? "opacity-0 scale-50 z-0" : "scale-100 opacity-100 z-10")}
                    style={{
                        minHeight: 340,
                        minWidth: 380
                    }}
                >
                    <div className='p-6 message-win-bg w-full h-full'>
                        {(message !== null && ["END"].includes(message?.status)) &&
                            <div
                                className='win-content relative flex flex-col items-center justify-center rounded-xl border-4 w-full h-full
                bg-red-800 border-red-400'
                            >
                                {message?.reference ? tmpMessageView :
                                    <p className='text-yellow-300 text-3xl font-bold text-center px-8 mb-8'>
                                        {message?.content}
                                    </p>
                                }
                                <button
                                    className='btn-continuous uppercase px-8 py-2 bg-yellow-200 font-bold rounded-lg my-4 min-w-[150px]'
                                    onClick={() => {
                                        if (currentRound < MAX_ROUND) setMessage(null);
                                        else {
                                            initGame();
                                            initIntroduction();
                                            setMessage({
                                                reference: true,
                                                status: "INTRO"
                                            });
                                        };
                                    }}
                                >
                                    {currentRound < MAX_ROUND ? "tiếp tục" : "OK"}
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>


            {message !== null && ["TIMEOUT", "INTRO"].includes(message.status) &&
                <motion.div className='absolute top-1/2 left-1/2 bg-blue-700 shadow-2xl p-4 rounded-xl text-white flex flex-col items-center w-4/5 md:w-auto'
                    initial={{ opacity: 0, x: "-50%", y: 0 }}
                    animate={{ opacity: 1, x: "-50%", y: "-50%", transition: { delay: 0.2, duration: 0.4, ease: 'easeInOut' } }}
                >
                    {message.reference ? tmpMessageView : <p className='text-center text-lg mb-5 px-8'>{message.content}</p>}
                    <button
                        className='mt-4 px-16 py-2 bg-slate-200 text-blue-700 rounded-md font-bold animate-bounce'
                        onClick={checkDialogEvent}
                    >
                        OK
                    </button>
                </motion.div>
            }
            <canvas
                className='touch-none'
                ref={canvasRef}
                height={window.innerHeight + "px"}
                width={window.innerWidth + "px"}
            />
        </div>
    )
}



export default WaterDropdown;
