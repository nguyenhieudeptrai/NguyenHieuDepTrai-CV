import clsx from 'clsx';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './components/NavItem';

import { ReactComponent as SendIcon } from 'css/sent-icon.svg';
import { ReactComponent as BgImage } from 'css/bg-demo-page.svg';
import { KeyTyping } from './components/KeyTyping';
import { ItemScroling } from './components/ItemScrolling';
import { FloatingCard } from './components/FloatingCard';
import { BoxShape } from './components/ShapeBox';


const navs = [
    [{ name: "Item 1", url: "/" }],
    [{ name: "Item 2", url: "/" }, { name: "Sub Item 2.1", url: "/" }, { name: "Sub Item 2.2", url: "/" }],
    [{ name: "Item 3", url: "/" }]
]
const TOTAL_PARTS = 5;

const Title = forwardRef(({ }, ref) => {
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        if (ref) ref.current = {
            changeIndex,
        }
    }, [ref]);

    const changeIndex = (index) => {
        setIndex(index);
    }

    return (
        <div className={clsx('sticky top-6 mt-6 m-auto z-10 flex justify-center perspective-100',
        )}>
            <p className={clsx('absolute top-0 left-1/2 p-2 text-center',
                'text-2xl border bg-black transition-all ease-in-out duration-700',
                index < 1 ? "rotate-up" :
                    index > 1 ? "rotate-down" : "rotate-front"
            )}>
                Lorem ipsum dolor sit amet 1
                <br />
                <span className='text-sm'>Duis varius interdum lectus</span>
            </p>
            <p className={clsx('absolute top-0 left-1/2 p-2 text-center',
                'text-2xl border bg-black transition-all ease-in-out duration-700',
                index < 2 ? "rotate-up" :
                    index > 2 ? "rotate-down" : "rotate-front"
            )}>
                Lorem ipsum dolor sit amet 2
                <br />
                <span className='text-sm'>Duis varius interdum lectus</span>
            </p>
            <p className={clsx('absolute top-0 left-1/2 p-2 text-center',
                'text-2xl border bg-black transition-all ease-in-out duration-700',
                index < 3 ? "rotate-up" :
                    index > 3 ? "rotate-down" : "rotate-front"
            )}>
                Lorem ipsum dolor sit amet 3
                <br />
                <span className='text-sm'>Duis varius interdum lectus</span>
            </p>
            <p className={clsx('absolute top-0 left-1/2 p-2 text-center',
                'text-2xl border bg-black transition-all ease-in-out duration-700',
                index < 4 ? "rotate-up" :
                    index > 4 ? "rotate-down" : "rotate-front"
            )}>
                Lorem ipsum dolor sit amet 4
                <br />
                <span className='text-sm'>Duis varius interdum lectus</span>
            </p>

        </div>
    )

})

export const LandingPage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [update, set_] = useState(false);

    const page = useRef({
        index: 0,
        scrolling: false,
        scrollType: '',
        idTimeout: 0,
        tmpIndex: 0,
        scrollValue: 0
    });
    const mainRef = useRef();
    const titleRef = useRef();
    useEffect(() => {
        document.title = "Landing Page";
        mainRef.current.addEventListener("wheel", onWheelScroll);
        mainRef.current.addEventListener("scroll", onUserScroll);
        mainRef.current.addEventListener("mouseup", onScrolLeave);
        mainRef.current.addEventListener("touchmove", onTouchMove);

        return () => {
            mainRef.current?.removeEventListener("touchmove", onTouchMove);
            mainRef.current?.removeEventListener("mouseup", onScrolLeave);
            mainRef.current?.removeEventListener("wheel", onWheelScroll);
            mainRef.current?.removeEventListener("scroll", onUserScroll);
        }
    }, []);

    const forceUpdate = () => set_(p => !p);

    const onTouchMove = () => {
        page.current.scrollType = "TOUCH";
    }

    const onScrolLeave = () => {
        if (page.current.scrollType == "USER") {
            page.current.index = page.current.tmpIndex;
            _scrollToPart(page.current.tmpIndex);
        }
    }

    const onUserScroll = ({ target: { scrollHeight, scrollTop, clientHeight } }) => {
        page.current.tmpIndex = Math.round(scrollTop / clientHeight);
        titleRef.current.changeIndex(page.current.tmpIndex);
        if (page.current.scrollType == "WHEEL") {
            clearTimeout(page.current.idTimeout);
            page.current.idTimeout = setTimeout(() => {
                page.current.scrollType = "";
                page.current.scrolling = false;
            }, 200);
            return;
        };
        if (page.current.tmpIndex == TOTAL_PARTS - 1 && scrollTop / clientHeight - page.current.tmpIndex > 0.3) {
            page.current.tmpIndex = TOTAL_PARTS;
        }
        if (page.current.scrollType == "TOUCH") {
            clearTimeout(page.current.idTimeout);
            page.current.idTimeout = setTimeout(() => {
                page.current.scrolling = false;
                page.current.scrollType = "";
                page.current.index = page.current.tmpIndex;
                _scrollToPart(page.current.tmpIndex);
            }, 200);
            return
        }
        page.current.scrollValue = scrollTop;
        page.current.scrollType = "USER";
    }

    const onWheelScroll = (e) => {
        if (page.current.scrolling) return;
        const direction = e.deltaY > 0 ? 1 : -1;
        let scrolling = false;
        if (direction === 1 && page.current.index < TOTAL_PARTS) {
            page.current.index++;
            scrolling = true;
        } else if (direction === -1 && page.current.index > 0) {
            page.current.index--;
            scrolling = true;
        }
        if (scrolling) {
            page.current.scrolling = true;
            page.current.scrollType = "WHEEL";
            _scrollToPart(page.current.index);
        }
    }

    const _scrollToPart = (index) => {
        forceUpdate();
        mainRef.current.scrollTo({
            top: index * window.innerHeight,
            behavior: 'smooth'
        });
    }
    return (
        <div ref={mainRef}
            className='landing-page-demo bg-black text-white h-screen relative overflow-auto overflow-x-hidden'>
            <header className='flex p-10 absolute w-full z-10'>
                <div className='flex-1'>
                    <p className='text-4xl'>LOGO</p>
                </div>
                <div>
                    <nav className="relative flex flex-col">
                        <ul className="flex peer space-x-6">
                            {navs.map((v, i) => (
                                <NavItem key={i} items={v} highlight={i == 2} />
                            ))}
                        </ul>

                    </nav>
                </div>
            </header>
            <main>
                <div className='flex h-screen items-center relative px-6'>
                    <BgImage className='absolute left-1/2 -top-[10%] -translate-x-1/2 w-[120%] h-full stroke-blue-600 blur-[3px]' />
                    <div className={clsx('flex-1 transition-all ease-in-out duration-500',
                        page.current.index == 0 ? "translate-x-0 opacity-100" : "-translate-x-1/2 opacity-0"
                    )}>
                        <p className='text-5xl mb-6 uppercase'>
                            <span className='font-thin font-raleway' >Lorem ipsum</span> <br />
                            <span className='font-semibold' >dolor sit amet</span>,
                            &nbsp;
                            <span className='relative inline-block  bg-lime-400 p-1 rotate-6 text-black font-bold'>
                                <span className='absolute -bottom-6 -left-2 text-lime-400'>*</span>
                                NEW!
                                <span className='absolute -top-4 -right-2 text-lime-400'>*</span>
                            </span>
                        </p>
                        <p className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius interdum lectus,<br />
                            vel molestie velit bibendum quis.
                        </p>
                        <div className='flex mt-20 pl-8'>
                            <div className=' border border-blue-600'>
                                <button className='bg-blue-600 m-0.5 px-3 py-1 uppercase text-lg'>
                                    Duis varius interdum
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={clsx('flex-1 relative h-full flex items-center justify-center transition-all ease-in-out duration-500',
                        page.current.index == 0 ? "translate-x-0 opacity-100" : "translate-x-1/2 opacity-0"
                    )}>
                        <img className='h-2/4 rounded-2xl' src="https://picsum.photos/600/600" />
                    </div>
                </div>
                <Title ref={titleRef} />
                <div className='flex flex-col items-center h-screen relative px-6 '>
                    <div className='flex items-center flex-1'>
                        {Array(4).fill("").map((v, i) => (
                            <div key={i}
                                style={{ transitionDelay: 100 * (i + 1) + "ms" }}
                                className={clsx('flex-1 mx-4 border p-4 h-3/4 rounded-md',
                                    `transition-all ease-in-out duration-700`,
                                    page.current.index == 1 ? "translate-y-0 opacity-100" :
                                        page.current.index > 1 ? "-translate-y-1/2 opacity-0" :
                                            "translate-y-1/2 opacity-0"
                                )}

                            >
                                <p className='text-4xl mb-3'>Lorem ipsum dolor sit amet</p>
                                <KeyTyping className='text-lg' delay={200 * (i + 1)} started={page.current.index == 1}
                                    data="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius interdum lectus, vel molestie velit bibendum quis."
                                />
                            </div>

                        ))}
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center h-screen w-full relative '>
                    <div className={clsx('transition-all duration-500 delay-500', page.current.index == 2 ? "scale-100 translate-x-8 -translate-y-20" : "scale-75 translate-x-8 -translate-y-0")}>
                        <div className='tv-bg pl-20 pr-[320px] pt-[270px] pb-28'>
                            <iframe className='flex h-[490px] w-[660px]'
                                src={"https://www.youtube.com/embed/D1PvIWdJ8xo?rel=0&color=white&fs=0&autoplay=" + (page.current.index == 2 ? "1" : "0")}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope"
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center h-screen relative px-6'>
                    <div className='flex items-center flex-1 space-x-10  perspective-100'>
                        <ItemScroling delay={700}
                            className="relative flex items-center justify-center transition-all ease-in-out duration-700"
                            focusClassName="scale-150 w-[310px] h-[600px]"
                            normaClassName="scale-100 w-[210px] h-[600px]"
                            started={page.current.index == 3} >
                            {Array(4).fill("").map((v, i) => (
                                <div key={i}>
                                    <BoxShape config={{ width: 200, height: 200 }} border={1} color="white" >
                                        <p className='text-xl text-center'>Lorem ipsum {i}</p>
                                        <p className='text-sm text-center mt-2 italic'>Duis varius interdum lectus, vel molestie velit bibendum quis</p>
                                    </BoxShape>
                                </div>

                            ))}
                        </ItemScroling>
                    </div>
                </div >
                <div className='flex flex-col items-center h-screen relative px-6'>
                    <div className='flex items-center flex-1 relative'>
                        <FloatingCard delay={1700}
                            width={150}
                            height={200}
                            spaceX={10}
                            started={page.current.index == 4} >
                            {Array(6).fill("").map((v, i) => (
                                <div key={i} className='flex flex-col items-center border border-white bg-black p-2 rounded-lg'>
                                    <img src="https://picsum.photos/200/200" className='h-20 w-20 rounded-full object-cover' />
                                    <p className='text-xl mt-2 text-center'>Lorem ipsum {i}</p>
                                    <p className='mt-2 text-xs text-center italic'>Short description</p>
                                </div>
                            ))}
                        </FloatingCard>
                    </div>
                </div >
            </main >
            <footer className='min-h-[40vh] relative p-6 bg-slate-700 flex flex-col'>
                <div className='flex flex-1'>
                    <div className='flex-1'>
                        <p className='py-4'>
                            SIGN UP TO OUR NEWLETTERS
                        </p>
                        <div className='relative h-12 w-96 border'>
                            <input
                                placeholder='Enter your email to receive the news...'
                                className='h-full w-full bg-inherit outline focus:outline-none p-2 pr-10 text-white'
                            />
                            <button className='absolute top-0 right-0 h-full w-10 flex justify-center items-center'>
                                <SendIcon className='w-7 h-7' fill="white" stroke='white' />
                            </button>
                        </div>
                    </div>
                    <div className='flex space-x-11 mt-10'>
                        <ul className='w-40 space-y-3'>
                            <li className='text-xl'>Informations</li>
                            <li><Link >Item 1</Link></li>
                            <li><Link >Item 2</Link></li>
                            <li><Link >Item 3</Link></li>
                        </ul>
                        <ul className='w-40 space-y-3'>
                            <li className='text-xl'>Feedback</li>
                            <li><Link >Item 1</Link></li>
                            <li><Link >Item 2</Link></li>
                        </ul>
                        <ul className='w-40 space-y-3'>
                            <li className='text-xl'>Q&A</li>
                            <li><Link >Item 1</Link></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p>@2023 - Example. All Rights Reserved.</p>
                </div>
            </footer>
        </div >
    )
}