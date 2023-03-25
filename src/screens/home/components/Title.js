import React, { } from 'react';

export const Title = ({ name, className = "" }) => {

    return (
        <h3 className={`uppercase font-bold text-xl font-sans p-3 border-b-2 ${className}`}>
            {name}
        </h3>
    )
}