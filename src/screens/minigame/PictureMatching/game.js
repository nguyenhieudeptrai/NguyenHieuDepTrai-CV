import { useEffect, useState } from "react";

const minLeft = "mx-[5%]";
const strokeColor = "#f6ce0f";

export const cssGame = (<style>
    {`
.animate-fire-flower {
    animation: win_game_fire_flower 1s linear infinite;
}

.animate-fire-flower_1_time {
    opacity: 0;
    animation: win_game_fire_flower 0.5s linear 1;
}
@keyframes win_game_fire_flower {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }
    75% {
        opacity: 1;
        transform: scale(1.5);
    }
    100% {
        opacity: 0;
        transform: scale(1.75);
    }
}
`}
</style>)

let timeCountDownId = 0;
let timeCountDownTmp = 0;
export const Time = ({ className, maxTime = 30, onTimeOut = () => { } }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        timeCountDownTmp = maxTime;
        _countDown();
        return () => clearTimeout(timeCountDownId);
    }, []);

    const _countDown = () => {
        if (timeCountDownTmp >= 0) {
            setTime(timeCountDownTmp--);
            timeCountDownId = setTimeout(_countDown, 1000);
        } else {
            onTimeOut();
        }
    }

    return (
        <div className={"bg-no-repeat bg-contain bg-center w-32 md:w-48 text-center py-2 self-start mt-24 " + className + " " + minLeft} >
            <div className="border-2 rounded-lg text-3xl md:text-5xl -translate-y-1" >
                00:{time > 9 ? time : `0${time}`}
            </div>
        </div>
    )
}

export const itemList = [
    {
        id: "pic_1",
        image: "/assets/p0.png"
    },
    {
        id: "pic_2",
        image: "/assets/p1.png"
    },
    {
        id: "pic_3",
        image: "/assets/p2.png"
    },
    {
        id: "pic_4",
        image: "/assets/p3.png"
    },
]

const Box = ({ className, onOpen, image, isOpened = false, isMatched = false }) => {

    return (
        <div className={"relative " + className}>
            {isMatched &&
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                    <img src={process.env.PUBLIC_URL + "/assets/fire_flower.png"} height="100%" alt="" className="animate-fire-flower_1_time" />
                </div>
            }
            <img src={process.env.PUBLIC_URL + image} alt=""
                className={"absolute w-full h-full top-0 transition-opacity " + (isMatched ? "duration-300 " : "") + (isMatched || !isOpened ? "opacity-0" : "opacity-100")}
            />
            <button className={"relative transition-opacity w-full h-full " + (isOpened ? "opacity-0" : "opacity-100")} onClick={onOpen}>
                <img src={process.env.PUBLIC_URL + "/assets/btn_start.png"} alt="" className="w-full h-full object-cover" />
            </button>
        </div >
    )
}

export const BoxContainer = ({ className = "", gifts = [], maxVerticalItems = 0, onOpen }) => {


    return (
        <div className={className}>
            <div className="block">
                {gifts.map((v, i) => [
                    <div className="inline-block" key={i + "-0"}>
                        <Box
                            className={`w-24 h-24 sm:h-32 sm:w-32 md:w-48 md:h-48`}
                            w={maxVerticalItems}
                            image={v.image}
                            isMatched={v.isMatched}
                            isOpened={v.isOpened}
                            onOpen={() => v.isOpened ? null : onOpen(i)}
                        />

                    </div>
                    ,
                    (i + 1) % maxVerticalItems == 0 ? <br key={i + "-1"} /> : null
                ])}
            </div>
        </div>
    )
}

export const GameControl = ({ className = "", onReloadGame, onFullScreen }) => {

    return (
        <div className={"absolute left-0 bottom-0 flex flex-col items-center space-y-4 mb-4 md:mb-8 " + className + " " + minLeft}>
            <button className="w-20 h-20 hidden-fullscreen rounded-full bg-emerald-700 text-white md:text-base text-sm" onClick={onFullScreen}>
                FULL SCREEN
            </button>
            <button className="w-20 h-20 rounded-full bg-emerald-700 text-white md:text-base text-sm" onClick={onReloadGame}>
                CHƠI LẠI
            </button>
        </div>
    )
}
export const Point = ({ className = "", maxPoint = 0, point = 0, onMaxPoint = () => { } }) => {

    useEffect(() => {
        if (point === maxPoint) {
            onMaxPoint();
        }
    }, [point]);


    return (
        <div className={"flex space-x-2 md:space-x-4 self-end " + className + " " + minLeft}>
            {Array(maxPoint).fill("").map((_, i) =>
                <div key={i} className={"w-12 md:w-16 " + (point <= i ? "opacity-30" : "opacity-100")}>
                    <p>{i}</p>
                </div>
            )}
        </div>
    )
}

export const IntroGame = ({ onStart }) => {

    return (
        <div className="flex-1 flex flex-col">
            <div className="text-5xl md:text-6xl font-insignia mt-10">
                TÌM HÌNH GIỐNG NHAU
            </div>
            <div className="flex-1 flex items-center justify-center">
                <button
                    className={"bg-emerald-600 rounded-md shadow-md text-white text-4xl w-60 md:w-96 py-4 mt-8 md:mt-1 " + minLeft}
                    onClick={onStart}
                >
                    BẮT ĐẦU
                </button>
            </div>
        </div>
    )
}


export const LoadingGame = ({ onDone = () => { } }) => {

    useEffect(() => {
        let timeOut = setTimeout(onDone, [2000]);
        return () => clearTimeout(timeOut);
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-5xl md:text-6xl" >
                Vui lòng chờ...
            </div>
        </div>
    )
}

export const EndGame = ({ isWon = false }) => {
    return (
        <div className="relative m-auto">
            <div className="relative font-bold text-4xl md:text-6xl text-center font-insignia translate-x-0" >
                {isWon ? "Chúc mừng bạn đã thắng" : "SORRY, YOU LOSE !!!"}
            </div>
        </div>
    )
}