import React, { } from 'react';

export const ContactItem = ({ name, link }) => {


    return (
        <a className="cursor-pointer" href={link} target="_blank" rel="noreferrer">
            <i className={`fa fa-${name} text-white text-2xl m-2.5`}></i>
        </a>
    )
}