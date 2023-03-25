import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const games = [
    {
        name: "Xếp hình",
        url: "sliding-puzzle",
        img: "/assets/sliding-puzzle.png",
    },
    {
        name: "Hứng đồ",
        url: "lucky-dropdown",
        img: "/assets/lucky-dropdown.png",
    },
    {
        name: "Bắn bóng",
        url: "bubble-shooter",
        img: "/assets/bubble-shooter.png",
    },
    {
        name: "Hứng táo demo",
        url: "apple-dropdown",
        img: "/assets/apple-dropdown.png",
    },
    {
        name: "Tìm hình giống nhau",
        url: "picture-matching",
        img: "/assets/picture-matching.png",
    },
    {
        name: "Đổ nước vào ly",
        url: "water-dropdown",
        img: "/assets/water-dropdown.png",
    },

]

const Minigame = () => {
    const navigate = useNavigate();
    const [listStore, setListStore] = useState([]);
    const [orderCode, setOrderCode] = useState("");
    const [typeGame, setTypeGame] = useState(null);


    const [error, setError] = useState({
        province: null,
        place: null,
        provider: null,
        customerName: null,
        phone: null,
        quantity: null,
    });

    const [isOk, hadOk] = useState(false);


    const onSubmit = () => {
        if (typeGame) {
            setTimeout(() => {
                navigate(typeGame);
            }, 300);
        }
    }

    return (
        <div className={'flex flex-col items-center justify-center transition-colors duration-300 min-h-screen ' + (isOk ? "bg-white" : "bg-orange-200")}>
            <motion.div
                className='py-8 px-4 m-2 md:m-0 md:px-8 lg:px-16 shadow-2xl rounded-lg'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
                <div className='flex flex-col items-center'>
                    <div className='flex items-center justify-center mt-4 flex-wrap'>
                        {games.map(val => (
                            <button key={val.name}
                                className={'m-2 p-2 md:p-4 border-2 border-green-500 rounded-lg ' + (val.url == typeGame ? "text-white bg-green-500" : "")}
                                onClick={() => setTypeGame(val.url)}>
                                <img src={process.env.PUBLIC_URL + val.img} alt='' className='w-40 h-40 md:w-64 md:h-64' />
                                <p className='font-bold mt-2'>
                                    {val.name}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <button className='uppercase mt-4 w-full py-2 rounded-md bg-sky-400 text-white font-bold hover:bg-sky-300'
                        onClick={onSubmit}>
                        CHƠI
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default Minigame;
