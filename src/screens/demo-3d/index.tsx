import React, { useEffect, useRef, useState } from 'react';
import Main from './objects/Main';
import clsx from 'clsx';


const Demo3D = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const view3d = useRef<Main | null>();
    const [lightMode, setLightMode] = useState(true);

    useEffect(() => {
        if (canvasRef && canvasRef) {
            console.log("start");
            view3d.current = new Main(canvasRef.current);
        }
        return () => {
            view3d.current?.unmount();
        }
    }, []);

    useEffect(() => {
        view3d.current?.changMode(lightMode);
    }, [lightMode]);

    return (
        <section className='relative w-full bg-white'>
            <div className='absolute w-full h-screen'>
                <canvas ref={canvasRef}></canvas>
            </div>
            <div className='relative w-full h-full flex flex-col'>
                <header className='flex justify-end p-5 px-10 space-x-3'>
                    <img src={process.env.PUBLIC_URL + "/assets/sun.png"} className='h-5 w-5 object-contain' />
                    <button className={clsx('p-0.5 rounded-full border border-orange-300 transition-all duration-300 shadow-md',
                        lightMode ?
                            "bg-orange-300 border-orange-300" :
                            "bg-slate-400 border-slate-400"
                    )}
                        onClick={() => setLightMode(!lightMode)}
                    >
                        <div className='relative h-4 w-8'>
                            <span className={clsx(
                                'absolute bg-white rounded-full h-4 w-4 transition-all duration-300',
                                lightMode ? "left-0" : "left-1/2"
                            )} />
                        </div>
                    </button>
                    <img src={process.env.PUBLIC_URL + "/assets/moon.png"} className='h-5 w-5 object-contain' />
                </header>
                <div className='flex-1 flex flex-col justify-end items-end px-[10%] pb-[10%]'>
                    <div>
                        <p className='text-xl font-semibold uppercase'>Nguyễn Hiếu</p>
                        <p className='text-xl'>3D PORTFOLIO</p>
                    </div>
                </div>
                <div className='flex-1 flex flex-col justify-end pl-[10%] pb-[10%]'>
                    <p className='font-bold text-4xl'>My Working Place</p>
                    <p className='font-light mt-2'>Digital Media with ThreeJS | 3D Artist with of Blender</p>
                </div>
            </div>
        </section>
    )
}

export default Demo3D;