import React, { } from 'react';

export const TimeUpdated = ({ date, className = "" }) => {

    return (
        <div className="md:fixed md:bottom-0 md:right-0 px-4 py-2 text-right w-full">
            <p className={`${className}`}>Updated at {date}</p>
        </div>
    )
}