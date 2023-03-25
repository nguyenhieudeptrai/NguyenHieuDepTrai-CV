import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import Game, { getTimeString, ScoreHistory } from './game';
import { useNavigate } from 'react-router-dom';

let tmpMessageView = null;
let currentPoints = 0;

const MAX_TIME = 30;

const BubbleShooter = () => {
    const screenRef = useRef();
    const navigate = useNavigate();
    const [scoreHistory, setScoreHistory] = useState([]);
    const [configGame, setConfigGame] = useState({
        maxRound: 0,
        currentRound: 1,
        isStart: false
    });
    const [message, setMessage] = useState(null);
    const [screenType, setScreenType] = useState("PC");

    useEffect(() => {
        let maxRound = 0;
        setConfigGame({
            maxRound: 2,
            currentRound: 1,
            isStart: false
        })
        tmpMessageView = (
            <div className='border-2 border-white rounded-lg p-4'>
                <p className='text-center border-b-2 font-bold uppercase text-xl mb-4'>
                    Cách chơi
                </p>
                <p>
                    • Bạn sẽ có {maxRound} lượt chơi
                </p>
                <p>
                    • Bạn cần nhấn vào màn hình để bắn các bong bóng đang bay
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
        }
    }, []);

    const onGetResult = (orderCode) => Promise.resolve(Math.floor(Math.random() * 3));

    const checkDialogEvent = () => {
        switch (message.status) {
            case "TIMEOUT":
                setScoreHistory([
                    ...scoreHistory,
                    {
                        point: currentPoints,
                    }
                ]);
                if (configGame.currentRound >= configGame.maxRound) {
                    goHome();
                    break;
                }
                setConfigGame({
                    ...configGame,
                    currentRound: configGame.currentRound + 1,
                    isStart: true
                });
                setMessage(null);
                break;
            case "INTRO":
                setConfigGame({
                    ...configGame,
                    isStart: true
                });
                setMessage(null);
                break;
            default:
                break;
        }
    }

    const onEndGame = (points) => {
        currentPoints = points;
        setConfigGame({
            ...configGame,
            isStart: false
        });
        setMessage({
            content: "Đã hết giờ",
            reference: false,
            status: "TIMEOUT"
        });
    }

    const goHome = () => {
        if (message.status === "END") {
            navigate("/minigame");
            return;
        }
        tmpMessageView = (
            <div className='flex flex-col items-center mx-10 text-yellow-300'>
                <p className='text-center text-xl'>Trò chơi kết thúc!</p>
            </div>
        );
        setMessage({
            reference: true,
            status: "END",
        })
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
                                        if (configGame.currentRound < configGame.maxRound) setMessage(null);
                                        else goHome();
                                    }}
                                >
                                    {configGame.currentRound < configGame.maxRound ? "tiếp tục" : "Trở về trang chủ"}
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
                            className='mt-4 px-16 py-2 bg-slate-200 text-blue-700 rounded-md font-bold animate-bounce uppercase'
                            onClick={checkDialogEvent}
                        >
                            {message.status === "TIMEOUT" && configGame.currentRound < configGame.maxRound ? "tiếp tục" : "OK"}
                        </button>
                    </motion.div>
                </div>
            }
            <div className="flex space-x-5 flex-col md:flex-row">
                <Game isPC={screenType === "PC"} key={1} configGame={configGame} maxTime={MAX_TIME}
                    onEndGame={onEndGame} />

                <ScoreHistory maxRound={configGame.maxRound} scores={scoreHistory} />
            </div>
        </div >
    );
}

export default BubbleShooter;
