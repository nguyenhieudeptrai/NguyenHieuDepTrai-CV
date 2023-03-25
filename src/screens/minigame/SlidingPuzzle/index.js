import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Cell, checkResult, getTimeString, initCells, moveCell, ScoreHistory, shuffleArray, TimeCounter } from './game';

const EMPTY_POSITION = {
    x: 3,
    y: 3,
}
const MESSAGE_REFERENCE = true; // Not change

let currentEmpty = { ...EMPTY_POSITION };
let size = [4, 4]
let maxTime = 180;
let imgSrc = "https://picsum.photos/600/600";
let currentMaxRound;
let currentTimeCounter = {
    time: 0,
    message: ""
}
let tmpMessageView = null;

const SlidingPuzzle = () => {
    const screenRef = useRef();
    const navigate = useNavigate();
    const [arr, setArr] = useState([]);
    const [round, setRound] = useState(1);
    const [isWin, hadWon] = useState(false);
    const [count, setCount] = useState(0);
    const [scoreHistory, setScoreHistory] = useState([]);
    const [startTime, setStartTime] = useState(false);
    const [endGame, setEndGame] = useState(false);
    const [screenType, setScreenType] = useState("PC");
    const [message, showMessage] = useState({
        message: "",
        visible: false,
        eventType: "CLOSE"
    });

    useEffect(() => {
        let maxRound = 0;
        currentMaxRound = 2;
        reset();
        setTimeout(() => {
            tmpMessageView = (
                <div className='border-2 border-white rounded-lg p-4'>
                    <p className='text-center border-b-2 font-bold uppercase text-xl mb-4'>
                        Cách chơi
                    </p>
                    <p>
                        • Bạn sẽ có {maxRound} lượt chơi
                    </p>
                    <p>
                        • Bạn cần thay đổi vị trí các ô để tất cả khớp với bên phải
                    </p>
                    <p>
                        • Thời gian thực hiện trên mỗi lượt là {getTimeString(maxTime)[2]}
                    </p>
                </div>
            )
            showMessage({
                message: MESSAGE_REFERENCE,
                visible: true,
                eventType: "SHUFFLE_GAME"
            });
        }, 500);

        if (window.screen.width < 600) {
            setScreenType("MOBILE");
            screenRef.current?.requestFullscreen();
        }
        return () => {
            if (window.screen.width < 600) {
                document.exitFullscreen();
            }
        }
    }, []);


    useEffect(() => {
        if (endGame && scoreHistory.length > 0) {
            tmpMessageView = (
                <div className='flex flex-col items-center mx-10'>
                    <p className='text-center text-xl'>Trò chơi kết thúc</p>
                </div>
            );
            showMessage({
                message: MESSAGE_REFERENCE,
                visible: true,
                eventType: "END_GAME"
            });
        }
    }, [endGame, scoreHistory.length]);

    const reset = useCallback((middleFunc = () => { }) => {
        let newArr = initCells(size, EMPTY_POSITION);
        currentEmpty = { ...EMPTY_POSITION };
        middleFunc(newArr);
        setArr(newArr);
    }, []);

    const onEndTime = () => {
        showMessage({
            message: "Thật tiệc quá, đã hết giờ rồi." + (round > 1 ? " Chơi lại nhé?" : ""),
            visible: true,
            eventType: "FAIL_GAME"
        });
        setStartTime(false);
    }

    const checkDialogEvent = () => {
        switch (message.eventType) {
            case "CLOSE":
                break;
            case "SHUFFLE_GAME":
                shuffleArray(arr, currentEmpty);
                setArr([...arr]);
                setStartTime(true);
                break;
            case "WIN_GAME":
                setScoreHistory([
                    ...scoreHistory,
                    {
                        ...currentTimeCounter,
                    }
                ]);
                if (round < currentMaxRound) {
                    setRound(round + 1);
                    reset((arr) => {
                        shuffleArray(arr, currentEmpty);
                    });
                    setStartTime(true);
                    hadWon(false);
                } else {
                    setEndGame(true);
                }
                break;
            case "FAIL_GAME":
                setScoreHistory([
                    ...scoreHistory,
                    {
                        ...currentTimeCounter,
                    }
                ]);
                if (round < currentMaxRound) {
                    setRound(round + 1);
                    reset((arr) => {
                        shuffleArray(arr, currentEmpty);
                    });
                    setStartTime(true);
                } else {
                    setEndGame(true);
                }
                break;
            case "END_GAME":
                navigate("/minigame");
                break;
            default:
                break;
        }
        showMessage({
            visible: false,
        })
    }

    const onMove = (i, j, x, y) => {
        moveCell(arr, i, j, x, y, currentEmpty);
        setArr([...arr]);
        setCount(count + 1);
        if (checkResult(arr)) {// is done?
            // yes
            showMessage({
                message: "Chúc mừng! Bạn đã thắng rồi." + (round > 1 ? " Chơi tiếp nhé?" : ""),
                visible: true,
                eventType: "WIN_GAME"
            });
            hadWon(true);
            setStartTime(false);
        }
    }

    return (
        <div ref={screenRef} className='flex flex-col min-h-screen w-screen justify-center items-center bg-white'>
            <p className="text-4xl font-bold text-center mb-6">
                TRÒ CHƠI XẾP HÌNH
            </p>
            <div className='flex flex-col lg:flex-row'>
                <motion.div
                    className='bg-red-300 relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] touch-none'
                    initial={{ opacity: 0, x: -400 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                >
                    <motion.img src={imgSrc} alt="" className="absolute w-ful h-full"
                        animate={{ opacity: isWin ? 1 : 0, transition: { delay: isWin ? 0.1 : 0, duration: isWin ? 0.5 : 0 } }}
                    />
                    {arr.flat(1).map((val, index) => (
                        <Cell key={index} isWin={isWin} imgSrc={imgSrc} index={index} maxCell={size[0]} originLocation={val.originLocation} location={val.location} size={(screenType === "PC" ? 500 : 400) / size[0]}
                            onClick={() => round > 0 && onMove(val.i, val.j, val.location.x, val.location.y)}
                        />
                    ))}
                </motion.div>
                <div className='ml-0 lg:ml-10 flex flex-row lg:flex-col items-center'>
                    <motion.div className='h-36 lg:h-96 w-36 lg:w-96 mt-4 lg:mt-0'
                        initial={{ opacity: 0, y: -400 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                    >
                        <img src={imgSrc} width="100%" height="100%" alt="" />
                    </motion.div>
                    <motion.div className='flex items-center space-x-5 ml-4 lg:ml-0'
                        initial={{ opacity: 0, y: 400 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                    >
                        <div className=''>
                            <p className='text-lg text-center'>Lượt chơi</p>
                            <p className='text-xl font-bold text-center'>{round}/{currentMaxRound}</p>
                        </div>

                        <TimeCounter currentTimeCounter={currentTimeCounter} maxTime={maxTime} isStart={startTime} onEndTime={onEndTime} />
                    </motion.div>
                </div>
                <motion.div className='ml-0 lg:ml-10 min-h-[200px] mt-4 lg:mt-0'
                    initial={{ opacity: 0, x: 400 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                >
                    <ScoreHistory maxRound={currentMaxRound} maxTime={maxTime} scores={scoreHistory} />
                </motion.div>
            </div>
            {message.visible &&
                <div className='absolute w-full h-full'>
                    <motion.div className='absolute top-1/2 left-1/2 bg-orange-600 shadow-2xl p-4 rounded-xl text-white flex flex-col items-center w-4/5 md:w-auto'
                        initial={{ opacity: 0, x: "-50%", y: 0 }}
                        animate={{ opacity: 1, x: "-50%", y: "-50%", transition: { delay: 0.2, duration: 0.4, ease: 'easeInOut' } }}
                    >
                        {message.message === MESSAGE_REFERENCE ? tmpMessageView : <p className='text-center text-lg mb-5 px-8'>{message.message}</p>}
                        <button
                            className='mt-4 px-16 py-2 bg-slate-200 text-orange-600 rounded-md font-bold animate-bounce'
                            onClick={checkDialogEvent}
                        >
                            OK
                        </button>
                    </motion.div>
                </div>
            }
        </div>
    )
}

export default SlidingPuzzle;
