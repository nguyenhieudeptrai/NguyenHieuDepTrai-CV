import clsx from "clsx";
import React, { useRef, useEffect, useState } from "react";

export const ItemScroling = ({ className = "", focusClassName = "", normaClassName = "", delay = 0, started = false, children = [] }) => {
    const [index, setIndex] = useState(0);
    const configIndexRef = useRef({
        idTimeout: 0,
        index: 0,
    });

    useEffect(() => {
        if (started) {
            setIndex(0);
            configIndexRef.current = {
                idTimeout: 0,
                index: 0,
            }
            _loop();
        }
        return () => {
            configIndexRef.current = {
                idTimeout: 0,
                index: 0
            }
            clearTimeout(configIndexRef.current.idTimeout);
        }
    }, [started]);

    const _loop = () => {
        clearTimeout(configIndexRef.current.idTimeout);
        configIndexRef.current.idTimeout = setTimeout(() => {
            setIndex(configIndexRef.current.index);
            configIndexRef.current.index++;
            if (configIndexRef.current.index <= children.length) {
                _loop();
            }
        }, delay);
    }
    return <div className="flex">
        {children.map((v, i) => (
            <div key={i} className="flex items-center overflow-hidden">
                {React.cloneElement(v, {
                    className: clsx(className, i == index ? focusClassName : i < index ? normaClassName : "scale-0 w-0 h-0")
                })}
                {i != children.length - 1 &&
                    <div className={clsx("h-0 mx-2 border-b-4 border-white transition-all duration-500 delay-200",
                        i + 1 > index ? "opacity-0 w-0" : "opacity-100 w-10 "
                    )}>
                    </div>
                }
            </div>
        ))}
    </div>;
}