import clsx from "clsx";

export const BoxShape = ({ config = {}, className, border, color, children }) => {
    const { width: w, height: h } = config;
    const RADIUS_BOX = 30;
    const BORDER = border / 1.5;
    const HEIGHT = h - RADIUS_BOX;
    const WIDTH = w - RADIUS_BOX;
    return (
        <div className={clsx("relative flex justify-center items-center", className)} style={{ width: w, height: h }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="absolute">
                <g>
                    <path
                        d={clsx(
                            `M ${RADIUS_BOX + BORDER} ${BORDER}`,
                            `L ${BORDER} ${RADIUS_BOX + BORDER}`,
                            `L ${BORDER} ${h - BORDER}`,
                            `L ${WIDTH - BORDER} ${h - BORDER}`,
                            `L ${w - BORDER} ${HEIGHT - BORDER}`,
                            `L ${w - BORDER} ${BORDER}`,
                            `L ${RADIUS_BOX + BORDER} ${BORDER}`,
                            `M ${RADIUS_BOX} 0`,
                            `L ${w} 0`,
                            `L ${w} ${HEIGHT}`,
                            `L ${WIDTH} ${h}`,
                            `L 0 ${h}`,
                            `L 0 ${RADIUS_BOX}`,
                            `L ${RADIUS_BOX} 0`,
                            'Z'
                        )}
                        fill={color}
                    />
                </g>
            </svg>
            <div className="p-2">
                {children}
            </div>
        </div>
    )
}