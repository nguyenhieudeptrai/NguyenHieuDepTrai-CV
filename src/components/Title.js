import React, { } from 'react';

export const Title = ({ name, className = "" }) => {

    return (
        <h3 className={`uppercase font-bold text-base text-xl font-sans pb-1 border-b-2 ${className}`}>
            {name}
        </h3>
    )
}