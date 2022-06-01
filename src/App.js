import React, { useEffect, useState } from 'react';
import { Contact } from 'parts/Contact';
import { Education } from 'parts/Education';
import { InformationBasic } from 'parts/InformationBasic';
import { Experience } from 'parts/Experience';
import { Reference } from 'parts/Reference';
import { Skill } from 'parts/Skill';
import { InformationDetail } from 'parts/InformationDetail';
import { TimeUpdated } from 'components/TimeUpdated';
import { contacts, education, experience, profile, skill, updated } from 'info';

const scrollRef = React.createRef();
let timeTmp = 0;
function App() {

  const parts = [
    {
      name: "Experiences",
      icon: "fa-exclamation-circle ",
      visible: true,
      component: <Experience experience={experience} />
    },
    {
      name: "Educations",
      icon: "fa-graduation-cap",
      visible: true,
      component: <Education schools={education} />
    },
    {
      name: "Skills",
      icon: "fa-thumbs-up",
      visible: true,
      component: <Skill myself={skill.myself} softwares={skill.software} others={skill.other} />
    },
    {
      name: "References",
      icon: "fa-bookmark",
      visible: true,
      component: <Reference />
    },
    {
      name: "None",
      visible: false,
    },
  ];

  const [isChangeAvatar, setChangeAvatar] = useState(false);
  const [time, setTime] = useState(0);

  const onScroll = () => {
    const scrollTop = scrollRef.current?.scrollTop;
    setChangeAvatar(scrollTop >= 200);
  }
  const onScrollToBottom = () => {
    scrollRef.current?.scrollTo({
      left: 0,
      top: window.innerHeight * 2,
      behavior: 'smooth'
    });
  }
  useEffect(() => {
    if (window.innerWidth <= 768) {
      timeTmp = 6;
      countDown();
    }
  }, []);

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
          <button className="px-6 py-2 text-white mt-4 bg-green-300 rounded-lg"
            onClick={() => { timeTmp = 0; }}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="w-screen h-screen bg-green-600 overflow-y-auto overflow-x-hidden"
      ref={scrollRef}
      onScroll={onScroll}
    >
      <div className={"fixed w-full z-10 "
        + (isChangeAvatar ? "bg-green-600 md:bg-transparent " : "")}>
        <div className="flex md:mx-12 mx-2">
          <div className="flex flex-1 items-center z-10">
            {!isChangeAvatar &&
              <p className="absolute text-lg font-bold font-roboto text-white uppercase ">
                Profile
              </p>
            }
            <div className={"flex items-center justify-center rounded-lg py-1 px-3 "
              + (isChangeAvatar ? "border-solid border-white border-2 bg-green-600 mt-0.5" : "")
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

export default App;
