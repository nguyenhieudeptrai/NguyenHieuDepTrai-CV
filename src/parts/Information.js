import React, { } from 'react';

export const Information = ({ profile, isChangeAvatar, onScrollBottom }) => {
    return (
        <div className="relative w-3/4 mx-auto h-screen">
            <div className="flex justify-center transform translate-y-20">
                <img src={profile.avatar} alt="avatar"
                    className={"overflow-hidden w-40 rounded-full border-solid border-white border-2 -mt-3 shadow-xl "
                        + "transition duration-500 ease-in-out "
                        + (isChangeAvatar ? "opacity-0" : "opacity-1")} />
            </div>
            <div className=" bg-white rounded-xl p-4 pt-24">
                <div className="text-center px-3 pb-6">
                    <h3 className="text-xl bold font-sans">{profile.name}</h3>
                    <p className="mt-2 font-sans font-light">{profile.job}</p>
                </div>
                <div className="px-28">
                    <div>
                        <p>Nationaity: {profile.region}</p>
                    </div>
                    <div>
                        <p>Gender: {profile.gender}</p>
                    </div>
                    <div>
                        <p>Other Languages: {profile.otherLanguages.join(", ")}</p>
                    </div>
                    {profile.description &&
                        <p className="mt-2 font-sans font-light">{profile.description}</p>
                    }
                </div>
            </div>
            <div className="absolute bottom-6 w-full text-center">
            <button className="relative m-auto" onClick={onScrollBottom}>
                <i className="fa fa-arrow-down text-white text-5xl animate-ping" aria-hidden="true"></i>
                <i className="fa fa-arrow-down text-white text-5xl absolute left-0" aria-hidden="true"></i>
            </button>
            </div>
        </div>
    )
}