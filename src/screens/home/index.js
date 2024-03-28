import React, { useEffect, useRef, useState } from 'react';
import { Contact } from './parts/Contact';
import { Education } from './parts/Education';
import { InformationBasic } from './parts/InformationBasic';
import { Experience } from './parts/Experience';
import { Skill } from './parts/Skill';
import { InformationDetail } from './parts/InformationDetail';
import { TimeUpdated } from './components/TimeUpdated';
import { contacts, education, experience, profile, skill, updated, references } from 'info';
import { Reference } from './parts/Reference';

let timeTmp = 0;

const parts = [
    {
        name: "Experiences",
        icon: "fa-exclamation-circle ",
        component: <Experience experience={experience.sort((a, b) => b.id - a.id)} />
    },
    {
        name: "Educations",
        icon: "fa-graduation-cap",
        component: <Education schools={education} />
    },
    {
        name: "Skills",
        icon: "fa-thumbs-up",
        component: <Skill myself={skill.myself} softwares={skill.software} others={skill.other} />
    },
    {
        name: "References",
        icon: "fa-bookmark",
        component: <Reference referenceSources={references} />
    },
];

function HomeScreen() {


    const [isChangeAvatar, setChangeAvatar] = useState(false);
    const [time, setTime] = useState(0);
    const scrollRef = useRef();
    const scrollStatus = useRef({
        timeOutId: 0,
        prevScrollY: 0,
        isAutoScroll: false,
    });

    useEffect(() => {
        document.title = "Nguyễn Hiếu - Profile";
        if (window.innerWidth <= 768) {
            timeTmp = 6;
            countDown();
        }
    }, []);



    const onScroll = () => {
        if (scrollStatus.current.isAutoScroll) return;
        const scrollTop = scrollRef.current?.scrollTop;
        setChangeAvatar(scrollTop >= 200);
        let isScrolDown = scrollStatus.current.prevScrollY < scrollTop;
        scrollStatus.current.prevScrollY = scrollTop;
        clearTimeout(scrollStatus.current.timeOutId);
        scrollStatus.current.timeOutId = setTimeout(() => {
            if (isScrolDown) {
                scrollRef.current?.scrollTo({
                    left: 0,
                    top: window.innerHeight * 2,
                    behavior: 'smooth'
                });
            } else {
                scrollRef.current?.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth'
                });
            }
            scrollStatus.current.isAutoScroll = true;
            setTimeout(() => {
                scrollStatus.current.isAutoScroll = false;
            }, 200);
        }, 100);
    }
    const onScrollToBottom = () => {
        scrollRef.current?.scrollTo({
            left: 0,
            top: window.innerHeight * 2,
            behavior: 'smooth'
        });
    }

    const countDown = () => {
        if (timeTmp <= 0) {
            setTime(0);
            return;
        }
        timeTmp--;
        setTime(timeTmp);
        setTimeout(countDown, 1000);
    }
    if (time > 0) {

        return (
            <div className="w-screen h-screen bg-gray-500 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <p className=" text-white text-center">It will be better if you watch it on your PC/Laptop</p>
                    <p className="pb-2 text-white text-center">{time}s to auto skip</p>
                    <button className="px-6 py-2 text-white mt-4 bg-emerald-300 rounded-lg"
                        onClick={() => { timeTmp = 0; }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div className="my-cv w-screen h-screen bg-emerald-600 overflow-y-auto"
            ref={scrollRef}
            onScroll={onScroll}
            onTouchStart={() => {
                scrollStatus.current.isAutoScroll = true;
            }}
            onTouchEnd={() => {
                scrollStatus.current.isAutoScroll = false;
                onScroll();
            }}
        >
            <div className={"fixed w-full z-10 "
                + (isChangeAvatar ? "bg-emerald-600 md:bg-transparent " : "")}>
                <div className="flex md:mx-12 mx-2">
                    <div className="flex flex-1 items-center z-10">
                        {!isChangeAvatar &&
                            <p className="absolute text-lg font-bold font-roboto text-white uppercase ">
                                Profile
                            </p>
                        }
                        <div className={"flex items-center justify-center rounded-lg py-1 px-3 "
                            + (isChangeAvatar ? "border-solid border-white border-2 bg-emerald-600 mt-0.5" : "")
                        }>
                            <img src={profile.avatar} alt="avatar"
                                className={"overflow-hidden h-16 w-16 rounded-full border-solid border-white border-2 shadow-xl "
                                    + "transition duration-500 ease-in-out "
                                    + (isChangeAvatar ? "opacity-1" : "opacity-0")} />
                            {isChangeAvatar &&
                                <div className="ml-3 flex flex-col items-start">
                                    <h3 className="text-white text-lg font-bold font-roboto">
                                        {profile.name}
                                    </h3>
                                    <p className="text-white text-sm font-sans font-light">
                                        {profile.job}
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                    <Contact contacts={contacts} />
                </div>
            </div>
            <InformationBasic profile={profile} isChangeAvatar={isChangeAvatar} onScrollBottom={onScrollToBottom} />
            <InformationDetail parts={parts} />
            <TimeUpdated date={updated} className="text-white text-sm" />
        </div >
    );
}

export default HomeScreen;
