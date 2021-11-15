import React, { useEffect, useState } from 'react';
import { Contact } from 'parts/Contact';
import { Education } from 'parts/Education';
import { Information } from 'parts/Information';
import { Experience } from 'parts/Experience';
import { Reference } from 'parts/Reference';
import { Skill } from 'parts/Skill';
import { InformationDetail } from 'parts/InformationDetail';
import { TimeUpdated } from 'components/TimeUpdated';
import FullIcon from 'css/full.svg';

const scrollRef = React.createRef();

function App() {

  const updated = "15/11/2021";

  const contacts = [
    {
      name: "phone",
      link: "tel:+84-963-192-405",
      newPage: false,
    },
    {
      name: "envelope",
      link: "mailto:yeumotnguoi789@gmail.com",
      newPage: false,
    },
    {
      name: "facebook-square",
      link: "https://www.facebook.com/style.in.my.eyes",
      newPage: true,
    },
  ];
  const profile = {
    name: "Nguyễn Trung Hiếu",
    avatar: "https://scontent.fpnh22-4.fna.fbcdn.net/v/t1.6435-9/118139431_1730686400418708_5167623874361533360_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=H9Dsn9htSiQAX-XLGwb&tn=78f5E36gZxCZg_RD&_nc_ht=scontent.fpnh22-4.fna&oh=f08dde4e5de71cbbaeb72dd84dcc54ff&oe=61B82D8F",
    job: "Web/Mobile Deverloper",
    experience: "1 Year Experience",
    region: "Vietnam",
    gender: "Male",
    otherLanguages: [
      "English",
    ],
    description: `I have experience in developing web and mobile applications. I want to further develop my experience in big companies.
    Orient my knowledge horizontally. So it is an advantage when deciding how to solve many problems.`,
  };
  const education = [{
    name: "FPT University",
    location: "Ho Chi Minh city",
    major: "Software Engineer",
    majorType: [
      "Website app",
      "Desktop app",
      "Mobile app",
    ],
    from: "10/2016",
    to: "9/2021",
    gpa: "6.86",
    description: "",
    certificates: [
      {
        name: "Project Management Principles and Practices Specialization",
        link: "https://coursera.org/share/4ca0d06ef43d40e545cb1445630fb70a"
      }
    ]
  }];
  const experience = [
    {
      companyName: "FPT Software",
      companyType: "C",// F or C or G
      location: "Ho Chi Minh city",
      type: "Interm",
      from: "09/2019",
      to: "03/2020",
      jobs: [{
        name: "Back-End",
        lang: "C# .Net Core",
      }],
      description: "- Completed maintenance on existing programs\n- Build new functionality for software"
    },
    {
      companyName: "Freelance job",
      companyType: "F",// F or C or G
      from: "12/2020",
      to: "02/2021",
      jobs: [{
        name: "Front-End",
        lang: "ReactJs",
      }],
      description: '"Ostolust" webapp - Stores/Product managerment application'
    },
    {
      companyName: "Capstone Project - FPT University",
      companyType: "G",// F or C or G
      from: "01/2020",
      to: "04/2021",
      jobs: [
        {
          name: "Mobile",
          lang: "React Native",
        },
        {
          name: "Back-End",
          lang: "C# .Net Core",
        },
        {
          name: "Front-End",
          lang: "ReactJs",
        },
        {
          name: "Embedded",
          lang: "C lang",
        }
      ],
      description: '"Smart Cabinet" system - Used for temporary storage of goods'
    },
    {
      companyName: "Freelance job",
      companyType: "F",// F or C or G
      from: "06/2021",
      to: "07/2021",
      jobs: [{
        name: "Front-End",
        lang: "ReactJs",
      }],
      description: "Build an app for real estate search, analysis and transactions, use Google Map"
    },
    {
      companyName: "Freelance job",
      companyType: "F",// F or C or G
      from: "10/2021",
      to: "working",
      jobs: [{
        name: "Front-End",
        lang: "React Native",
      }],
      description: '"Traverlog" mobile aplication - Build a social app to search camping or traveling when you have free time and want to be go out, using Google Map.'
    },
  ];
  const skill = {
    myself: [
      "Project Management",
      "Software Development",
      "Process improvement",
      "Teamwork",

    ],
    software: [
      "Visual Studio",
      "Visual Studio Code",
      "Android Studio",
      "IntelliJ IDEA",
      "Git base/UI",
    ],
    other: [
      "Adobe Softwares",
      "Cinema 4D"
    ]
  }
  const parts = [{
    name: "Educations",
    icon: "fa-graduation-cap",
    visible: true,
    component: <Education schools={education} />
  },
  {
    name: "Experiences",
    icon: "fa-exclamation-circle ",
    visible: true,
    component: <Experience experience={experience} />
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

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsFullScreen(window.innerWidth > 900);
    }
    handleResize();
    window.addEventListener('resize', handleResize)
  })
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
  if (!isFullScreen) {
    return (
      <div className="w-screen h-screen bg-gray-500 flex items-center justify-center">
        <div className="animated-zoom">
          <img src={FullIcon} width="70" height="70" alt="" />
        </div>
      </div>
    )
  }
  return (
    <div className="w-screen h-screen bg-blue-500 overflow-y-auto overflow-x-hidden"
      ref={scrollRef}
      onScroll={onScroll}
    >
      <div className="fixed w-full z-10">
        <div className="flex mx-12">
          <div className="flex flex-1 items-center">
            {!isChangeAvatar &&
              <p className="absolute text-lg font-bold font-roboto text-white uppercase">
                Profile
              </p>
            }
            <div className={"flex items-center justify-center rounded-lg py-1 px-3 "
              + (isChangeAvatar ? "border-solid border-white border-2 bg-blue-500 mt-0.5" : "")
            }>
              <img src={profile.avatar} alt="avatar"
                className={"overflow-hidden w-16 rounded-full border-solid border-white border-2 shadow-xl "
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
      <Information profile={profile} isChangeAvatar={isChangeAvatar} onScrollBottom={onScrollToBottom} />
      <InformationDetail parts={parts} />
      <TimeUpdated date={updated} className="text-white text-sm" />
    </div >
  );
}

export default App;
