export class Item {
    constructor(w, h, areaW, areaH, data = { img: null, point: 0, speed: 0 }, x) {
        this.y = -h + 40; // change
        this.x = this.modifyX(x, w, areaW);
        this.w = w;
        this.h = h;
        this.areaH = areaH;
        this.isFalling = false;
        this.speed = data.speed;
        this.timeoutId = 0;
        this.data = data;
        this.isEnd = false;
    }

    modifyX(x, w, areaW) {
        if (x > areaW - w) {
            return areaW - w;
        }
        return x;
    }

    falling(onEnd = () => { }) {
        if (this.isFalling) {
            this.y += this.speed;
            if (this.y > this.areaH) {
                this.stop();
                onEnd(this.data);
                this.isEnd = true;
            } else {
                clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => this.falling(onEnd), 20);
            }
        }
    }

    drawItem(ctx, onCheck) {
        if (this.data.img && !this.isEnd) {
            if (this.isFalling) {
                onCheck(this.x, this.y, this.w, this.h);
            }
            ctx.drawImage(this.data.img, this.x, this.y, this.w, this.h);
        }
    }

    pause() {
        this.isFalling = false;
        clearTimeout(this.timeoutId);
    }

    stop() {
        this.isEnd = true;
        this.isFalling = false;
        clearTimeout(this.timeoutId);
    }

    reset() {
        this.isEnd = false;
        this.y = -this.h + 40;
        this.isFalling = false;
        clearTimeout(this.timeoutId);
    }
}


export const ScoreHistory = ({ scores = [], maxRound, gifts = [] }) => {

    return (
        <div className='min-h-[200px]'>
            <p className='font-bold mb-3 text-center text-lg text-green-600'>Quà của bạn sau {maxRound} lần chơi</p>
            <table className='w-full'>
                <thead>
                    <tr className='border-b-2 border-gray-300'>
                        <th className='w-24'>Lượt</th>
                        <th className='w-24'>Điểm</th>
                        <th>Quà</th>
                    </tr>
                </thead>
                <tbody>
                    {scores?.map((val, index) => (
                        <tr key={index} className='h-10 even:bg-slate-100'>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{val.point}</td>
                            <td className='flex items-center justify-center'>
                                <img src={process.env.PUBLIC_URL + gifts[val.giftIndex].url} alt="" width={50} className="mr-4" />
                                {gifts[val.giftIndex].giftName}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export const checkPointInArea = (
    point = { x: 0, y: 0, },
    area = { x1: 0, y1: 0, x2: 0, y2: 0 }
) => point.x > area.x1 && point.x < area.x2 && point.y > area.y1 && point.y < area.y2

export const getTimeString = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return [
        minutes, seconds,
        (minutes > 0 ? `${minutes} phút` : "") + ((seconds > 0 || minutes === 0) ? ` ${seconds} giây` : ""),
        (`${minutes > 9 ? "" : "0"}${minutes}:${seconds > 9 ? "" : "0"}${seconds}`)
    ];
};


export const randomNum = (from, to) => {
    return Math.floor(Math.random() * (to - from)) + from;
}
