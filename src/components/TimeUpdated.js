import React, { } from 'react';

export const TimeUpdated = ({ date, className = "" }) => {

    return (
        <div className="absolute bottom-0 right-0 px-10 py-2">
            <p className={`${className}`}>Update {date}</p>
        </div>
    )
}