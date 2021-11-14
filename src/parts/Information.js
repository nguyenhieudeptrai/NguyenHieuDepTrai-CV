import React, { } from 'react';

export const Information = ({ profile }) => {
    return (
        <div className="text-center px-3 pb-6">
            <h3 className="text-xl bold font-sans">{profile.name}</h3>
            <p className="mt-2 font-sans font-light">{profile.job}</p>
            {profile.description &&
                <p className="mt-2 font-sans font-light">{profile.description}</p>
            }
        </div>
    )
}