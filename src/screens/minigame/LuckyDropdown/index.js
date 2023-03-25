import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { checkPointInArea, getTimeString, Item, randomNum, ScoreHistory } from './game';

let statusMouse = "";
let items = [];
let timeoutId = null;
let maxRound = 0;

let gamePause = false;
let userPoint = 0;
let currentRound = 1;
let currentBarX = 0;
let currentTime = 0;
let currentCountId = null;
let currentItems = [new Item()];
let tmpMessageView = null;

const itemRank = [600, 300, 100];//=1000
const WIDTH_BAR = 150;
const HEIGHT_BAR = 30;
const BOTTOM_SPACE_BAR = 30;
const MAX_TIME = 30;
const bg_head = document.createElement("img");
const ITEM_CONFIGS = [
    {
        index: "#000000",
        point: -10,
        speed: 6,
    },
    {
        color: "#d34a4a",
        point: 20,
        speed: 9,
    },
    {
        color: "#30b542",
        point: 30,
        speed: 12,
    },
];
const eventMouse = {};

const LuckyDropdown = () => {

    const canvasRef = useRef(null);
    const screenRef = useRef();
    const [scoreHistory, setScoreHistory] = useState([]);
    const [message, setMessage] = useState(null);
    const [gifts, setGifts] = useState(tmpGift);
    const [screenType, setScreenType] = useState("PC");

    const navigate = useNavigate();

    useEffect(() => {
        maxRound = 1;
        initGame();
        initEvents(canvasRef.current);
        render();
        tmpMessageView = (
            <div className='border-2 border-white rounded-lg p-4'>
                <p className='text-center border-b-2 font-bold uppercase text-xl mb-4'>
                    Cách chơi
                </p>
                <p>
                    • Bạn sẽ có {maxRound} lượt chơi
                </p>
                <p>
                    • Bạn cần di chuyển thanh màu sang qua trái hoặc phải để hứng có đồ vật rơi xuống
                </p>
                <p>
                    • Thời gian thực hiện trên mỗi lượt là {getTimeString(MAX_TIME)[2]}
                </p>
            </div>
        )
        setMessage({
            reference: true,
            status: "INTRO"
        });
        if (window.screen.width < 600) {
            setScreenType("MOBILE");
            screenRef.current?.requestFullscreen();
        }
        return () => {
            document.exitFullscreen();
            resetEvent(canvasRef.current);
        }
    }, []);

    const render = () => {
        drawItems();
        // if (isDrawed)
        requestAnimationFrame(render);
    }

    const initGame = () => {
        const canvas = canvasRef.current;

        //init area
        bg_head.src = process.env.PUBLIC_URL + "/assets/bg_head.png";
        currentBarX = canvas.width / 2;
        currentTime = MAX_TIME;

        // init items
        items = ITEM_CONFIGS.map((val) => ({
            ...val,
            img: document.createElement("img"),
        }));
        items.forEach((val, index) => {
            val.img.src = process.env.PUBLIC_URL + "/assets/p" + (index) + ".png";
        });
        currentItems = Array(100).fill(null).map(() =>
            new Item(80, 80, canvas.width, canvas.height, randomItem(), randomNum(0, canvas.width))
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
                    userPoint += val.data.point;
                    val.stop();
                }
            });
        });

        // draw area items
        drawBar(ctx, currentBarX - WIDTH_BAR / 2, h - HEIGHT_BAR - BOTTOM_SPACE_BAR, WIDTH_BAR, HEIGHT_BAR, "#579bde");
        drawHeaderBg(canvas, ctx);
        drawText(ctx, "ĐIỂM: " + userPoint, 18, canvas.width - 100, 40, "#fff");
        drawText(ctx, "LƯỢT: " + currentRound + "/" + maxRound, 18, 20, 40, "#fff");
        drawText(ctx, "Thời gian: 00:" + getTimeString(currentTime)[3], 18, canvas.width - 270, 40, "#fff");
        items.forEach((val, i) => {
            drawImg(ctx, val.img, 5, 75 + 30 * i);
            drawText(ctx, "= " + val.point + " điểm", 15, 39, 95 + 32 * i);
        })
    }

    const drawImg = (ctx, img, x, y) => {
        ctx.drawImage(img, x, y, 30, 30);
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
        ctx.fillStyle = color;
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
            radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius };
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
    }

    const drawText = (ctx, text, textSize, x, y, color = "#000") => {
        ctx.font = `bold ${textSize}px Roboto`;
        ctx.fillStyle = color;
        ctx.fillText(text + "", x, y);
    }

    const drawHeaderBg = (canvas, ctx) => {
        let scale = 0.8;
        let w = bg_head.width * scale;
        let h = bg_head.height * scale;
        ctx.drawImage(bg_head, 0, -140, w, h);
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
        userPoint = 0;
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
            navigate("/minigame");
            return;
        }
        tmpMessageView = (
            <div className='flex flex-col items-center mx-10 text-yellow-300'>
                <p className='text-center text-xl'>Cảm ơn bạn đã tham gia<br /> trò chơi này</p>
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
                setScoreHistory([
                    ...scoreHistory,
                    {
                        giftIndex: userPoint > 200 ? 1 : 0,
                        point: userPoint,
                    }
                ]);
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
        <div ref={screenRef} className='flex flex-col items-center justify-center min-h-screen w-full bg-white'>
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
                                    className='btn-continuous uppercase px-8 py-2 bg-yellow-200 font-bold rounded-lg my-4'
                                    onClick={() => {
                                        if (currentRound < maxRound) setMessage(null);
                                        else goHome();
                                    }}
                                >
                                    {currentRound < maxRound ? "tiếp tục" : "Trở về trang chủ"}
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>


            {message !== null && ["TIMEOUT", "INTRO"].includes(message.status) &&
                <div className='absolute w-full h-full'>
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
                </div>
            }

            <div className='flex space-x-4 flex-col md:flex-row'>
                <canvas
                    className='touch-none'
                    ref={canvasRef}
                    height={screenType === "PC" ? 600 : 600}
                    width={screenType === "PC" ? 600 : 400}
                    style={{ border: "1px solid green" }}
                />
                <ScoreHistory maxRound={maxRound} scores={scoreHistory} gifts={gifts} />

            </div>
        </div>
    )
}



const tmpGift = [
    {
        url: "/assets/p1.png",
        giftName: "Phần quà 1",
    },
    {
        url: "/assets/p2.png",
        giftName: "Phần quà 2",
    },
    {
        url: "/assets/p3.png",
        giftName: "Phần quà 2",
    }
]

export default LuckyDropdown;
