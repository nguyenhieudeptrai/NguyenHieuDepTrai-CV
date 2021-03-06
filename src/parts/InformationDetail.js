import React, { useState } from 'react';

export const InformationDetail = ({ parts }) => {

    const [itemIndex, setItemIndex] = useState({
        current: 0,
        last: 4,
    });
    const [extenseAll, setExtenseAll] = useState(false);

    const sliderItem = (item, index) => {
        if (item.visible) {
            return (
                <div key={index} className={`slides-holder__item ${itemIndex.current === index ? "slides-holder__item_active" : ""}`}
                    style={{
                        transform: `rotateZ(${-360 * index / 5}deg)`
                    }}>
                    <div className={`bg-green-600 slides-item  ${itemIndex.current !== index ? "cursor-pointer" : ""}`}
                        onClick={() => {
                            if (itemIndex.current !== index) {
                                setItemIndex((prev) => ({
                                    current: index,
                                    last: prev.current,
                                }));
                            }
                        }}>
                        <div className={`${itemIndex.current === index ? "slides-item-bg animated-zoom " : ""}`} />
                        <i className={`fa ${item.icon} text-3xl`}></i>
                    </div>
                </div>
            )
        } else {
            return <div key={index} />
        }
    }

    return (
        <div className="relative md:h-screen">
            <div className="slider overflow-x-hidden md:block hidden">
                <div className="circular-slider">
                    <div className="slides-holder" style={{
                        transform: `rotateZ(${360 * itemIndex.current / 5 - 90}deg)`,
                        transitionDuration: (Math.abs(itemIndex.last - itemIndex.current)) * 0.3 + "s"
                    }}>
                        {parts.map((item, index) => sliderItem(item, index))}

                    </div>
                    <div className="descriptions">
                        {parts.map((val, index) =>
                            <div key={index} className={`descriptions__item ${itemIndex.current === index ? " descriptions__item_visible" : ""}`}>
                                <h1 className="text-white bold uppercase text-2xl">{val.name}</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="relative h-full md:w-2/4 w-full lg:w-2/3">
                <div className="md:absolute md:top-1/2 md:transform md:-translate-y-1/2 md:h-3/4 w-full md:ml-4 md:overflow-hidden">

                    {parts.map((val, index) => {
                        if (val.visible) {
                            return (
                                <div key={index} className={`md:absolute md:top-1/2 h-auto md:max-h-full w-full transition duration-300 ease-in-out 
                                    bg-white rounded-lg shadow-xl overflow-auto mb-2
                                    ${itemIndex.current < index ? "md:content-detail_before" :
                                        itemIndex.current === index ? "md:content-detail_active" :
                                            itemIndex.current > index ? "md:content-detail_after" : ""}
                        `}>
                                    <button className="absolute top-3 right-3 z-10 md:block hidden">
                                        <label htmlFor="extenseInput" className="flex items-center cursor-pointer mb-4 md:mb-0">
                                            <span className="mr-2 font-bold">Extense all</span>
                                            <div className="relative extenseAll">
                                                <input id="extenseInput" type="checkbox" className="hidden"
                                                    checked={extenseAll}
                                                    onChange={() => setExtenseAll(!extenseAll)}
                                                />
                                                <div className="toggle__line w-12 h-6 bg-gray-200 rounded-full shadow-inner"></div>
                                                <div className="toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0"></div>
                                            </div>
                                        </label>
                                    </button>
                                    <div className="relative px-6 py-4">
                                        {React.cloneElement(val.component, { isCollapse: extenseAll })}
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return <div key={index} />
                        }
                    })}

                </div>
            </div>

        </div>
    )
}