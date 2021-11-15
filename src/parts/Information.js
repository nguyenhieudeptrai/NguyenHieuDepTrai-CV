import React, { } from 'react';

export const Information = ({ profile, isChangeAvatar, onScrollBottom }) => {
    return (
        <div className="relative md:w-3/4 w-4/5 mx-auto h-screen">
            <div className="flex justify-center transform translate-y-20">
                <img src={profile.avatar} alt="avatar"
                    className={"overflow-hidden w-40 rounded-full border-solid border-white border-2 -mt-3 shadow-xl "
                        + "transition duration-500 ease-in-out "
                        + (isChangeAvatar ? "opacity-0" : "opacity-1")} />
            </div>
            <div className=" bg-white rounded-xl p-4 pt-24">
                <div className="text-center px-3 pb-6">
                    <h3 className="text-xl bold font-roboto">{profile.name}</h3>
                    <p className="mt-2 font-sans font-light">{profile.job} - {profile.experience}</p>
                </div>
                <div className="md:px-28 px-6">
                    <div className="flex items-center">
                        <i className="fa fa-check mr-3 text-green-500" aria-hidden="true"></i>
                        <p className="font-roboto text-lg">
                            Gender:
                            <span className="ml-2 font-light">
                                {profile.gender}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center">
                        <i className="fa fa-check mr-3 text-green-500" aria-hidden="true"></i>
                        <p className="font-roboto text-lg">
                            Nationaity:
                            <span className="ml-2 font-light">
                                {profile.region}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center">
                        <i className="fa fa-check mr-3 text-green-500" aria-hidden="true"></i>
                        <p className="font-roboto text-lg">
                            Other Languages:
                            <span className="ml-2 font-light">
                                {profile.otherLanguages.join(", ")}
                            </span>
                        </p>
                    </div>
                    {profile.description &&
                        <p className="mt-2 font-sans font-light text-lg">{profile.description}</p>
                    }
                </div>
            </div>
            <div className="md:absolute md:bottom-6 w-full text-center hidden md:block">
                <button className="relative m-auto" onClick={onScrollBottom}>
                    <i className="fa fa-arrow-down text-white text-5xl animate-ping" aria-hidden="true"></i>
                    <i className="fa fa-arrow-down text-white text-5xl absolute left-0" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    )
}