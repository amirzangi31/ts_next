import React from 'react'
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp, expireHandler }: { expiryTimestamp: Date, expireHandler: () => void }) => {


    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: expireHandler });


    return (
        <div className='flex justify-start items-center gap-2 text-md'>
            <p>  {seconds.toString().length === 1 ? `0${seconds}` : seconds} : {minutes.toString().length === 1 ? `0${minutes}` : minutes} {hours > 0  ? ":" : null} {hours > 0 ? hours.toString().length === 1 ? `0${hours}` : hours : null}</p>
        </div>
    )
}

export default Timer