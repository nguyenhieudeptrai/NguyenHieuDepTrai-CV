import { useRef, useEffect } from "react";

export const KeyTyping = ({ className = "", data = "", delay = 0, started = false }) => {

    const textRef = useRef();
    const keyRef = useRef({
        idTimeout: 0,
        index: 0,
        text: "",
    });

    useEffect(() => {
        let idDelay = 0;
        if (started) {
            idDelay = setTimeout(() => {
                keyRef.current = {
                    idTimeout: 0,
                    index: 0,
                    text: "",
                }
                _loop();
            }, delay)
        } else {
            keyRef.current.text = data;
        }
        return () => {
            keyRef.current = {
                idTimeout: 0,
                index: 0,
                text: "",
            }
            clearTimeout(idDelay);
            clearTimeout(keyRef.current.idTimeout);
        }
    }, [data, started]);

    const _loop = () => {
        keyRef.current.text += data[keyRef.current.index];
        keyRef.current.index++;
        if (data[keyRef.current.index]) {
            keyRef.current.text += data[keyRef.current.index];
            keyRef.current.index++;
        }
        textRef.current.innerHTML = keyRef.current.text + "|";
        clearTimeout(keyRef.current.idTimeout);
        keyRef.current.idTimeout = setTimeout(() => {
            if (keyRef.current.index < data.length) {
                _loop();
            } else {
                textRef.current.innerHTML = data;
            }
        }, 50);
    }
    return (
        <p className={className} ref={textRef}></p>
    )
}