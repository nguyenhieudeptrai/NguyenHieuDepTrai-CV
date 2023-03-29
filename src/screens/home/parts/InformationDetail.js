import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

export const InformationDetail = ({ parts = [] }) => {

    const [itemIndex, setItemIndex] = useState({
        current: 0,
        last: 4,
    });
    const currentPartIndex = useRef({
        index: 0,
        scrolling: false,
    });
    const partRef = useRef();
    const sliderRef = useRef();

    useEffect(() => {
        sliderRef.current?.addEventListener('wheel', onScroll);
        return () => {
            sliderRef.current?.removeEventListener('wheel', onScroll);
        }
    }, []);

    const sliderItem = (item, index) => (
        <div key={index} className={`slides-holder__item ${itemIndex.current === index ? "slides-holder__item_active" : ""}`}
            style={{
                transform: `rotateZ(${-360 * index / 5}deg)`
            }}>
            <div className={`bg-emerald-600 slides-item  ${itemIndex.current !== index ? "cursor-pointer" : ""}`}
                onClick={() => {
                    if (itemIndex.current !== index) {
                        _scrollToPart(itemIndex.current, index);
                    }
                }}>
                <div className={`${itemIndex.current === index ? "slides-item-bg animated-zoom " : ""}`} />
                <i className={`fa ${item.icon} text-3xl`}></i>
            </div>
        </div >
    );

    const onScroll = (e) => {
        e.preventDefault();
        if (currentPartIndex.current.scrolling) return;
        const direction = e.deltaY > 0 ? 1 : -1;
        const prevIndex = currentPartIndex.current.index;
        if (direction === 1 && currentPartIndex.current.index < parts.length - 1) {
            currentPartIndex.current.index++;
            _scrollToPart(prevIndex, currentPartIndex.current.index);
        } else if (direction === -1 && currentPartIndex.current.index > 0) {
            currentPartIndex.current.index--;
            _scrollToPart(prevIndex, currentPartIndex.current.index);
        }
    }

    const _scrollToPart = (prev, index) => {
        currentPartIndex.current.scrolling = true;
        setItemIndex({
            current: index,
            last: prev,
        });
        partRef.current.scrollTo?.({
            top: index * window.screen.availHeight,
            behavior: 'smooth'
        });
        setTimeout(() => {
            currentPartIndex.current.scrolling = false;
        }, 300);
    }

    return (
        <div className='relative h-screen md:overflow-hidden' ref={partRef}>
            <div className='absolute top-0 left-0 w-screen h-screen md:block hidden' ref={sliderRef} >

                <div className="absolute top-1/2 left-full slider overflow-x-hidden">
                    <div className="circular-slider">
                        <div className="slides-holder" style={{
                            transform: `rotateZ(${360 * itemIndex.current / 5 - 90}deg)`,
                            transitionDuration: (Math.abs(itemIndex.last - itemIndex.current)) * 0.4 + "s",
                            transitionTimingFunction: "ease-in-out"
                        }}>
                            {parts.map((item, index) => sliderItem(item, index))}

                        </div>
                        <div className="descriptions">
                            {parts.map((val, index) =>
                                <div key={index} className={clsx(
                                    "descriptions__item",
                                    itemIndex.current === index && " descriptions__item_visible"
                                )}>
                                    <h1 className="text-white bold uppercase text-2xl">{val.name}</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-screen md:w-3/4 md:overflow-hidden">
                <div className="relative px-4" style={{ height: parts.length * 100 + "vh" }}>
                    <div className='relative md:sticky top-0 h-screen w-full  md:overflow-hidden'>
                        {parts.map((val, index) => (
                            <div key={index}
                                className={clsx(
                                    "md:absolute md:top-1/2 h-auto md:max-h-[80vh] w-full transition duration-300 ease-in-out",
                                    "bg-white rounded-lg shadow-xl overflow-auto mb-2",
                                    itemIndex.current < index && "md:content-detail_before",
                                    itemIndex.current === index && "md:content-detail_active",
                                    itemIndex.current > index && "md:content-detail_after",
                                )}>
                                {val.component}
                            </div>
                        ))}

                    </div>
                </div>

            </div >
        </div>
    )
}