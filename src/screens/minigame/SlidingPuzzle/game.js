import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const initCells = (size = [0, 0], EMPTY_POSITION = { x: 0, y: 0 }) => {
    let newArr = [];
    for (let i = 0; i < size[0]; i++) {
        let tmpArr = [];
        for (let j = 0; j < size[1]; j++) {
            let cellsData = {
                i: i,
                j: j,
                id: `${i}${j}`,
                originLocation: {
                    x: i, y: j
                },
                location: {// dynamic
                    x: i, y: j
                },
            }
            if (i === EMPTY_POSITION.x && j === EMPTY_POSITION.y) {
                continue;
            };
            tmpArr.push(cellsData);
        }
        newArr.push(tmpArr);
    }
    return newArr;
};

export const moveCell = (arr, i, j, x, y, emptyIndex = { x: 0, y: 0 }) => {
    if (x + 1 === emptyIndex.x && y === emptyIndex.y) {
        arr[i][j].location = { ...emptyIndex };
        emptyIndex.x = x;
        emptyIndex.y = y;
    }
    if (x - 1 === emptyIndex.x && y === emptyIndex.y) {
        arr[i][j].location = { ...emptyIndex };
        emptyIndex.x = x;
        emptyIndex.y = y;
    }
    if (x === emptyIndex.x && y + 1 === emptyIndex.y) {
        arr[i][j].location = { ...emptyIndex };
        emptyIndex.x = x;
        emptyIndex.y = y;
    }
    if (x === emptyIndex.x && y - 1 === emptyIndex.y) {
        arr[i][j].location = { ...emptyIndex };
        emptyIndex.x = x;
        emptyIndex.y = y;
    }
    for (let i = 0; i < arr.length; i++) {
        let test = []
        for (let j = 0; j < arr[i].length; j++) {
            let item = arr[i][j].location;
            test.push(item.x + "," + item.y)
        }
    }
}

const findPositionsAroundEmptyCell = (arr, emptyI, emptyJ) => {
    let index = [false, false, false, false];// TOP, BOTTOM, LEFT, RIGHT
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const element = arr[i][j].location;
            if (element.x === emptyI && element.y === emptyJ - 1) {// TOP
                index[0] = [i, j];
            }
            if (element.x === emptyI && element.y === emptyJ + 1) {// BOTTOM
                index[1] = [i, j];
            }
            if (element.x === emptyI - 1 && element.y === emptyJ) {// LEFT
                index[2] = [i, j];
            }
            if (element.x === emptyI + 1 && element.y === emptyJ) {// RIGHT
                index[3] = [i, j];
            }
        }

    }
    return index;
}

export const shuffleArray = (newArr = [[{ location: { x: 0, y: 0 } }]], currentEmptyCell = { x: 0, y: 0 },) => {
    for (let i = 0; i < 100; i++) {
        let positions = findPositionsAroundEmptyCell(newArr, currentEmptyCell.x, currentEmptyCell.y);
        let positionsAvailable = positions.filter((val) => val !== false);
        let randomIndex = Math.floor(Math.random() * positionsAvailable.length);
        let postionSelected = positionsAvailable[randomIndex];
        let cellSelected = newArr[postionSelected[0]][postionSelected[1]];
        moveCell(newArr, cellSelected.i, cellSelected.j, cellSelected.location.x, cellSelected.location.y, currentEmptyCell);
    }
}

export const checkResult = (arr = []) => {
    let originData = arr.flat(1);
    let ok = true;
    for (let i = 0; i < originData.length; i++) {
        let cell = originData[i];
        if (cell.location.x !== cell.originLocation.x || cell.location.y !== cell.originLocation.y) {
            ok = false;
        }
    }
    return ok;
}

export const getTimeString = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return [minutes, seconds, (minutes > 0 ? `${minutes} phút` : "") + ((seconds > 0 || minutes === 0) ? ` ${seconds} giây` : "")];
};

let timeOutId = null;
let tmpTime = 0;
export const TimeCounter = ({ currentTimeCounter, maxTime = 0, isStart, onEndTime }) => {
    const [time, setTime] = useState(maxTime);
    useEffect(() => {
        if (time === 0) {
            tmpTime = 0;
            onEndTime(getTimeString(time));
            clearTimeout(timeOutId);
        }
    }, [time]);

    useEffect(() => {
        if (isStart) {
            tmpTime = maxTime;
            _count();
        } else {
            tmpTime = 0;
            clearTimeout(timeOutId);
        }
    }, [isStart]);

    const _count = () => {
        clearTimeout(timeOutId);
        tmpTime--;
        setTime(tmpTime);
        timeOutId = setTimeout(_count, 1000);
    }
    const timeArr = getTimeString(time);
    currentTimeCounter.message = timeArr;
    currentTimeCounter.time = time;

    return (
        <div className='flex items-center space-x-1'>
            <div className='w-10 h-10 overflow-hidden border rounded-sm shadow-md flex flex-col items-center justify-center font-bold'>
                0
            </div>
            <div className='font-bold text-lg'>
                :
            </div>
            <div className='relative w-10 h-10 overflow-hidden border rounded-sm shadow-md'>
                <motion.div key={timeArr[0]} className="absolute w-10 h-10 flex flex-col items-center justify-center font-bold"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%', transition: { duration: 0.4 } }}
                >
                    {timeArr[0]}
                </motion.div>
                <motion.div key={timeArr[0] + 1} className="absolute w-10 h-10 flex flex-col items-center justify-center font-bold"
                    initial={{ y: '0%' }}
                    animate={{ y: '-100%', transition: { duration: 0.4 } }}
                >
                    {(timeArr[0] + 1) == 60 ? 0 : (timeArr[0] + 1)}
                </motion.div>
            </div>
            <div className='font-bold text-lg'>
                :
            </div>
            <div className='relative w-10 h-10 overflow-hidden border rounded-sm shadow-md'>
                <motion.div key={timeArr[1]} className="absolute w-10 h-10 flex flex-col items-center justify-center font-bold"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%', transition: { duration: 0.4 } }}
                >
                    {timeArr[1]}
                </motion.div>
                <motion.div key={timeArr[1] + 1} className="absolute w-10 h-10 flex flex-col items-center justify-center font-bold"
                    initial={{ y: '0%' }}
                    animate={{ y: '-100%', transition: { duration: 0.4 } }}
                >
                    {(timeArr[1] + 1) == 60 ? 0 : (timeArr[1] + 1)}
                </motion.div>
            </div>
        </div>
    )
}

export const Cell = ({ index, isWin, size, imgSrc, maxCell, originLocation, location, onClick }) => {

    return (
        <div
            className="absolute transition-all"
            style={{
                height: size,
                width: size,
                left: size * location.x,
                top: size * location.y,
            }}
        >
            <motion.button
                className={'relative overflow-hidden w-full h-full border transition-colors ' + (isWin ? "border-transparent" : "border-white")}
                onClick={onClick}
                onTouchEnd={onClick}

                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + 0.05 * index } }}
            >
                <div className='absolute' style={{
                    height: size * maxCell,
                    width: size * maxCell,
                    top: -size * originLocation.y,
                    left: -size * originLocation.x,
                }}>
                    <img src={imgSrc} width="100%" height="100%" alt="" />
                </div>
            </motion.button>
        </div>
    )
}


export const ScoreHistory = ({ scores = [], maxRound, maxTime }) => {
    return (
        <div className='min-h-[200px]'>
            <p className='font-bold mb-3 text-center text-lg text-green-600'>Thàng quả của bạn trong {maxRound} lần chơi</p>
            <table className='w-full'>
                <thead>
                    <tr className='border-b-2 border-gray-300'>
                        <th className='w-24'>Lượt</th>
                        <th>Quà</th>
                    </tr>
                </thead>
                <tbody>
                    {scores?.map((val, index) => (
                        <tr key={index} className='h-10 even:bg-slate-100'>
                            <td className='text-center'>{index + 1}</td>
                            <td className='flex items-center justify-center'>
                                {getTimeString(maxTime - val.time)[2]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}