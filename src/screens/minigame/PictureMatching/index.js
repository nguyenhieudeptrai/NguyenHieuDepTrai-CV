
import React, { useEffect, useRef, useState } from 'react';
import { cssGame, GameControl, BoxContainer, IntroGame, Point, Time, EndGame, LoadingGame, itemList } from './game';

const MAX_POINT = 4;
const GAME = {
    INTRO: 0,
    LOAD: 1,
    START: 2,
    END: 3,
}

let selectedBoxs = [-1, -1];
let indexSelect = 0;
let timeOutHome = 0;

const PictureMatching = () => {
    const [gameStatus, setGameStatus] = useState(GAME.INTRO);
    const [setting, setSetting] = useState({
        sound: true,
        point: 0,
        isWon: false,
    });

    const [gifts, setGifts] = useState([]);
    const screenRef = useRef();

    useEffect(() => {
        if (gameStatus === GAME.LOAD) {
            setSetting({
                ...setting,
                point: 0,
            });
            _shuffleData();
        }
    }, [gameStatus]);

    const onFullScreen = () => {
        try {
            screenRef.current?.requestFullscreen();
        } catch {
            var elem = screenRef.current ?? {};
            if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
        }
    }

    const _shuffleData = () => {
        let data = [...itemList, ...itemList];
        data = data.sort(() => Math.random() - 0.5).map(v => ({
            ...v,
            isOpened: false,
            isMatched: false,
        }));
        setGifts(data);
    }


    const onContinuous = () => {
        setGameStatus(gameStatus + 1);
    }
    const onChangeSetting = (newSetting) => {
        setSetting({
            ...setting,
            ...newSetting,
        });
    }

    const onOpenBox = (index) => {
        if (indexSelect == 2) return;
        if (!gifts[index].isOpened) {
            gifts[index].isOpened = true;
            selectedBoxs[indexSelect] = index;
            setGifts([
                ...gifts,
            ]);
            if (indexSelect === 0) {
                indexSelect = 1;
            } else {
                indexSelect = 2;
                _checkMatched();
            }
        }
    }

    const _checkMatched = () => {
        let box1 = gifts[selectedBoxs[0]];
        let box2 = gifts[selectedBoxs[1]];
        setTimeout(() => {
            if (box1.id === box2.id) {
                box1.isMatched = true;
                box2.isMatched = true;
                box1.isOpened = true;
                box2.isOpened = true;
                setting.point++;
                setSetting({ ...setting });
            } else {
                box1.isOpened = false;
                box2.isOpened = false;
            }
            indexSelect = 0;
            setGifts([...gifts]);
        }, 500);
    }

    const onFailGame = () => {
        setGameStatus(GAME.END);
        setSetting({
            ...setting,
            isWon: false,
        });
        timeOutHome = setTimeout(() => {
            setGameStatus(GAME.INTRO);
        }, 60000);
    }
    const onWinGame = () => {
        setGameStatus(GAME.END);
        setSetting({
            ...setting,
            isWon: true,
        });
        timeOutHome = setTimeout(() => {
            setGameStatus(GAME.INTRO);
        }, 60000);
    }

    const onReturnHome = () => {
        setGameStatus(GAME.INTRO);
        clearTimeout(timeOutHome);
    }

    return (
        <div ref={screenRef} className='pictureMatching overflow-hidden flex flex-col items-center h-screen  bg-white'>
            {cssGame}
            {gameStatus == GAME.INTRO && <IntroGame onStart={onContinuous} />}
            {gameStatus == GAME.LOAD && <LoadingGame onDone={onContinuous} />}
            {gameStatus == GAME.START && <>
                <Time className="mb-4" onTimeOut={onFailGame} />
                <BoxContainer className='flex-1 flex items-center justify-center'
                    maxVerticalItems={4}
                    gifts={gifts}
                    onOpen={onOpenBox}
                />
                <Point className='mb-4' point={setting.point} maxPoint={MAX_POINT} onMaxPoint={onWinGame} />
            </>}
            {gameStatus == GAME.END && <EndGame isWon={setting.isWon} />}
            <GameControl
                setting={setting}
                onChangeSetting={onChangeSetting}
                onReloadGame={onReturnHome}
                onFullScreen={onFullScreen}
            />
        </div>
    )

}

export default PictureMatching;
