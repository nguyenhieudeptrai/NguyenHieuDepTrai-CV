import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export const NavItem = ({ items = [] }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const groupRef = useRef();

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener("click", _handleClick)
        }
        return () => {
            document.removeEventListener("click", _handleClick);
        };
    }, [isMenuOpen]);

    const _handleClick = (event) => {
        if (groupRef.current && !groupRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    if (items.length > 1) {
        const subMenu = items.filter((_, i) => i !== 0);
        return (
            <div className='relative w-40 group'>
                <li className="p-4 bg-gray-800 cursor-pointer hover:underline"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {items[0].name}
                </li>
                <div ref={groupRef}
                    className={clsx(
                        "absolute top-full md:group-hover:block flex-col w-full",
                        isMenuOpen ? 'flex' : 'hidden'
                    )}>
                    <ul >
                        {subMenu.map((v, i) => (
                            <li key={i} className="py-2">
                                <Link to={v.url} className="p-4 hover:underline">
                                    {v.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className='relative w-40'>
            <li className="p-4 bg-gray-800 cursor-pointer peer">
                <Link to={items[0].url} className="hover:underline">
                    {items[0].name}
                </Link>
            </li>
        </div>
    )
}