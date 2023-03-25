import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { checkPointInArea, getTimeString, Item, randomNum, ScoreHistory } from './game';

let statusMouse = "";
let items = [];
let timeoutId = null;
let maxRound = 0;

let gamePause = false;
let userPoint = [0, 0, 0];
let currentRound = 1;
let currentBarX = 0;
let currentTime = 0;
let currentCountId = null;
let currentItems = [new Item()];
let tmpMessageView = null;
let tmpFrameNumber = 0;

const itemRank = [400, 300, 300];//=1000
const WIDTH_BAR = 150;
const HEIGHT_BAR = 60;
const BOTTOM_SPACE_BAR = 30;
const MAX_TIME = 30;
const bg_head = new Image();
const bg_bar = new Image();
const bg = new Image();
const ITEM_CONFIGS = [
    {
        src: "/assets/AppleDropdown/apple1.png",
        index: 0,
        color: "#000000",
        point: 1,
        speed: 12,
    },
    {
        src: "/assets/AppleDropdown/apple2.png",
        index: 1,
        color: "#d34a4a",
        point: 1,
        speed: 12,
    },
    {
        src: "/assets/AppleDropdown/apple3.png",
        index: 2,
        color: "#30b542",
        point: 1,
        speed: 12,
    },
];
const eventMouse = {};

const AppleDropdown = () => {

    const canvasRef = useRef(null);
    const screenRef = useRef();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        maxRound = 1;
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
        }
    }, []);
    const initIntroduction = () => {
        tmpMessageView = (
            <div className='border-2 border-white rounded-lg p-4'>
                <p className='text-center border-b-2 font-bold uppercase text-xl mb-4'>
                    Cách chơi
                </p>
                <p>
                    • Bạn sẽ có {maxRound} lượt chơi
                </p>
                <p>
                    • Bạn cần di chuyển thùng gỗ sang qua trái hoặc phải để hứng các quả táo rơi xuống
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
        bg_bar.src = process.env.PUBLIC_URL + "/assets/AppleDropdown/basket.png";
        bg.src = process.env.PUBLIC_URL + "/assets/AppleDropdown/BG.png";
        bg_bar.width = WIDTH_BAR;
        currentBarX = canvas.width / 2;
        currentTime = MAX_TIME;

        // init items
        items = ITEM_CONFIGS.map((val) => ({
            ...val,
            img: document.createElement("img"),
        }));
        items.forEach((val, index) => {
            val.img.src = process.env.PUBLIC_URL + ITEM_CONFIGS[index].src;
        });
        currentItems = Array(100).fill(null).map(() =>
            new Item(50, 55, canvas.width, canvas.height, randomItem(), randomNum(0, canvas.width))
        );
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
                        currentBarX = x;
                    } else if (x < WIDTH_BAR / 2) {
                        currentBarX = WIDTH_BAR / 2;
                    } else {
                        currentBarX = canvas.width - WIDTH_BAR / 2;
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
                        currentBarX = x;
                    } else if (x < WIDTH_BAR / 2) {
                        currentBarX = WIDTH_BAR / 2;
                    } else {
                        currentBarX = canvas.width - WIDTH_BAR / 2;
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

    const randomItem = () => {
        let numRandom = Math.floor(Math.random() * 1000);
        let index = 0;
        let tmpTotal = 0;
        for (let i = 0; i < itemRank.length; i++) {
            const val = itemRank[i];
            tmpTotal += val;
            if (numRandom < tmpTotal) {
                index = i;
                break;
            }
        }
        if (items.length > 0) {
            return items[index];
        }
        return null;
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
        currentItems.forEach(val => {
            if (gamePause) {
                clearTimeout(timeoutId);
                val.pause();
            };
            val.drawItem(ctx, (x, y, w, h) => {
                let area = {
                    x1: currentBarX - WIDTH_BAR / 2,
                    y1: canvas.height - HEIGHT_BAR - BOTTOM_SPACE_BAR,
                    x2: currentBarX + WIDTH_BAR / 2,
                    y2: canvas.height - BOTTOM_SPACE_BAR
                };

                if (
                    checkPointInArea({ x, y }, area) ||
                    checkPointInArea({ x: x + w, y }, area) ||
                    checkPointInArea({ x, y: y + h }, area) ||
                    checkPointInArea({ x: x + w, y: y + h }, area)
                ) {
                    userPoint[val.data.index] += val.data.point;
                    val.stop();
                }
            });
        });

        // draw area items
        drawBar(ctx, currentBarX - WIDTH_BAR / 2, h - HEIGHT_BAR - BOTTOM_SPACE_BAR, WIDTH_BAR, HEIGHT_BAR, "#579bde");
        drawHeaderBg(canvas, ctx);
        drawText(ctx, "LƯỢT: " + currentRound + "/" + maxRound, 28, 20, 50, "#fff");
        drawText(ctx, "Thời gian: 00:" + getTimeString(currentTime)[3], 28, canvas.width - 250, 50, "#fff");
        items.forEach((val, i) => {
            drawImg(ctx, val.img, 15, 100 + 70 * i, 60, 67);
            drawText(ctx, "x" + userPoint[i], 26, 30, 147 + 70 * i, "#fff");
        })
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
    const drawBar = (
        ctx,
        x,
        y,
        width,
        height,
        color = "#f00",
        radius = 10,
        fill = true
    ) => {
        //debug
        // ctx.fillStyle = color;
        // if (typeof radius === 'number') {
        //     radius = { tl: radius, tr: radius, br: radius, bl: radius };
        // } else {
        //     radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius };
        // }
        // ctx.beginPath();
        // ctx.moveTo(x + radius.tl, y);
        // ctx.lineTo(x + width - radius.tr, y);
        // ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        // ctx.lineTo(x + width, y + height - radius.br);
        // ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        // ctx.lineTo(x + radius.bl, y + height);
        // ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        // ctx.lineTo(x, y + radius.tl);
        // ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        // ctx.closePath();
        // if (fill) {
        //     ctx.fill();
        // }
        ctx.drawImage(bg_bar, x, y, width, height);
    }

    const drawText = (ctx, text, textSize, x, y, color = "#000") => {
        ctx.font = `bold ${textSize}px Roboto`;
        ctx.fillStyle = color;
        ctx.fillText(text + "", x, y);
    }

    const drawHeaderBg = (canvas, ctx) => {
        let scale = 1;
        let w = bg_head.width * scale;
        let h = bg_head.height * scale;
        ctx.drawImage(bg_head, 0, -50, w, h);
    }

    const setFallingDown = (index) => {
        currentItems[index].isFalling = true;
        currentItems[index].falling((data) => {
            // console.log(data.point);
        });

        let nextIndex = index;
        nextIndex++;
        if (nextIndex === currentItems.length) {
            nextIndex = 0;
        }
        currentItems[nextIndex].reset();
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setFallingDown(nextIndex), randomNum(400, 1000));
    }

    const onStart = () => {
        const canvas = canvasRef.current;
        if (!canvas) return false;
        gamePause = false;
        userPoint = [0, 0, 0];
        currentTime = maxRound;
        clearTimeout(timeoutId);
        currentItems.forEach(val => {
            val.reset();
        });
        currentTime = MAX_TIME;
        countDown();
        setTimeout(() => {
            setFallingDown(0);
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
        let total = 0;
        userPoint.forEach(v => {
            total += v;
        });
        let percentApple = Math.floor(userPoint[2] * 100 / total);
        tmpMessageView = (
            <div className='flex flex-col items-center mx-10 text-yellow-300'>
                <p className='text-center text-2xl'>Cảm ơn bạn đã tham gia trò chơi này</p>
                <div className='flex flex-col items-center mt-3'>
                    <img src={process.env.PUBLIC_URL + "/assets/somersby/apple3.png"} alt="" className='w-14' />
                    <p className='text-center text-2xl font-bold'>{percentApple >= 90 ? "Táo lên men chất lượng" : "Táo lên men chưa đạt đủ chất lượng"}</p>
                </div>
                {percentApple >= 90 ?
                    <p className='text-center mt-2'>Bạn đã cố gắng hết mình.... Chúc mừng bạn!</p>
                    :
                    <p className='text-center mt-2'>Không sao, bạn hãy thử lại - cần trên 90% táo đỏ nhé</p>
                }
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
                if (currentRound >= maxRound) {
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
                                        if (currentRound < maxRound) setMessage(null);
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
                                    {currentRound < maxRound ? "tiếp tục" : "OK"}
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



export default AppleDropdown;
