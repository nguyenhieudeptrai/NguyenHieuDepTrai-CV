import React, { } from 'react';

export const ContactItem = ({ name, link, onClick, newPage = false }) => {
    return (
        <a className="cursor-pointer" href={link} target={newPage ? "_blank" : "_parent"} rel="noreferrer"
            onClick={() => {
                if (!newPage) {
                    onClick();
                }
            }}
        >
            <i className={`fa fa-${name} text-white text-2xl m-2.5`}></i>
        </a>
    )
}