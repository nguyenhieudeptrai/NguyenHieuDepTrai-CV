import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export const NavItem = ({ items = [], highlight = false }) => {
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
            <div className='relative w-32 group'>
                <li className="p-2 cursor-pointer hover:underline"
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
                            <li key={i} className="py-2 bg-gray-900 mt-2">
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
        <div className='relative w-32'>
            <li className={clsx("p-2 cursor-pointer hover:underline rounded-md", highlight && "bg-blue-600 text-center")}>
                <Link to={items[0].url} className="font-semibold ">
                    {items[0].name}
                </Link>
            </li>
        </div>
    )
}