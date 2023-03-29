import clsx from "clsx";
import React, { useRef, useEffect, useState } from "react";

export const FloatingCard = ({ spaceX = 0, width = 0, height = 0, delay = 0, started = false, children = [] }) => {
    const [index, setIndex] = useState(0);
    const configIndexRef = useRef({
        idTimeout: 0,
        index: 0,
    });

    useEffect(() => {
        if (started) {
            _loop();
        }
        return () => {
            clearTimeout(configIndexRef.current.idTimeout);
        }
    }, [started]);

    const _loop = () => {
        clearTimeout(configIndexRef.current.idTimeout);
        setIndex(configIndexRef.current.index);
        configIndexRef.current.idTimeout = setTimeout(() => {
            configIndexRef.current.index++;
            if (configIndexRef.current.index == children.length) {
                configIndexRef.current.index = 0;
            }
            if (started) {
                _loop();
            }
        }, delay);
    }

    return (
        <div className="flex items-end" style={{ height: height * 2.5 }}>
            <div className="flex" style={{ width: (width + spaceX) * (children.length - 1) - spaceX, height }}>
                {children.map((v, i) => (
                    <div key={i} className="transition-all duration-500"
                        style={{
                            position: "absolute",
                            zIndex: i == index ? 10 : 0,
                            transform: clsx(
                                i == index ?
                                    `translateX(${((width + spaceX) * (children.length - 1)) / 2 - ((width + spaceX) / 2)}px)`
                                    :
                                    `translateX(${(i - (index < i ? 1 : 0)) * width + (i - (index < i ? 1 : 0)) * spaceX}px)`,

                                i == index ? "scale(1.5)" : "scale(1)",
                                `translateY(${i == index ? "-90%" : "0%"})`
                            )
                        }}

                    >
                        {React.cloneElement(v, {
                            style: { width, height },
                        })}
                    </div>
                ))}
            </div >
        </div >);
}